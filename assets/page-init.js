// Page bootstrap only. Feature/UI behavior belongs in its owning asset file.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad:false,
  theme:'base',
  flowchart:{curve:'basis',nodeSpacing:28,rankSpacing:44,useMaxWidth:true}
});
window.mermaid=mermaid;

// Auth visibility is isolated so presentation changes cannot own startup.
const applyAuthVisibility=user=>document.body.classList.toggle('auth-locked',!user);
try{
  const {data}=await db.auth.getSession();
  applyAuthVisibility(data.session?.user||null);
  db.auth.onAuthStateChange((event,session)=>applyAuthVisibility(session?.user||null));
}catch(error){
  console.error('Auth initialization failed',error);
  // Fail closed: auth uncertainty must never expose practice.
  document.body.classList.add('auth-locked');
  document.getElementById('authCard')?.classList.remove('hidden');
}
