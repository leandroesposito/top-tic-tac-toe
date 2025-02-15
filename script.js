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
        placeMarker
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
        getBoard: board.getBoard,
        printBoard: () => console.table(board.getBoard()),
        playRound
    };
}

const ScreenController = (function () {

})();