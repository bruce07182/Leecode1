#!/usr/bin/env node
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),assets=path.join(root,'assets');
const pages=['index.html','python.html','leetcode.html'];
const errors=[],fail=m=>errors.push(m),read=p=>fs.readFileSync(path.join(root,p),'utf8');

// Every local page dependency must exist.
for(const page of pages){
  const html=read(page);
  for(const m of html.matchAll(/<(?:script|link)\b[^>]+?(?:src|href)=["']([^"'?#]+)["']/gi)){
    const ref=m[1];
    if(/^(?:https?:)?\/\//.test(ref)||ref.startsWith('#'))continue;
    if(!fs.existsSync(path.join(root,ref)))fail(`${page}: missing local asset ${ref}`);
  }
  if(!html.includes('assets/python-runtime.js'))fail(`${page}: missing shared Python runtime`);
  if(!html.includes('assets/dsa-concepts.js'))fail(`${page}: missing shared DSA concepts`);
}

// All shipped JS must parse.
for(const name of fs.readdirSync(assets).filter(x=>x.endsWith('.js'))){
  const src=fs.readFileSync(path.join(assets,name),'utf8');
  try{new vm.Script(src,{filename:name})}catch(e){fail(`${name}: JavaScript syntax error: ${e.message}`)}
}

const index=read('index.html'),python=read('python.html'),lcHtml=read('leetcode.html');
const app=read('assets/app.js'),lc=read('assets/leetcode-practice.js');
const map=read('assets/dsa-map-v6.js'),visuals=read('assets/dsa-visuals.js');

// Auth/startup must remain fail-closed and usable.
if(!index.includes('body class="auth-locked app-loading"')||!index.includes('id="authCard"'))fail('index.html: fail-closed auth startup contract missing');
if(!python.includes('body class="auth-locked"')||!python.includes('id="pyAuth"'))fail('python.html: direct-entry auth lock missing');
if(!lcHtml.includes('body class="auth-locked"'))fail('leetcode.html: direct-entry auth lock missing');
if(!app.includes('signInWithPassword')||!app.includes('window.foundationRequireUser'))fail('app.js: auth/login guard contract missing');

// Shared Python runtime has one loader owner.
for(const name of ['app.js','python-basics.js','leetcode-practice.js']){
  const src=read('assets/'+name);
  if(!src.includes('PythonRuntime.load('))fail(`${name}: bypasses shared Python runtime`);
  if(src.includes('loadPyodide('))fail(`${name}: owns duplicate Pyodide loader`);
}

// Current navigation/review/recommendation UI.
for(const id of ['runBtn','recommendMenuBtn','recommendMenu','openReview','reviewBrowser','adminDbTab','adminDbStructure'])if(!index.includes(`id="${id}"`))fail(`index.html: missing current control #${id}`);
if(!app.includes('window.foundationRecommendation'))fail('app.js: canonical recommendation API missing');
if(!fs.existsSync(path.join(assets,'review-browser.js')))fail('review browser module missing');

// Canonical cloud identity and progress ownership.
if(!app.includes('function exerciseIdentity(i)')||app.includes('problem_id'))fail('app.js: canonical Foundation identity contract broken');
if(!app.includes('const foundationState=new Map()')||!app.includes('async function hydrateCloudState()'))fail('app.js: cloud-authoritative Foundation state missing');
if(!lc.includes("exerciseIdentity=p=>({type:'LC',number:p.lc})")||lc.includes('problem_id'))fail('leetcode-practice.js: canonical LC identity contract broken');
if(!lc.includes('const lcState=new Map()'))fail('leetcode-practice.js: session progress state missing');
const progressStorage=/localStorage\.(?:getItem|setItem|removeItem)\([^\n]*(?:ex_|lc_(?:code|history|complexity|master|review)|bb_(?:history|complexity|hints|help))/;
if(progressStorage.test(app)||progressStorage.test(lc))fail('durable progress localStorage returned');

// DSA map and Python curriculum must use current canonical topic names.
const canonicalDS=['Array','String','Linked List','Hashing','Set','Map / dict','Stack','Queue','Tree','Graph','Heap / Priority Queue'];
const canonicalAlg=['Traversal','Two Pointers','Sorting','Sliding Window','Prefix Sum','Binary Search','Search','Math & Bitwise','Recursion','DFS','BFS','Divide & Conquer','Greedy','Backtracking','Dynamic Programming'];
for(const name of [...canonicalDS,...canonicalAlg]){
  if(!map.includes("'"+name+"'"))fail(`dsa-map-v6.js: missing canonical topic ${name}`);
  if(!visuals.includes("'"+name+"':`"))fail(`dsa-visuals.js: missing canonical visual ${name}`);
}
for(const stale of ['DFS / BFS','Recursion & backtracking','Hash map & set'])if(map.includes("'"+stale+"'"))fail(`dsa-map-v6.js: stale combined topic ${stale}`);
if(!python.includes('data-dsa-section="ds"')||!python.includes('data-dsa-section="alg"'))fail('python.html: Data Structures / Algorithms separation missing');

// Important Foundation and LeetCode coverage must not silently shrink.
const foundationTitles=[...app.matchAll(/title:"([^"]+)"/g)].map(m=>m[1]);
if(foundationTitles.length<40)fail('app.js: Foundation curriculum unexpectedly shrank');
const catalogIds=[...lc.matchAll(/P\((\d+),/g)].map(m=>Number(m[1]));
if(catalogIds.length<20||new Set(catalogIds).size!==catalogIds.length)fail('leetcode-practice.js: curated LC catalog missing or duplicated');
for(const id of [1,125,217])if(!catalogIds.includes(id))fail(`leetcode-practice.js: core LC${id} missing`);

// Retired/dead compatibility layers must stay gone.
for(const retired of ['graph-question-clarity.js','progressive-solutions-extra.js','curriculum-clarity-v9.js','dsa-python-link-v7.js'])if(fs.existsSync(path.join(assets,retired)))fail('retired patch layer returned: '+retired);
if(index.includes('dsa-python-link-v7.js')||index.includes('dsa-data-init.js'))fail('index.html: obsolete DSA adapter reference returned');

// Admin security surface and architecture docs.
const admin=read('assets/admin-readonly.js');
if(!admin.includes("db.rpc('admin_db_structure')"))fail('admin-readonly.js: DB structure RPC missing');
for(const doc of ['DATABASE_DESIGN_LESSONS.md','DESIGN_LESSONS.md','BUG_POSTMORTEMS.md'])if(!fs.existsSync(path.join(root,'docs',doc)))fail('architecture document missing: '+doc);

if(errors.length){console.error('PRE-FLIGHT FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log('Preflight OK: assets, syntax, auth, persistence, DSA curriculum, and current UI contracts.');
