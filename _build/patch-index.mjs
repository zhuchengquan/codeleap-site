import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/24693/Doubao/chats/2026-11-26/new-chat-1/codeleap-site';
const PAGES = [
  ['platform.html', '平台与课堂'],
  ['curriculum-map.html', '课程 × 考级'],
  ['assessment.html', '测评体系'],
  ['studio.html', '作品与创作'],
  ['hardware.html', '教具与硬件'],
  ['operations.html', '校区运营'],
  ['teaching.html', '备课与授课'],
  ['admissions.html', '招生与学员'],
  ['family.html', '家校沟通'],
];

const strip = (s) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ')
  .trim();

const index = [];
for (const [file, name] of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, name])[1]);
  index.push({ u: file, p: name, k: '总览', t: h1, id: '' });
  const re = /<div class="sec-head"><span>([\s\S]*?)<\/span><h2>([\s\S]*?)<\/h2>/g;
  let m, i = 0;
  while ((m = re.exec(html))) {
    i += 1;
    index.push({ u: file, p: name, k: strip(m[1]), t: strip(m[2]), id: 's' + i });
  }
}

let doc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 幂等：先移除上一次注入的块
doc = doc.replace(/\/\* cl-search:css \*\/[\s\S]*?\/\* \/cl-search:css \*\//, '');
doc = doc.replace(/<!-- cl-search:tail -->[\s\S]*?<!-- \/cl-search:tail -->/, '');
doc = doc.replace(/\n\s*<button class="icon-btn" id="clSearchBtn"[\s\S]*?<\/button>/, '');

// 首页章节：补 id 并收集索引
let hi = 0;
doc = doc.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (all, attrs, inner) => {
  hi += 1;
  const hit = attrs.match(/id="([^"]+)"/);
  const id = hit ? hit[1] : 'h' + hi;
  const out = '<h2' + (hit ? attrs : attrs + ' id="' + id + '"') + '>' + inner + '</h2>';
  index.push({ u: 'index.html', p: '首页', k: '章节', t: strip(inner), id });
  return out;
});

const CSS = `/* cl-search:css */
#clSearchBtn{flex:none}
.brand{flex:none;white-space:nowrap}
.nav-links{flex-wrap:nowrap;min-width:0;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.nav-links::-webkit-scrollbar{display:none}
.nav-links a{white-space:nowrap;flex:none}
@media (min-width:1180px){
  .nav-inner{gap:16px}
  .nav-links a{padding:7px 9px;font-size:13.5px}
  .brand{font-size:21px}
}
@media (min-width:861px) and (max-width:1179px){
  .nav-links a[href="#news"], .nav-links a[href="#results"]{display:none}
  .nav-inner{gap:14px}
  .nav-links a{padding:7px 8px;font-size:13px}
}
.nav-actions{flex:none}
.nav-actions .btn{white-space:nowrap;flex:none}
.cl-sbox{position:fixed;inset:0;z-index:120;display:none;align-items:flex-start;justify-content:center;padding:88px 18px 20px;background:rgba(8,18,36,.40);-webkit-backdrop-filter:blur(9px);backdrop-filter:blur(9px)}
.cl-sbox.on{display:flex}
.cl-sbox .panel{width:100%;max-width:600px;border-radius:20px;background:rgba(255,255,255,.96);border:1px solid var(--stroke-2);box-shadow:0 28px 68px rgba(12,26,52,.32);overflow:hidden}
[data-theme="dark"] .cl-sbox .panel{background:rgba(14,22,36,.96);border-color:rgba(255,255,255,.14)}
.cl-sbox .inp{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid var(--stroke-2)}
.cl-sbox .inp svg{width:17px;height:17px;color:var(--faint);flex:none}
.cl-sbox .inp input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ink);font-family:inherit;font-size:15px}
.cl-sbox .inp kbd{font-family:"JetBrains Mono",monospace;font-size:10.5px;padding:2px 6px;border-radius:6px;border:1px solid var(--stroke-2);color:var(--faint);flex:none}
.cl-sbox .res{max-height:56vh;overflow:auto;padding:8px}
.cl-sbox .item{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:10px 12px;border-radius:10px}
.cl-sbox .item:hover,.cl-sbox .item.on{background:var(--primary-soft)}
.cl-sbox .item b{font-size:13.5px;font-weight:600;line-height:1.5}
.cl-sbox .item span{font-size:11.5px;color:var(--faint);white-space:nowrap}
.cl-sbox .empty{padding:24px 14px;font-size:13px;color:var(--faint);text-align:center}
/* /cl-search:css */`;

