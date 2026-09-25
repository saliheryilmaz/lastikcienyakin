import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import ts from 'typescript';
const nativeRequire=createRequire(import.meta.url);
// Executes trusted local project TypeScript for isolated tests, never remote content.
export function createLoader({env={},globals={},modules={},transformSource=(_file,source)=>source}={}){
 const cache=new Map();
 function load(file){
  const full=path.resolve(file);if(cache.has(full))return cache.get(full).exports;
  const localModule={exports:{}};cache.set(full,localModule);
  const source=ts.transpileModule(transformSource(full,fs.readFileSync(full,'utf8')),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const localRequire=id=>{
   if(Object.hasOwn(modules,id))return modules[id];
   if(!id.startsWith('.')&&!id.startsWith('@/'))return nativeRequire(id);
   const base=id.startsWith('@/')?path.resolve(id.slice(2)):path.resolve(path.dirname(full),id);
   const resolved=[base,base+'.ts',base+'.tsx'].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
   if(!resolved)throw Error(`Cannot resolve ${id} from ${full}`);return load(resolved);
  };
  new vm.Script(source,{filename:full}).runInContext(vm.createContext({module:localModule,exports:localModule.exports,require:localRequire,process:{env},URL,URLSearchParams,console,...globals}));
  return localModule.exports;
 }
 return load;
}
