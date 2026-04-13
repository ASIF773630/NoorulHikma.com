with open('form.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the second occurrence of id="tt-i51"
occurrences = content.count('id="tt-i51"')
if occurrences == 2:
    parts = content.split('id="tt-i51"')
    # parts has length 3. Join them with unique ids
    new_content = parts[0] + 'id="tt-i51"' + parts[1] + 'id="tt-i52"' + parts[2]
    with open('form.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed duplicate tt-i51 ID.")
else:
    print(f"Expected 2 occurrences of tt-i51, found {occurrences}")
