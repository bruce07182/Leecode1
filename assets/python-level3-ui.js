(()=>{
const dataStructures=new Set(['Array patterns','String','Linked list','Hashing','Set','Map / dict','Stack','Queue','Binary tree','Graph representation','Heap / priority queue']);
function titleOf(button){return button.textContent.replace(/^\d+\.\s*/,'').replace(/\s*✓\s*$/,'').trim()}
function group(){
 const host=document.getElementById('pyTopics');
 const active=document.querySelector('#levelBar button.active');
 if(!host||!active||active.dataset.level!=='3')return;
 const buttons=[...host.children].filter(x=>x.tagName==='BUTTON');
 if(!buttons.length)return;
 const ds=buttons.filter(b=>dataStructures.has(titleOf(b)));
 const alg=buttons.filter(b=>!dataStructures.has(titleOf(b)));
 host.replaceChildren();
 for(const [label,list] of [['Data Structures',ds],['Algorithms / Patterns',alg]]){
  const heading=document.createElement('div');heading.className='pyTopicGroup';heading.textContent=label;host.appendChild(heading);
  list.forEach(b=>host.appendChild(b));
 }
}
let busy=false;
const observer=new MutationObserver(()=>{if(busy)return;busy=true;queueMicrotask(()=>{group();busy=false})});
function directLesson(){
 const wanted=new URLSearchParams(location.search).get('lesson');if(!wanted)return;
 const l3=document.querySelector('#levelBar button[data-level="3"]');if(l3&&!l3.classList.contains('active'))l3.click();
 setTimeout(()=>{group();const b=[...document.querySelectorAll('#pyTopics button')].find(x=>titleOf(x)===wanted);if(b)b.click()},50);
}
function start(){const host=document.getElementById('pyTopics');if(!host)return;observer.observe(host,{childList:true});group();directLesson()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();