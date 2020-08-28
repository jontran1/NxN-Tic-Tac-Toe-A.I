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

    /**
     * Performs a depth first search on the board. 
     * If there exist a winning path, the next possible move 
     * towards that winning path will be taken.
     * 
     * If no path exist. boolean false will return.
     */
    this.dfs = function () {
        console.log("calculationg turn...")
        nextMove = this.dfsHelper(this.board, this.score, true);
        return nextMove;
    }

    /**
     * Recursivly looks for a possible path to the winng state 
     * for the AI. If no path is found returns false.
     * If a path is found, the starting move towards that path will return. 
     * @param {Board} board 
     * @param {Array} score 
     * @param {Boolean} AITurn 
     * @returns {Array or Boolean}
     */
    this.dfsHelper = function (board, score, AITurn) {
        status = this.gameManager.getGameStatus()
        if (status === outcome.AI_WINS) {
            return true;
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
                        result = this.dfsHelper(board, score, !AITurn);
                        this.gameManager.updateScore(row, col, 1);
                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        result = this.dfsHelper(board, score, !AITurn);
                        this.gameManager.updateScore(row, col, -1);
                    }
                    this.board.set(row, col, '');
                    if (result) return [row, col];
                }
            }
        }
        return false;
    }

    this.minimax = function (depth) {
        nextMove = [];
        let result = Infinity;
        for (let row = 0; row < board.n; row++) {
            for (let col = 0; col < board.n; col++) {
                if (!board.get(row, col)) {
                    this.board.set(row, col, 'o');
                    this.gameManager.updateScore(row, col, -1);
                    eval = this.minimaxHelper(board, score, depth - 1, false);
                    this.gameManager.updateScore(row, col, 1);
                    this.board.set(row, col, '');
                    if (eval < result) {
                        nextMove[0] = row; nextMove[1] = col;
                        result = eval;
                    }
                }
            }
        }
        return nextMove;
    }

    this.minimaxHelper = function (board, score, depth, AITurn) {
        status = this.gameManager.getGameStatus();
        if (depth === 0 && AITurn) {
            return getMin(score);
        }
        if (depth === 0 && !AITurn) {
            return getMax(score);
        }
        if (status === outcome.AI_WINS) {
            return getMin(score);
        }
        if (status === outcome.PLAYER_WINS) {
            return getMax(score);
        }
        if (status === outcome.TIE && AITurn) {
            return getMin(score);
        }
        if (status === outcome.TIE && !AITurn) {
            return getMax(score);
        }

        let result = AITurn ? Infinity : -Infinity;

        for (let row = 0; row < board.n; row++) {
            for (let col = 0; col < board.n; col++) {
                if (!board.get(row, col)) {
                    if (AITurn) {
                        this.board.set(row, col, 'o');
                        this.gameManager.updateScore(row, col, -1);
                        eval = this.minimaxHelper(board, score, depth - 1, !AITurn);
                        this.gameManager.updateScore(row, col, 1);
                        if (eval < result) {
                            result = eval;
                        }
                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        eval = this.minimaxHelper(board, score, depth - 1, !AITurn);
                        this.gameManager.updateScore(row, col, -1);
                        if (eval > result) {
                            result = eval;
                        }
                    }
                    this.board.set(row, col, '');
                }
            }
        }
        return result;
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
            nextMove = gameManager.ai.minimax(3);
            console.log("a.i's next move " + nextMove);
            console.log(nextMove)
            if (nextMove && nextMove.length == 2) {
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

const getMin = function (array) {
    return Math.min.apply(null, array);
}

const getMax = function (array) {
    return Math.max.apply(null, array);
}

const countNegativeNumbers = function (array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] < 0) count++;
    }
    return count;
}

const countPositiveNumbers = function (array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0) count++;
    }
    return count;
}
