import re

with open('form.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix known Google Form HTML warnings
# 1. empty CSS rules
content = content.replace('.OIC90c .oJeWuf .zHQkBf {}', '/* .OIC90c .oJeWuf .zHQkBf {} */')
# 2. empty IDs
content = content.replace('id=""', '')

with open('form.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed HTML warnings in form.html")
