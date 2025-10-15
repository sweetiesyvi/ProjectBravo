let score = 0;
let timeLeft = 10;
let timerInterval;

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clickBtn = document.getElementById('clickBtn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
clickBtn.addEventListener('click', incrementScore);

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
