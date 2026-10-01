(()=>{
const dataStructures=new Set(['Array patterns','String','Linked list','Hashing','Set','Map / dict','Stack','Queue','Binary tree','Graph representation','Heap / priority queue']);
const host=document.getElementById('pyTopics');if(!host)return;
let section=localStorage.getItem('py_dsa_section')||'ds',busy=false;
function titleOf(button){return button.textContent.replace(/^\d+\.\s*/,'').replace(/\s*✓\s*$/,'').trim()}
function isDS(title){return dataStructures.has(title)}
function activeSectionButton(){return document.querySelector(`#levelBar button[data-level="3"][data-dsa-section="${section}"]`)}
function rebuild(){
 if(busy)return;
 const active=document.querySelector('#levelBar button.active');
 if(!active||active.dataset.level!=='3')return;
 busy=true;observer.disconnect();
 const all=[...host.querySelectorAll(':scope > button')];
 const keep=all.filter(b=>section==='ds'?isDS(titleOf(b)):!isDS(titleOf(b)));
 // Remove the opposite section from the DOM entirely, not merely hide it.
 all.filter(b=>!keep.includes(b)).forEach(b=>b.remove());
 keep.forEach(b=>b.hidden=false);
 document.querySelectorAll('#levelBar button[data-level="3"]').forEach(b=>b.classList.toggle('active',b.dataset.dsaSection===section));
 const desc=document.getElementById('levelDesc');if(desc)desc.textContent=section==='ds'?'Data structures only: arrays, strings, linked lists, hashing, sets/maps, stacks, queues, trees, graphs, and heaps.':'Algorithms / patterns only: traversal, searching, sorting, pointers/windows, recursion, DFS/BFS, divide & conquer, greedy, backtracking, and dynamic programming.';
 observer.observe(host,{childList:true});busy=false;
}
function switchSection(next){section=next;localStorage.setItem('py_dsa_section',section);localStorage.setItem('py_level','3');const buttons=document.querySelectorAll('#levelBar button[data-level="3"]');buttons.forEach(b=>b.classList.toggle('active',b.dataset.dsaSection===section));const chosen=[...buttons].find(b=>b.dataset.dsaSection===section);if(chosen){const evt=new MouseEvent('click',{bubbles:true});Object.defineProperty(evt,'__sectionHandled',{value:true});chosen.dispatchEvent(evt)}setTimeout(rebuild,0)}
const observer=new MutationObserver(()=>rebuild());observer.observe(host,{childList:true});
document.querySelectorAll('#levelBar button[data-level="3"]').forEach(b=>b.addEventListener('click',e=>{section=b.dataset.dsaSection;localStorage.setItem('py_dsa_section',section);setTimeout(rebuild,0)},true));
function directLesson(){const p=new URLSearchParams(location.search),wanted=p.get('lesson');if(!wanted){setTimeout(rebuild,0);return}let tries=0;const open=()=>{const buttons=[...host.querySelectorAll('button')],target=buttons.find(b=>titleOf(b)===wanted);if(target){section=isDS(wanted)?'ds':'alg';localStorage.setItem('py_dsa_section',section);target.click();setTimeout(rebuild,0);return}if(++tries<20)setTimeout(open,50)};setTimeout(open,0)}
directLesson();
})();