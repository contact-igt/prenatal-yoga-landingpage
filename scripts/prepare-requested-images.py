"""Prepare the requested assets without image generation or modifying originals."""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageOps

assets = Path('public/images')
preview = Path('output/playwright')
source = assets / 'd056632c-5977-49a3-97ed-7995e66680f7.png'
original = cv2.imread(str(source))
height, width = original.shape[:2]

# Replace only the embedded label with adjacent floor/fabric pixels. No face,
# hands, pose, body outline outside the occluded label, or other pixels change.
x0, y0, x1, y1 = 65, 661, 432, 768
patch_y, patch_x = np.mgrid[y0:y1, x0:x1].astype(np.float32)
# Sample unobstructed fabric above the label and floor beside it. Reflect only
# the fabric grain, then match illumination at the repair boundary with Poisson
# blending. This avoids importing a different fold, limb or clothing edge.
floor = cv2.remap(original, np.full_like(patch_x, 45), patch_y, cv2.INTER_LINEAR)
sample = original[605:655, 310:455]
cloth = cv2.copyMakeBorder(sample, 30, 30, 120, 120, cv2.BORDER_REFLECT101)[:107, :367]
texture = np.clip(cloth.astype(float) - cv2.GaussianBlur(cloth, (0, 0), 8)
                  + [41, 44, 50], 0, 255)
outline = 150 + (patch_y - y0) * 15 / (y1-y0)
fabric_alpha = np.clip((patch_x - outline + 1) / 2, 0, 1)[:, :, None]
patch = np.round(texture * fabric_alpha + floor * (1-fabric_alpha)).astype(np.uint8)
local_mask = Image.new('L', (x1-x0, y1-y0))
ImageDraw.Draw(local_mask).rounded_rectangle((1, 1, x1-x0-2, y1-y0-2), 18, fill=255)
mask = np.array(local_mask)
# OpenCV edits its mask argument in place; keep the restoration boundary intact.
retouched = cv2.seamlessClone(patch, original, mask.copy(), (248, 714), cv2.NORMAL_CLONE)
global_mask = np.zeros((height, width), np.uint8)
global_mask[y0:y1, x0:x1] = mask
retouched[global_mask == 0] = original[global_mask == 0]
clean_path = assets / 'd056632c-5977-49a3-97ed-7995e66680f7-clean.webp'
Image.fromarray(cv2.cvtColor(retouched, cv2.COLOR_BGR2RGB)).save(
    clean_path, 'WEBP', lossless=True, method=6)
decoded = cv2.imread(str(clean_path))
assert np.array_equal(decoded[global_mask == 0], original[global_mask == 0])
assert np.mean(np.abs(decoded[681:746, 85:410].astype(float)
                      - original[681:746, 85:410].astype(float))) > 50
Image.fromarray(cv2.cvtColor(retouched, cv2.COLOR_BGR2RGB)).crop(
    (0, 520, 540, 887)).save(preview / 'label-repair-detail.png')
print(f'{clean_path}: {width}x{height}; pixels outside the label repair unchanged')

# SIFT matching found 543 inliers between the small card and this exact source.
# Restore its existing crop from the EXIF-oriented original, rather than upscale.
full = ImageOps.exif_transpose(Image.open('reference/official-movement.jpg')).convert('RGB')
assert full.size == (4672, 7008)
crop = full.transform((2400, 1600), Image.Transform.EXTENT,
                      (0, 1946.9, 4672, 1946.9 + 4672 / 1.5),
                      resample=Image.Resampling.BICUBIC)
high_path = assets / 'pelvic-health-original-highres.webp'
crop.save(high_path, 'WEBP', quality=95, method=6)
print(f'{high_path}: 2400x1600; original detail, matching the existing composition')
