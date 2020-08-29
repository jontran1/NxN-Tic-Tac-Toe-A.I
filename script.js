
let n = 3;
const gameManager = new GameManager(n);
document.getElementById("depth").innerHTML = "Current Depth:" + gameManager.depth;
gameManager.startGame();

document.getElementById("resetButton").addEventListener("click", () => {
    gameManager.resetGame(n);
    gameManager.ai.depth = parseInt(depth);
    document.getElementById("depth").innerHTML = "Current Depth:" + depth;
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