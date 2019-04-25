let squares =  document.querySelectorAll(".square");
let colorID = document.querySelector("#colorID");
let hint = document.querySelector('#hint');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');
let message = document.querySelector('#message');
let selected = 1;
let gameOver = 0;
let mode = {0: 3, 1: 6, 2: 9, 3: 12}

const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
let correctPosition = randomInt(6);

const generateColorArray = (numOfColors) => {
    colorArray = []
    for (let i = 0; i < numOfColors; i++) {
        colorArray.push(`rgb(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)})`);
    }
    return colorArray
}

const onClick = (idx) => {
    if (gameOver) return;
    if (idx === correctPosition) {
        color = squares[idx].style.backgroundColor
        message.textContent = "Correct";
        resetButton.textContent = "Play again?";
        document.querySelector("h1").style.backgroundColor = color;
        squares.forEach(square => {
            square.style.backgroundColor = color;
        });
        gameOver = 1;
    } else {
        squares[idx].style.backgroundColor = "#232323";
        message.textContent = "Try Again";
    }
}

const switchModes = (button) => {
    modeButtons.forEach(button => button.classList.remove("selected"));
    button.classList.add("selected");
    selected = button.value;

    reset(mode[selected]);
}

const displayHint = () => {
    hint.style.display = "block"
    colorID.style.display = "none";
}

const hideHint = () => {
    hint.style.display = "none"
    colorID.style.display = "block";
}

const reset = (numOfSquares) => {
    let colorArray = generateColorArray(numOfSquares);
    correctPosition = randomInt(numOfSquares);
    document.querySelector("h1").style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    colorID.textContent = colorArray[correctPosition];
    message.textContent = "";
    squares.forEach((square, idx) => {
        square.style.backgroundColor = colorArray[idx]
        square.style.display = 'block';
    });
    for (let i = numOfSquares; i < 12; i++) {
        squares[i].style.display = 'none';
    }
    gameOver = 0;
}

const initListeners = () => {
    squares.forEach((square, idx) => {
        square.addEventListener('click', () => onClick(idx))
    });
    resetButton.addEventListener('click', () => reset(mode[selected]));
    modeButtons.forEach(button => button.addEventListener('click', () => switchModes(button)));
    colorID.addEventListener('mouseenter', displayHint);
    hint.addEventListener('mouseleave', hideHint);
}

const initGame = () => {
    initListeners();
    reset(mode[selected]);
}

initGame();






