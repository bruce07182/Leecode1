// Curriculum clarity refinements. Loaded after python-dsa.js.
// Rule: concrete problem -> tiny example -> visual/pattern -> terminology -> Python -> complexity.
(()=>{
  const all=window.DSA_LEVEL3||[];
  const dp=all.find(x=>x.t==='Dynamic programming');
  if(!dp) return;

  dp.tip=`<b>Start with the problem, not the DP terminology.</b><br><br>
Imagine a staircase with <code>n</code> steps. You start at step 0. Each move, you may climb either <b>1 step</b> or <b>2 steps</b>. How many different ways can you reach the top?<br><br>
For <code>n = 3</code>, there are 3 ways:<br>
<code>1 + 1 + 1</code><br>
<code>1 + 2</code><br>
<code>2 + 1</code><br><br>
Now notice the useful pattern. To reach step 4, your final move must come from either:<br>
• step 3, then move 1 step<br>
• step 2, then move 2 steps<br><br>
So the number of ways to reach step 4 is:<br>
<code>ways[4] = ways[3] + ways[2]</code><br><br>
That same idea works for every step:<br>
<code>ways[i] = ways[i - 1] + ways[i - 2]</code><br><br>
<b>This is dynamic programming.</b> Solve smaller versions first, remember their answers, then reuse those answers to solve the bigger problem. The name <code>dp</code> is just a common variable name for the list that remembers those answers.<pre class="dsDiagram">DP stored states</pre>`;

  dp.ex=`n = 4
# dp[i] = number of ways to reach step i
dp = [0] * (n + 1)
dp[0] = 1   # one way to be at the starting point
dp[1] = 1   # only: 1

for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp)     # [1, 1, 2, 3, 5]
print(dp[n])  # 5

# Time: O(n)
# Space: O(n)`;

  dp.task='You are at the bottom of a staircase with n steps. Each move, you can climb either 1 step or 2 steps. Return how many different ways you can reach the top. Example: n = 3 has 3 ways: 1+1+1, 1+2, and 2+1.';
  dp.start=`def climb_stairs(n):
    # Think about the last move:
    # to reach step i, where could you have come from?
    pass

print(climb_stairs(4))`;
  dp.answer=`def climb_stairs(n):
    if n <= 1:
        return 1

    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]

print(climb_stairs(4))

# Time: O(n)
# Space: O(n)`;
  dp.test=o=>o.trim()==='5';
})();