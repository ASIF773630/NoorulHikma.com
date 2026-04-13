import re

with open('form.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Check for empty src or href
empty_src = bool(re.search(r'src=""', text, re.IGNORECASE))
empty_href = bool(re.search(r'href=""', text, re.IGNORECASE))
print(f"Empty src: {empty_src}")
print(f"Empty href: {empty_href}")

# Check for missing alt tags in img
imgs = re.findall(r'<img[^>]*>', text, re.IGNORECASE)
for img in imgs:
    if 'alt=' not in img.lower():
        print(f"Missing alt in: {img}")

# Check for multiple doctypes
doctypes = re.findall(r'<!DOCTYPE', text, re.IGNORECASE)
print(f"Doctype count: {len(doctypes)}")

# Check for stray unescaped < or > (crude)
print(f"File size: {len(text)}")
