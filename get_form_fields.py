import urllib.request
import re

url = "https://forms.gle/35o8qkjCjkehAU5A8"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    resp = urllib.request.urlopen(req)
    html = resp.read().decode('utf-8')
    final_url = resp.geturl()
    print("Final URL:", final_url)
    
    matches = re.findall(r'\[\d+,"([^"]+)",null,\d+,\[\[(\d+),', html)
    for m in matches:
        print(f"{m[0]} -> entry.{m[1]}")
except Exception as e:
    print("Error:", e)
