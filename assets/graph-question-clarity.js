// Clarify Graph neighbors without changing the runner.
(()=>{
  const q=window.qs?.find?.(x=>x.fn==='neighbors');
  if(!q) return;
  q.desc='Inputs: an adjacency dictionary graph and a node key. The node key can be a string or a number, matching the keys used by graph. Return a new list of that node\'s direct neighbors. If the node is not present in graph, return an empty list. Example: graph = {"A": ["B", "C"]}, node = "A" returns ["B", "C"].';
  q.tests=[
    [[{'A':['B','C'],'B':['A']},'A'],['B','C']],
    [[{0:[1,2],1:[0],2:[0]},0],[1,2]],
    [[{},'A'],[]],
    [[{0:[1]},9],[]]
  ];
  q.lesson='<b>What type is node?</b><br><code>node</code> is a dictionary key, so it may be a string such as <code>"A"</code> or a number such as <code>0</code>. Its type must match the keys in <code>graph</code>.<br><br><b>Adjacency dictionary</b><br><code>{"A": ["B", "C"]}</code> means node A has direct neighbors B and C. With numeric nodes, <code>{0: [1, 2]}</code> means node 0 has neighbors 1 and 2.<br><br><b>Important missing-node case</b><br><code>graph[node]</code> works only when <code>node</code> exists. If it is missing, Python raises <code>KeyError</code>. This exercise requires an empty list for a missing node, so use <code>graph.get(node, [])</code>.<br><br><b>Why no loop is required</b><br>The adjacency dictionary already stores the neighbor list. If the node exists, <code>graph.get(node, [])</code> directly returns that list.<br><br><b>Complexity</b><br>Dictionary lookup is expected O(1). Returning the stored list itself is O(1); iterating or copying all neighbors would take O(deg(node)).';
  q.hint='node can be a string or number. Use graph.get(node, []) so a missing node returns [] instead of raising KeyError.';
})();