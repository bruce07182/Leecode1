// Shared Python/Pyodide runtime for Foundations, Python Training, and LeetCode Practice.
(()=>{
const INDEX_URL='https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';
let runtimePromise=null;
function load({timeoutMs=20000}={}){
 if(runtimePromise)return runtimePromise;
 runtimePromise=(async()=>{
  if(typeof loadPyodide!=='function')throw new Error('Pyodide loader script is unavailable.');
  const timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error('Python loading timed out. Check network/CDN access and retry.')),timeoutMs));
  return Promise.race([loadPyodide({indexURL:INDEX_URL}),timeout]);
 })().catch(e=>{runtimePromise=null;throw e});
 return runtimePromise;
}
function literal(v){if(v===null)return'None';if(v===true)return'True';if(v===false)return'False';if(typeof v==='string')return JSON.stringify(v);if(Array.isArray(v))return'['+v.map(literal).join(',')+']';if(v&&typeof v==='object')return'{'+Object.entries(v).map(([k,x])=>literal(k)+':'+literal(x)).join(',')+'}';return String(v)}
function toJS(v){const out=v&&v.toJs?v.toJs({dict_converter:Object.fromEntries}):v;if(v&&v.destroy)v.destroy();return out}
window.PythonRuntime=Object.freeze({load,literal,toJS,indexURL:INDEX_URL});
})();