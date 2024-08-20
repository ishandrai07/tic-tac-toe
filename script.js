const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes('') ? null : 'T'; // 'T' for Tie
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.index;

    if (gameBoard[cellIndex] || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.textContent = currentPlayer.toUpperCase();

    const winner = checkWin();

    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            statusDisplay.textContent = "It's a Tie!";
            alert("It's a Tie!");
        } else {
            statusDisplay.textContent = `${winner.toUpperCase()} Wins!`;
            alert(`${winner.toUpperCase()} Wins!`);
        }
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
    }
}

function handleResetButtonClick() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'x';
    statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetButtonClick);

statusDisplay.textConte
