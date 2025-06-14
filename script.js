const cells = document.querySelectorAll(".cell");
const playerTurnText = document.getElementById("player-turn");
const resultText = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    resultText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    setTimeout(resetGame, 2000);
  } else if (board.every(cell => cell !== "")) {
    resultText.textContent = "It's a Tie!";
    gameActive = false;
    setTimeout(resetGame, 2000);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurnText.textContent = currentPlayer;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  resultText.textContent = "";
  currentPlayer = "X";
  playerTurnText.textContent = currentPlayer;
  gameActive = true;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", resetGame);
