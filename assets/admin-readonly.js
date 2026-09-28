// Admin read-only viewer.
// IMPORTANT: this module reads admin_progress only. It never calls localStorage,
// saveCloud/queueCloud, upsert/update/insert/delete, or changes the signed-in user's training state.
(()=>{
  const card=document.getElementById('adminCard');
  if(!card) return;

  let cachedRows=[];
  let selectedKey='';

  const historyOf=row=>Array.isArray(row.history)?row.history:[];
  const passedRow=row=>historyOf(row).some(a=>a&&a.passed);
  const keyOf=row=>String(row.email||row.user_id||'Unknown user');
  const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function buildViewer(){
    let viewer=document.getElementById('adminReadOnlyViewer');
    if(viewer) return viewer;
    viewer=document.createElement('div');
    viewer.id='adminReadOnlyViewer';
    viewer.className='adminReadOnly hidden';
    viewer.innerHTML='<div class="adminROHead"><div><b>Read-only progress</b><div class="status">Database view only · nothing here changes this user or your local progress.</div></div><button type="button" id="adminROClose">Close</button></div><div id="adminROBody"></div>';
    card.appendChild(viewer);
    viewer.querySelector('#adminROClose').onclick=()=>viewer.classList.add('hidden');
    return viewer;
  }

  function renderReadOnly(email){
    const viewer=buildViewer(),body=viewer.querySelector('#adminROBody');
    const rows=cachedRows.filter(r=>keyOf(r)===email);
    const byId=new Map(rows.map(r=>[Number(r.problem_id),r]));
    const passed=new Set(rows.filter(passedRow).map(r=>Number(r.problem_id)));
    const attempts=rows.reduce((n,r)=>n+historyOf(r).length,0);
    const last=rows.map(r=>r.updated_at).filter(Boolean).sort().at(-1);

    const problems=qs.map((q,i)=>{
      const row=byId.get(i),h=row?historyOf(row):[],isPassed=!!row&&passedRow(row);
      const complexity=row&&row.complexity;
      return '<div class="adminROProblem '+(isPassed?'adminROPassed':'')+'"><div><b>'+(isPassed?'✓ ':'')+esc(q.title)+'</b><span class="status"> · '+h.length+' attempt'+(h.length===1?'':'s')+'</span></div><div class="status">'+(complexity?'Time O('+esc(complexity.time)+') · Space O('+esc(complexity.space)+')':'O() not confirmed')+(row&&row.updated_at?' · Synced '+new Date(row.updated_at).toLocaleString():'')+'</div></div>';
    }).join('');

    body.innerHTML='<div class="adminROSummary"><b>'+esc(email)+'</b><div>'+passed.size+'/'+qs.length+' problems passed · '+attempts+' synced attempts</div><div class="status">'+(last?'Last sync: '+new Date(last).toLocaleString():'No sync time')+'</div></div><div class="adminROLegend"><span>✓ Passed</span><span>○ Not passed</span></div><div class="adminROProblems">'+problems+'</div>';
    viewer.classList.remove('hidden');
  }

  async function enterReadOnly(){
    const pick=document.getElementById('adminUserSelect');
    if(!pick||!pick.value) return;
    selectedKey=pick.value;
    const btn=document.getElementById('adminROOpen');
    if(btn){btn.disabled=true;btn.textContent='Loading…';}
    const {data,error}=await db.rpc('admin_progress'); // SELECT/read only
    if(btn){btn.disabled=false;btn.textContent='View read-only';}
    if(error){
      const host=document.getElementById('adminUsers');
      if(host) host.insertAdjacentHTML('afterbegin','<div class="status">Could not load read-only view: '+esc(error.message)+'</div>');
      return;
    }
    cachedRows=data||[];
    renderReadOnly(selectedKey);
  }

  function attachControl(){
    const pick=document.getElementById('adminUserSelect');
    if(!pick||document.getElementById('adminROOpen')) return;
    const btn=document.createElement('button');
    btn.type='button';
    btn.id='adminROOpen';
    btn.className='adminROOpen';
    btn.textContent='View read-only';
    btn.title='Open this user’s database progress without changing their data or your local progress';
    pick.parentElement.appendChild(btn);
    btn.onclick=enterReadOnly;
    pick.addEventListener('change',()=>{
      selectedKey=pick.value;
      document.getElementById('adminReadOnlyViewer')?.classList.add('hidden');
    });
  }

  // Admin contents are created asynchronously by loadAdminProgress(). Observe only the admin card.
  const observer=new MutationObserver(attachControl);
  observer.observe(card,{childList:true,subtree:true});
  attachControl();
})();