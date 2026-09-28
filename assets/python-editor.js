// Shared Python-friendly textarea behavior for Foundations, Python Training, and LeetCode Practice.
(()=>{
  window.attachPythonEditor=function(ta){
    if(!ta||ta.dataset.pythonEditor==='1')return;
    ta.dataset.pythonEditor='1';
    ta.spellcheck=false;
    ta.setAttribute('autocapitalize','off');
    ta.setAttribute('autocorrect','off');
    ta.setAttribute('autocomplete','off');
    ta.addEventListener('keydown',e=>{
      const start=ta.selectionStart,end=ta.selectionEnd,v=ta.value;
      if(e.key==='Tab'){
        e.preventDefault();
        if(e.shiftKey){
          const ls=v.lastIndexOf('\n',start-1)+1,before=v.slice(ls,start);
          const n=before.startsWith('    ')?4:before.startsWith('\t')?1:(before.match(/^ {1,3}/)?.[0].length||0);
          if(n){ta.value=v.slice(0,ls)+v.slice(ls+n);ta.selectionStart=ta.selectionEnd=Math.max(ls,start-n)}
        }else ta.setRangeText('    ',start,end,'end');
        ta.dispatchEvent(new Event('input',{bubbles:true}));
        return;
      }
      if(e.key==='Enter'){
        e.preventDefault();
        const ls=v.lastIndexOf('\n',start-1)+1,line=v.slice(ls,start);
        const indent=(line.match(/^\s*/)||[''])[0],extra=line.trimEnd().endsWith(':')?'    ':'';
        ta.setRangeText('\n'+indent+extra,start,end,'end');
        ta.dispatchEvent(new Event('input',{bubbles:true}));
      }
    });
  };
  document.querySelectorAll('textarea.pythonEditor, #code, #pyCode, #lcCode').forEach(window.attachPythonEditor);
})();