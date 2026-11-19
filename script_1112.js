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
