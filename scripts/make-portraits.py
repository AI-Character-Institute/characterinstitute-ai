"""Normalizes the team cutouts and traces each silhouette as an SVG path.

Input:  transparent-background portraits (any size) in a source folder.
Output: public/team/<name>.webp  480x480, head-and-shoulders, bottom aligned
        data/portraits.json      the silhouette of each, used for the keyline

Usage:  python3 scripts/make-portraits.py <source-folder>
Needs:  pillow, numpy, opencv-python
"""
import json, sys, pathlib
import numpy as np, cv2
from PIL import Image, ImageFilter

SIZE = 480          # output canvas
FILL = 0.88         # share of the canvas height the figure occupies
src = pathlib.Path(sys.argv[1])
root = pathlib.Path(__file__).resolve().parent.parent
out = {}

for f in sorted(src.glob("*.webp")):
    im = Image.open(f).convert("RGBA")
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a > 40)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    scale = SIZE * FILL / im.height
    w, h = round(im.width * scale), round(im.height * scale)
    if w > SIZE:                       # very wide shoulders: fit the width instead
        scale = SIZE / im.width; w, h = SIZE, round(im.height * scale)
    im = im.resize((w, h), Image.LANCZOS)
    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    canvas.paste(im, ((SIZE - w) // 2, SIZE - h), im)
    canvas.save(root / "public" / "team" / f.name, "WEBP", quality=88, method=6)

    alpha = canvas.split()[3].filter(ImageFilter.GaussianBlur(2.2))
    mask = (np.array(alpha) > 128).astype(np.uint8)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    c = max(contours, key=cv2.contourArea)
    pts = cv2.approxPolyDP(c, 1.1, True)[:, 0, :].astype(float)
    # Open the outline along the bottom edge, where the figure runs off the tile:
    # start the path just after the stretch of points that lie on that edge.
    low = pts[:, 1] >= SIZE - 8
    if low.any():
        start = next(i for i in range(len(pts)) if low[i - 1] and not low[i])
    else:
        start = (int(np.argmax(pts[:, 1])) + 1) % len(pts)
    pts = np.roll(pts, -start, axis=0)
    pts = pts[~np.roll(low, -start)]
    # Smooth with quadratic curves through segment midpoints.
    d = [f"M{pts[0][0]:.0f} {pts[0][1]:.0f}"]
    for i in range(1, len(pts) - 1):
        mx, my = (pts[i] + pts[i + 1]) / 2
        d.append(f"Q{pts[i][0]:.0f} {pts[i][1]:.0f} {mx:.0f} {my:.0f}")
    d.append(f"L{pts[-1][0]:.0f} {pts[-1][1]:.0f}")
    out[f.stem] = "".join(d)
    print(f.stem, im.size, len(pts), "points", len(out[f.stem]), "chars")

(root / "data" / "portraits.json").write_text(json.dumps(out, indent=1) + "\n")
