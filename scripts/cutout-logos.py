#!/usr/bin/env python3
"""Remove the near-white background from the 3D logo PNGs via edge flood-fill.

The logos sit on a uniform light-gray/white background (~232-254). We flood-fill
from many edge seed points with a tolerance, mark those pixels as background, and
turn them transparent. Flood-fill (vs. a global white threshold) preserves white
*inside* the logo (e.g. the white trend line on MarkSimos' red disc), since those
regions aren't connected to the border.

Output is trimmed to the logo's bounding box and saved as <name>-cutout.png.
"""
import os
from PIL import Image, ImageDraw, ImageChops, ImageFilter

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.normpath(os.path.join(SRC_DIR, '..', 'public'))

JOBS = [
    ('ChangeMan_立体Logo.png', 'changeman-cutout.png'),
    ('MarkSimos_立体Logo.png', 'marksimos-cutout.png'),
    ('TeamSynergy_立体Logo.png', 'teamsynergy-cutout.png'),
]

SENTINEL = (255, 0, 255)
THRESH = 60  # tolerance for "is this background-colored"


def seed_points(w, h):
    pts = []
    n = 40
    for i in range(n + 1):
        x = round(i * (w - 1) / n)
        y = round(i * (h - 1) / n)
        pts += [(x, 0), (x, h - 1), (0, y), (w - 1, y)]
    return pts


def cutout(src_path):
    im = Image.open(src_path).convert('RGB')
    w, h = im.size

    filled = im.copy()
    for s in seed_points(w, h):
        ImageDraw.floodfill(filled, s, SENTINEL, thresh=THRESH)

    # background mask = pixels that became the sentinel color
    r, g, b = filled.split()
    rg = r.point(lambda v: 255 if v == SENTINEL[0] else 0)
    gg = g.point(lambda v: 255 if v == SENTINEL[1] else 0)
    bb = b.point(lambda v: 255 if v == SENTINEL[2] else 0)
    bg = ImageChops.multiply(ImageChops.multiply(rg, gg), bb)  # 255 where background
    alpha = ImageChops.invert(bg)

    # feather the edge a hair to kill jaggies / leftover halo
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))
    # push mostly-opaque back to fully opaque so the logo body stays crisp
    alpha = alpha.point(lambda v: 0 if v < 24 else (255 if v > 232 else v))

    out = im.convert('RGBA')
    out.putalpha(alpha)

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    return out


for src_name, out_name in JOBS:
    src = os.path.join(PUBLIC, src_name)
    out = cutout(src)
    dst = os.path.join(PUBLIC, out_name)
    out.save(dst)
    print(f'{out_name}: {out.size}  ({os.path.getsize(dst)} bytes)')
