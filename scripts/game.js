// Variables globales
let score = 0;
let timeLeft = 30;
let timerInterval;
let gameActive = false;

// Sélection des éléments DOM
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clickBtn = document.getElementById('clickBtn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

// Fonction pour démarrer le jeu
function startGame() {
  score = 0;
  timeLeft = 30;
  gameActive = true;
  startBtn.disabled = true;
  resetBtn.disabled = false;
  clickBtn.disabled = false;
  clickBtn.textContent = 'Cliquez-moi !';
  updateScore();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Fonction pour réinitialiser le jeu
function resetGame() {
  clearInterval(timerInterval);
  gameActive = false;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  clickBtn.disabled = true;
  clickBtn.textContent = 'Cliquez-moi !';
  timerDisplay.textContent = 'Temps restant : 30s';
  scoreDisplay.textContent = 'Score : 0';
}

// Fonction pour mettre à jour le score
function updateScore() {
  scoreDisplay.textContent = `Score : ${score}`;
}

// Fonction pour mettre à jour le timer
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.textContent = `Temps restant : ${timeLeft}s`;
  } else {
    clearInterval(timerInterval);
    gameActive = false;
    clickBtn.disabled = true;
    clickBtn.textContent = 'Temps écoulé !';
  }
}

// Fonction pour gérer les clics sur le bouton
function handleClick() {
  if (gameActive) {
    score++;
    updateScore();
  }
}

// Événements
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
clickBtn.addEventListener('click', handleClick);
