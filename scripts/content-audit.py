"""Compare visible and accessible copy with independent text from the client DOCX."""
import re
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from html.parser import HTMLParser

class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.parts = []
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip -= 1
    def handle_data(self, data):
        if not self.skip: self.parts.append(data)

def normalize(text):
    text = re.sub(r'(?i)programme', 'program', text)
    return re.sub(r'\s+', ' ', text.replace('\u00a0',' ')).strip()

with zipfile.ZipFile('BirthWave_Prenatal_Landing_Page_Developer_Brief_2026-11-18.docx') as source:
    document = ET.fromstring(source.read('word/document.xml'))
namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
brief = [''.join(node.text or '' for node in paragraph.findall('.//w:t', namespace)).strip()
         for paragraph in document.findall('.//w:p', namespace)]
brief = [line for line in brief if line]
expected = []
following = ('Body copy:', 'Introduction:', 'Intro:', 'Description:')
for index, line in enumerate(brief):
    if line in following:
        expected.append(brief[index + 1])
    if line.startswith(('H1:', 'H2:', 'Section heading:', 'Section eyebrow:', 'Eyebrow:')):
        expected.append(line.split(': ', 1)[1])
    if line.startswith('Q:'):
        question, answer = line.split('A:', 1)
        expected.extend([question[2:], re.sub(r'\s*\[.*?\]', '', answer)])
    if line.startswith(('Safety line beneath tiles:', 'Care disclaimer:', 'Privacy message:')):
        expected.append(line.split(': ', 1)[1])
    if line.startswith(('Guided movement:', 'Breathing and body awareness:', 'Space to slow down:', 'A supportive routine:', 'Prenatal yoga:', 'Mobility, strength and stretching:', 'Sound-based relaxation:', 'Storytelling and guided reflection:', 'Optional maternity / postpartum essentials:')):
        expected.append(line.split(': ', 1)[1])
html = urllib.request.urlopen('http://127.0.0.1:3000',timeout=60).read().decode()
parser = VisibleText()
parser.feed(html)
rendered = normalize(' '.join(parser.parts))
missing = [normalize(item) for item in expected if normalize(item) not in rendered]
for item in missing: print('MISSING:', item)
print(f'Client-copy audit: {len(expected) - len(missing)}/{len(expected)} exact content checks passed')
raise SystemExit(bool(missing))
