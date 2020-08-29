
let n = 3;
const gameManager = new GameManager(n);
document.getElementById("depth").innerHTML = "Current Depth:" + gameManager.depth;
alert("WARNING! Depending on the size of the board, depth, and algorthim, Your browser may crash. The number of games possible is exponential as n grows larger.")
alert("Depth only applies to Minimax and Minimax Pruning.")
gameManager.startGame();

document.getElementById("resetButton").addEventListener("click", () => {
    gameManager.resetGame(n);
    gameManager.ai.depth = parseInt(depth);
    document.getElementById("depth").innerHTML = "Current Depth:" + gameManager.depth;
});

document.getElementById("setDepthButton").addEventListener("click", () => {
    depth = prompt("Enter a integer:");
    gameManager.depth = parseInt(depth);
    document.getElementById("depth").innerHTML = "Current Depth:" + depth;
});

document.getElementById("changeBoardSizeButton").addEventListener("click", () => {
    newSize = prompt("Enter a integer:");
    n = parseInt(newSize);
    gameManager.resetGame(n);
    document.getElementById("depth").innerHTML = "Current Depth:" + gameManager.depth;
});

document.getElementById("minimaxPruning").addEventListener("click", () => {
    gameManager.algorithm = algorithm.MINIMAX_PRUNING;
});

document.getElementById("minimax").addEventListener("click", () => {
    gameManager.algorithm = algorithm.MINIMAX;
});

document.getElementById("dfs_shortest_path").addEventListener("click", () => {
    gameManager.algorithm = algorithm.DFS_Shortest_Path;
});

document.getElementById("dfs").addEventListener("click", () => {
    gameManager.algorithm = algorithm.DFS;
});