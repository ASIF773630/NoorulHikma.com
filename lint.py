import sys
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.void_elements = set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"])

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if not self.stack:
            self.errors.append(f"Unexpected end tag {tag} with empty stack")
            return
        if tag in self.void_elements:
            return
        
        last = self.stack.pop()
        while last != tag:
            self.errors.append(f"Missing end tag for {last}, found {tag}")
            if not self.stack:
                break
            last = self.stack.pop()

parser = MyHTMLParser()
with open("form.html", "r", encoding="utf-8") as f:
    parser.feed(f.read())

if parser.stack:
    print(f"Unclosed tags at EOF: {parser.stack}")
for err in parser.errors:
    print(err)
print("Done")
