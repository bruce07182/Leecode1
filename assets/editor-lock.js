// Protect completed solutions from accidental edits.
// After a successful run, the editor becomes read-only and Run becomes Edit.
(() => {
  const code = document.getElementById('code');
  const button = document.getElementById('runBtn');
  const history = document.getElementById('history');
  const select = document.getElementById('q');
  if (!code || !button || !history || !select) return;

  function hasPassedCurrent() {
    const i = Number(select.value);
    return Number.isInteger(i) && typeof window.foundationCompleted === 'function'
      ? window.foundationCompleted(i)
      : false;
  }

  function setLocked(locked) {
    code.readOnly = locked;
    code.setAttribute('aria-readonly', locked ? 'true' : 'false');
    code.classList.toggle('solutionLocked', locked);
    button.textContent = locked ? '✏️ Edit' : '▶ Run';
    button.title = locked ? 'Unlock this completed solution for editing' : 'Run tests';
  }

  // In capture phase, turn the existing Run button into Edit while locked,
  // without invoking the normal run handler.
  button.addEventListener('click', e => {
    if (!code.readOnly) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    setLocked(false);
    code.focus();
  }, true);

  // saveAttempt() updates Attempts after every completed run. A passing run locks code.
  new MutationObserver(() => {
    if (hasPassedCurrent()) setLocked(true);
  }).observe(history, {childList:true, subtree:true, characterData:true});

  // Switching questions or cloud-loading progress should reflect that question's state.
  select.addEventListener('change', () => setTimeout(() => setLocked(hasPassedCurrent()), 0));
  window.addEventListener('load', () => setTimeout(() => setLocked(hasPassedCurrent()), 0));
  setTimeout(() => setLocked(hasPassedCurrent()), 0);
})();
