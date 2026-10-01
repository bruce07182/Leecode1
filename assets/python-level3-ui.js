(()=>{
const dataStructures=new Set(['Array patterns','String','Linked list','Hashing','Set','Map / dict','Stack','Queue','Binary tree','Graph representation','Heap / priority queue']);
const host=document.getElementById('pyTopics');
if(!host)return;
function titleOf(button){return button.textContent.replace(/^\d+\.\s*/,'').replace(/\s*✓\s*$/,'').trim()}
let grouping=false;
function group(){
 const active=document.querySelector('#levelBar button.active');
 if(grouping||!active||active.dataset.level!=='3')return;
 const buttons=[...host.children].filter(x=>x.tagName==='BUTTON');
 if(!buttons.length)return;
 grouping=true;
 observer.disconnect();
 const ds=buttons.filter(b=>dataStructures.has(titleOf(b)));
 const alg=buttons.filter(b=>!dataStructures.has(titleOf(b)));
 const frag=document.createDocumentFragment();
 for(const [label,list] of [['Data Structures',ds],['Algorithms / Patterns',alg]]){
  const heading=document.createElement('div');heading.className='pyTopicGroup';heading.textContent=label;frag.appendChild(heading);
  list.forEach(b=>frag.appendChild(b));
 }
 host.replaceChildren(frag);
 observer.observe(host,{childList:true});
 grouping=false;
}
const observer=new MutationObserver(()=>group());
observer.observe(host,{childList:true});
function directLesson(){
 const params=new URLSearchParams(location.search);
 const wanted=params.get('lesson');
 if(params.get('level')==='3'){
  localStorage.setItem('py_level','3');
  const l3=document.querySelector('#levelBar button[data-level="3"]');
  if(l3&&!l3.classList.contains('active'))l3.click();
 }
 if(!wanted){setTimeout(group,0);return}
 let tries=0;
 const open=()=>{
  group();
  const b=[...host.querySelectorAll('button')].find(x=>titleOf(x)===wanted);
  if(b){b.click();group();return}
  if(++tries<20)setTimeout(open,50);
 };
 setTimeout(open,0);
}
directLesson();
})();