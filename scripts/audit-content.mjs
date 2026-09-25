import fs from 'node:fs';
import {createLoader} from './lib/load-ts.mjs';
const load=createLoader();
const {locations}=load('data/locations.ts');
const {services}=load('data/services.ts');
const names=[...new Set(locations.flatMap(l=>[l.city,l.district].filter(Boolean)))].sort((a,b)=>b.length-a.length);
const normalize=text=>{
 let s=text.toLocaleLowerCase('tr');for(const name of names)s=s.replaceAll(name.toLocaleLowerCase('tr'),' yer ');
 return s.replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
};
const content=l=>[l.intro,l.description,...l.advice.flatMap(a=>[a.title,a.text]),...l.faq.flatMap(f=>[f.question,f.answer])].join(' ');
const trigrams=text=>{const words=normalize(text).split(' ');return new Set(words.slice(0,-2).map((_,i)=>words.slice(i,i+3).join(' ')));};
const prepared=locations.map(l=>({slug:l.slug,text:normalize(content(l)),tokens:trigrams(content(l)),words:content(l).split(/\s+/).length,indexReady:l.indexReady}));
const pairs=[];const exact=[];
for(let i=0;i<prepared.length;i++)for(let j=i+1;j<prepared.length;j++){
 const a=prepared[i],b=prepared[j];const intersection=[...a.tokens].filter(x=>b.tokens.has(x)).length;
 const score=intersection/(a.tokens.size+b.tokens.size-intersection);
 if(a.text===b.text)exact.push([a.slug,b.slug]);pairs.push({a:a.slug,b:b.slug,similarity:Number(score.toFixed(4))});
}
pairs.sort((a,b)=>b.similarity-a.similarity);
const result={checkedAt:new Date().toISOString(),locations:locations.length,comparedPairs:pairs.length,normalizedExactDuplicates:exact,highestTrigramOverlap:pairs.slice(0,12),editorialHold:locations.filter(l=>!l.indexReady).map(l=>l.slug),editorialConclusion:'Lexical difference is not proof of local value. Generic parking, access and tyre advice dominates most district pages. The 74 districts except Sapanca remain available but noindex until operationally grounded local content is reviewed.',serviceIntents:services.map(s=>({slug:s.slug,confirmed:s.confirmed,description:s.description})),wordCounts:prepared.map(({slug,words})=>({slug,words}))};
fs.writeFileSync('CONTENT-AUDIT.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({locations:result.locations,pairs:result.comparedPairs,exactDuplicates:exact.length,editorialHold:result.editorialHold.length,topOverlap:pairs.slice(0,3)},null,2));
if(exact.length)process.exit(1);

