// Compatibility shim: ui-v2 still calls the removed dashboard renderer during startup.
// Progress now lives in the DSA map, so this intentionally does nothing.
window.renderDashboard = window.renderDashboard || function(){};