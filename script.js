const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn;
let gameActive = true;  // Track whether the game is active or has ended
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const playerTurnElement = document.getElementById('playerTurn');
const resetButton = document.getElementById('resetButton');

startGame();

resetButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    gameActive = true;  // Reset the game state to active
    playerTurnElement.innerText = "Player X's Turn";
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.textContent = '';  // Clear the text content as well
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    if (!gameActive) return;  // Prevent further clicks if the game is over
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    if (currentClass === X_CLASS) {
        cell.textContent = 'X';  // Add X symbol
    } else {
        cell.textContent = 'O';  // Add O symbol
    }
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
    playerTurnElement.innerText = circleTurn ? "Player O's Turn" : "Player X's Turn";
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    gameActive = false;  // Mark the game as over
    if (draw) {
        playerTurnElement.innerText = "It's a Draw!";
    } else {
        playerTurnElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}