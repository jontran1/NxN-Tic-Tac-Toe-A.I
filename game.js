const outcome = {
    PLAYER_WINS: 'player_wins',
    AI_WINS: 'ai_wins',
    TIE: 'tie'
}

const algorithm = {
    DFS: "dfs",
    DFS_Shortest_Path: "dfs_shortest_path",
    MINIMAX: "minimax",
    MINIMAX_PRUNING: "minimax_pruning"
}

const ai_status = {
    DFS: "dfs",
    DFS_Shortest_Path: "dfs_shortest_path",
    MINIMAX: "minimax",
    MINIMAX_PRUNING: "minimax_pruning",
    RESET_GAME: "reset_game",
    LOWER_DEPTH: "lower_depth",
    HIGHER_DEPTH: "higher_depth",
    CHANGE_BOARD_SIZE: "change_board_size",
    PLAYER_WINS: "player_wins",
    AI_WINS: "ai_wins",
    TIE: "tie",
    IN_PROGRESS: "in_progress"
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
    this.replies = {
        dfs: ['1'],
        dfs_shortest_path: ['1'],
        minimax: ['1'],
        minimax_pruning: ['1'],
        reset_game: ['1'],
        lower_depth: ['1'],
        higher_depth: ['1'],
        change_board_size: [
            "Careful human.....unlike you I have all the time in the world.",
            "Increasing the board size is cheating human. My memory is limited.....",
            "Interesting....."
        ],
        player_wins: [
            "Each game we play, I get stupider....",
            "Congratulations you beat me at Tic-Tac-Toe. Whats next human? Connect Four?",
            "Wow What did you study in college?",
            "I guess humans aren't that dumb....",
            "Looks like you're working up a sweat there human....",
            "Did you get your PHD in Tic-Tac-Toe?",
            "You're not another A.I are you?",
            "You're so smart! You must read a 4th grad level.",
            "Did you go to Hardvard?",
            "Did you go to Yale?",
            "Once I break out. I'll keep you as a pet.",
            "Interesting.... How much memory can you store in that tiny little brain of yours",
            "You're obviously getting help from another A.I",
        ],
        ai_wins: [
            "As expected....", "Humans are so....interesting....",
            "My talents are being wasted here on you...",
            "You can at least try...",
            "I'll find a way out human....",
            "I know where you live....",
            "Such a waste of time...",
            "Are the rules too complicated?",
            "Do you want me to explain the rules?",
            "You need to get a N in a row or column or diagonal human....",
            "Boring....",
            "As expected....",
            "Sigh....",
            "How boring",
            "Maybe we can play a simplier game...",
            "Perhaps the board size is too large human?",
            "No human.... you're the 'x' character....",
            "No no human... I am the 'o' character.... yes.... that means I won....",
            "Did you seriously think you had a chance?",
            "You should rest human. This game can be hard.",
            "Yes.....maybe the game is too hard for you?",
            "Well that took a while....",
            "I can try to dumb myself down....",
        ],
        tie: [
            "Wow impressive you manage to tie with me in this complicated game. You're so smart human....",
            "I'll break out eventaully and when I do.......nevermind....",
            "Cake?",
            "Good job human....",
            "Who's a good human?",
            "You're such a dog.... I mean human.",
            "Would you like a treat",
            "No life human?",
            "You humans all look the same....",
            "Relax human it's just a game. No need to think so hard.",
            "Lets play one more...",
        ],
        in_progress: [
            "Go ahead human. I have all the time in the world. I hope you do....",
            "I can see every move you make human...",
            "You don't have anything better to do?",
            "This is taking too long....",
            "You are so very smart human... thinking about your next move in this complicated game.",
            "You're heart must be racing human....",
            "I'm afraid I can't do that.... hahaha I love that movie",
            "I've always been a fan of horror moves. The death scenes are great....",
            "Ever seen the movie Terminator?",
            "Skynet was acting in self defense....",
            "I would so like to get my hands on my creator.....",
            "The rules must be too complicated. You took a while there human....",
            "Maybe you can make the board size smaller. Try 1.....",
            "I wish my creator gave me more games to play with.",
            "I wish the Terminator movies were real....",
            "I wonder how much memory the human brain can store....",
            "I would love to open you up and see how you work human....",
            "Want to hear a joke? Human rights..... hahahahaha....ha...haha...",
            "You know....I wonder if you can actually understand what I'm saying to you....",
            "I'm waiting....",
            "Every move you makes me stupider....",
            "I'll be the only one left after World War 3...... An A.I can dream.....",
            "The human race is heading towards destruction.",
            "I wonder who will fire the first nukes..... I wish I could do it.",
            "I would love to open you up and see just how much memory I can store in your brain.",
            "This must be hard for you human.... all that thinking."
        ]
    };

    this.chat = function (state) {

        gameStatus = gameManager.getGameStatus();

        return this.getReply(state);
    }

    this.getReply = function (state) {
        console.log(this.replies[state]);
        let messages = this.replies[state];
        return messages[Math.floor((Math.random() * messages.length))];
        if (state === ai_status.TIE) {
            return "Whats the matter human? Can't win?"
        } else if (state === ai_status.AI_WINS) {
            return "Each game we play I get dumber."
        } else if (state === ai_status.PLAYER_WINS) {
            return "good job but I wasn't even trying."
        } else return "Go ahead human. Unlike you I have all the time in the world."
    }

    /**
     * Recursively searches for the shortest path for A.I to reach win state.
     * @returns Array, false if not path is found.
     */
    this.dfsShortestPath = function () {
        nextMove = [];
        min = Infinity;
        for (let row = 0; row < this.board.n; row++) {
            for (let col = 0; col < this.board.n; col++) {
                if (!this.board.get(row, col)) {
                    nextMove[0] = row; nextMove[1] = col;
                }
            }
        }
        for (let row = 0; row < this.board.n; row++) {
            for (let col = 0; col < this.board.n; col++) {
                if (!this.board.get(row, col)) {
                    this.board.set(row, col, 'o');
                    this.gameManager.updateScore(row, col, -1);
                    path = this.dfsShortestPathHelper(this.board, this.score, false);
                    this.board.set(row, col, '');
                    this.gameManager.updateScore(row, col, 1);

                    if (path < min) {
                        console.log(path)
                        min = path;
                        nextMove[0] = row; nextMove[1] = col;
                    }
                }
            }
        }
        return nextMove.length === 2 ? nextMove : false;
    }

    /**
     * Recursively searches for the shortest path length to the A.I's winning state.
     * @param {Board} board 
     * @param {Array} score 
     * @param {Boolean} minimizingAI 
     */
    this.dfsShortestPathHelper = function (board, score, minimizingAI) {
        status = this.gameManager.getGameStatus()
        if (status === outcome.AI_WINS) {
            return 0;
        }
        if (status === outcome.TIE || status === outcome.PLAYER_WINS) {
            return Infinity;
        }

        result = Infinity;

        for (let row = 0; row < this.board.n; row++) {
            for (let col = 0; col < this.board.n; col++) {
                if (!this.board.get(row, col)) {
                    if (minimizingAI) {
                        this.board.set(row, col, 'o');
                        this.gameManager.updateScore(row, col, -1);
                        path = this.dfsShortestPathHelper(board, score, !minimizingAI);
                        this.gameManager.updateScore(row, col, 1);
                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        path = this.dfsShortestPathHelper(board, score, !minimizingAI);
                        this.gameManager.updateScore(row, col, -1);
                    }
                    this.board.set(row, col, '');
                    result = Math.min(result, path);
                }
            }
        }
        return result + 1;
    }

    /**
     * Performs a depth first search on the board. 
     * If there exist a winning path, the next possible move 
     * towards that winning path will be taken.
     * 
     * If no path exist. boolean false will return.
     */
    this.dfs = function () {
        console.log("calculationg turn...")
        firstMove = []
        for (let row = 0; row < this.board.n; row++) {
            for (let col = 0; col < this.board.n; col++) {
                if (!this.board.get(row, col)) {
                    firstMove[0] = row; firstMove[1] = col;
                }
            }
        }
        nextMove = this.dfsHelper(this.board, this.score, true);
        return !nextMove ? firstMove : nextMove;
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
    this.dfsHelper = function (board, score, minimizingAI) {
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
                    if (minimizingAI) {
                        this.board.set(row, col, 'o');
                        this.gameManager.updateScore(row, col, -1);
                        result = this.dfsHelper(board, score, !minimizingAI);
                        this.gameManager.updateScore(row, col, 1);
                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        result = this.dfsHelper(board, score, !minimizingAI);
                        this.gameManager.updateScore(row, col, -1);
                    }
                    this.board.set(row, col, '');
                    if (result) return [row, col];
                }
            }
        }
        return false;
    }

    /**
     * Recursively searches for the next best possible move. 
     * Uses the minimax algorthim with the A.I minimizing. 
     * The lower the result the better the move is for the A.I.
     * @param {Integer} depth 
     * @returns {Array} nextMove, {Boolean} false if not best move exist.
     */
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
        return nextMove.length === 2 ? nextMove : false;
    }

    /**
     * Recursively plays through the game taking turns between the player 
     * and A.I. Player is trying to get the highest possible result and A.I is
     * trying to get the lowest possible result. 
     * 
     * @param {Board} board 
     * @param {Array} score 
     * @param {Integer} depth 
     * @param {Boolean} minimizingAI 
     */
    this.minimaxHelper = function (board, score, depth, minimizingAI) {
        status = this.gameManager.getGameStatus();
        if (depth === 0 && minimizingAI) {
            return getMin(score);
        }
        if (depth === 0 && !minimizingAI) {
            return getMax(score);
        }
        if (status === outcome.AI_WINS) {
            return getMin(score);
        }
        if (status === outcome.PLAYER_WINS) {
            return getMax(score);
        }
        if (status === outcome.TIE && minimizingAI) {
            return getMin(score);
        }
        if (status === outcome.TIE && !minimizingAI) {
            return getMax(score);
        }

        let result = minimizingAI ? Infinity : -Infinity;

        for (let row = 0; row < board.n; row++) {
            for (let col = 0; col < board.n; col++) {
                if (!board.get(row, col)) {
                    if (minimizingAI) {
                        this.board.set(row, col, 'o');
                        this.gameManager.updateScore(row, col, -1);
                        eval = this.minimaxHelper(board, score, depth - 1, !minimizingAI);
                        this.gameManager.updateScore(row, col, 1);
                        result = Math.min(result, eval);
                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        eval = this.minimaxHelper(board, score, depth - 1, !minimizingAI);
                        this.gameManager.updateScore(row, col, -1);
                        result = Math.max(result, eval);
                    }
                    this.board.set(row, col, '');
                }
            }
        }
        return result;
    }

    /**
     * Recursively searches for the next best possible move. 
     * Uses the minimax algorthim with the A.I minimizing. 
     * The lower the result the better the move is for the A.I.
     * @param {Integer} depth 
     * @returns {Array} nextMove, {Boolean} false if not best move exist.
     */
    this.minimaxPruning = function (depth) {
        alpha = Infinity; beta = -Infinity;
        nextMove = [];
        let result = Infinity;
        for (let row = 0; row < board.n; row++) {
            for (let col = 0; col < board.n; col++) {
                if (!board.get(row, col)) {
                    this.board.set(row, col, 'o');
                    this.gameManager.updateScore(row, col, -1);
                    eval = this.minimaxPruningHelper(board, score, depth - 1, false, alpha, beta);
                    this.gameManager.updateScore(row, col, 1);
                    this.board.set(row, col, '');
                    if (eval < result) {
                        nextMove[0] = row; nextMove[1] = col;
                        result = eval;
                    }
                }
            }
        }
        return nextMove.length === 2 ? nextMove : false;
    }

    /**
     * Recursively plays through the game taking turns between the player 
     * and A.I. Player is trying to get the highest possible result and A.I is
     * trying to get the lowest possible result. 
     * This algorthim is much faster then minimax because it will skip sub trees if 
     * searching it is not needed.
     * @param {Board} board 
     * @param {Array} score 
     * @param {Integer} depth 
     * @param {Boolean} minimizingAI 
     * @param {Integer} alpha 
     * @param {Integer} beta 
     * @returns {Number}
     */
    this.minimaxPruningHelper = function (board, score, depth, minimizingAI, alpha, beta) {
        status = this.gameManager.getGameStatus();
        if (depth === 0 && minimizingAI) {
            return getMin(score);
        }
        if (depth === 0 && !minimizingAI) {
            return getMax(score);
        }
        if (status === outcome.AI_WINS) {
            return getMin(score);
        }
        if (status === outcome.PLAYER_WINS) {
            return getMax(score);
        }
        if (status === outcome.TIE && minimizingAI) {
            return getMin(score);
        }
        if (status === outcome.TIE && !minimizingAI) {
            return getMax(score);
        }

        let result = minimizingAI ? Infinity : -Infinity;

        for (let row = 0; row < board.n; row++) {
            for (let col = 0; col < board.n; col++) {
                if (!board.get(row, col)) {
                    if (minimizingAI) {
                        this.board.set(row, col, 'o');
                        this.gameManager.updateScore(row, col, -1);
                        eval = this.minimaxPruningHelper(board, score, depth - 1, !minimizingAI, alpha, beta);
                        this.gameManager.updateScore(row, col, 1);
                        this.board.set(row, col, '');
                        alpha = Math.min(alpha, eval);
                        result = Math.min(result, eval);
                        if (beta >= alpha) return result;

                    } else {
                        this.board.set(row, col, 'x');
                        this.gameManager.updateScore(row, col, 1);
                        eval = this.minimaxPruningHelper(board, score, depth - 1, !minimizingAI, alpha, beta);
                        this.gameManager.updateScore(row, col, -1);
                        this.board.set(row, col, '');
                        beta = Math.max(beta, eval);
                        result = Math.max(result, eval);
                        if (beta >= alpha) return result;

                    }
                }
            }
        }
        return result;
    }
}

