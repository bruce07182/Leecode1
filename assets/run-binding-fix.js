// Compatibility fix: Reset code was removed from the UI, but older app.js still tries to bind resetBtn first.
// That null-element error prevents the following Run binding from executing.
(() => {
  const runBtn = document.getElementById('runBtn');
  if (runBtn && typeof run === 'function') runBtn.onclick = run;
})();
