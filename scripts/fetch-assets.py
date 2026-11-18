from pathlib import Path
import urllib.request, re, json
from concurrent.futures import ThreadPoolExecutor

base = 'https://www.thebirthwave.in'
html = urllib.request.urlopen(base, timeout=40).read().decode()
Path('reference/official-home.html').write_text(html, encoding='utf-8')
assets = {
 '/brand/wordmark-shade.png':'public/brand/logo.png',
 '/brand/wordmark-cream.png':'public/brand/logo-cream.png',
 '/images/web-ready/care.jpg':'reference/official-pregnancy.jpg',
 '/images/journey/birthpreparation.JPG':'reference/official-movement.jpg',
 '/images/web-ready/afterbirth.jpg':'reference/official-postpartum.jpg',
 '/images/web-ready/faq.jpg':'reference/official-mother.jpg',
 '/images/journey/journey-background-v1.webp':'reference/official-atmosphere.webp',
}
def fetch(item):
 path,dest=item; Path(dest).parent.mkdir(parents=True,exist_ok=True)
 with urllib.request.urlopen(base+path,timeout=60) as response:
  Path(dest).write_bytes(response.read())
 print(dest)
with ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(fetch,assets.items()))
css_paths=re.findall(r'href="([^" ]+\.css[^" ]*)"',html)
css='\n'.join(urllib.request.urlopen(base+p).read().decode() for p in css_paths)
Path('reference/official.css').write_text(css,encoding='utf-8')
print('Saved official font declarations')
