(()=>{
'use strict';
const URL='https://eylaymrbyjjbvkgebvzv.supabase.co',KEY='sb_publishable_SXbGa-hEOpxjEpk3bvsJEw_AByTO9I9';
const client=supabase.createClient(URL,KEY),$=id=>document.getElementById(id);
let db=null,SQL=null,current=0,mode='basic';
const lessons=[
['SELECT','Show all customers.','SELECT * FROM customers;'],
['WHERE','Find customers in Seattle.','SELECT * FROM customers WHERE city = \'Seattle\';'],
['ORDER BY','List orders from largest to smallest total.','SELECT * FROM orders ORDER BY total DESC;'],
['LIMIT','Show the two largest orders.','SELECT * FROM orders ORDER BY total DESC LIMIT 2;'],
['COUNT / SUM','Find the number of orders and their total value.','SELECT COUNT(*) AS order_count, SUM(total) AS revenue FROM orders;'],
['GROUP BY','Find total spending per customer ID.','SELECT customer_id, SUM(total) AS spending FROM orders GROUP BY customer_id;'],
['JOIN','Show customer names beside their orders.','SELECT customers.name, orders.id, orders.total FROM customers JOIN orders ON customers.id = orders.customer_id;'],
['HAVING','Find customers with total spending over 100.','SELECT customer_id, SUM(total) AS spending FROM orders GROUP BY customer_id HAVING SUM(total) > 100;'],
['LEFT JOIN','Include customers even when they have no orders.','SELECT customers.name, orders.total FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;'],
['Subquery','Find orders larger than the average order total.','SELECT * FROM orders WHERE total > (SELECT AVG(total) FROM orders);'],
['CREATE TABLE','Design a new products table with an ID, name, and price.','CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL);'],
['INSERT','Add a new customer.','INSERT INTO customers (id, name, city) VALUES (5, \'Eva\', \'Seattle\');'],
['UPDATE','Change Ben’s city to Seattle.','UPDATE customers SET city = \'Seattle\' WHERE id = 2;'],
['DELETE','Delete order 104.','DELETE FROM orders WHERE id = 104;'],
['ALTER TABLE','Add an email column to customers.','ALTER TABLE customers ADD COLUMN email TEXT;']
];
const beginner=['SELECT','WHERE','ORDER BY','LIMIT'];
const design=['CREATE TABLE','INSERT','UPDATE','DELETE','ALTER TABLE'];
const explanations={
'SELECT':['Pick columns','SELECT chooses what information to display. * means all columns.','SELECT name FROM customers;'],
'WHERE':['Filter rows','WHERE keeps only rows that match a condition. Text values use quotes.',"SELECT name FROM customers WHERE city = 'Seattle';"],
'ORDER BY':['Sort results','ORDER BY sorts rows. DESC means largest first; ASC means smallest first.','SELECT * FROM orders ORDER BY total DESC;'],
'LIMIT':['Show fewer rows','LIMIT returns only the first N rows. Combine with ORDER BY for top results.','SELECT * FROM orders LIMIT 2;'],
'COUNT / SUM':['Calculate totals','COUNT counts rows; SUM adds numbers. AS gives the result a friendly column name.','SELECT COUNT(*) AS total_orders FROM orders;'],
'GROUP BY':['Summarize groups','GROUP BY combines rows with the same value before aggregate calculations.','SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id;'],
'JOIN':['Connect tables','JOIN matches rows across tables using shared keys.','SELECT customers.name, orders.total FROM customers JOIN orders ON customers.id = orders.customer_id;'],
'HAVING':['Filter groups','HAVING filters aggregated groups; WHERE filters individual rows.','SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id HAVING SUM(total)>100;'],
'LEFT JOIN':['Keep unmatched rows','LEFT JOIN keeps every row from the left table even without a match.','SELECT customers.name, orders.total FROM customers LEFT JOIN orders ON customers.id=orders.customer_id;'],
'Subquery':['Query inside query','A subquery provides a value or result set to the outer query.','SELECT * FROM orders WHERE total > (SELECT AVG(total) FROM orders);'],
'CREATE TABLE':['Design a table','First identify entities (customers, orders), columns and types. Use a primary key for identity; a foreign key to connect tables. CREATE TABLE defines the structure.','CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL);'],
'INSERT':['Create a row','INSERT adds new records. List the columns so values go into the correct fields.',"INSERT INTO customers (id, name, city) VALUES (5, 'Eva', 'Seattle');"],
'UPDATE':['Change existing rows','UPDATE changes values in matching rows. Always check the WHERE clause before running, or every row may change.',"UPDATE customers SET city = 'Seattle' WHERE id = 2;"],
'DELETE':['Remove rows','DELETE removes matching rows. Without WHERE, it removes every row in the table.','DELETE FROM orders WHERE id = 104;'],
'ALTER TABLE':['Change a table design','ALTER TABLE modifies an existing table structure. This example adds a column.','ALTER TABLE customers ADD COLUMN email TEXT;']
};
const visuals={
'SELECT':{before:'customers: id | name | city',after:'result: 4 rows with id, name and city',note:'Show all columns'},
'WHERE':{before:'customers: Amy · Seattle | Ben · Portland | Cara · Seattle',after:'result: Amy, Cara',note:'Keep matching rows'},
'ORDER BY':{before:'orders: $75, $50, $120, $40',after:'result: $120, $75, $50, $40',note:'Sort rows'},
'LIMIT':{before:'orders by total: $120, $75, $50, $40',after:'result: $120, $75',note:'Keep two largest'},
'COUNT / SUM':{before:'orders: $75 + $50 + $120 + $40',after:'result: 4 orders · $285',note:'Count and total'},
'GROUP BY':{before:'orders: Amy $75 + $50 | Ben $120 | Cara $40',after:'result: customer 1 → $125; 2 → $120; 3 → $40',note:'Combine matching groups'},
'JOIN':{before:'customers: id → name | orders: customer_id → total',after:'result: Amy → $75, Amy → $50, Ben → $120, Cara → $40',note:'Match IDs across tables'},
'HAVING':{before:'group totals: 1 → $125; 2 → $120; 3 → $40',after:'result: customers 1 and 2',note:'Filter group totals'},
'LEFT JOIN':{before:'customers: Amy, Ben, Cara, Dan | orders: Amy, Ben, Cara',after:'result includes Dan → NULL',note:'Keep unmatched customers'},
'Subquery':{before:'orders: $75, $50, $120, $40 | average: $71.25',after:'result: $75, $120',note:'Use one query inside another'},
'CREATE TABLE':{before:'design: products → id, name, price',after:'new table: products (id PK, name, price)',note:'Define table structure'},
'INSERT':{before:'customers: 4 rows',after:'customers: 5 rows · Eva added',note:'Add a record'},
'UPDATE':{before:'Ben → Portland',after:'Ben → Seattle',note:'Change matching record'},
'DELETE':{before:'orders: 101, 102, 103, 104',after:'orders: 101, 102, 103',note:'Remove matching record'},
'ALTER TABLE':{before:'customers: id, name, city',after:'customers: id, name, city, email',note:'Add a column'}
};
function lessonDiagram(topic){const v=visuals[topic];return '<div class="sqlFlow" role="img" aria-label="'+esc(v.note)+': '+esc(v.before)+' becomes '+esc(v.after)+'"><div class="sqlFlowBox"><small>Before</small><div>'+esc(v.before)+'</div></div><div class="sqlFlowMiddle">→<small>'+esc(v.note)+'</small></div><div class="sqlFlowBox"><small>After</small><div>'+esc(v.after)+'</div></div></div>'}
const keywords=/\b(SELECT|FROM|WHERE|ORDER|BY|LIMIT|ASC|DESC|AS|COUNT|SUM|AVG|GROUP|JOIN|LEFT|ON|HAVING|AND|OR|NOT|DISTINCT|NULL|INSERT|UPDATE|DELETE|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|INTEGER|TEXT|REAL|SET|VALUES|INTO|ALTER|ADD|COLUMN|DEFAULT|UNIQUE)\b/gi;
function highlight(sql){return esc(sql).replace(keywords,'<strong class="sqlKeyword">$1</strong>')}
function esc(v){return String(v??'NULL').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function reset(){if(db)db.close();db=new SQL.Database();db.run("CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT); INSERT INTO customers VALUES(1,'Amy','Seattle'),(2,'Ben','Portland'),(3,'Cara','Seattle'),(4,'Dan','Tacoma'); CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,total REAL,FOREIGN KEY(customer_id) REFERENCES customers(id)); INSERT INTO orders VALUES(101,1,75),(102,1,50),(103,2,120),(104,3,40);");$('sqlStatus').textContent='Sample database ready: customers (4 rows), orders (4 rows).'}
const steps=[
['Create a customer table','CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT);'],
['Add Amy and Ben',"INSERT INTO customers VALUES(1,'Amy','Seattle'),(2,'Ben','Portland');"],
['Read the customer list','SELECT * FROM customers;'],
['Add an orders table','CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,total REAL); INSERT INTO orders VALUES(101,1,75),(102,1,50),(103,2,120);'],
['Connect customers and orders','SELECT customers.name,orders.id,orders.total FROM customers JOIN orders ON customers.id=orders.customer_id;']
];
let guidedDb=null,step=0,extraStep=3,done=false,extraDone=false;
function resultHtml(results){return results.map(r=>'<table><tr>'+r.columns.map(c=>'<th>'+esc(c)+'</th>').join('')+'</tr>'+r.values.map(row=>'<tr>'+row.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</table>').join('')}
function snapshot(){if(!guidedDb)return '<p>No tables yet.</p>';const names=guidedDb.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");if(!names.length)return '<p>No tables yet.</p>';return names[0].values.map(v=>{const data=guidedDb.exec('SELECT * FROM '+v[0]);const schema=guidedDb.exec('PRAGMA table_info('+v[0]+')');const cols=data.length?data:schema.length?[{columns:schema[0].values.map(x=>x[1]),values:[]}]:[];return '<h4>'+esc(v[0])+'</h4>'+(cols.length?resultHtml(cols):'<p>Empty table</p>')}).join('')}
const guideExplain=[
'<b>CREATE TABLE</b> creates a <b>table</b> named customers. <b>Columns</b> are id, name, city. <b>INTEGER</b> means number; <b>TEXT</b> means words. <b>PRIMARY KEY</b> makes each id unique.',
'<b>INSERT INTO</b> adds <b>rows</b> (records). <b>VALUES</b> gives the id, name and city for Amy and Ben.',
'<b>SELECT</b> reads data; <b>*</b> means every column; <b>FROM</b> identifies the table. Reading does not change stored data.',
'<b>CREATE TABLE</b> makes orders. <b>customer_id</b> links an order to a customer. <b>INSERT</b> adds three orders.',
'<b>JOIN</b> combines two <b>tables</b>. <b>ON</b> matches customers.id to orders.customer_id.'
];
const guideEffects=['Created an empty table with 3 columns.','Added 2 customer rows.','Returned 2 rows; the database is unchanged.','Created the orders table and added 3 rows.','Matched orders with customer names.'];
function refreshGuidedViews(){if(!$('sqlGuidedBeforeAfter'))return;$('sqlGuidedBeforeAfter').innerHTML='<b>Database</b>'+snapshot();}
function showStep(){
 $('sqlGuidedTask').textContent=(step+1)+'. '+steps[step][0];
 $('sqlGuidedProgress').textContent='Step '+(step+1)+' of 3';
 $('sqlGuidedCode').innerHTML=highlight(steps[step][1]);
 $('sqlGuidedExplain').innerHTML=guideExplain[step];
 refreshGuidedViews();
 $('sqlGuidedRun').textContent=done?'Continue →':'▶ Run SQL';
 $('sqlGuidedRun').disabled=done&&step===2;
 if(!done)$('sqlGuidedStatus').textContent='';
 $('sqlGuidedResult').innerHTML='';
 showExtra();
}
function showExtra(){
 const unlocked=done&&step===2;
 $('sqlGuidedExtraTask').textContent=(extraStep-2)+'. '+steps[extraStep][0];
 $('sqlGuidedExtraProgress').textContent='Deep dive · '+(extraStep-2)+' of 2';
 $('sqlGuidedExtraCode').innerHTML=highlight(steps[extraStep][1]);
 $('sqlGuidedExtraExplain').innerHTML=guideExplain[extraStep];
 $('sqlGuidedExtraRun').textContent=extraDone&&extraStep===3?'Continue →':extraDone?'Finished ✓':'▶ Run SQL';
 $('sqlGuidedExtraRun').disabled=!unlocked||(extraDone&&extraStep===4);
 if(!unlocked)$('sqlGuidedExtraStatus').textContent='Run the 3 basic SQL commands first; the same customers table will be used here.';
 refreshGuidedViews();
}
$('sqlGuidedRun').onclick=()=>{
 if(!guidedDb){$('sqlGuidedStatus').textContent='Loading SQL database…';return}
 if(done){if(step<2){step++;done=false;showStep()}return}
 try{
  const result=guidedDb.exec(steps[step][1]);done=true;
  refreshGuidedViews();
  $('sqlGuidedStatus').textContent=guideEffects[step];
  if(step===2)$('sqlGuidedResult').innerHTML='<b>SELECT result</b>'+resultHtml(result);
  $('sqlGuidedRun').textContent=step===2?'Finished ✓':'Continue →';
  $('sqlGuidedRun').disabled=step===2;
  showExtra();
 }catch(e){$('sqlGuidedStatus').textContent='SQL error: '+e.message}
};
$('sqlGuidedReset').onclick=()=>{
 if(!SQL)return;
 if(guidedDb)guidedDb.close();
 guidedDb=new SQL.Database();step=0;extraStep=3;done=false;extraDone=false;
 $('sqlGuidedExtraStatus').textContent='';$('sqlGuidedExtraResult').innerHTML='';
 $('sqlWebResults').innerHTML='';$('sqlWebStatus').textContent='';showStep()
};
$('sqlGuidedExtraRun').onclick=()=>{
 if(!guidedDb||!done||step!==2)return;
 if(extraDone){if(extraStep===3){extraStep=4;extraDone=false;showExtra()}return}
 try{
  const result=guidedDb.exec(steps[extraStep][1]);extraDone=true;
  $('sqlGuidedExtraStatus').textContent=guideEffects[extraStep];
  refreshGuidedViews();
  $('sqlGuidedExtraResult').innerHTML=extraStep===4?'<b>JOIN result</b>'+resultHtml(result):'';
  showExtra()
 }catch(e){$('sqlGuidedExtraStatus').textContent='SQL error: '+e.message}
};
$('sqlWebDemo').onclick=()=>{
 if(!guidedDb)return;
 try{const rows=guidedDb.exec("SELECT orders.id AS order_id,orders.total FROM orders JOIN customers ON customers.id=orders.customer_id WHERE customers.name='Amy'");
 $('sqlWebResults').innerHTML=rows.length?resultHtml(rows):'No orders found.';$('sqlWebStatus').textContent='Coffee store website · Amy’s orders'}
 catch(e){$('sqlWebStatus').textContent='Run the optional orders lesson first.'}
};
function render(){
 const visible=lessons.map((l,i)=>({l,i})).filter(x=>mode==='basic'?beginner.includes(x.l[0]):mode==='advanced'?!beginner.includes(x.l[0])&&!design.includes(x.l[0]):design.includes(x.l[0]));
 if(!visible.some(x=>x.i===current))current=visible[0]?.i??0;
 const x=lessons[current],info=explanations[x[0]];
 $('sqlModeBasic').classList.toggle('active',mode==='basic');$('sqlModeAdvanced').classList.toggle('active',mode==='advanced');$('sqlModeDesign').classList.toggle('active',mode==='design');$('sqlDesignGuide').hidden=mode!=='design';
 $('sqlTopics').innerHTML=visible.map(({l,i})=>'<button data-i="'+i+'" class="'+(i===current?'active':'')+'">'+(visible.findIndex(v=>v.i===i)+1)+'. '+esc(l[0])+'</button>').join('');
 $('sqlTopics').querySelectorAll('button').forEach(b=>b.onclick=()=>{current=+b.dataset.i;render()});
 $('sqlLesson').innerHTML='<h3>'+esc(info[0])+'</h3><p>'+esc(info[1])+'</p>'+lessonDiagram(x[0])+'<p class="muted"><b>SQL command</b></p><pre class="sqlHighlighted">'+highlight(info[2])+'</pre>';
 $('sqlMoreBody').textContent=({SELECT:'SELECT picks which columns to show. * means all columns. FROM names the table.',WHERE:'WHERE filters rows. Try city = \'Seattle\' or city = \'Portland\'.', 'ORDER BY':'DESC means largest first; ASC means smallest first.',LIMIT:'Use ORDER BY with LIMIT to select the largest or smallest values.'})[x[0]]||'Try changing the example query and compare the results.';$('sqlMore').open=false;
 $('sqlTask').textContent=x[1];$('sqlCode').value=x[2];$('sqlStatus').textContent=db?'Ready — press Run SQL.':'Loading SQL…';$('sqlExample').classList.add('hidden');$('sqlResult').innerHTML='';preview();
}
function preview(){$('sqlHighlight').innerHTML=highlight($('sqlCode').value)}
$('sqlCode').addEventListener('input',preview);
$('sqlModeBasic').onclick=()=>{mode='basic';current=0;render()};
$('sqlModeAdvanced').onclick=()=>{mode='advanced';current=4;render()};
$('sqlModeDesign').onclick=()=>{mode='design';current=10;render()};

$('sqlRun').onclick=()=>{if(!db){$('sqlStatus').textContent='Database is still loading. Please wait.';return;}const query=$('sqlCode').value.trim();if(!query)return;try{const result=db.exec(query);$('sqlResult').innerHTML=result.length?result.map(r=>'<table><thead><tr>'+r.columns.map(c=>'<th>'+esc(c)+'</th>').join('')+'</tr></thead><tbody>'+r.values.map(row=>'<tr>'+row.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>').join(''):'Query completed (no result rows). Use SELECT to inspect the changes.';$('sqlStatus').textContent='Executed successfully. Compare your output to the task.'}catch(e){$('sqlStatus').textContent='SQL error: '+e.message}};
$('sqlReset').onclick=()=>{if(SQL){reset();$('sqlResult').innerHTML=''}};
$('sqlAnswer').onclick=()=>{const p=$('sqlExample');p.textContent=lessons[current][2];p.classList.toggle('hidden')};
$('sqlLogin').onclick=async()=>{const {error}=await client.auth.signInWithPassword({email:$('sqlEmail').value,password:$('sqlPassword').value});$('sqlAuthMsg').textContent=error?error.message:'Signing in…'};
async function auth(){try{const {data,error}=await client.auth.getSession();if(error||!data.session){document.body.classList.add('auth-locked');return}document.body.classList.remove('auth-locked');if(!SQL){try{SQL=await initSqlJs({locateFile:file=>'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/'+file});guidedDb=new SQL.Database();showStep();reset();render()}catch(e){$('sqlStatus').textContent='SQL runtime failed to load: '+e.message}}}catch(e){document.body.classList.add('auth-locked');$('sqlAuthMsg').textContent='Could not verify session.'}}
client.auth.onAuthStateChange(()=>{setTimeout(auth,0)});auth();
})();