// Small, non-curriculum UX safeguards shared by the main app and Python Training.
(()=>{
function labelSelect(id,text){const el=document.getElementById(id);if(!el||el.dataset.uxLabeled)return;el.dataset.uxLabeled='1';el.setAttribute('aria-label',text);el.title=text}
function setup(){
  labelSelect('q','Choose practice question');
  labelSelect('mode','Choose learning mode');
  document.querySelectorAll('[data-collapse]').forEach(b=>{const card=document.getElementById(b.dataset.collapse);if(card){b.setAttribute('aria-controls',card.id);b.setAttribute('aria-label',(card.classList.contains('collapsed')?'Expand ':'Collapse ')+(card.querySelector('b,h2,h3')?.textContent||'section'))}});
  const menu=document.getElementById('menuBtn');if(menu){menu.setAttribute('aria-label','Open menu');menu.title='Menu'}
  [['runBtn','Run code'],['pyRun','Run code'],['hintBtn','Show or hide hint'],['learnBtn','Show or hide learning help'],['sampleBtn','Show or hide answer'],['pyAnswer','Show or hide answer']].forEach(([id,label])=>{const b=document.getElementById(id);if(b){b.setAttribute('aria-label',label);b.title=label}});
  [['resetBtn','Reset code'],['pyReset','Reset code']].forEach(([id,label])=>{const b=document.getElementById(id);if(b){b.textContent=label;b.classList.add('dangerConfirm');b.setAttribute('aria-label',label)}});
}
document.addEventListener('click',e=>{
  const reset=e.target.closest&&e.target.closest('#resetBtn,#pyReset');
  if(reset&&!window.confirm('Reset this code to the starter version? Your current edits will be replaced.')){e.preventDefault();e.stopImmediatePropagation();}
},true);
const markOutput=id=>{const el=document.getElementById(id);if(!el)return;const set=()=>{const t=el.textContent||'';el.dataset.state=/✓\s*Passed/i.test(t)?'passed':(/error|traceback|exception/i.test(t)?'error':'')};new MutationObserver(set).observe(el,{childList:true,subtree:true,characterData:true});set()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{setup();markOutput('out');markOutput('pyOut')});else{setup();markOutput('out');markOutput('pyOut')}
new MutationObserver(()=>setup()).observe(document.documentElement,{childList:true,subtree:true});
})();