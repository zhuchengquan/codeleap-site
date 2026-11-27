import fs from 'node:fs';
import path from 'node:path';
import { ROOT, OTHER } from './site-index.mjs';

const MODE = process.argv[2] || '--ids';

const BTN = `<button class="icon-btn" id="searchBtn" type="button" aria-label="搜索站内内容" title="搜索（Ctrl+K）">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.3"/><path d="M15.2 15.2l4.6 4.6"/></svg>
  </button>
  `;

const CSS = `/* cl-ss:css */
.sbox{position:fixed;inset:0;z-index:80;display:none;align-items:flex-start;justify-content:center;padding:84px 18px 20px;background:rgba(9,19,38,.40);-webkit-backdrop-filter:blur(9px);backdrop-filter:blur(9px)}
.sbox.on{display:flex}
.sbox .panel{width:100%;max-width:600px;border-radius:20px;background:#fff;border:1px solid var(--stroke-2,rgba(20,50,110,.12));box-shadow:0 26px 64px rgba(12,26,52,.30);overflow:hidden}
[data-theme="dark"] .sbox .panel{background:#111c2e;border-color:rgba(255,255,255,.14)}
.sbox .inp{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid var(--stroke-2,rgba(20,50,110,.12))}
.sbox .inp svg{width:17px;height:17px;color:var(--faint,#8695ab);flex:none}
.sbox .inp input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ink,#16213a);font-family:inherit;font-size:15px}
.sbox .inp kbd{font-family:"JetBrains Mono",monospace;font-size:10.5px;padding:2px 6px;border-radius:6px;border:1px solid var(--stroke-2,rgba(20,50,110,.12));color:var(--faint,#8695ab);flex:none}
.sbox .res{max-height:54vh;overflow:auto;padding:8px}
.sbox .item{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:10px 12px;border-radius:10px}
.sbox .item:hover,.sbox .item.on{background:var(--primary-soft,rgba(43,123,243,.12))}
.sbox .item b{font-size:13.5px;font-weight:600;line-height:1.5}
.sbox .item span{font-size:11.5px;color:var(--faint,#8695ab);white-space:nowrap}
.sbox .empty{padding:24px 14px;font-size:13px;color:var(--faint,#8695ab);text-align:center}
/* /cl-ss:css */`;

const TAIL = `<!-- cl-ss:tail -->
<div class="sbox" id="sbox" role="dialog" aria-modal="true" aria-label="站内搜索">
  <div class="panel">
    <div class="inp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.3"/><path d="M15.2 15.2l4.6 4.6"/></svg>
      <input id="sInput" type="text" placeholder="搜索专题与章节，如「排课」「测评报告」「投诉」" autocomplete="off" aria-label="搜索关键词">
      <kbd>Esc</kbd>
    </div>
    <div class="res" id="sRes"></div>
  </div>
</div>
<script src="search-index.js"></script>
<script>
(function () {
  var idx = window.__IDX || [];
  var sbox = document.getElementById('sbox');
  var sInput = document.getElementById('sInput');
  var sRes = document.getElementById('sRes');
  var sBtn = document.getElementById('searchBtn');
  var lastFocus = null;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function openSearch() { lastFocus = document.activeElement; sbox.classList.add('on'); setTimeout(function () { sInput.focus(); if (sInput.value) sInput.select(); }, 30); }
  function closeSearch() { sbox.classList.remove('on'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function render() {
    var q = sInput.value.trim().toLowerCase();
    var list = q ? idx.filter(function (it) { return (it.t + ' ' + it.k + ' ' + it.p + ' ' + (it.x || '')).toLowerCase().indexOf(q) > -1; }) : idx.slice(0, 8);
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
<!-- /cl-ss:tail -->`;

const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

if (MODE === '--ids') {
  for (const [file] of OTHER) {
    const p = path.join(ROOT, file);
    let t = fs.readFileSync(p, 'utf8');
    let n = 0;
    let changed = 0;
    t = t.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (all, attrs, inner) => {
      n += 1;
      if (/id="[^"]+"/.test(attrs)) return all;
      changed += 1;
      return '<h2' + attrs + ' id="ps' + n + '">' + inner + '</h2>';
    });
    fs.writeFileSync(p, t, 'utf8');
    console.log(`${file}: h2=${n}, ids added=${changed}`);
  }
} else if (MODE === '--ui') {
  for (const [file] of OTHER) {
    const p = path.join(ROOT, file);
    let t = fs.readFileSync(p, 'utf8');

    t = t.replace(/\/\* cl-ss:css \*\/[\s\S]*?\/\* \/cl-ss:css \*\//, '');
    t = t.replace(/<!-- cl-ss:tail -->[\s\S]*?<!-- \/cl-ss:tail -->/, '');
    t = t.replace(/\n\s*<button class="icon-btn" id="searchBtn"[\s\S]*?<\/button>/, '');

    if (!t.includes('<button class="icon-btn" id="themeBtn"')) {
      console.log(`${file}: no themeBtn, skip UI`);
      continue;
    }
    if (!t.includes('/* cl-ss:css */')) {
      if (!t.includes('</style>')) { console.log(`${file}: no </style>, skip`); continue; }
      t = t.replace('</style>', CSS + '\n</style>');
    }
    t = t.replace('<button class="icon-btn" id="themeBtn"', BTN + '<button class="icon-btn" id="themeBtn"');
    t = t.replace('</body>', TAIL + '\n</body>');
    fs.writeFileSync(p, t, 'utf8');
    console.log(`${file}: search UI injected (${(Buffer.byteLength(t) / 1024).toFixed(1)} KB)`);
  }
  console.log('search UI done (index served by search-index.js)');
} else {
  console.log('usage: node patch-all.mjs --ids | --ui');
}
