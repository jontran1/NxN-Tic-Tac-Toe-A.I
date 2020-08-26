# tic tac toe
Play with an a.i in tic tac toe

As of right now, a.i uses Depth First Search to look for a "winning" path. Its horribly slow. 

I made it possible for the board to be NxN instead of the usual 3x3. 

What I hope to add in the future is the minimax algorithm for the a.i, a method for the user to change the board size to any number, and a way for the user can switch algorithms to see the different run times.  



#### DFS In Action

- First how does it work?

  - How my method of DFS work for tic-tac-toe works is that, the algorithm will search for a path to the winning state. While searching it will alternate between the AI taking a turn and the player taking a turn. It will basically take every single possible path until it reaches a winning state. Once that winning path is found. it will recursively backtrack up the call stack. At the top of the call stack it will turn THAT next possible move which allowed the A.I to reach that winning state. 

- Problems with DFS.

  - It basically uses the first path it finds to the winning state neverminded the other shorter more optimized paths. 

  - The simplest way I can put it is. Is it possible for the A.I to win if it performs this move? If so, move there. If not, look else where.  So while its still doing something "smart", its still pretty dumb.

  - It's pretty fast on a 3x3 grid. On a 4x4 grid, it slows a tiny bit. On 5x5 it really shows how slow DFS is.  Anything higher then or equal to 5 will be too slow. 

    

![dfs_demo_2](/images/dfs_demo_2.gif)



![dfs_demo_1](/images/dfs_demo_1.gif)