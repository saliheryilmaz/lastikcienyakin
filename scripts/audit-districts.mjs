import fs from 'node:fs';
import assert from 'node:assert/strict';
const districts = {
 istanbul:'adalar arnavutkoy atasehir avcilar bagcilar bahcelievler bakirkoy basaksehir bayrampasa besiktas beykoz beylikduzu beyoglu buyukcekmece catalca cekmekoy esenler esenyurt eyupsultan fatih gaziosmanpasa gungoren kadikoy kagithane kartal kucukcekmece maltepe pendik sancaktepe sariyer silivri sultanbeyli sultangazi sile sisli tuzla umraniye uskudar zeytinburnu'.split(' '),
 sakarya:'adapazari akyazi arifiye erenler ferizli geyve hendek karapurcek karasu kaynarca kocaali pamukova sapanca serdivan sogutlu tarakli'.split(' '),
 kocaeli:'basiskele cayirova darica derince dilovasi gebze golcuk izmit kandira karamursel kartepe korfez'.split(' '),
 duzce:'merkez akcakoca cilimli cumayeri golyaka gumusova kaynasli yigilca'.split(' '),
};
const root = process.env.AUDIT_ROOT || '.next/server/app';
const read = route => fs.readFileSync(`${root}/${route}.html`, 'utf8');
const introductions = new Set();
const checks=[];
for (const [city, slugs] of Object.entries(districts)) {
 const hub = read(city);
 const links = [...hub.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual([...new Set(links.filter(h=>h.startsWith(`/${city}/`)))].sort(), slugs.map(s=>`/${city}/${s}`).sort(), `${city}: district directory`);
 for (const slug of slugs) {
  const route=`${city}/${slug}`;
  const html=read(route);
  assert(html.includes(`href="/${city}"`), `${route}: parent link`);
  assert(html.includes('İstanbul, Sakarya, Kocaeli ve Düzce’de ekiplerimiz bulunur.'), `${route}: four province teams`);
  assert(!html.includes('Örnek ilçe içeriği'), `${route}: confirmed coverage`);
  const intro=html.match(/<p class="intro">(.*?)<\/p>/s)?.[1];
  assert(intro&&!introductions.has(intro), `${route}: unique introduction`);
  introductions.add(intro);
  const phones=[...html.matchAll(/href="tel:([^"]+)"/g)].map(m=>m[1]);
  const whatsapps=[...html.matchAll(/href="https:\/\/wa\.me\/([^"?]+)/g)].map(m=>m[1]);
  assert(phones.length>0&&phones.every(n=>n==='+905382916051'), `${route}: phone`);
  assert(whatsapps.length>0&&whatsapps.every(n=>n==='905382916051'), `${route}: WhatsApp`);
  const related=html.match(/<h2>İlgili ilçe sayfaları<\/h2>(.*?)<\/section>/s)?.[1]||'';
  const relatedLinks=[...related.matchAll(/href="\/([^"]+)"/g)].map(m=>m[1]);
  assert(relatedLinks.length>=2, `${route}: related district links`);
  assert(relatedLinks.every(h=>h!==route&&fs.existsSync(`${root}/${h}.html`)), `${route}: valid related routes`);
  checks.push(route);
 }
}
assert.equal(checks.length,75);
assert(read('duzce/merkez').includes('<h1>Düzce Merkez mobil lastikçi</h1>'));
assert(read('istanbul').includes('Anadolu Yakası')&&read('istanbul').includes('Avrupa Yakası'));
const report={checkedAt:new Date().toISOString(),counts:Object.fromEntries(Object.entries(districts).map(([city,list])=>[city,list.length])),total:checks.length,errors:[],routes:checks};
fs.writeFileSync('DISTRICT-AUDIT.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({counts:report.counts,total:report.total,errors:report.errors},null,2));
