// Synchronous data bootstrap required before python-dsa.js.
// Explicit global bindings avoid relying on browser-specific named Window resolution.
var L=window.L||((level,t,tip,ex,task,start,answer,test)=>({level,t,tip,ex,task,start,answer,test}));
var lessons=window.lessons||[];
var levelInfo=window.levelInfo||{};
window.L=L;
window.lessons=lessons;
window.levelInfo=levelInfo;
