import { savePlayerName, loadPlayerName } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  let score = 0;
  let timer = 10;
  let interval;
  
  const clickBtn = document.getElementById('clickBtn');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const playBtn = document.getElementById('playBtn');
  const playerForm = document.getElementById('playerForm');
  const playerNameInput = document.getElementById('playerName');

  // Load player name from storage
  playerNameInput.value = loadPlayerName();

  // Easter Egg
  console.log("Hint: Try typing 'FAST' in the name field for a surprise!");

  // Start or Reset Game
  function startGame() {
    score = 0;
    timer = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    clickBtn.disabled = false;

    clearInterval(interval);
    interval = setInterval(() => {
      timer--;
      timerDisplay.textContent = timer;
      if (timer <= 0) {
        clearInterval(interval);
        clickBtn.disabled = true;
        alert(`Time's up! Your score: ${score}`);
      }
    }, 1000);
  }

  // Click Event
  clickBtn.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
  });

  // Play/Reset Button
  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startGame();
  });

  // Form Submit
  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!playerNameInput.checkValidity()) {
      playerNameInput.classList.add('is-invalid');
      return;
    }
    playerNameInput.classList.remove('is-invalid');
    savePlayerName(playerNameInput.value);
    alert(`Hello ${playerNameInput.value}! Name saved.`);
  });
});
