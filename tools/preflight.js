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
if(!app.includes('function exerciseIdentity(i)')||!app.includes('"B":"C"'))fail('app.js: canonical B/C type+number identity contract missing');
const foundationTitles=[...app.matchAll(/title:"([^"]+)"/g)].map(m=>m[1]);
if(foundationTitles.length<26)fail('app.js: Foundation curriculum unexpectedly shrank below 26 problems');
const originalFoundationTitles=['1. Count positives','2. Build a list','3. Find maximum','4. Reverse string','5. Two pointer movement','6. Frequency map','7. Contains duplicate','8. Stack basics','9. Sorting basics','10. Slide a fixed window','11. Prefix sums','12. Binary search boundaries','13. Queue basics','14. Graph neighbors','15. Linked list traversal','16. Recursion basics','17. Tree preorder','18. Heap basics','19. 1-D DP basics','20. Palindrome','21. Two Sum','22. First unique char','23. Valid parentheses','24. Min stack','25. Merge intervals','26. Greedy activity selection','27. Binary search','28. Lower bound','29. Graph BFS','30. Tree max depth','31. Tree level order','32. K largest','33. Backtracking subsets','34. Climbing stairs','35. Coin change','36. 2-D DP grid paths','37. Fibonacci memo'];
for(let i=0;i<originalFoundationTitles.length;i++)if(foundationTitles[i]!==originalFoundationTitles[i])fail(`app.js: saved Foundation ID ${i} shifted from ${originalFoundationTitles[i]} to ${foundationTitles[i]||'missing'}`);
if(!foundationTitles.includes('25. String membership')||!foundationTitles.includes('26. Map lookup & store'))fail('app.js: atomic membership/map prerequisites missing');
if(!app.includes("function displayTitle(i)"))fail('app.js: Basic/Combination display numbering missing');
if(!app.includes('exerciseId(i)+" · "+name'))fail('app.js: canonical Basic/Combination display IDs missing');if(app.includes('problem_id')||app.includes('detectCanonicalCloud'))fail('app.js: legacy numeric cloud identity remains');
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
if(lc.includes('const masterKey=')||lc.includes('reviewKey=p=>'))fail('leetcode-practice.js: durable mastery/review must not live only in local storage');
if(!lc.includes('id:`LC${lc}`')||!lc.includes("exerciseIdentity=p=>({type:'LC',number:p.lc})"))fail('leetcode-practice.js: canonical LC type+number identity missing');if(lc.includes('problem_id')||lc.includes('legacyCloudId'))fail('leetcode-practice.js: legacy numeric cloud identity remains');
if(!/P\(1,/.test(lc)||!/P\(125,/.test(lc)||!/P\(217,/.test(lc))fail('leetcode-practice.js: core official LeetCode IDs changed');
const catalogIds=[...lc.matchAll(/P\((\d+),/g)].map(m=>Number(m[1]));if(catalogIds.length<20)fail('leetcode-practice.js: curated catalog unexpectedly shrank below 20 problems');if(new Set(catalogIds).size!==catalogIds.length)fail('leetcode-practice.js: duplicate LeetCode IDs');if(!lc.includes("select('exercise_type,exercise_number,code,history,complexity')"))fail('leetcode-practice.js: canonical type/number cloud read missing');
const coverageMatch=lc.match(/const foundationBasicCoverage=Object\.freeze\(\{([\s\S]*?)\}\);/);
if(!coverageMatch)fail('leetcode-practice.js: missing Foundation Basic coverage map');
else for(const id of catalogIds)if(!new RegExp('(?:^|[,\\s])'+id+':\\[').test(coverageMatch[1]))fail(`leetcode-practice.js: LC${id} has no Foundation Basic coverage`);
for(const id of [37,38,39,40,41,42,43,44,45])if(!foundationTitles[id])fail(`app.js: extension Basic ID ${id} missing`);


if(!app.includes('replace(/^\\d+\\.\\s*/,"")'))fail('app.js: displayTitle must strip legacy numeric title prefix');
if(!app.includes('if(/^B\\d+$/.test(s))')||!app.includes('if(/^C\\d+$/.test(s))'))fail('app.js: canonical B/C cloud restore regex missing');
if(!app.includes('getElementById("adminStatus")')||!app.includes('getElementById("adminUsers")'))fail('app.js: admin loader must target live admin DOM IDs');
if(!lcHtml.includes('id="lcCloud"'))fail('leetcode.html: cloud sync status surface missing');
if(!lc.includes("const {error}=await db.from('solutions').upsert")||!lc.includes("const {data,error}=await db.from('solutions').select"))fail('leetcode-practice.js: database errors must be surfaced');
if(app.includes('mergeLocalToCloud')||app.includes('syncAllCloud')||app.includes('migrateFoundationLocal'))fail('app.js: retired local/cloud reconciliation code returned');
if(!app.includes('async function hydrateCloudState()')||!app.includes('foundationState.clear()'))fail('app.js: cloud-authoritative session hydration missing');
const lock=fs.readFileSync(path.join(assets,'editor-lock.js'),'utf8');
if(lock.includes("bb_history_")||!lock.includes("window.foundationCompleted"))fail('editor-lock.js: completed lock must use canonical Foundation progress state');
if(!app.includes('window.foundationCompleted=completed'))fail('app.js: canonical completion state is not exposed to editor lock');
for(const retired of ['graph-question-clarity.js','progressive-solutions-extra.js','curriculum-clarity-v9.js'])if(fs.existsSync(path.join(assets,retired)))fail('retired patch layer returned: '+retired);
for(const name of ['ui-v2.js','shared-learning-v8.js']){const src=fs.readFileSync(path.join(assets,name),'utf8');if(/bb_(?:history|code|complexity|hints|help)_/.test(src))fail(name+': constructs legacy Foundation storage keys');}
if(!index.includes('id="adminDbTab"')||!index.includes('id="adminDbStructure"'))fail('index.html: admin DB structure view missing');
const adminSrc=fs.readFileSync(path.join(assets,'admin-readonly.js'),'utf8');
if(!adminSrc.includes("db.rpc('admin_db_structure')"))fail('admin-readonly.js: DB structure RPC missing');
for(const doc of ['DATABASE_DESIGN_LESSONS.md','DESIGN_LESSONS.md','BUG_POSTMORTEMS.md'])if(!fs.existsSync(path.join(root,'docs',doc)))fail('architecture document missing: '+doc);
if(lc.includes('migrateLegacyLocal')||lc.includes('legacyIds=new Map'))fail('leetcode-practice.js: retired local migration returned');
const progressStorage=/localStorage\.(?:getItem|setItem|removeItem)\([^\n]*(?:ex_|lc_(?:code|history|complexity|master|review)|bb_(?:history|complexity|hints|help))/;
if(progressStorage.test(app))fail('app.js: durable/progress localStorage returned');
if(progressStorage.test(lc))fail('leetcode-practice.js: durable/progress localStorage returned');
if(!app.includes('const foundationState=new Map()')||!lc.includes('const lcState=new Map()'))fail('session progress state maps missing');
if(errors.length){console.error('PRE-FLIGHT FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log('Preflight OK: local assets, JS syntax, startup contract, and persistence namespaces.');
