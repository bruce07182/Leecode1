// Admin read-only user workspace.
// Reads admin_progress only. Never writes DB/localStorage and never changes auth user.
(()=>{
 const card=document.getElementById('adminCard'); if(!card)return;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const hist=r=>Array.isArray(r?.history)?r.history:[];
 const key=r=>String(r.email||r.user_id||'Unknown user');
 const foundation=r=>r.exercise_type==='B'||r.exercise_type==='C';
 const rowId=r=>String(r.exercise_type||'')+String(r.exercise_number??'');
 const questionIndex=r=>{const id=rowId(r);if(/^B\d+$/.test(id)){const n=+id.slice(1);return qs.map((q,i)=>q.level==='basic'?i:-1).filter(i=>i>=0)[n-1]??-1}if(/^C\d+$/.test(id)){const n=+id.slice(1);return qs.map((q,i)=>q.level==='combination'?i:-1).filter(i=>i>=0)[n-1]??-1}return -1};
 const passed=r=>hist(r).some(a=>a?.passed);
 let rows=[], selected='';
 function viewer(){let v=document.getElementById('adminReadOnlyViewer');if(v)return v;v=document.createElement('div');v.id='adminReadOnlyViewer';v.className='adminReadOnly hidden';v.innerHTML='<div class="adminROHead"><div><b id="adminROTitle">Read-only user view</b><div class="status">Viewing database data exactly as saved. Nothing can be edited, run, synced, or saved.</div></div><button id="adminROClose" type="button">Back to admin</button></div><div id="adminROSummary"></div><div class="card"><select id="adminROQuestion"></select><p id="adminRODesc"></p><pre id="adminROSig"></pre></div><div class="card"><div class="editorShell"><div class="editorTop"><span>Python · read only</span><span class="status">Run disabled</span></div><textarea id="adminROCode" readonly spellcheck="false"></textarea></div><div id="adminROComplexity" class="afterPass show"></div><div id="adminROProgress" class="status"></div><details class="status" open><summary>Attempts</summary><div id="adminROHistory" class="history"></div></details></div>';card.appendChild(v);v.querySelector('#adminROClose').onclick=()=>v.classList.add('hidden');v.querySelector('#adminROQuestion').onchange=renderQuestion;return v}
 function selectedRows(){return rows.filter(r=>key(r)===selected&&foundation(r))}
 function renderQuestion(){const v=viewer(),pick=v.querySelector('#adminROQuestion'),i=+pick.value,q=qs[i],r=selectedRows().find(x=>questionIndex(x)===i),h=hist(r);v.querySelector('#adminRODesc').textContent=q.desc;v.querySelector('#adminROSig').textContent=q.sig;v.querySelector('#adminROCode').value=r?.code||q.starter||'';const c=r?.complexity;v.querySelector('#adminROComplexity').innerHTML=c?'<b>Complexity</b><div>✓ Time O('+esc(c.time)+') · Space O('+esc(c.space)+')</div>':'<b>Complexity</b><div class="status">Not confirmed</div>';v.querySelector('#adminROProgress').textContent=passed(r)?'✓ Passed':'Not passed';v.querySelector('#adminROHistory').innerHTML=h.length?h.slice().reverse().map(a=>(a?.passed?'✅':'❌')+' '+(a?.time?new Date(a.time).toLocaleString():'time unavailable')+(a?.code?'<details><summary>Code at this run</summary><pre>'+esc(a.code)+'</pre></details>':'')).join('<br>'):'No synced attempts.'}
 function renderUser(){const v=viewer(),rs=selectedRows(),by=new Map(rs.map(r=>[questionIndex(r),r])),p=v.querySelector('#adminROQuestion');v.querySelector('#adminROTitle').textContent='Read-only · '+selected;p.innerHTML='';qs.forEach((q,i)=>{const o=document.createElement('option');o.value=i;o.textContent=(passed(by.get(i))?'✓ ':'')+q.title;p.appendChild(o)});const pass=rs.filter(passed).length,attempts=rs.reduce((n,r)=>n+hist(r).length,0),last=rs.map(r=>r.updated_at).filter(Boolean).sort().at(-1);v.querySelector('#adminROSummary').innerHTML='<div class="adminROSummary"><b>'+esc(selected)+'</b><div>'+pass+'/'+qs.length+' problems passed · '+attempts+' synced attempts</div><div class="status">'+(last?'Last sync: '+new Date(last).toLocaleString():'No sync time')+'</div></div>';const first=qs.findIndex((q,i)=>by.has(i));p.value=String(first>=0?first:0);renderQuestion();v.classList.remove('hidden')}
 async function enter(){const p=document.getElementById('adminUserSelect');if(!p?.value)return;selected=p.value;const b=document.getElementById('adminROOpen');b.disabled=true;b.textContent='Loading…';const {data,error}=await db.rpc('admin_progress');b.disabled=false;b.textContent='View as user · read only';if(error){document.getElementById('adminStatus').textContent='Could not load read-only user view: '+error.message;return}rows=data||[];renderUser()}
 function attach(){const p=document.getElementById('adminUserSelect');if(!p||document.getElementById('adminROOpen'))return;const b=document.createElement('button');b.id='adminROOpen';b.type='button';b.textContent='View as user · read only';b.title='See the selected user’s saved workspace without changing any data';p.parentElement.appendChild(b);b.onclick=enter;p.addEventListener('change',()=>document.getElementById('adminReadOnlyViewer')?.classList.add('hidden'))}
 new MutationObserver(attach).observe(card,{childList:true,subtree:true});attach();

 const dbProgressTab=document.getElementById('adminProgressTab'),dbTab=document.getElementById('adminDbTab');
 const progressPanel=document.getElementById('adminProgressPanel'),dbPanel=document.getElementById('adminDbPanel');
 function renderDbStructure(data){
   const host=document.getElementById('adminDbStructure');if(!host)return;
   const tables=Array.isArray(data?.tables)?data.tables:[],functions=Array.isArray(data?.functions)?data.functions:[];
   host.innerHTML=tables.map(t=>'<details class="status" open><summary><b>'+esc(t.table)+'</b> · RLS '+(t.rls?'on':'OFF')+'</summary>'+
     '<div><b>Columns</b></div><pre>'+esc((t.columns||[]).map(x=>x.name+' · '+x.type+(x.nullable?' · nullable':' · NOT NULL')+(x.default?' · default '+x.default:'')).join('\n'))+'</pre>'+
     '<div><b>Constraints</b></div><pre>'+esc((t.constraints||[]).map(x=>x.name+' · '+x.definition).join('\n')||'None')+'</pre>'+
     '<div><b>Indexes</b></div><pre>'+esc((t.indexes||[]).map(x=>x.name+' · '+x.definition).join('\n')||'None')+'</pre>'+
     '<div><b>RLS policies</b></div><pre>'+esc((t.policies||[]).map(x=>x.name+' · '+x.command+' · roles '+(x.roles||[]).join(', ')+'\nUSING: '+(x.using||'—')+'\nCHECK: '+(x.check||'—')).join('\n\n')||'None')+'</pre></details>').join('')+
     '<details class="status"><summary><b>Public functions</b></summary><pre>'+esc(functions.map(x=>x.name+'('+x.arguments+') → '+x.result+(x.security_definer?' · SECURITY DEFINER':'')).join('\n')||'None')+'</pre></details>';
 }
 async function loadDbStructure(){
   const status=document.getElementById('adminDbStatus');if(!status)return;status.textContent='Loading database structure…';
   const {data,error}=await db.rpc('admin_db_structure');
   if(error){status.textContent='Could not load DB structure: '+error.message;return}
   status.textContent='Read-only metadata · tables, columns, keys, indexes, RLS policies, and public functions.';renderDbStructure(data);
 }
 if(dbProgressTab&&dbTab){dbProgressTab.onclick=()=>{progressPanel?.classList.remove('hidden');dbPanel?.classList.add('hidden')};dbTab.onclick=()=>{progressPanel?.classList.add('hidden');dbPanel?.classList.remove('hidden');loadDbStructure()}}
})();