const BTN = `<button class="icon-btn" id="clSearchBtn" type="button" aria-label="搜索站内内容" title="搜索（Ctrl+K）">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.3"/><path d="M15.2 15.2l4.6 4.6"/></svg>
      </button>
      `;

const SCRIPT = `<!-- cl-search:tail -->
<div class="cl-sbox" id="clSbox" role="dialog" aria-modal="true" aria-label="站内搜索">
  <div class="panel">
    <div class="inp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.3"/><path d="M15.2 15.2l4.6 4.6"/></svg>
      <input id="clSInput" type="text" placeholder="搜索专题与章节，如「排课」「测评报告」「投诉」" autocomplete="off" aria-label="搜索关键词">
      <kbd>Esc</kbd>
    </div>
    <div class="res" id="clSRes"></div>
  </div>
</div>
<script>window.__IDX=${JSON.stringify(index)};</script>
<script>
(function () {
  var idx = window.__IDX || [];
  var sbox = document.getElementById('clSbox');
  var sInput = document.getElementById('clSInput');
  var sRes = document.getElementById('clSRes');
  var sBtn = document.getElementById('clSearchBtn');
  var lastFocus = null;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function openSearch() {
    lastFocus = document.activeElement;
    sbox.classList.add('on');
    setTimeout(function () { sInput.focus(); sInput.select(); }, 30);
  }
  function closeSearch() { sbox.classList.remove('on'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function render() {
    var q = sInput.value.trim().toLowerCase();
    var list = q ? idx.filter(function (it) { return (it.t + ' ' + it.k + ' ' + it.p).toLowerCase().indexOf(q) > -1; }) : idx.slice(0, 8);
    list = list.slice(0, 10);
    if (!list.length) { sRes.innerHTML = '<div class="empty">没有匹配的章节，换个词试试</div>'; return; }
    sRes.innerHTML = list.map(function (it, i) {
      var h = it.u + (it.id ? '#' + it.id : '');
      return '<a class="item' + (i === 0 ? ' on' : '') + '" href="' + h + '"><b>' + esc(it.t) + '</b><span>' + esc(it.p) + ' · ' + esc(it.k) + '</span></a>';
    }).join('');
    sRes.querySelectorAll('.item').forEach(function (a) { a.addEventListener('click', function () { sbox.classList.remove('on'); }); });
  }
  if (sBtn) sBtn.addEventListener('click', openSearch);
  if (sInput) sInput.addEventListener('input', render);
  if (sbox) sbox.addEventListener('click', function (e) { if (e.target === sbox) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sbox.classList.contains('on')) closeSearch();
    var tag = (document.activeElement || {}).tagName;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); openSearch(); }
  });
})();
</script>
<!-- /cl-search:tail -->`;

if (!doc.includes('id="clSearchBtn"')) {
  doc = doc.replace('<div class="nav-actions">', '<div class="nav-actions">\n      ' + BTN);
}
doc = doc.replace('</style>', CSS + '\n</style>');
doc = doc.replace('</body>', SCRIPT + '\n</body>');

fs.writeFileSync(path.join(ROOT, 'index.html'), doc, 'utf8');
console.log('index.html patched, index entries: ' + index.length + ', size: ' + (Buffer.byteLength(doc) / 1024).toFixed(1) + ' KB');
