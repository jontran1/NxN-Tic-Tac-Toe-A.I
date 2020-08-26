let playerTurn = true;

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

function AI(board) {
    this.board = board;

    this.dfs = function () {
        console.log(this.board)

                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        result = this.dfsHelper(board, score, !AITurn, row, col);
                        this.gameManager.updateScore(row, col, -1);
                    this.board.set(row, col, '');
                    if (result && nextRow == -1 && nextCol == -1) return [row, col];
                }
            }
        }
        return false;
    }
}

function GameManager(n) {

    this.board = new Board(n);
    this.ai = new AI(this.board);
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
            if (e.target.innerHTML) return;
            if (playerTurn) {
            if (cell.innerHTML) return;

                e.target.innerHTML = 'x';

                board.set(row, col, 'o');
                gameManager.updateScore(row, col, -1);
            }

            status = gameManager.getGameStatus();

            if (status === outcome.PLAYER_WINS || status === outcome.AI_WINS) gameManager.gameOver = true;
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


