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
const keywords=/\b(SELECT|FROM|WHERE|ORDER|BY|LIMIT|ASC|DESC|AS|COUNT|SUM|AVG|GROUP|JOIN|LEFT|ON|HAVING|AND|OR|NOT|DISTINCT|NULL|INSERT|UPDATE|DELETE|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|INTEGER|TEXT|REAL|SET|VALUES|INTO|ALTER|ADD|COLUMN|DEFAULT|UNIQUE)\b/gi;
function highlight(sql){return esc(sql).replace(keywords,'<strong class="sqlKeyword">$1</strong>')}
function esc(v){return String(v??'NULL').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function reset(){if(db)db.close();db=new SQL.Database();db.run("CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT); INSERT INTO customers VALUES(1,'Amy','Seattle'),(2,'Ben','Portland'),(3,'Cara','Seattle'),(4,'Dan','Tacoma'); CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,total REAL,FOREIGN KEY(customer_id) REFERENCES customers(id)); INSERT INTO orders VALUES(101,1,75),(102,1,50),(103,2,120),(104,3,40);");$('sqlStatus').textContent='Sample database ready: customers (4 rows), orders (4 rows).'}
function render(){
 const visible=lessons.map((l,i)=>({l,i})).filter(x=>mode==='basic'?beginner.includes(x.l[0]):mode==='advanced'?!beginner.includes(x.l[0])&&!design.includes(x.l[0]):design.includes(x.l[0]));
 if(!visible.some(x=>x.i===current))current=visible[0]?.i??0;
 const x=lessons[current],info=explanations[x[0]];
 $('sqlModeBasic').classList.toggle('active',mode==='basic');$('sqlModeAdvanced').classList.toggle('active',mode==='advanced');$('sqlModeDesign').classList.toggle('active',mode==='design');$('sqlDesignGuide').hidden=mode!=='design';
 $('sqlTopics').innerHTML=visible.map(({l,i})=>'<button data-i="'+i+'" class="'+(i===current?'active':'')+'">'+(visible.findIndex(v=>v.i===i)+1)+'. '+esc(l[0])+'</button>').join('');
 $('sqlTopics').querySelectorAll('button').forEach(b=>b.onclick=()=>{current=+b.dataset.i;render()});
 $('sqlLesson').innerHTML='<h3>'+esc(info[0])+'</h3><p>'+esc(info[1])+'</p><p class="muted">Example:</p><pre class="sqlHighlighted">'+highlight(info[2])+'</pre>';
 $('sqlTask').textContent=x[1];$('sqlCode').value=x[2];$('sqlExample').classList.add('hidden');$('sqlResult').innerHTML='';preview();
}
function preview(){$('sqlHighlight').innerHTML=highlight($('sqlCode').value)}
$('sqlCode').addEventListener('input',preview);
$('sqlModeBasic').onclick=()=>{mode='basic';current=0;render()};
$('sqlModeAdvanced').onclick=()=>{mode='advanced';current=4;render()};
$('sqlModeDesign').onclick=()=>{mode='design';current=10;render()};

$('sqlRun').onclick=()=>{if(!db)return;const query=$('sqlCode').value.trim();if(!query)return;try{const result=db.exec(query);$('sqlResult').innerHTML=result.length?result.map(r=>'<table><thead><tr>'+r.columns.map(c=>'<th>'+esc(c)+'</th>').join('')+'</tr></thead><tbody>'+r.values.map(row=>'<tr>'+row.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>').join(''):'Query completed (no result rows). Use SELECT to inspect the changes.';$('sqlStatus').textContent='Executed successfully. Compare your output to the task.'}catch(e){$('sqlStatus').textContent='SQL error: '+e.message}};
$('sqlReset').onclick=()=>{if(SQL){reset();$('sqlResult').innerHTML=''}};
$('sqlAnswer').onclick=()=>{const p=$('sqlExample');p.textContent=lessons[current][2];p.classList.toggle('hidden')};
$('sqlLogin').onclick=async()=>{const {error}=await client.auth.signInWithPassword({email:$('sqlEmail').value,password:$('sqlPassword').value});$('sqlAuthMsg').textContent=error?error.message:'Signing in…'};
async function auth(){try{const {data,error}=await client.auth.getSession();if(error||!data.session){document.body.classList.add('auth-locked');return}document.body.classList.remove('auth-locked');if(!SQL){try{SQL=await initSqlJs({locateFile:file=>'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/'+file});reset();render()}catch(e){$('sqlStatus').textContent='SQL runtime failed to load: '+e.message}}}catch(e){document.body.classList.add('auth-locked');$('sqlAuthMsg').textContent='Could not verify session.'}}
client.auth.onAuthStateChange(()=>{setTimeout(auth,0)});auth();
})();