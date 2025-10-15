import { storage } from './storage.js';

let score = 0;
let highScore = storage.get('highScore', 0); 
const scoreDisplay = document.getElementById('score');
const button = document.getElementById('clickButton');


window.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to Click Click Click 🎮");
  console.log("💡 Try typing 'theme()' in the console for a surprise!");
  updateScoreDisplay();
});


button.addEventListener('click', () => {
  score++;
  updateScoreDisplay();
  checkHighScore();
});

function updateScoreDisplay() {
  scoreDisplay.textContent = `${score} (Best: ${highScore})`;
}

function checkHighScore() {
  if (score > highScore) {
    highScore = score;
    storage.set('highScore', highScore);
  }
}

document.querySelector('a[href="#game"]').addEventListener('click', () => {
  score = 0;
  updateScoreDisplay();
});


window.theme = function() {
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === 'black' ? '#222' : 'black';
  console.log("🌙 Theme toggled! You found the Easter Egg!");
};
