import os
import glob
import re

html_files = glob.glob("*.html")
for file in html_files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "zanark_cards.js" not in content:
        # Find the last <script src="database/..."></script> and append ours
        content = re.sub(
            r'(<script src="database/[^"]+"></script>\s*)(</head>|<script src="app.js)',
            r'\1<script src="database/zanark_cards.js?v=1783154600000"></script>\n    \2',
            content
        )
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Added to {file}")

# Update cards.js
with open("cards.js", "r", encoding="utf-8") as f:
    cards_js = f.read()

if "zanarkCards" not in cards_js:
    cards_js = cards_js.replace("...solCards", "...solCards,\n    ...zanarkCards")
    with open("cards.js", "w", encoding="utf-8") as f:
        f.write(cards_js)
    print("Added to cards.js")