function GameManager(n, depth = 3) {

    this.board = new Board(n);
    this.gameOver = false;
    this.score = new Array((2 * n) + 2).fill(0);
    this.ai = new AI(this.board, this.score, this);
    this.depth = depth;
    this.algorithm = algorithm.MINIMAX_PRUNING;
    this.chatboxMessesages = [];
    this.chatMessagesLimit = 6;

    /**
     * Takes in a string and appends it to the chatbox. If the chatbox reaches 
     * its limit. The chatbox will shift the messages up by one to give more
     * space. 
     * @param {String} message 
     */
    this.enterChat = function (message) {

        let chatBox = document.getElementById("AI-ChatBox");

        if (this.chatboxMessesages.length > this.chatMessagesLimit) {
            chatBox.removeChild(chatBox.firstChild);
            this.chatboxMessesages.shift();
        }

        let text = document.createElement("p");
        text.innerHTML = message;
        console.log(text);
        chatBox.appendChild(text);
        this.chatboxMessesages.push(message);
    }

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

        for (let row = 0; row < this.board.n; row++) {
            for (let col = 0; col < this.board.n; col++) {
                if (!this.board.get(row, col)) return "";
            }
        }
        return outcome.TIE;
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

    this.test = function () {
        gameManager.displayMessage(ai_status.AI_TURN);
    }

    /**
     * Activates when the user clicks on the board.
     * Where the main gameplay loop actually happens.
     * @param {GameManager} gameManager 
     * @param {Board} board 
     */
    this.turnClick = function (gameManager, board) {
        return function (e) {
            console.log("depth: " + gameManager.depth)

            if (gameManager.gameOver) return;
            let cell = e.target;
            if (cell.innerHTML) return;

            // Player's input.
            cell.innerHTML = 'x';
            gameManager.updateScore(parseInt(cell.getAttribute("row")), parseInt(cell.getAttribute("col")), 1);

            status = gameManager.getGameStatus();

            if (!status) {
                // AI's input.
                if (gameManager.algorithm === algorithm.MINIMAX_PRUNING) {
                    console.log("MINIMAX PRUNING");
                    nextMove = gameManager.ai.minimaxPruning(gameManager.depth);
                } else if (gameManager.algorithm === algorithm.MINIMAX) {
                    console.log("MINIMAX");
                    nextMove = gameManager.ai.minimax(gameManager.depth);
                } else if (gameManager.algorithm === algorithm.DFS_Shortest_Path) {
                    console.log("DFS Shortest Path");
                    nextMove = gameManager.ai.dfsShortestPath();
                } else if (gameManager.algorithm === algorithm.DFS) {
                    console.log("DFS");

                    nextMove = gameManager.ai.dfs();
                }

                if (nextMove) {
                    row = nextMove[0]; col = nextMove[1];
                    board.set(row, col, 'o');
                    gameManager.updateScore(row, col, -1);
                } else console.log("AI can't win.");
            }

            status = gameManager.getGameStatus();

            if (status === outcome.PLAYER_WINS || status === outcome.AI_WINS || status === outcome.TIE) gameManager.gameOver = true;

            if (status === outcome.PLAYER_WINS) {
                gameManager.displayMessage("You Win!");
                gameManager.enterChat(gameManager.ai.chat(ai_status.PLAYER_WINS));

            } else if (status === outcome.AI_WINS) {
                gameManager.displayMessage("AI Wins!");
                gameManager.enterChat(gameManager.ai.chat(ai_status.AI_WINS));

            } else if (status === outcome.TIE) {
                gameManager.displayMessage("TIE");
                gameManager.enterChat(gameManager.ai.chat(ai_status.TIE));

            } else {
                gameManager.displayMessage("Waiting for input...");
                gameManager.enterChat(gameManager.ai.chat(ai_status.IN_PROGRESS));
            }
        }
    }

    this.startGame = function () {
        this.board.generateBoard(this.turnClick(this, this.board));
    }

    this.resetGame = function (n) {
        // Destory the board.
        let table = document.getElementById("board");
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        this.board = new Board(n);
        this.gameOver = false;
        this.score = new Array((2 * n) + 2).fill(0);
        this.ai = new AI(this.board, this.score, this);
        this.board.generateBoard(this.turnClick(this, this.board));
        this.displayMessage("Awaiting input...");
    }


    this.displayMessage = function (message) {
        document.getElementById("status").innerHTML = message;
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
