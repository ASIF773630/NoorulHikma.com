import re
with open("form.html", "r", encoding="utf-8") as f:
    text = f.read()

# I will simply insert a newline after every > to format it loosely
text = text.replace('>', '>\n')

with open("form.html", "w", encoding="utf-8") as f:
    f.write(text)
print("Formatted form.html to multiple lines.")
