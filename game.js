let playerTurn = true;

const outcome = {
    PLAYER_WINS: 'player_wins',
    AI_WINS: 'ai_wins',
    TIE: 'tie'
}

/**
 * 
 * @param {Integer} n 
 */
function Board(n) {

    this.n = n;
    this.board = [];

    /**
     * Generate a 2D board. 
     */
    this.generateBoard = function (onClickEvent) {
        if (!onClickEvent) return;

        let table = document.getElementById("board");

        for (let row = 0; row < this.n; row++) {
            array = [];
            tableRow = table.insertRow(row);

            for (let col = 0; col < this.n; col++) {
                cell = tableRow.insertCell(col);
                cell.setAttribute("row", row);
                cell.setAttribute("col", col);
                cell.addEventListener('click', onClickEvent);
                array.push(cell);
            }
            this.board.push(array);
        }

    }

    /**
     * 
     * @param {Integer} i 
     * @param {Integer} j 
     * @param {String} symbol 
     * @returns {boolean}
     */
    this.set = function (i, j, symbol) {
        if (i < 0 || i >= n || j < 0 || j >= n) return false;
        if (symbol === '') {
            this.board[i][j].innerHTML = symbol;
            return true;
        }
        if (this.board[i][j].innerHTML) return false;

        this.board[i][j].innerHTML = symbol;
        return true;
    }

    /**
     * Returns the cell's innerHTML text. 
     * If its an empty string it will be evaluated as false.
     * @param {Integer} i 
     * @param {Integer} j 
     * @returns {String}
     */
    this.get = function (i, j) {
        if (i < 0 || i >= n || j < 0 || j >= n) return false;
        return this.board[i][j].innerHTML;
    }

    this.getBoard = function () {
        return this.board;
    }

}

function AI(board, score, gameManager) {
    this.board = board;
    this.score = score;
    this.gameManager = gameManager;


    this.dfs = function () {
        console.log("calculationg turn...")
        nextMove = this.dfsHelper(this.board, this.score, true, -1, -1);
        return nextMove;
    }

    this.dfsHelper = function (board, score, AITurn, nextRow, nextCol) {
        status = this.gameManager.getGameStatus()
        if (status === outcome.AI_WINS) {
            return [nextRow, nextCol];
        }
        if (status === outcome.TIE || status === outcome.PLAYER_WINS) {
            return false;
        }

        result = false;

        for (let row = 0; row < this.board.n; row++) {
            for (let col = 0; col < this.board.n; col++) {
                if (!this.board.get(row, col)) {
                    if (AITurn) {
                        this.board.set(row, col, 'o');
                        this.gameManager.updateScore(row, col, -1);
                        result = this.dfsHelper(board, score, !AITurn, row, col);
                        this.gameManager.updateScore(row, col, 1);

                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        result = this.dfsHelper(board, score, !AITurn, row, col);
                        this.gameManager.updateScore(row, col, -1);
                    }
                    this.board.set(row, col, '');
                    if (result && nextRow == -1 && nextCol == -1) return [row, col];
                    if (result) return [nextRow, nextCol];
                }
            }
        }
        return false;
    }
}

function GameManager(n) {

    this.board = new Board(n);
    this.gameOver = false;
    this.score = new Array((2 * n) + 2).fill(0);
    this.ai = new AI(this.board, this.score, this);

    /**
     * Check board for winner. 
     * If one of the indices equals the grid size, player wins.
     * If one of the indices equals negative grid size, AI wins.
     * If none of the indices equals zero, its a tie. No empty spaces.
     */
    this.getGameStatus = function () {
        let n = (this.board.n * 2) + 2;

        let gridSize = this.board.n;
        for (let i = 0; i < n; i++) {
            if (this.score[i] == (-1 * gridSize)) return outcome.AI_WINS;
            if (this.score[i] == gridSize) return outcome.PLAYER_WINS;
        }

        const allNotZeros = arr => arr.every(v => v !== 0)
        if (allNotZeros(this.score)) return outcome.TIE;
        else return false;
    }

    /**
     * Updates the score. 
     * The score array will how many times 'x's and 'o's 
     * have been added to the board.
     * For example on a 3x3 board:
     * [row1, row2, row3, col1, col2, col3, diag1, diag2]
     * If any of these indices reach 3. We have a win.
     * @param {Integer} row 
     * @param {Integer} col 
     * @param {Integer} delta 
     */
    this.updateScore = function (row, col, delta) {
        let gridSize = this.board.n;
        this.score[col] += delta;
        this.score[gridSize + row] += delta;
        if (row === col) this.score[2 * gridSize] += delta;
        if (gridSize - 1 - row == col) this.score[2 * gridSize + 1] += delta;
    }

    this.set = function (i, j, symbol) {
        return this.board.set(i, j, symbol);
    }

    this.get = function (i, j) {
        return this.board.get(i, j);
    }

    /**
     * 
     * @param {GameManager} gameManager 
     * @param {Board} board 
     */
    this.turnClick = function (gameManager, board) {
        return function (e) {
            let cell = e.target;
            if (cell.innerHTML) return;

            // Player's input.
            cell.innerHTML = 'x';
            gameManager.updateScore(parseInt(cell.getAttribute("row")), parseInt(cell.getAttribute("col")), 1);


            // AI's input.
            nextMove = gameManager.ai.dfs();
            if (nextMove) {
                row = nextMove[0]; col = nextMove[1];
                board.set(row, col, 'o');
                gameManager.updateScore(row, col, -1);
                console.log("AI finish making move.");
            } else console.log("AI can't win.");

            status = gameManager.getGameStatus();

            if (status === outcome.PLAYER_WINS || status === outcome.AI_WINS) gameManager.gameOver = true;

            if (gameManager.gameOver) {
                console.log("game over!");
                console.log(gameManager.score);
            }
            playerTurn = !playerTurn

        }
    }

    this.startGame = function () {
        this.board.generateBoard(this.turnClick(this, this.board));
    }
}


