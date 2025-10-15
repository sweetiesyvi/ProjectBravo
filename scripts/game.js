import { saveScore, getBestScore, updateBestScore } from './storage.js';

let score = 0;
let timeLeft = 10;
let timerInterval;
let difficulty = 'easy';

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clickBtn = document.getElementById('clickBtn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');
const settingsForm = document.getElementById('settingsForm');
const playerNameInput = document.getElementById('playerName');
const difficultySelect = document.getElementById('difficulty');

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
clickBtn.addEventListener('click', incrementScore);
settingsForm.addEventListener('submit', saveSettings);

function startGame() {
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  clickBtn.disabled = false;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    clickBtn.disabled = true;
    alert(`Temps écoulé ! Votre score est ${score}`);
    updateBestScore(score);
  }
}

function incrementScore() {
  score++;
  scoreDisplay.textContent = score;
}

function resetGame() {
  clearInterval(timerInterval);
  clickBtn.disabled = true;
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
}

function saveSettings(event) {
  event.preventDefault();
  const playerName = playerNameInput.value.trim();
  difficulty = difficultySelect.value;
  if (playerName) {
    localStorage.setItem('playerName', playerName);
  }
  localStorage.setItem('difficulty', difficulty);
  alert('Paramètres sauvegardés');
}

function loadSettings() {
  const savedName = localStorage.getItem('playerName');
  const savedDifficulty = localStorage.getItem('difficulty');
  if (savedName) {
    playerNameInput.value = savedName;
  }
  if (savedDifficulty) {
    difficultySelect.value = savedDifficulty;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  updateBestScoreDisplay();
});

function updateBestScoreDisplay() {
  const bestScore = getBestScore();
  bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
}
