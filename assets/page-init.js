// Page bootstrap only. Keep feature/UI behavior in its owning asset file.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad:false,
  theme:'base',
  flowchart:{curve:'basis',nodeSpacing:28,rankSpacing:44,useMaxWidth:true}
});
window.mermaid=mermaid;

// Shared Level 3 data uses this minimal factory when loaded from the DSA page.
window.L=window.L||((level,t,tip,ex,task,start,answer,test)=>({level,t,tip,ex,task,start,answer,test}));
window.lessons=window.lessons||[];
window.levelInfo=window.levelInfo||{};

// Auth visibility is deliberately small and isolated so presentation changes cannot own startup.
const applyAuthVisibility=user=>document.body.classList.toggle('auth-locked',!user);
try{
  const {data}=await db.auth.getSession();
  applyAuthVisibility(data.session?.user||null);
  db.auth.onAuthStateChange((event,session)=>applyAuthVisibility(session?.user||null));
}catch(error){
  console.error('Auth initialization failed',error);
  // Fail visibly instead of leaving the entire application permanently blank.
  document.body.classList.remove('auth-locked');
}
