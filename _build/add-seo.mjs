import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const site = 'https://zhuchengquan.github.io/codeleap-site/';
const articles = [
  'blog-when-to-start.html', 'blog-gesp-1.html', 'blog-after-scratch.html',
  'blog-format-choice.html', 'blog-competition-path.html', 'blog-math.html',
  'blog-trial.html', 'blog-online.html', 'blog-quit.html',
];

function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : '';
}
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const items = [];
for (const f of articles) {
  const p = path.join(root, f);
  let html = fs.readFileSync(p, 'utf8');
  const title = dec(pick(html, /<title>([^<]*)<\/title>/)).replace(/ · 码跃少儿编程$/, '');
  const desc = dec(pick(html, /<meta name="description" content="([^"]*)">/));
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)">/);
  const date = pick(html, /<div class="meta-line"><span>(\d{4}-\d{2}-\d{2})<\/span>/);
  items.push({ f, title, desc, canonical, date });

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description: desc,
        inLanguage: 'zh-CN',
        datePublished: date,
        dateModified: date,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        author: { '@type': 'Organization', name: '码跃少儿编程 CodeLeap' },
        publisher: { '@type': 'Organization', name: '码跃少儿编程 CodeLeap' },
        articleSection: '知识库',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: site },
          { '@type': 'ListItem', position: 2, name: '知识库', item: site + 'blog.html' },
          { '@type': 'ListItem', position: 3, name: title, item: canonical },
        ],
      },
    ],
  };
  const block = '<!--ldjson-->\n<script type="application/ld+json">' + JSON.stringify(graph) + '</script>\n';
  html = html.replace(/<!--ldjson-->[\s\S]*?<\/script>\n?/g, '');
  html = html.replace('</head>', block + '</head>');
  fs.writeFileSync(p, html, 'utf8');
  console.log('ld+json', f);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const buildDate = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>码跃少儿编程 · 知识库</title>
<link>${site}blog.html</link>
<description>选课判断、考级准备与学习路径，写清代价和边界，不承诺结果。</description>
<language>zh-CN</language>
<lastBuildDate>${buildDate}</lastBuildDate>
<atom:link href="${site}feed.xml" rel="self" type="application/rss+xml"/>
${items.map((it) => `<item>
<title>${esc(it.title)}</title>
<link>${site}${it.f}</link>
<guid isPermaLink="true">${site}${it.f}</guid>
<pubDate>${new Date(it.date + 'T09:00:00+08:00').toUTCString()}</pubDate>
<description>${esc(it.desc)}</description>
</item>`).join('\n')}
</channel>
</rss>
`;
fs.writeFileSync(path.join(root, 'feed.xml'), feed, 'utf8');
console.log('feed.xml', items.length, 'items');
