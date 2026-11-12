const inputA = document.querySelector("#number-a");
const inputB = document.querySelector("#number-b");
const result = document.querySelector("#result");
const buttons = document.querySelectorAll("[data-op]");
buttons.forEach(function (button) {
button.addEventListener("click", function () {
const a = Number(inputA.value);
const b = Number(inputB.value);
const op = button.dataset.op;
let answer;
if (op === "divide" && b === 0) {
result.textContent = " 除數不可為 0";
return;
}
if (op === "add") answer = a + b;
else if (op === "subtract") answer = a - b;
else if (op === "multiply") answer = a * b;
else answer = a / b;
result.textContent = " 答案： " + answer;
});
});

button.addEventListener(
"click",
function () {
const a = Number(inputA.value);
const b = Number(inputB.value);
const operation =
button.dataset.op;
result.textContent =
" 答案： " +
operations[operation](a, b);
}
);

const input = document.querySelector("#guess");
const guessButton = document.querySelector("#guess-button");
const resetButton = document.querySelector("#reset-button");
const rangeText = document.querySelector("#range");
const message = document.querySelector("#message");
const attemptText = document.querySelector("#attempts");
let answer = 0;
let lower = 1;
let upper = 100;
let attempts = 0;
let finished = false;

function initializeGame() {
answer = Math.floor(
Math.random() * 100
) + 1;
lower = 1;
upper = 100;
attempts = 0;
finished = false;
input.value = "";
message.textContent = " 請輸入第一個數字 ";
message.className = "message";
renderGame();
}
initializeGame();

function checkGuess() {
const guess = Number(input.value);
if (!Number.isInteger(guess)) {
message.textContent = " 請輸入整數 ";
message.className = "message error";
return;
}
if (guess < lower || guess > upper) {
message.textContent = " 請輸入目前範圍內的數字 ";
message.className = "message error";
return;
}
attempts = attempts + 1;
if (guess === answer) {
finished = true;
message.textContent = " 答對了 ";
message.className = "message";
} else if (guess < answer) {
lower = guess + 1;
message.textContent = " 答案更大 ";
message.className = "message";
} else {
upper = guess - 1;
message.textContent = " 答案更小 ";
message.className = "message";
}
renderGame();
}

function renderGame() {
rangeText.textContent = lower + " ～ " + upper;
attemptText.textContent = " 已猜 " + attempts + " 次 ";
guessButton.disabled = finished;
}
guessButton.addEventListener("click", function () {
if (finished) return;
checkGuess();
input.select();
});
resetButton.addEventListener("click", initializeGame);
input.addEventListener("keydown", function (event) {
if (event.key === "Enter") {
guessButton.click();
}
});

guessButton.addEventListener(
"click",
function () {
if (finished) return;
checkGuess();
input.select();
}
);
resetButton.addEventListener(
"click",
initializeGame
);