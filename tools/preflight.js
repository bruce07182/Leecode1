#!/usr/bin/env node
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const pages=['index.html','python.html','leetcode.html'];
let errors=[];
const fail=m=>errors.push(m);
for(const page of pages){
  const html=fs.readFileSync(path.join(root,page),'utf8');
  for(const m of html.matchAll(/<(?:script|link)\b[^>]+?(?:src|href)=["']([^"'?#]+)["']/gi)){
    const ref=m[1];
    if(/^(?:https?:)?\/\//.test(ref)||ref.startsWith('#'))continue;
    if(!fs.existsSync(path.join(root,ref)))fail(`${page}: missing local asset ${ref}`);
  }
}
const assets=path.join(root,'assets');
for(const name of fs.readdirSync(assets).filter(x=>x.endsWith('.js'))){
  const file=path.join(assets,name),src=fs.readFileSync(file,'utf8');
  try{
    const stripped=name==='page-init.js'?src.replace(/^\s*import\s+[^;]+;?\s*$/gm,''):src;
    const parseSrc=name==='page-init.js'?`(async()=>{\n${stripped}\n})()`:stripped;
    new vm.Script(parseSrc,{filename:name});
  }catch(e){fail(`${name}: JavaScript syntax error: ${e.message}`)}
}
for(const page of pages){
 const html=fs.readFileSync(path.join(root,page),'utf8');
 if(!html.includes('assets/python-runtime.js'))fail(`${page}: missing shared Python runtime`);
}
for(const name of ['app.js','python-basics.js','leetcode-practice.js']){
 const src=fs.readFileSync(path.join(assets,name),'utf8');
 if(!src.includes('PythonRuntime.load('))fail(`${name}: bypasses shared Python runtime`);
 if(src.includes('loadPyodide('))fail(`${name}: owns a duplicate Pyodide loader`);
}
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(index.includes('dsa-data-init.js'))fail('index.html: obsolete dsa-data-init.js reference');
const app=fs.readFileSync(path.join(assets,'app.js'),'utf8');
if(!app.includes('.gte("problem_id",0).lte("problem_id",36)'))fail('app.js: Foundation cloud reads must stay scoped to IDs 0-36');
const dsa=fs.readFileSync(path.join(assets,'python-dsa.js'),'utf8');
if(!dsa.includes('window.DSATraining='))fail('python-dsa.js: missing explicit DSATraining namespace');
const lc=fs.readFileSync(path.join(assets,'leetcode-practice.js'),'utf8');
const lcHtml=fs.readFileSync(path.join(root,'leetcode.html'),'utf8');
const fixedLcIds=new Set([...lcHtml.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
for(const m of lc.matchAll(/\$\(['"]([A-Za-z][\w-]*)['"]\)/g)){
  const id=m[1];
  if(!fixedLcIds.has(id)&&!['lcTime','lcSpace','lcCheck','lcComplexResult'].includes(id))fail(`leetcode-practice.js: references missing fixed DOM id #${id}`);
}

if(!lcHtml.includes('id="lcPattern"')||!lcHtml.includes('id="lcOANext"')||!lcHtml.includes('id="lcOAEnd"'))fail('leetcode.html: pattern/OA controls missing');
if(!lc.includes('function nextOA()')||!lc.includes('function endOA(')||!lc.includes('setInterval(updateOA,1000)'))fail('leetcode-practice.js: OA session workflow incomplete');
if(!lc.includes('const masterKey=')||!lc.includes('reviewKey=p=>'))fail('leetcode-practice.js: mastery/review storage key contract missing');
if(!lc.includes('const cloudId=p=>100000+p.id'))fail('leetcode-practice.js: LeetCode cloud namespace changed');
if(!/P\(1,/.test(lc)||!/P\(125,/.test(lc)||!/P\(217,/.test(lc))fail('leetcode-practice.js: core official LeetCode IDs changed');
const catalogIds=[...lc.matchAll(/P\((\d+),/g)].map(m=>Number(m[1]));if(catalogIds.length<20)fail('leetcode-practice.js: curated catalog unexpectedly shrank below 20 problems');if(new Set(catalogIds).size!==catalogIds.length)fail('leetcode-practice.js: duplicate LeetCode IDs');
if(errors.length){console.error('PRE-FLIGHT FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log('Preflight OK: local assets, JS syntax, startup contract, and persistence namespaces.');
