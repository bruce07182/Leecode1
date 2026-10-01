// DSA roadmap/navigation only. Teaching content lives in the shared Python DSA curriculum.
(()=>{
  const DS=['Sequence','Hash','Linear','Hierarchy'];
  const ALG=['Traversal','Two Pointers','Sorting','Sliding Window','Prefix Sum','Binary Search','Search','Math & Bitwise','Recursion','DFS','BFS','Divide & Conquer','Greedy','Backtracking','Dynamic Programming'];
  const aliases={'Traversal':'Traversal','Lists':'Array','Strings':'String','Linked List':'Linked List','Hash Map':'Map / dict','Hash Set':'Set','Stack':'Stack','Queue':'Queue','Heap':'Heap / Priority Queue','Graphs':'Graph','Trees / DFS':'Tree','Two Pointers':'Two Pointers','Sorting':'Sorting','Sliding Window':'Sliding Window','Prefix Sum':'Prefix Sum','Binary Search':'Binary Search','Recursion':'Recursion','1-D DP':'Dynamic Programming'};
  const extraTags={0:['Array'],1:['Array','Math & Bitwise'],2:['Array']};
  const pythonLesson={
    'Array':'Array','String':'String','Linked List':'Linked List','Hashing':'Hashing','Set':'Set','Map / dict':'Map / dict','Stack':'Stack','Queue':'Queue','Tree':'Tree','Graph':'Graph','Heap / Priority Queue':'Heap / Priority Queue',
    'Traversal':'Traversal','Two Pointers':'Two Pointers','Sorting':'Sorting','Sliding Window':'Sliding Window','Prefix Sum':'Prefix Sum','Binary Search':'Binary Search','Search':'Search','Math & Bitwise':'Math & Bitwise','Recursion':'Recursion','DFS':'DFS','BFS':'BFS','Divide & Conquer':'Divide & Conquer','Greedy':'Greedy','Backtracking':'Backtracking','Dynamic Programming':'Dynamic Programming'
  };
  const related=[['Array','Traversal'],['Set','Traversal'],['Map / dict','Traversal'],['Stack','Traversal'],['Queue','Traversal'],['Tree','Traversal'],['Graph','Traversal'],['Array','Two Pointers'],['Array','Sorting'],['Array','Sliding Window'],['Array','Prefix Sum'],['Array','Binary Search'],['Array','Search'],['Graph','Search'],['Array','Math & Bitwise'],['Set','Math & Bitwise'],['Map / dict','Math & Bitwise'],['Tree','DFS'],['Graph','DFS'],['Tree','BFS'],['Graph','BFS'],['Recursion','DFS'],['Array','Divide & Conquer'],['Tree','Divide & Conquer'],['Tree','Greedy'],['Array','Greedy'],['Tree','Backtracking'],['Array','Backtracking'],['Array','Dynamic Programming'],['Tree','Dynamic Programming']];
  const hasConcept=(i,name)=>{const c=qs[i].category;if(name==='Array')return c==='Lists'||(extraTags[i]||[]).includes('Array');if(name==='String')return c==='Strings';if(name==='Linked List')return c==='Linked List';if(name==='Set')return c==='Hash Set';if(name==='Map / dict')return c==='Hash Map';if(name==='Stack'||name==='Queue')return c===name;if(name==='Tree')return c==='Trees / DFS';if(name==='Graph')return c==='Graphs';if(name==='Heap / Priority Queue')return c==='Heap';return aliases[c]===name||(extraTags[i]||[]).includes(name)};
  const idsFor=name=>qs.map((q,i)=>hasConcept(i,name)?i:-1).filter(i=>i>=0);
  const state=name=>{const ids=idsFor(name);if(!ids.length)return'lockedConcept';if(ids.every(i=>masteryOf(i)==='Mastered'))return'mastered';if(ids.some(i=>completed(i)))return'learning';if(ids.some(i=>unlocked(i)))return'available';return'lockedConcept'};
  const relationsFor=name=>[...new Set(related.filter(([a,b])=>a===name||b===name).map(([a,b])=>a===name?b:a))];
  const learnUrl=name=>'python.html?level=3&lesson='+encodeURIComponent(pythonLesson[name]||name);
  const openFocus=name=>{
    if(!window.foundationRequireUser?.())return;
    let p=document.getElementById('dsaFocusPopup');
    if(!p){p=document.createElement('div');p.id='dsaFocusPopup';p.className='dsMiniPopup hidden';document.body.appendChild(p)}
    const rels=relationsFor(name),items=idsFor(name).map(i=>({x:qs[i],i}));
    p.innerHTML='<div class="dsMiniInner dsaFocusInner"><button class="dsMiniClose" aria-label="Close">×</button><div class="dsTeachTitle"><a href="'+learnUrl(name)+'" title="Open this lesson in Python Training">'+name+' ↗</a></div><div class="focusRelated"><b>Related</b><div class="focusChips">'+(rels.length?rels.map(x=>'<button class="focusChip" data-concept="'+x+'">'+x+'</button>').join(''):'<span class="status">No direct relationships listed.</span>')+'</div></div><div class="focusQuestions"><b>Practice</b><div>'+(items.length?items.map(o=>'<button data-q="'+o.i+'" '+(unlocked(o.i)?'':'disabled')+'>'+(completed(o.i)?'✓ ':'')+(typeof displayTitle==='function'?displayTitle(o.i):o.x.title)+(unlocked(o.i)?'':' 🔒')+'</button>').join(''):'<span class="status">No exercise yet.</span>')+'</div></div></div>';
    p.classList.remove('hidden');
    p.querySelector('.dsMiniClose').onclick=()=>p.classList.add('hidden');
    p.onclick=e=>{if(e.target===p)p.classList.add('hidden')};
    p.querySelectorAll('[data-concept]').forEach(b=>b.onclick=()=>openFocus(b.dataset.concept));
    p.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{p.classList.add('hidden');const target=Number(b.dataset.q);groupSel.value=questionGroup(target);refreshOptions();sel.value=String(target);load();loadCloud();['questionCard','workCard'].forEach(id=>document.getElementById(id).classList.remove('hidden'))});
  };
  window.showDsaConcept=openFocus;
  window.renderConceptMap=function(){
    const host=document.getElementById('conceptMap');if(!host)return;
    document.getElementById('mapModeLabel').innerHTML='<b>Data Structures</b> + <b>Algorithms / Patterns</b>';
    const group=children=>'<div class="dsaStructureGroup">'+children.map(child=>'<button class="dsaRoadNode '+state(child)+'" data-concept="'+child+'">'+child+'</button>').join('')+'</div>';
    const node=name=>name==='Sequence'?group(['Array','String','Linked List']):name==='Hash'?group(['Hashing','Set','Map / dict']):name==='Linear'?group(['Stack','Queue']):name==='Hierarchy'?group(['Tree','Graph','Heap / Priority Queue']):'<button class="dsaRoadNode '+state(name)+'" data-concept="'+name+'">'+name+'</button>';
    host.innerHTML='<div class="dsaTwoCol"><section class="dsaRoadCol"><div class="dsaColTitle">DATA STRUCTURES</div>'+DS.map(node).join('')+'</section><section class="dsaRoadCol"><div class="dsaColTitle">ALGORITHMS / PATTERNS</div>'+ALG.map(node).join('')+'</section></div>';
    host.querySelectorAll('[data-concept]').forEach(b=>b.onclick=()=>openFocus(b.dataset.concept));
  };
  const ensureMap=()=>{const c=document.getElementById('mapCard');if(c&&!c.classList.contains('collapsed'))renderConceptMap()};
  setTimeout(ensureMap,150);setTimeout(ensureMap,500);setTimeout(ensureMap,1100);
})();