import { storage } from "./storage.js";

const button = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");

let score = 0;
let highScore = storage.get("highScore", 0);

console.log(`Your current best score is ${highScore}. Try to beat it! 🔥`);

button.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;

  if (score > highScore) {
    highScore = score;
    storage.set("highScore", highScore);
  }
});

document.querySelector('a[href="#game"]').addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
});

console.log("💡 Hint: Type 'themeSwap()' in the console to change theme!");

window.themeSwap = () => {
  document.body.classList.toggle("alt-theme");
};
