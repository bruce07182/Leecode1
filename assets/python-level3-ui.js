(()=>{
const dataStructures=new Set(['Array patterns','String','Linked list','Hashing','Set','Map / dict','Stack','Queue','Binary tree','Graph representation','Heap / priority queue']);
const host=document.getElementById('pyTopics');if(!host)return;
let section=localStorage.getItem('py_dsa_section')||'ds',busy=false;
function titleOf(button){return button.textContent.replace(/^\d+\.\s*/,'').replace(/\s*✓\s*$/,'').trim()}
function sectionButton(){return document.querySelector(`#levelBar button[data-level="3"][data-dsa-section="${section}"]`)}
function filter(){
 if(busy)return;
 const active=document.querySelector('#levelBar button.active');
 if(!active||active.dataset.level!=='3')return;
 busy=true;observer.disconnect();
 [...host.querySelectorAll(':scope > button')].forEach(b=>{const isDS=dataStructures.has(titleOf(b));b.hidden=section==='ds'?!isDS:isDS});
 document.querySelectorAll('#levelBar button[data-level="3"]').forEach(b=>b.classList.toggle('active',b.dataset.dsaSection===section));
 const desc=document.getElementById('levelDesc');if(desc)desc.textContent=section==='ds'?'Core data structures implemented and practiced in Python.':'Algorithms and reusable problem-solving patterns implemented and practiced in Python.';
 observer.observe(host,{childList:true});busy=false;
}
const observer=new MutationObserver(filter);observer.observe(host,{childList:true});
document.querySelectorAll('#levelBar button[data-level="3"]').forEach(b=>b.addEventListener('click',()=>{section=b.dataset.dsaSection;localStorage.setItem('py_dsa_section',section);setTimeout(filter,0)}));
function directLesson(){
 const p=new URLSearchParams(location.search),wanted=p.get('lesson');
 if(!wanted){setTimeout(filter,0);return}
 let tries=0;const open=()=>{const buttons=[...host.querySelectorAll('button')],target=buttons.find(b=>titleOf(b)===wanted);if(target){section=dataStructures.has(wanted)?'ds':'alg';localStorage.setItem('py_dsa_section',section);const tab=sectionButton();if(tab&&!tab.classList.contains('active'))tab.click();target.hidden=false;target.click();filter();return}if(++tries<20)setTimeout(open,50)};setTimeout(open,0);
}
directLesson();
})();