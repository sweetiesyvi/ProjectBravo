import { storage } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("clickButton");
  const scoreDisplay = document.getElementById("score");


  // Initialize game state
  let score = 0;
  let highScore = storage.get("highScore", 0);
  let timer = 10; // seconds
  let isPlaying = false;
  let countdown;

  // Create timer display
  const timerDisplay = document.createElement("p");
  timerDisplay.textContent = `Time left: ${timer}s`;
  document.getElementById("game").appendChild(timerDisplay);

  // Create high score display
  const highScoreDisplay = document.createElement("p");
  highScoreDisplay.textContent = `Best Score: ${highScore}`;
  document.getElementById("game").appendChild(highScoreDisplay);

  // Start the game on first click
  button.addEventListener("click", () => {
    if (!isPlaying) {
      startGame();
    }
    score++;
    console.log(scoreDisplay); 

  });


  function startGame() {
    isPlaying = true;
    timer = 10;
    score = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = `Time left: ${timer}s`;

    countdown = setInterval(() => {
      timer--;
      timerDisplay.textContent = `Time left: ${timer}s`;
      if (timer <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    clearInterval(countdown);
    isPlaying = false;
    alert(`Time’s up! Your final score: ${score}`);

    if (score > highScore) {
      highScore = score;
      storage.set("highScore", highScore);
      highScoreDisplay.textContent = `Best Score: ${highScore}`;
      alert("🎉 New high score!");
    }
  }

  // Easter Egg: Console theme switch
  console.log("💡 Type themeSwap() in console to switch theme!");
  window.themeSwap = () => {
    document.body.classList.toggle("alt-theme");
  };
});


