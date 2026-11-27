import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/24693/Doubao/chats/2026-11-26/new-chat-1/codeleap-site';
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

const missingByFile = new Map();
let totalLinks = 0;
const allTargets = new Set();

for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  const links = [...src.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const l of links) {
    if (/^(https?:|mailto:|tel:|data:|#|javascript:)/.test(l)) continue;
    totalLinks++;
    const target = l.split('#')[0].split('?')[0];
    if (!target) continue;
    allTargets.add(target);
    if (!fs.existsSync(path.join(ROOT, target))) {
      if (!missingByFile.has(f)) missingByFile.set(f, []);
      missingByFile.get(f).push(l);
    }
  }
}

console.log(`html files: ${files.length}, local links checked: ${totalLinks}, unique targets: ${allTargets.size}`);
if (missingByFile.size === 0) console.log('no broken local links');
else for (const [f, list] of missingByFile) console.log(`  ${f}: ${[...new Set(list)].join(', ')}`);

// sitemap coverage
const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>https:\/\/codeleap\.example\/([^<]+)<\/loc>/g)].map(m => m[1]);
const inSitemap = new Set(locs);
const orphan = files.filter(f => !inSitemap.has(f));
const phantom = locs.filter(l => !fs.existsSync(path.join(ROOT, l)));
console.log(`sitemap urls: ${locs.length}`);
console.log(`  html not in sitemap: ${orphan.join(', ') || '(none)'}`);
console.log(`  sitemap url w/o file: ${phantom.join(', ') || '(none)'}`);
