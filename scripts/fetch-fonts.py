from pathlib import Path
import urllib.request
from concurrent.futures import ThreadPoolExecutor

root = 'https://www.thebirthwave.in/_next/static/immutable/media/'
fonts = {
    'fba5a26ea33df6a3-s.p.08ssgmy_tb90r.woff2': 'jakarta-latin.woff2',
    '8e6fa89aa22d24ec-s.p.1bg6trwi21i5q.woff2': 'poppins-medium.woff2',
    'e2334d715941921e-s.p.2g9xiodaln20i.woff2': 'poppins-semibold.woff2',
}
Path('public/fonts').mkdir(parents=True,exist_ok=True)
def fetch(item):
    remote,local = item
    dest = Path('public/fonts') / local
    if dest.exists(): return
    dest.write_bytes(urllib.request.urlopen(root+remote,timeout=30).read())
    print(local)
with ThreadPoolExecutor(max_workers=3) as pool:
    list(pool.map(fetch, fonts.items()))
regular = Path('public/fonts/poppins-regular.ttf')
if not regular.exists():
    regular.write_bytes(urllib.request.urlopen('https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrFJA.ttf',timeout=30).read())
    print(regular.name)
