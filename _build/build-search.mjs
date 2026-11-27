import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SPECIAL, OTHER } from './site-index.mjs';

const strip = (s) => s
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const meta = (html) => {
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  return strip(d);
};

const entries = [];

function eachPage(file, name, html, mode) {
  const desc = meta(html);
  const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, name])[1]);
  entries.push({ u: file, p: name, k: '总览', t: h1, id: '', x: desc.slice(0, 120) });

  const re = mode === 'sec'
    ? /<div class="sec-head"><span>([\s\S]*?)<\/span><h2>([\s\S]*?)<\/h2>/g
    : /<h2([^>]*)>([\s\S]*?)<\/h2>/g;
  const matches = [...html.matchAll(re)];

  matches.forEach((m, idx) => {
    const start = m.index + m[0].length;
    const next = idx + 1 < matches.length ? matches[idx + 1].index : html.length;
    const body = html.slice(start, Math.min(next, start + 1600));
    const idm = mode === 'sec' ? null : (m[1] || '').match(/id="([^"]+)"/);
    entries.push({
      u: file,
      p: name,
      k: mode === 'sec' ? strip(m[1]) : '章节',
      t: strip(m[2]),
      id: mode === 'sec' ? 's' + (idx + 1) : (idm ? idm[1] : 'ps' + (idx + 1)),
      x: strip(body).slice(0, 320),
    });
  });
}

for (const [file, name] of SPECIAL) {
  eachPage(file, name, fs.readFileSync(path.join(ROOT, file), 'utf8'), 'sec');
}
const idxHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
eachPage('index.html', '首页', idxHtml, 'h2');
for (const [file, name] of OTHER) {
  eachPage(file, name, fs.readFileSync(path.join(ROOT, file), 'utf8'), 'h2');
}

const js = 'window.__IDX=' + JSON.stringify(entries) + ';\n';
fs.writeFileSync(path.join(ROOT, 'search-index.js'), js, 'utf8');
console.log('search-index.js: ' + entries.length + ' entries, ' + (Buffer.byteLength(js) / 1024).toFixed(1) + ' KB');
