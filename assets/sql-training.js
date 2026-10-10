(()=>{
'use strict';
const URL='https://eylaymrbyjjbvkgebvzv.supabase.co',KEY='sb_publishable_SXbGa-hEOpxjEpk3bvsJEw_AByTO9I9';
const client=supabase.createClient(URL,KEY),$=id=>document.getElementById(id);
let db=null,SQL=null,current=0;
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
['Subquery','Find orders larger than the average order total.','SELECT * FROM orders WHERE total > (SELECT AVG(total) FROM orders);']
];
function esc(v){return String(v??'NULL').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function reset(){if(db)db.close();db=new SQL.Database();db.run("CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT); INSERT INTO customers VALUES(1,'Amy','Seattle'),(2,'Ben','Portland'),(3,'Cara','Seattle'),(4,'Dan','Tacoma'); CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,total REAL,FOREIGN KEY(customer_id) REFERENCES customers(id)); INSERT INTO orders VALUES(101,1,75),(102,1,50),(103,2,120),(104,3,40);");$('sqlStatus').textContent='Sample database ready: customers (4 rows), orders (4 rows).'}
function render(){const x=lessons[current];$('sqlTopics').innerHTML=lessons.map((l,i)=>'<button data-i="'+i+'" class="'+(i===current?'active':'')+'">'+(i+1)+'. '+esc(l[0])+'</button>').join('');$('sqlTopics').querySelectorAll('button').forEach(b=>b.onclick=()=>{current=+b.dataset.i;render()});$('sqlTask').textContent=x[1];$('sqlCode').value=x[2];$('sqlExample').classList.add('hidden');$('sqlResult').innerHTML=''}
$('sqlRun').onclick=()=>{if(!db)return;const query=$('sqlCode').value.trim();if(!query)return;try{const result=db.exec(query);$('sqlResult').innerHTML=result.length?result.map(r=>'<table><thead><tr>'+r.columns.map(c=>'<th>'+esc(c)+'</th>').join('')+'</tr></thead><tbody>'+r.values.map(row=>'<tr>'+row.map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>').join(''):'Query completed (no result rows).';$('sqlStatus').textContent='Executed successfully. Compare your output to the task.'}catch(e){$('sqlStatus').textContent='SQL error: '+e.message}};
$('sqlReset').onclick=()=>{if(SQL){reset();$('sqlResult').innerHTML=''}};
$('sqlAnswer').onclick=()=>{const p=$('sqlExample');p.textContent=lessons[current][2];p.classList.toggle('hidden')};
$('sqlLogin').onclick=async()=>{const {error}=await client.auth.signInWithPassword({email:$('sqlEmail').value,password:$('sqlPassword').value});$('sqlAuthMsg').textContent=error?error.message:'Signing in…'};
async function auth(){try{const {data,error}=await client.auth.getSession();if(error||!data.session){document.body.classList.add('auth-locked');return}document.body.classList.remove('auth-locked');if(!SQL){try{SQL=await initSqlJs({locateFile:file=>'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/'+file});reset();render()}catch(e){$('sqlStatus').textContent='SQL runtime failed to load: '+e.message}}}catch(e){document.body.classList.add('auth-locked');$('sqlAuthMsg').textContent='Could not verify session.'}}
client.auth.onAuthStateChange(()=>{setTimeout(auth,0)});auth();
})();