// DSA roadmap/navigation only. Teaching content comes from Python Level 3 (window.DSA_LEVEL3).
(()=>{
  const DS=['Sequence','Hash','Linear','Hierarchy'];
  const ALG=['Traversal','Two Pointers','Sorting','Sliding Window','Prefix Sum','Binary Search','Search','Math & Bitwise','Recursion','DFS / BFS','Divide & Conquer','Greedy','Backtracking','Dynamic Programming'];
  const aliases={'Traversal':'Traversal','Lists':'Array','Strings':'String','Linked List':'Linked List','Hash Map':'Map','Hash Set':'Set','Stack':'Stack','Queue':'Queue','Heap':'Heap','Graphs':'Graph','Trees / DFS':'Tree','Two Pointers':'Two Pointers','Sorting':'Sorting','Sliding Window':'Sliding Window','Prefix Sum':'Prefix Sum','Binary Search':'Binary Search','Recursion':'Recursion','1-D DP':'Dynamic Programming'};
  const extraTags={0:['Array'],1:['Array','Math & Bitwise'],2:['Array']};
  const lessonGroups={
    'Array':['Array patterns'],'String':['String'],'Linked List':['Linked list'],
    'Set':['Set'],'Map':['Map / dict'],'Stack':['Stack'],'Queue':['Queue'],
    'Tree':['Binary tree'],'Graph':['Graph representation'],'Heap':['Heap / priority queue'],
    'Traversal':['Traversal'],'Two Pointers':['Two pointers'],'Sorting':['Sorting'],
    'Sliding Window':['Sliding window'],'Prefix Sum':['Prefix sum'],'Binary Search':['Binary search'],
    'Search':['Search'],'Math & Bitwise':['Math & bitwise'],'Recursion':['Recursion'],
    'DFS / BFS':['DFS','BFS'],'Divide & Conquer':['Divide & conquer'],'Greedy':['Greedy'],
    'Backtracking':['Recursion & backtracking'],'Dynamic Programming':['Dynamic programming']
  };
  const related=[['Array','Traversal'],['Set','Traversal'],['Map','Traversal'],['Stack','Traversal'],['Queue','Traversal'],['Tree','Traversal'],['Graph','Traversal'],['Array','Two Pointers'],['Array','Sorting'],['Array','Sliding Window'],['Array','Prefix Sum'],['Array','Binary Search'],['Array','Search'],['Graph','Search'],['Array','Math & Bitwise'],['Set','Math & Bitwise'],['Map','Math & Bitwise'],['Tree','DFS / BFS'],['Graph','DFS / BFS'],['Recursion','DFS / BFS'],['Array','Divide & Conquer'],['Tree','Divide & Conquer'],['Tree','Greedy'],['Array','Greedy'],['Tree','Backtracking'],['Array','Backtracking'],['Array','Dynamic Programming'],['Tree','Dynamic Programming']];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const hasConcept=(i,name)=>{const c=qs[i].category;if(name==='Array')return c==='Lists'||(extraTags[i]||[]).includes('Array');if(name==='String')return c==='Strings';if(name==='Linked List')return c==='Linked List';if(name==='Set')return c==='Hash Set';if(name==='Map')return c==='Hash Map';if(name==='Stack'||name==='Queue')return c===name;if(name==='Tree')return c==='Trees / DFS';if(name==='Graph')return c==='Graphs';if(name==='Heap')return c==='Heap';return aliases[c]===name||(extraTags[i]||[]).includes(name)};
  const idsFor=name=>qs.map((q,i)=>hasConcept(i,name)?i:-1).filter(i=>i>=0);
  const state=name=>{const ids=idsFor(name);if(!ids.length)return'lockedConcept';if(ids.every(i=>masteryOf(i)==='Mastered'))return'mastered';if(ids.some(i=>completed(i)))return'learning';if(ids.some(i=>unlocked(i)))return'available';return'lockedConcept'};
  const relationsFor=name=>[...new Set(related.filter(([a,b])=>a===name||b===name).map(([a,b])=>a===name?b:a))];
  const sharedLessons=name=>{const dsa=window.DSA_LEVEL3||[];return (lessonGroups[name]||[]).map(title=>dsa.find(x=>x.t===title)).filter(Boolean)};
  const lessonHtml=name=>{const lessons=sharedLessons(name);if(!lessons.length)return'<div class="status">This topic is not available in Python Level 3 yet.</div>';return lessons.map(x=>'<section class="focusLesson"><div class="dsTeachTitle">'+esc(x.t)+'</div><div class="dsTeachOne">'+x.tip+'</div><pre class="dsCode">'+esc(x.ex)+'</pre></section>').join('')};
  const openFocus=name=>{
    if(!window.foundationRequireUser?.())return;
    let p=document.getElementById('dsaFocusPopup');
    if(!p){p=document.createElement('div');p.id='dsaFocusPopup';p.className='dsMiniPopup hidden';document.body.appendChild(p)}
    const rels=relationsFor(name),items=idsFor(name).map(i=>({x:qs[i],i}));
    p.innerHTML='<div class="dsMiniInner dsaFocusInner"><button class="dsMiniClose" aria-label="Close">×</button><div class="dsTeachTitle">'+esc(name)+'</div><div class="focusLessons">'+lessonHtml(name)+'</div><div class="focusRelated"><b>Related</b><div class="focusChips">'+(rels.length?rels.map(x=>'<button class="focusChip" data-concept="'+esc(x)+'">'+esc(x)+'</button>').join(''):'<span class="status">No direct relationships listed.</span>')+'</div></div><div class="focusQuestions"><b>Practice</b><div>'+(items.length?items.map(o=>'<button data-q="'+o.i+'" '+(unlocked(o.i)?'':'disabled')+'>'+(completed(o.i)?'✓ ':'')+esc(typeof displayTitle==='function'?displayTitle(o.i):o.x.title)+(unlocked(o.i)?'':' 🔒')+'</button>').join(''):'<span class="status">No exercise yet.</span>')+'</div></div></div>';
    p.classList.remove('hidden');
    p.querySelector('.dsMiniClose').onclick=()=>p.classList.add('hidden');
    p.onclick=e=>{if(e.target===p)p.classList.add('hidden')};
    p.querySelectorAll('[data-concept]').forEach(b=>b.onclick=()=>openFocus(b.dataset.concept));
    p.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{p.classList.add('hidden');const target=Number(b.dataset.q);groupSel.value=questionGroup(target);refreshOptions();sel.value=String(target);load();loadCloud();['questionCard','workCard'].forEach(id=>document.getElementById(id).classList.remove('hidden'))});
  };
  window.showDsaConcept=openFocus;
  window.renderConceptMap=function(){
    const host=document.getElementById('conceptMap');if(!host)return;
    document.getElementById('mapModeLabel').innerHTML='<b>Data Structures</b> + <b>Algorithms / Patterns</b> · lessons are shared directly with Python Level 3';
    const group=children=>'<div class="dsaStructureGroup">'+children.map(child=>'<button class="dsaRoadNode '+state(child)+'" data-concept="'+child+'">'+child+'</button>').join('')+'</div>';
    const node=name=>name==='Sequence'?group(['Array','String','Linked List']):name==='Hash'?group(['Set','Map']):name==='Linear'?group(['Stack','Queue']):name==='Hierarchy'?group(['Tree','Graph','Heap']):'<button class="dsaRoadNode '+state(name)+'" data-concept="'+name+'">'+name+'</button>';
    host.innerHTML='<div class="dsaTwoCol"><section class="dsaRoadCol"><div class="dsaColTitle">DATA STRUCTURES</div>'+DS.map(node).join('')+'</section><section class="dsaRoadCol"><div class="dsaColTitle">ALGORITHMS / PATTERNS</div>'+ALG.map(node).join('')+'</section></div>';
    host.querySelectorAll('[data-concept]').forEach(b=>b.onclick=()=>openFocus(b.dataset.concept));
  };
  const ensureMap=()=>{const c=document.getElementById('mapCard');if(c&&!c.classList.contains('collapsed'))renderConceptMap()};
  setTimeout(ensureMap,150);setTimeout(ensureMap,500);setTimeout(ensureMap,1100);
})();