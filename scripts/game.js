import { saveScore, getBestScore, updateBestScore } from './storage.js';

// Variables globales
let score = 0;
let timeLeft = 10;
let timerInterval;

// Fonction pour démarrer le jeu
function startGame() {
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  clickBtn.disabled = false;
  timerInterval = setInterval(updateTimer, 1000);
}

// Fonction pour mettre à jour le minuteur
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

function applyDifficulty() {
  const difficulty = localStorage.getItem('difficulty');
  switch (difficulty) {
    case 'easy':
      document.body.style.backgroundColor = '#d3f8e2';
      break;
    case 'medium':
      document.body.style.backgroundColor = '#f8e2d3';
      break;
    case 'hard':
      document.body.style.backgroundColor = '#f8d3e2';
      break;
    default:
      document.body.style.backgroundColor = '#ffffff';
  }
}
const settingsForm = document.getElementById('settingsForm');
const playerNameInput = document.getElementById('playerName');
const difficultySelect = document.getElementById('difficulty');

settingsForm.addEventListener('submit', saveSettings);

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
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  applyDifficulty();
  updateBestScoreDisplay();
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey && event.key === 'E') {
    document.body.style.backgroundColor = '#e2d3f8';
    alert('Thème secret activé !');
  }
});
