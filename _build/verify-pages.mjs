import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/24693/Doubao/chats/2026-11-26/new-chat-1/codeleap-site';
const FILES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['platform.html', 'curriculum-map.html', 'assessment.html', 'studio.html', 'hardware.html', 'operations.html'];

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const SKIP = new Set(['script', 'style', 'svg']);

for (const f of FILES) {
  const p = path.join(ROOT, f);
  const src = fs.readFileSync(p, 'utf8');
  const problems = [];

  if (!src.startsWith('<!DOCTYPE html>')) problems.push('missing doctype');
  if (!src.trimEnd().endsWith('</html>')) problems.push('not ending with </html>');
  if (/undefined|\$\{/.test(src)) problems.push('contains undefined/${');
  if (src.includes('\u200b')) problems.push('contains zero-width space');

  // strip comments, script, style, svg bodies
  let body = src.replace(/<!--[^>]*-->/g, '');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<svg[\s\S]*?<\/svg>/gi, '');

  const stack = [];
  const errs = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9-]*)[^>]*?(\/?)>/g;
  let m;
  while ((m = re.exec(body))) {
    const tag = m[1].toLowerCase();
    const closing = m[0].startsWith('</');
    if (VOID.has(tag) || m[2] === '/') continue;
    if (SKIP.has(tag)) continue;
    if (!closing) stack.push({ tag, at: m.index });
    else {
      const top = stack.pop();
      if (!top || top.tag !== tag) {
        errs.push(`</${tag}> at ${m.index} unmatched (open: ${top ? top.tag : 'none'}) :: ...${body.slice(Math.max(0, m.index - 120), m.index + 40).replace(/\s+/g, ' ')}...`);
      }
    }
  }
  if (stack.length) errs.push('unclosed: ' + stack.map(s => s.tag).join(','));
  if (errs.length) problems.push(...errs.slice(0, 6));

  // local links exist
  const links = [...src.matchAll(/href="([^"#?]+)(?:[^"]*)?"/g)].map(x => x[1]);
  const missing = [...new Set(links)].filter(l => !l.startsWith('http') && !l.startsWith('data:') && !fs.existsSync(path.join(ROOT, l)));

  const h2 = [...src.matchAll(/<h2>([^<]+)</g)].map(x => x[1]);
  const kb = (Buffer.byteLength(src) / 1024).toFixed(1);

  console.log(`${problems.length || missing.length ? 'BAD ' : 'OK  '} ${f}  ${kb}KB  h2=${h2.length}`);
  if (missing.length) console.log(`     missing href targets: ${missing.join(', ')}`);
  problems.forEach(x => console.log('     - ' + x));
}
