/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play-again
*/

// Game values
let min = 1;
let max = 10;

let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  console.log(guessInput.value);
  let guess = parseInt(guessInput.value);

  // // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // GameOver You won

    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong number
    // guessLeft -= 1;
    guessesLeft = guessesLeft - 1;

    if (guessesLeft === 0) {
      // Game over You Lost!!!

      gameOver(false, `YOU LOST!. the winning number is ${winningNum}`);
    } else {
      // Game continues your answer is wrong

      //Change border color
      guessInput.style.borderColor = "red";

      // clear Input
      guessInput.value = "";

      // Tell user to continue if answer is wrong
      setMessage(`${guess} is incorrect, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // set text color
  message.style.color = color;
  // Set message
  setMessage(msg);
  // // Disable btn after
  // guessBtn.disabled = true;
  guessBtn.value = "play-again";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
  console.log(Math.floor(Math.random()*(max-min+1)+min));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
