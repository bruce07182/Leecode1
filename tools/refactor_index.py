from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
index = root / "index.html"
text = index.read_text(encoding="utf-8")

# Idempotent: once split, only rebuild dist.
if '<link rel="stylesheet" href="assets/app.css">' not in text:
    style = re.search(r"<style>\s*(.*?)\s*</style>", text, re.S)
    scripts = list(re.finditer(r"<script>(.*?)</script>", text, re.S))
    if not style or not scripts:
        raise SystemExit("Expected inline style and application script in index.html")
    app = scripts[-1]
    assets = root / "assets"
    assets.mkdir(exist_ok=True)
    (assets / "app.css").write_text(style.group(1).strip() + "\n", encoding="utf-8")
    (assets / "app.js").write_text(app.group(1).strip() + "\n", encoding="utf-8")
    text = text[:style.start()] + '<link rel="stylesheet" href="assets/app.css">' + text[style.end():]
    # Re-find the last inline script after the style replacement.
    scripts = list(re.finditer(r"<script>(.*?)</script>", text, re.S))
    app = scripts[-1]
    text = text[:app.start()] + '<script src="assets/app.js"></script>' + text[app.end():]
    index.write_text(text, encoding="utf-8")

# Build a standalone release index.html by inlining local CSS/JS.
source = index.read_text(encoding="utf-8")
css = (root / "assets/app.css").read_text(encoding="utf-8")
js = (root / "assets/app.js").read_text(encoding="utf-8")
standalone = source.replace('<link rel="stylesheet" href="assets/app.css">', f'<style>\n{css}\n</style>')
standalone = standalone.replace('<script src="assets/app.js"></script>', f'<script>\n{js}\n</script>')
(root / "dist").mkdir(exist_ok=True)
(root / "dist" / "index.html").write_text(standalone, encoding="utf-8")
print("Refactored source and built dist/index.html")
