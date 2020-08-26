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
        if (symbol !== 'x' && symbol !== 'o') return false;
        if (i < 0 || i >= n || j < 0 || j >= n) return false;
        if (this.board[i][j].innerHTML) return false;

        this.board[i][j].innerHTML = symbol;
        return true;
    }

    /**
     * 
     * @param {Integer} i 
     * @param {Integer} j 
     * @returns {boolean if false. cell if true}
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
    }
}

function GameManager(n) {

    this.board = new Board(n);
    this.ai = new AI(this.board);
    this.gameOver = false;

    /**
     * Check board for winner. 
     */
    this.getGameStatus = function () {
        if (this.board.get(0, 0) && this.board.get(0, 1) && this.board.get(0, 2)) return true;
        return false;
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

                e.target.innerHTML = 'x';

            }
        }
    }

    this.startGame = function () {
        this.board.generateBoard(this.turnClick(this, this.board));
    }
}
