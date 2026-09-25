// UI/learning refinements layered after app.js.
(() => {
  const traversalIntro = '<b>Traversal</b><br>Traversal means visiting the elements of a data structure. For an array/list, this usually means going through the elements one by one. In Python, you normally implement traversal with a <code>for</code> loop or sometimes a <code>while</code> loop.<br><br><b>Array vs Python list</b><br>DS&A and LeetCode often say <i>array</i>. In Python, that input is usually represented by a <code>list</code>, such as <code>nums = [3, -1, 5]</code>. A Python list is a dynamic-array-like structure, so for these problems you can usually read “array” as “Python list.”<br><br>';

  [0,1,2].forEach(i => { if (qs[i]) qs[i].category = 'Traversal'; });
  if (qs[0]) qs[0].lesson = traversalIntro + qs[0].lesson.replace('<b>Lists and loops</b><br>', '');
  if (qs[1]) qs[1].lesson = traversalIntro + qs[1].lesson;
  if (qs[2]) qs[2].lesson = traversalIntro + qs[2].lesson.replace('<b>Scanning a list</b><br>A scan visits every value once.', '<b>Keeping state while traversing</b><br>Traversal visits every value once.');

  // app.js rendered the map before this file renamed the first categories. Re-render it now.
  const mapCard=document.getElementById('mapCard'),progressCard=document.getElementById('progressCard');
  if(mapCard&&!mapCard.classList.contains('hidden')) setTimeout(()=>renderConceptMap(),0);
  renderDashboard();

  // Complexity controls read vertically.
  window.oPicker = function(){
    const o='<option value="">?</option><option>1</option><option>log n</option><option>n</option><option>n log n</option><option>n^2</option><option>2^n</option><option>V + E</option>';
    return '<div class="complexityRows"><label>Time O(<select id="timePick">'+o+'</select>)</label><label>Space O(<select id="spacePick">'+o+'</select>)</label><button id="checkComplexity">Check</button></div><div id="complexityResult" class="checkResult"></div>';
  };

  const learnBtn=document.getElementById('learnBtn'), learnBox=document.getElementById('learnBox');
  learnBtn.onclick=()=>{
    if(learnBox.classList.contains('show')){learnBox.classList.remove('show');learnBox.innerHTML='';return;}
    const x=qs[idx],n=helpLevel(idx)+1;localStorage.setItem('bb_help_'+idx,n);
    const generic='Break the problem into three questions: 1) What is the input? 2) What value must I return? 3) What tiny Python operation can move me one step closer? Write and run that tiny operation before solving the whole problem.';
    learnBox.classList.add('show');learnBox.innerHTML='<b>Learn basics</b><br>'+lessonVisual(x)+(x.lesson||generic)+(n>1?'<br><br><b>Still stuck?</b> Trace one small example, then code one operation at a time.':'');renderLessonVisual(learnBox);renderProgress();
  };

  const hintBtn=document.getElementById('hintBtn'),hintBox=document.getElementById('hintBox');
  hintBtn.onclick=()=>{
    if(hintBox.classList.contains('show')){hintBox.classList.remove('show');hintBox.innerHTML='';return;}
    localStorage.setItem('bb_hints_'+idx,+(localStorage.getItem('bb_hints_'+idx)||0)+1);renderProgress();
    hintBox.classList.add('show');hintBox.innerHTML='<b>Hint</b><br>'+qs[idx].hint;
  };

  const answerBtn=document.getElementById('sampleBtn'),answerBox=document.getElementById('answerBox');
  answerBtn.textContent='Answer';
  answerBtn.onclick=()=>{
    if(answerBox.classList.contains('show')){answerBox.classList.remove('show');answerBox.innerHTML='';return;}
    const x=qs[idx],notes=sampleNotes(x);
    answerBox.classList.add('show');answerBox.innerHTML='<pre>'+escapeHtml(x.sample)+'</pre>'+(notes?'<div class="answerNotes">'+escapeHtml(notes).replace(/\n/g,'<br>')+'</div>':'');
  };

  const previousLoad=window.load;
  window.load=function(){previousLoad();[learnBox,hintBox,answerBox].forEach(el=>{el.classList.remove('show');el.innerHTML='';});};

  // Overview cards stay visible but can collapse to one compact header row.
  document.querySelectorAll('[data-collapse]').forEach(btn=>{
    const card=document.getElementById(btn.dataset.collapse),key='bb_collapsed_'+btn.dataset.collapse;
    if(localStorage.getItem(key)==='1')card.classList.add('collapsed');
    btn.onclick=()=>{
      const was=card.classList.contains('collapsed');card.classList.toggle('collapsed');
      localStorage.setItem(key,card.classList.contains('collapsed')?'1':'0');
      if(was&&card.id==='mapCard') setTimeout(()=>renderConceptMap(),0);
    };
  });

  // Fix map sizing when Mermaid loaded while its card had no usable width.
  const redrawMap=()=>{if(mapCard&&!mapCard.classList.contains('hidden')&&!mapCard.classList.contains('collapsed')) renderConceptMap();};
  window.addEventListener('resize',()=>{clearTimeout(window.__mapResize);window.__mapResize=setTimeout(redrawMap,180)});
  setTimeout(redrawMap,250);

  refreshOptions();
})();