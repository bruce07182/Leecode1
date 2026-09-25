// Links advanced lessons back to prerequisite exercises and selected external references.
(() => {
  const refs = {
    19: { prior:[3,4], web:[['Python slicing','https://docs.python.org/3/library/functions.html#slice']] },
    20: { prior:[5,6], web:[['Python dictionaries','https://docs.python.org/3/tutorial/datastructures.html#dictionaries']] },
    21: { prior:[5], web:[['Python dictionaries','https://docs.python.org/3/tutorial/datastructures.html#dictionaries']] },
    22: { prior:[7], web:[['Python list as stack','https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks']] },
    23: { prior:[7], web:[['Python list as stack','https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks']] },
    24: { prior:[8], web:[['Python sorting','https://docs.python.org/3/howto/sorting.html']] },
    25: { prior:[8], web:[['Python sorting','https://docs.python.org/3/howto/sorting.html']] },
    26: { prior:[11], web:[['Binary search overview','https://en.wikipedia.org/wiki/Binary_search_algorithm']] },
    27: { prior:[11,26], web:[['bisect_left','https://docs.python.org/3/library/bisect.html']] },
    28: { prior:[12,13,6], web:[['deque','https://docs.python.org/3/library/collections.html#collections.deque'],['Breadth-first search','https://en.wikipedia.org/wiki/Breadth-first_search']] },
    29: { prior:[15,16], web:[['Tree traversal','https://en.wikipedia.org/wiki/Tree_traversal']] },
    30: { prior:[12,16], web:[['Breadth-first search','https://en.wikipedia.org/wiki/Breadth-first_search']] },
    31: { prior:[17], web:[['heapq','https://docs.python.org/3/library/heapq.html']] },
    32: { prior:[15], web:[['Backtracking','https://en.wikipedia.org/wiki/Backtracking']] },
    33: { prior:[18], web:[['Dynamic programming','https://en.wikipedia.org/wiki/Dynamic_programming']] },
    34: { prior:[18,33], web:[['Dynamic programming','https://en.wikipedia.org/wiki/Dynamic_programming']] },
    35: { prior:[18,34], web:[['Dynamic programming','https://en.wikipedia.org/wiki/Dynamic_programming']] },
    36: { prior:[15,18], web:[['functools.cache','https://docs.python.org/3/library/functools.html#functools.cache']] }
  };

  function qName(i){
    const q=window.qs && window.qs[i];
    return q ? (q.title || q.name || `Question ${i+1}`) : `Question ${i+1}`;
  }
  function go(i){
    const sel=document.getElementById('q');
    if(!sel) return;
    // Select by question index where possible; fall back to visible option position.
    const opt=[...sel.options].find(o=>Number(o.value)===i) || sel.options[i];
    if(opt){ sel.value=opt.value; sel.dispatchEvent(new Event('change',{bubbles:true})); }
    document.getElementById('questionCard')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  window.__goLesson=go;

  const old = window.renderLearn;
  function addLinks(){
    const box=document.getElementById('learnBox');
    if(!box || !box.classList.contains('show')) return;
    const r=refs[window.idx];
    if(!r || box.querySelector('.lessonRefs')) return;
    let html='<div class="lessonRefs" style="margin-top:12px;padding-top:10px;border-top:1px solid #ddd"><b>Review / references</b><div style="margin-top:6px">';
    if(r.prior?.length){
      html += '<span>Earlier lessons: </span>' + r.prior.map(i=>`<button type="button" class="lessonJump" data-q="${i}" style="margin:2px 4px 2px 0">${qName(i)}</button>`).join('');
    }
    if(r.web?.length){
      html += '<div style="margin-top:6px">More: ' + r.web.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer" style="margin-right:10px">${name} ↗</a>`).join('') + '</div>';
    }
    html += '</div></div>';
    box.insertAdjacentHTML('beforeend',html);
    box.querySelectorAll('.lessonJump').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.q))));
  }

  // Learn content is rendered by existing handlers. Observe it so this stays independent of app.js implementation.
  const box=document.getElementById('learnBox');
  if(box){ new MutationObserver(()=>setTimeout(addLinks,0)).observe(box,{childList:true,subtree:true,attributes:true,attributeFilter:['class']}); }
  document.getElementById('learnBtn')?.addEventListener('click',()=>setTimeout(addLinks,0));
})();