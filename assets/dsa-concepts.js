// Canonical data-structure concept knowledge shared by teaching surfaces.
(()=>{
const concepts={
 'Array, String & Linked List':{
  relationship:'Arrays/lists and strings are indexed sequences. Linked lists are the useful contrast: separate nodes connected by links instead of direct indexed storage.',
  model:'ARRAY / STRING: indexed sequence\n          ↕ compare access/storage\nLINKED LIST: node → node → node',
  inside:'Array address ≈ base + index × item_size. A linked list starts at head and follows next links.',
  pseudo:'array[i]  // compute address directly\nfor (Node* p=head; p; p=p->next) { /* follow links */ }',
  complexity:'Array index O(1); scan/search O(n); middle insertion may shift O(n). Linked-list index/search O(n); insert after a known node O(1).'
 },
 'Set & Map':{
  relationship:'Set and map/dict are closely related hash-based lookup structures. A set stores membership; a map stores an associated value for each unique key.',
  model:'HASH TABLE\n├─ SET: key → present\n└─ MAP: key → associated value',
  inside:'Compute a hash from the key, choose a bucket, then resolve any collision.',
  pseudo:'bucket = hash(key) % capacity\n// set entry: key\n// map entry: key + value',
  complexity:'Lookup/insert/delete are expected O(1) with good hashing; worst-case O(n) with heavy collisions. Resizing is occasionally O(n), giving amortized O(1) insertion.'
 },
 'Stack & Queue':{
  relationship:'Both are access rules over a collection: stack removes newest first (LIFO); queue removes oldest first (FIFO).',
  model:'STACK: newest → OUT\nQUEUE: OUT ← oldest ... newest ← IN',
  inside:'A stack can use one array end. A queue uses a deque/circular buffer or head index so removal does not shift every element.',
  pseudo:'stack.push_back(x); stack.pop_back();\nqueue[tail]=x; tail=(tail+1)%capacity;\nhead=(head+1)%capacity;',
  complexity:'Stack push/pop are O(1) amortized. Proper queue enqueue/dequeue are O(1); shifting an array on every front removal would be O(n).'
 },
 'Tree, Graph & Heap':{
  relationship:'A graph allows general connections. A tree restricts that into a hierarchy. A binary heap adds complete-tree shape plus heap ordering for priority access.',
  model:'GRAPH\n  ↓ restrict connections\nTREE\n  ↓ complete shape + heap order\nHEAP',
  inside:'Graphs/trees follow edges or child links. A binary heap is commonly stored in an array, so parent/child positions are computed from indexes.',
  pseudo:'parent(i) = (i-1)/2\nleft(i) = 2*i+1\nright(i) = 2*i+2',
  complexity:'Graph traversal O(V+E); tree traversal O(n). A complete binary heap has height O(log n): peek O(1), push/pop O(log n).'
 }
};
window.DSAConcepts=Object.freeze({concepts,get:name=>concepts[name]||null});
})();
