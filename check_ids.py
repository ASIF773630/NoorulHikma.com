import re
from collections import Counter

with open('form.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all id="something"
ids = re.findall(r'id="([^"]+)"', html)
print(f"Total IDs: {len(ids)}")

counts = Counter(ids)
duplicates = [id for id, count in counts.items() if count > 1]

if duplicates:
    print("DUPLICATE IDs:")
    for d in duplicates:
        print(f"  {d}: {counts[d]} occurrences")
else:
    print("No duplicate IDs found.")
