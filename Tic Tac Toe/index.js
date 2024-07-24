const gameInfo = document.querySelector(".gam-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Let's ceate function to intilize the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  //   for empty in UI  update
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // initlize box css props
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function gameOver() {
  let answer = "";
  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //when there is no winner tied!
  let filCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      filCount++;
    }
  });
  if (filCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap karo
    swapTurn();
    //check koi jeeta ya nahi
    gameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
