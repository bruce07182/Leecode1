// Page bootstrap only. Auth/session ownership lives in app.js.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad:false,
  theme:'base',
  flowchart:{curve:'basis',nodeSpacing:28,rankSpacing:44,useMaxWidth:true}
});
window.mermaid=mermaid;
