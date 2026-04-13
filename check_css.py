import re

with open('form.html', 'r', encoding='utf-8') as f:
    text = f.read()

# find { } empty blocks
empty_blocks = re.findall(r'([A-Za-z0-9_.\-#\s]+)\{\s*\}', text)
print("Empty CSS blocks:")
for b in empty_blocks:
    print(repr(b))
