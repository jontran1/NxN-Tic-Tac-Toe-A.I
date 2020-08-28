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

  - What about Time Complexity?  I believe the time complexity is (n^2)^(n^2). This is because dfs has a time complexity of b^d. b = branching factor, d = depth. There are n^2 possible choices at each state. Its possible for the depth to reach n^2, because each time the a.i makes a move it recursively calls dfs again, thus making the depth n^2.  Note: I know once the a.i makes a move, the number of possible choices is decreased at each state. However I have a n^2 for loop that looks for open spaces at each state. Still, I am still unsure about the time complexity and I would need to do more research. Space Complexity I believe it to be n^2. 
  
    - Drawing out all possible branches for a 2x2 grid will show this.   
    
    

![dfs_demo_2](/images/dfs_demo_2.gif)



![dfs_demo_1](/images/dfs_demo_1.gif)

#### MiniMax 

- Minimax is an interesting decision making algorithm. It basically plays out the game for you. In my version I have the AI minimizing the score while the player is trying to maximize. Each level of this recursive tree is trying to achieve the best outcome for themselves.     
- To save time I implemented a max depth, If I didn't do this, the time complexity would be too large. 

![minimax_demo_1](/images/minimax_demo_1.gif)

![minimax_demo_2](/images/minimax_demo_2.gif)

As you can see, even on a 5x5 board its too slow for normal play. Limiting the depth to say 3 gave better results. 

#### Minimax Pruning

- Something as minimax algorithm only different is this algorithm will prune a subtree if there's no point in going there.

![minimaxpruning_demo_1](/images/minimaxpruning_demo_1.gif)



![minimaxpruning_demo_2](/images/minimaxpruning_demo_2.gif)



![minimaxpruning_demo_3](/images/minimaxpruning_demo_3.gif)