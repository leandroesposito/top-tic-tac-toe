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
    const board = board();
    const currentPlayer = player1;

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
        for (let i = 0; i < 3; i++) {
            // row i
            if (board[i][0] !== null && board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                return board[i][0];
            }
            // column i
            if (board[0][i] !== null && board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                return board[0][i];
            }
        }

        if (board[1][1] !== null) {
            if (
                // negative diagonal
                (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
                // positive diagonal
                (board[2][0] === board[1][1] && board[2][0] === board[0][2])
            ) {
                return board[1][1];
            }
        }

        return null;
    }

    function isDraw() {
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                if (board[row][column] === null) {
                    false;
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

        return `Is ${currentPlayer.getName}'s turn.`
    }

    return {
        getStatus,
        getBoard: board.getBoard(),
        playRound
    };
}

const ScreenController = (function () {

})();