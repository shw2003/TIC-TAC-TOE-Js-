//SELECT THE BOARD ELEMENT
const board = document.querySelector(".board");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-btn");

let currentPlayer = "X"; //START WITH PLAYER X

//WINING COMBINATION(ROW, COLUMN, DIAGONAL)
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//FUNCTION TO CREATE THE TIC-TAC-TOE BOARD
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

function handleClick(event) {
  const cell = event.target;

  if (cell.textContent !== "") {
    return;
  }

  cell.textContent = currentPlayer;
  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} Wins 🥳🎆🎇🥳`;
    board.removeEventListener("click", handleClick);
    return;
  }

  if (isDraw()) {
    message.textContent = "It's a Draw! 🤝";
    board.removeEventListener("click", handleClick); // Disable further clicks
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  const cell = document.querySelectorAll(".cell");

  return winningCombinations.some((comb) => {
    const [a, b, c] = comb;
    return (
      cell[a].textContent !== "" &&
      cell[a].textContent === cell[b].textContent &&
      cell[a].textContent === cell[c].textContent
    );
  });
}

function isDraw() {
  const cells = document.querySelectorAll(".cell"); // Get all cells
  return [...cells].every((cell) => cell.textContent !== ""); // Check if all cells are filled
}

function restartGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";

  message.textContent = "Player X's Turn";
}
restartBtn.addEventListener("click", restartGame);

createBoard();
