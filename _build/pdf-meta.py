import sys
from pypdf import PdfReader, PdfWriter
src = sys.argv[1]
r = PdfReader(src)
w = PdfWriter()
for p in r.pages:
    w.add_page(p)
w.add_metadata({
    "/Title": "码跃少儿编程 · 2026–2027 学年招生简章",
    "/Author": "码跃少儿编程 CodeLeap",
    "/Subject": "课程体系、课时与价格、退费条款、报名流程与三校区地址",
    "/Keywords": "少儿编程, GESP, CSP-J, 合肥, 招生简章",
})
w.page_mode = "/UseOutlines"
out = sys.argv[2]
with open(out, "wb") as f:
    w.write(f)
print("pages", len(r.pages))
