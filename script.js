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
        if (board[row][column] === null) {
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

    const getStatus = () => {

    }

    return { getStatus };
}

const ScreenController = (function () {

})();