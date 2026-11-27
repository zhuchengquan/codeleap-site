import fs from 'node:fs';
import path from 'node:path';
import * as p1 from './p1-platform.mjs';
import * as p2 from './p2-curriculum.mjs';
import * as p3 from './p3-assessment.mjs';
import * as p4 from './p4-studio.mjs';
import * as p5 from './p5-hardware.mjs';
import * as p6 from './p6-operations.mjs';
import * as p7 from './p7-teaching.mjs';
import * as p8 from './p8-admissions.mjs';
import * as p9 from './p9-family.mjs';
import * as p10 from './p10-stage-finder.mjs';
import * as p11 from './p11-plan.mjs';
import { buildIndex } from './site-index.mjs';

const OUT = 'C:/Users/24693/Doubao/chats/2026-11-26/new-chat-1/codeleap-site';

const pages = [
  ['platform.html', p1.html],
  ['curriculum-map.html', p2.html],
  ['assessment.html', p3.html],
  ['studio.html', p4.html],
  ['hardware.html', p5.html],
  ['operations.html', p6.html],
  ['teaching.html', p7.html],
  ['admissions.html', p8.html],
  ['family.html', p9.html],
  ['stage-finder.html', p10.html],
  ['plan-calculator.html', p11.html],
];

const index = buildIndex({ specialHtml: Object.fromEntries(pages) });

const BTN = `<button class="icon-btn" id="searchBtn" type="button" aria-label="搜索站内内容" title="搜索（Ctrl+K）"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.3"/><path d="M15.2 15.2l4.6 4.6"/></svg></button>
  `;

const SCRIPT = `<script>
(function () {
  var idx = window.__IDX || [];
  var sbox = document.getElementById('sbox');
  var sInput = document.getElementById('sInput');
  var sRes = document.getElementById('sRes');
  var sBtn = document.getElementById('searchBtn');
  var lastFocus = null;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function openSearch() {
    lastFocus = document.activeElement;
    sbox.classList.add('on');
    setTimeout(function () { sInput.focus(); sInput.select(); }, 30);
  }
  function closeSearch() {
    sbox.classList.remove('on');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function hrefOf(it) { return it.u + (it.id ? '#' + it.id : ''); }
  function render() {
    var q = sInput.value.trim().toLowerCase();
    var list = q
      ? idx.filter(function (it) { return (it.t + ' ' + it.k + ' ' + it.p + ' ' + (it.x || '')).toLowerCase().indexOf(q) > -1; })
      : idx.slice(0, 8);
    list = list.slice(0, 10);
    if (!list.length) {
      sRes.innerHTML = '<div class="empty">没有匹配的章节，换个词试试，比如「排课」「报告」「投诉」</div>';
      return;
    }
    sRes.innerHTML = list.map(function (it, i) {
      return '<a class="item' + (i === 0 ? ' on' : '') + '" href="' + hrefOf(it) + '"><b>' + esc(it.t) + '</b><span>' + esc(it.p) + ' · ' + esc(it.k) + '</span></a>';
    }).join('');
    sRes.querySelectorAll('.item').forEach(function (a) {
      a.addEventListener('click', function () { sbox.classList.remove('on'); });
    });
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

  // 本页目录：按 sec-head 顺序编号，与索引一致
  var heads = [].slice.call(document.querySelectorAll('.wrap .sec .sec-head h2'));
  var toc = document.getElementById('toc');
  var dock = document.getElementById('tdock');
  var fab = document.getElementById('tocFab');
  var html = '<b>本页目录</b>';
  heads.forEach(function (h, i) { h.id = 's' + (i + 1); html += '<a href="#s' + (i + 1) + '">' + esc(h.textContent) + '</a>'; });
  if (heads.length) {
    if (toc) toc.innerHTML = html;
    if (dock) dock.innerHTML = html;
  }
  if (fab) fab.addEventListener('click', function () { dock.classList.toggle('on'); });
  if (dock) dock.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') dock.classList.remove('on');
  });
  var links = (toc ? toc.querySelectorAll('a') : []);
  var dlinks = (dock ? dock.querySelectorAll('a') : []);
  function spy() {
    var y = window.scrollY + 130, cur = -1;
    heads.forEach(function (h, i) { if (h.getBoundingClientRect().top + window.scrollY <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
    dlinks.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();
})();
</script>`;

const TAIL = `
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
<button class="icon-btn tocFab" id="tocFab" type="button" aria-label="打开本页目录"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button>
<div class="tdock" id="tdock" aria-label="本页目录"></div>
<aside class="toc" id="toc" aria-label="本页目录"></aside>
<script src="search-index.js"></script>
${SCRIPT}
`;

let fail = 0;
for (const [file, html] of pages) {
  if (!html.includes('<button class="icon-btn" id="themeBtn"')) { console.error('missing themeBtn in ' + file); fail += 1; continue; }
  if (!html.includes('</body>')) { console.error('missing </body> in ' + file); fail += 1; continue; }
  let out = html.replace('<button class="icon-btn" id="themeBtn"', BTN + '<button class="icon-btn" id="themeBtn"');
  out = out.replace('</body>', TAIL + '</body>');
  fs.writeFileSync(path.join(OUT, file), out, 'utf8');
  console.log(`${file} ${(Buffer.byteLength(out) / 1024).toFixed(1)} KB`);
}
console.log(`index entries: ${index.length}` + (fail ? `  FAIL ${fail}` : ''));
