import { storage } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("clickButton");
  const scoreDisplay = document.getElementById("score");

  let score = 0;
  let highScore = storage.get("highScore", 0);

  console.log(`Your best score is ${highScore}`);

  button.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;

    if (score > highScore) {
      highScore = score;
      storage.set("highScore", highScore);
    }
  });

  // Easter Egg
  console.log("💡 Hint: type themeSwap() in console to switch theme.");
  window.themeSwap = () => {
    document.body.classList.toggle("alt-theme");
  };
});
