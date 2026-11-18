"""Create web-sized derivatives; supplied originals remain untouched."""
from pathlib import Path
from PIL import Image
from pypdf import PdfReader

out = Path('public/images')
out.mkdir(parents=True, exist_ok=True)
supplied = Path('reference/client-images')
selection = {
    'yoga-education': 'EXP00908 copy.webp',
    'conscious-connection': 'EXP04557 copy.webp',
    'programme-background': 'EXP04556 copy.webp',
    'guided-practice': 'EXP00951 copy.webp',
    'class-community': 'EXP04508 copy.webp',
    'doctor-santoshi': 'EXP07711 copy.webp',
    'postpartum-consultation': 'EXP07741 copy.webp',
    'clinic-space': 'EXP01310 copy.webp',
    'consultation-notebook': 'EXP07725 copy.webp',
}
for name, source in selection.items():
    im = Image.open(supplied / source)
    im.thumbnail((1600, 1800))
    im.save(out / f'{name}.webp', 'WEBP', quality=86, method=6)

# Frame the participants rather than the ceiling; retain the unedited photograph.
community = Image.open(supplied / 'EXP04556 copy.webp')
community = community.crop((0, 950, community.width, community.height))
community.thumbnail((1800, 1800))
community.save(out / 'pregnancy-community.webp', 'WEBP', quality=90, method=6)

# Recover only the original photographic XObjects, without the page's text.
# The PDF stores its maternity photograph as tiles; preserve their placement.
reader = PdfReader(next(Path('.').glob('*.pdf')))
page = reader.pages[3]
canvas = Image.new('RGB', (1920, 1080))
matrix = None
resources = page['/Resources']['/XObject']
for operands, operator in page.get_contents().operations:
    if operator == b'cm':
        matrix = [float(x) for x in operands]
    if operator == b'Do' and matrix:
        name = str(operands[0])
        if not name.startswith('/Im'):
            continue
        a, b, c, d, e, f = matrix
        im = page.images[name].image.convert('RGB')
        x, y = round(e), round(1080 - f - d)
        im = im.resize((round(a), round(d)), Image.Resampling.LANCZOS)
        canvas.paste(im, (x, y))
canvas.crop((0, 0, 1190, 1080)).save(out / 'maternity-moment.webp', 'WEBP', quality=90)
print('Prepared', len(selection) + 2, 'local photographs')
