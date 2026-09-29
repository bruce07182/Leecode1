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
for(const page of pages){const html=fs.readFileSync(path.join(root,page),'utf8');if(!html.includes('assets/dsa-concepts.js'))fail(`${page}: missing shared DSA concepts`)}
const conceptSrc=fs.readFileSync(path.join(assets,'dsa-concepts.js'),'utf8');
for(const name of ['Array, String & Linked List','Set & Map','Stack & Queue','Tree, Graph & Heap'])if(!conceptSrc.includes("'"+name+"'"))fail(`dsa-concepts.js: missing canonical group ${name}`);
const mapSrc=fs.readFileSync(path.join(assets,'dsa-map-v6.js'),'utf8');
if(!mapSrc.includes('window.DSAConcepts?.get(name)'))fail('dsa-map-v6.js: must consume shared DSA concepts');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(index.includes('dsa-data-init.js'))fail('index.html: obsolete dsa-data-init.js reference');
const app=fs.readFileSync(path.join(assets,'app.js'),'utf8');
if(!app.includes('function exerciseId(i)')||!app.includes('"B":"C"'))fail('app.js: canonical B/C identity contract missing');
const foundationTitles=[...app.matchAll(/title:"([^"]+)"/g)].map(m=>m[1]);
if(foundationTitles.length<26)fail('app.js: Foundation curriculum unexpectedly shrank below 26 problems');
const originalFoundationTitles=['1. Count positives','2. Build a list','3. Find maximum','4. Reverse string','5. Two pointer movement','6. Frequency map','7. Contains duplicate','8. Stack basics','9. Sorting basics','10. Slide a fixed window','11. Prefix sums','12. Binary search boundaries','13. Queue basics','14. Graph neighbors','15. Linked list traversal','16. Recursion basics','17. Tree preorder','18. Heap basics','19. 1-D DP basics','20. Palindrome','21. Two Sum','22. First unique char','23. Valid parentheses','24. Min stack','25. Merge intervals','26. Greedy activity selection','27. Binary search','28. Lower bound','29. Graph BFS','30. Tree max depth','31. Tree level order','32. K largest','33. Backtracking subsets','34. Climbing stairs','35. Coin change','36. 2-D DP grid paths','37. Fibonacci memo'];
for(let i=0;i<originalFoundationTitles.length;i++)if(foundationTitles[i]!==originalFoundationTitles[i])fail(`app.js: saved Foundation ID ${i} shifted from ${originalFoundationTitles[i]} to ${foundationTitles[i]||'missing'}`);
if(!foundationTitles.includes('25. String membership')||!foundationTitles.includes('26. Map lookup & store'))fail('app.js: atomic membership/map prerequisites missing');
if(!app.includes("function displayTitle(i)"))fail('app.js: Basic/Combination display numbering missing');
if(!app.includes("?'B':'C'"))fail('app.js: Basic/Combination display prefixes missing');
if(!app.includes('title:"21. Two Sum",category:"Advanced Hash Map",difficulty:"Medium",deps:[5,38]'))fail('app.js: Two Sum must depend on map lookup/store basic');
if(!app.includes('title:"23. Valid parentheses",category:"Stack",difficulty:"Easy",deps:[7,37,38]'))fail('app.js: Valid parentheses must depend on stack + membership + map lookup basics');
if(!fs.existsSync(path.join(root,'supabase','migrate_problem_ids_to_canonical.sql')))fail('canonical migration SQL missing');
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
if(!lc.includes('id:`LC${lc}`')||!lc.includes('legacyCloudId=p=>100000+p.lc'))fail('leetcode-practice.js: canonical LC identity or legacy migration bridge missing');
if(!/P\(1,/.test(lc)||!/P\(125,/.test(lc)||!/P\(217,/.test(lc))fail('leetcode-practice.js: core official LeetCode IDs changed');
const catalogIds=[...lc.matchAll(/P\((\d+),/g)].map(m=>Number(m[1]));if(catalogIds.length<20)fail('leetcode-practice.js: curated catalog unexpectedly shrank below 20 problems');if(new Set(catalogIds).size!==catalogIds.length)fail('leetcode-practice.js: duplicate LeetCode IDs');if(!lc.includes("typeof data[0].problem_id==='string'"))fail('leetcode-practice.js: canonical DB migration detection missing');
const coverageMatch=lc.match(/const foundationBasicCoverage=Object\.freeze\(\{([\s\S]*?)\}\);/);
if(!coverageMatch)fail('leetcode-practice.js: missing Foundation Basic coverage map');
else for(const id of catalogIds)if(!new RegExp('(?:^|[,\\s])'+id+':\\[').test(coverageMatch[1]))fail(`leetcode-practice.js: LC${id} has no Foundation Basic coverage`);
for(const id of [37,38,39,40,41,42,43,44,45])if(!foundationTitles[id])fail(`app.js: extension Basic ID ${id} missing`);

if(errors.length){console.error('PRE-FLIGHT FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log('Preflight OK: local assets, JS syntax, startup contract, and persistence namespaces.');
