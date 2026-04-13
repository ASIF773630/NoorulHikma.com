import re
with open("form.html", "r", encoding="utf-8") as f:
    text = f.read()

# I want to forcefully remove any `{}`
text = re.sub(r'\{[ \t\n]*\}', '{ /* empty */ }', text)

with open("form.html", "w", encoding="utf-8") as f:
    f.write(text)
print("Removed empty rulesets")
