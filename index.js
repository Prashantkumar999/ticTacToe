const boxes = document.querySelectorAll(".box");
const infoBtn = document.querySelector(".player-container");
const resetBtn = document.querySelector(".reset-btn");

console.log(boxes);

let currentPlayer;
let gameGrid;
let gameEnd = false;

init();

function init() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameEnd = false; // Reset the game end flag

    boxes.forEach((box) => {
        box.textContent = "";
        if (box.classList.contains("greenBackground")) {
            box.classList.remove("greenBackground");
        }
        box.style.pointerEvents = "all";
    });
    resetBtn.classList.remove("active");

    infoBtn.classList.add("active");
    infoBtn.innerHTML = `Current Player: ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        gameGrid[index] = currentPlayer;
        boxes[index].innerHTML = currentPlayer;
        changeCurrentPlayer(); // Fixed function name
        checkForWinner();
        if (!gameEnd) {
            checkForDraw();
        }
    }
}

function checkForDraw() {
    for (let i = 0; i < gameGrid.length; i++) {
        if (gameGrid[i] === "") return false;
    }
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
    infoBtn.innerHTML = "Draw";
    return true; // Return true when a draw is detected
}

function changeCurrentPlayer() { // Fixed function name
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    infoBtn.innerHTML = `Current Player: ${currentPlayer}`;
}

function doPointerEventsNone() {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
}

function checkForWinner() {
    let ans = "";
    winningCombinations.forEach((combo) => {
        if ((gameGrid[combo[0]] != "" && gameGrid[combo[1]] != "" && gameGrid[combo[2]] != "") && ((gameGrid[combo[0]] === gameGrid[combo[1]]) && (gameGrid[combo[1]] === gameGrid[combo[2]]))) {
            ans = gameGrid[combo[0]];
            infoBtn.innerHTML = `Winner Player: ${ans}`;
            doPointerEventsNone();
            boxes[combo[0]].classList.add("greenBackground");
            boxes[combo[1]].classList.add("greenBackground");
            boxes[combo[2]].classList.add("greenBackground");
            gameEnd = true;
        }
    });
}
console.log(gameGrid);

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
        if (!resetBtn.classList.contains("active")) {
            resetBtn.classList.add("active");
        }
    });
});

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

resetBtn.addEventListener("click", init);
