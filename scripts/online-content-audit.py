"""Compare rendered copy with every visitor-facing block in the revised PDF."""
import re
import sys
import urllib.request
from html.parser import HTMLParser
import pymupdf

class Text(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.parts = []; self.placeholders = []
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1
        self.placeholders.extend(v for k, v in attrs if k == 'placeholder')
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip -= 1
    def handle_data(self, data):
        if not self.skip: self.parts.append(data)

def norm(s):
    return re.sub(r'\s+([.,!?])', r'\1', re.sub(r'\s+', ' ', s.replace('\u200b', '').replace('\u00a0', ' '))).strip()

pdf_path = sys.argv[1] if len(sys.argv) > 1 else r'C:\Users\admin\Downloads\THE BIRTHWAVE ONLINE PRENATAL YOGA — LANDING PAGE CONTENT.pdf'
pdf = pymupdf.open(pdf_path)
expected = []
metadata = {'THE BIRTHWAVE', 'ONLINE PRENATAL YOGA — LANDING PAGE CONTENT', 'HEADER NAVIGATION', 'Navigation:', 'Quick highlights:', 'FORM FIELDS', 'Consent Checkbox*', 'FORM SUCCESS MESSAGE', 'FOOTER LINKS'}
for page_number, page in enumerate(pdf, 1):
    for block in page.get_text('blocks', sort=True):
        source = norm(block[4])
        if not source or source in metadata or source.startswith('SECTION '): continue
        if source.startswith('Phone / WhatsApp:'): continue  # Client confirmation is pending.
        if ' Placeholder:' in source:
            label, placeholder = source.split(' Placeholder:', 1)
            candidates = [label, placeholder]
        elif '|' in source:
            candidates = source.split('|')
        elif '●' in source:
            candidates = source.split('●')
        else:
            candidates = [source]
        for item in candidates:
            item = norm(item)
            if not item: continue
            item = re.sub(r'^(?:Logo|Header CTA|EYEBROW|Primary CTA|Secondary CTA|CTA|Button|Submit Button|Placeholder):\s*', '', item)
            item = re.sub(r'^(?:Step \d+ — |\d+\.\s*)', '', item)
            item = item.replace('*', '').strip()
            if item.startswith(('Class Format:', 'Programme:', 'Monthly Fee:', 'Class Schedule:', 'Enrolment:')):
                expected.extend((page_number, norm(v)) for v in item.split(':', 1))
            else:
                expected.append((page_number, item))

html = urllib.request.urlopen('http://127.0.0.1:3000', timeout=60).read().decode()
parser = Text(); parser.feed(html)
rendered = norm(' '.join(parser.parts + parser.placeholders))
missing = [(page, item) for page, item in expected if item not in rendered]
for page, item in missing:
    print(f'MISSING (PDF page {page}): {item}')
print(f'Revised PDF audit: {len(expected)-len(missing)}/{len(expected)} exact copy blocks passed')
if 'Conscious Pregnancy' in rendered or 'in-clinic' in rendered:
    print('Outdated programme/format copy remains'); missing.append((0, 'outdated'))
raise SystemExit(bool(missing))
