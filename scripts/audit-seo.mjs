import fs from 'node:fs';
import path from 'node:path';
const root=process.env.AUDIT_ROOT||'.next/server/app';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const match=(html,re)=>html.match(re)?.[1]||'';
const files=walk(root).filter(f=>f.endsWith('.html')&&!f.includes('_not-found')&&!f.includes('_global-error')&&!f.endsWith('404.html'));
const errors=[],warnings=[],titles=new Set(),descriptions=new Set(),checks=[],graph=new Map(),htmlByRoute=new Map();
for(const file of files){const route='/'+path.relative(root,file).replaceAll('\\','/').replace(/index\.html$/,'').replace(/\.html$/,'');htmlByRoute.set(route,fs.readFileSync(file,'utf8'));}
for(const [route,html] of htmlByRoute){
 const title=match(html,/<title>(.*?)<\/title>/s),description=match(html,/<meta name="description" content="([^"]*)"/),canonical=match(html,/<link rel="canonical" href="([^"]*)"/),robots=match(html,/<meta name="robots" content="([^"]*)"/);
 const h1=(html.match(/<h1(?:\s|>)/g)||[]).length;
 if(h1!==1)errors.push(`${route}: ${h1} H1`);
 for(const [key,value] of Object.entries({title,description,canonical,robots}))if(!value)errors.push(`${route}: missing ${key}`);
 if(titles.has(title))errors.push(`${route}: duplicate title`);titles.add(title);
 if(descriptions.has(description))errors.push(`${route}: duplicate description`);descriptions.add(description);
 const expected='https://lastikcienyakin.com'+(route==='/'?'':route);
 if(canonical!==expected)errors.push(`${route}: canonical ${canonical}`);
 for(const property of ['og:title','og:description','og:url','og:image'])if(!html.includes(`property="${property}"`))errors.push(`${route}: missing ${property}`);
 if(!html.includes('name="twitter:card"'))errors.push(`${route}: Twitter metadata`);
 if(!html.includes('lang="tr"'))errors.push(`${route}: document language`);
 if(description.length<110||description.length>175)warnings.push(`${route}: description length ${description.length}`);
 const schemas=[];
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){
  try{const schema=JSON.parse(m[1]);if(schema['@context']!=='https://schema.org')errors.push(`${route}: schema context`);schemas.push(...(schema['@graph']||[schema]));}catch{errors.push(`${route}: invalid JSON-LD`);}
 }
 if(!schemas.some(s=>s['@type']==='Organization'||s['@type']==='TireShop')||!schemas.some(s=>s['@type']==='WebSite'))errors.push(`${route}: business/website schema absent`);
 const breadcrumb=schemas.find(s=>s['@type']==='BreadcrumbList');
 if(route!=='/'&&!breadcrumb)errors.push(`${route}: missing breadcrumb schema`);
 if(breadcrumb){const items=breadcrumb.itemListElement;if(!items.length||items.some((item,i)=>item.position!==i+1||!item.name||!item.item.startsWith('https://lastikcienyakin.com/'))||items.at(-1).item!==expected)errors.push(`${route}: invalid breadcrumb sequence or URL`);}
 for(const schema of schemas){if(schema['@type']==='Organization'&&(schema.address||schema.openingHours))errors.push(`${route}: unverified local-business fields`);if(schema['@type']==='Service'&&schema.provider?.['@id']!=='https://lastikcienyakin.com/#business')errors.push(`${route}: service provider ID`);}
 if(/AggregateRating|"review"|"ratingValue"/.test(html))errors.push(`${route}: unverified rating`);
 for(const m of html.matchAll(/<img\b[^>]*>/g)){if(!/alt="[^"]*"/.test(m[0]))errors.push(`${route}: missing alt`);if(!(/width="\d+"/.test(m[0])&&/height="\d+"/.test(m[0]))&&!m[0].includes('position:absolute'))errors.push(`${route}: image dimensions`);}
 const links=new Set();
 for(const m of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)){
  const href=m[1].replaceAll('&amp;','&');
  if(href.startsWith('tel:')&&href!=='tel:+905382916051')errors.push(`${route}: wrong phone`);
  if(href.startsWith('https://wa.me/')&&!href.startsWith('https://wa.me/905382916051?'))errors.push(`${route}: wrong WhatsApp`);
  if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const url=new URL(href,'https://lastikcienyakin.com'+route),destination=url.pathname;
  if(htmlByRoute.has(destination)){
   links.add(destination);
   if(url.hash&&!htmlByRoute.get(destination).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))errors.push(`${route}: missing fragment ${href}`);
  }else if(!fs.existsSync(path.join('public',destination))&&destination!=='/icon.svg'&&!destination.startsWith('/_next/'))errors.push(`${route}: broken ${href}`);
 }
 graph.set(route,links);checks.push({route,title,descriptionLength:description.length,h1,canonical,robots,schemaTypes:schemas.map(s=>s['@type'])});
}
const visited=new Set();function visit(route){if(visited.has(route))return;visited.add(route);for(const child of graph.get(route)||[])visit(child);}visit('/');
const orphans=[...htmlByRoute.keys()].filter(route=>!visited.has(route));orphans.forEach(route=>errors.push(`${route}: orphan page`));
const readGenerated=name=>{const file=[path.join(root,name),path.join(root,name+'.body')].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());return file?fs.readFileSync(file,'utf8'):'';};
const sitemap=readGenerated('sitemap.xml'),robotsTxt=readGenerated('robots.txt');
if(!robotsTxt.includes('Allow: /')||/^Disallow:\s*\/$/m.test(robotsTxt))errors.push('robots prevents crawling or missing');
const preview=checks.every(p=>p.robots.includes('noindex'));
const sitemapUrls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
if(!sitemap.includes('<urlset'))errors.push('sitemap missing or invalid container');
const indexable=checks.filter(p=>!p.robots.includes('noindex')).map(p=>p.canonical);
if(JSON.stringify([...sitemapUrls].sort())!==JSON.stringify([...indexable].sort()))errors.push('sitemap and indexable pages differ');
const result={checkedAt:new Date().toISOString(),root,mode:preview?'noindex-preview':'production',pages:checks.length,errors:[...new Set(errors)],warnings,orphanPages:orphans,sitemapUrls,checks};
fs.writeFileSync('SEO-AUDIT.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({pages:checks.length,mode:result.mode,errors:result.errors,warnings,orphanPages:orphans.length},null,2));if(errors.length)process.exit(1);
