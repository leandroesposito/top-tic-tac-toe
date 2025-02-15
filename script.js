function Player(name, color) {
    function getName() {
        return name;
    }

    function getColor() {
        return color;
    }

    return {
        getName,
        getColor
    };
}

function Gameboard() {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board.push([null, null, null]);
    }

    function getBoard() {
        return board.map(row => [...row]);
    }

    function getColorBoard() {
        return board.map(row => row.map(player => player?.getColor() ?? ""));
    }

    function getNameBoard() {
        return board.map(row => row.map(player => player?.getName() ?? ""));
    }

    function placeMarker(player, row, column) {
        if (0 <= row && row < 3 && 0 <= column && column < 3 &&
            board[row][column] === null) {
            board[row][column] = player;
            return true;
        }
        return false;
    }

    return {
        getBoard,
        getColorBoard,
        getNameBoard,
        placeMarker,
    };
}

function Game(player1, player2) {
    const board = Gameboard();
    let currentPlayer = player1;

    function changePlayerTurn() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }

    function playRound(row, column) {
        if (currentPlayer !== null) {
            if (board.placeMarker(currentPlayer, row, column)) {
                changePlayerTurn();
            }
        }
    }

    function getWinner() {
        const currentBoard = board.getBoard();
        for (let i = 0; i < 3; i++) {
            // row i
            if (currentBoard[i][0] !== null &&
                currentBoard[i][0] == currentBoard[i][1] &&
                currentBoard[i][0] == currentBoard[i][2]) {
                return currentBoard[i][0];
            }
            // column i
            if (currentBoard[0][i] !== null &&
                currentBoard[0][i] == currentBoard[1][i] &&
                currentBoard[0][i] == currentBoard[2][i]) {
                return currentBoard[0][i];
            }
        }

        if (currentBoard[1][1] !== null) {
            if (
                // negative diagonal
                (currentBoard[0][0] === currentBoard[1][1] &&
                    currentBoard[0][0] === currentBoard[2][2]) ||
                // positive diagonal
                (currentBoard[2][0] === currentBoard[1][1] &&
                    currentBoard[2][0] === currentBoard[0][2])
            ) {
                return currentBoard[1][1];
            }
        }

        return null;
    }

    function isDraw() {
        const currentBoard = board.getBoard();
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                if (currentBoard[row][column] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    function getStatus() {
        const winner = getWinner();

        if (winner) {
            currentPlayer = null;
            return `${winner.getName()} won the game.`;
        }

        if (isDraw()) {
            return "Draw.";
        }

        return `Is ${currentPlayer.getName()}'s turn.`
    }

    return {
        getStatus,
        getColorBoard: board.getColorBoard,
        printColorBoard: () => console.table(board.getColorBoard()),
        printnameBoard: () => console.table(board.getNameBoard()),
        playRound
    };
}

const ScreenController = (function () {
    const gameBoardContainer = document.querySelector(".board-container");
    const gameStatusContainer = document.querySelector(".game-status-container");
    let game = null;
    initControls();

    function initControls() {
        const dialog = document.querySelector("dialog");
        const closeDialogButton = document.querySelector(".close-dialog-button");
        const startNewGameButton = document.querySelector(".start-new-game-button");
        const submitNewGameButton = document.querySelector(".submit-new-game-button");
        const newGameForm = document.querySelector(".new-game-form");

        closeDialogButton.addEventListener("click", () => dialog.close());

        startNewGameButton.addEventListener("click", () => {
            dialog.showModal();
        });

        submitNewGameButton.addEventListener("click", (event) => {
            event.preventDefault();
            setupNewGame(newGameForm);
            dialog.close();
            newGameForm.reset();
        });

        gameBoardContainer.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains("board-cell")) {
                if (game) {
                    game.playRound(
                        target.dataset.row,
                        target.dataset.column
                    );

                    renderGame();
                }
            }
        });
    }

    function setupNewGame(form) {
        const formData = new FormData(form);

        const player1 = Player(
            formData.get("player1-name"),
            formData.get("player1-color")
        );

        const player2 = Player(
            formData.get("player2-name"),
            formData.get("player2-color")
        );

        game = Game(player1, player2);

        renderGame();
    }

    function renderGame() {
        renderBoard()
        showGameStatus();
    }

    function renderBoard() {
        const currentBoard = game.getColorBoard();

        gameBoardContainer.innerHTML = "";
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                const button = document.createElement("button");
                button.classList.add("board-cell");
                button.dataset.row = row;
                button.dataset.column = column;
                button.style.setProperty("--marker-color", currentBoard[row][column]);
                if (currentBoard[row][column] !== "") {
                    button.style.setProperty("--marker-border", "5px solid black");
                }

                gameBoardContainer.appendChild(button);
            }
        }
    }

    function showGameStatus() {
        gameStatusContainer.textContent = game.getStatus();
    }

})();