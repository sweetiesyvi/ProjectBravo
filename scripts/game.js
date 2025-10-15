// game.js

export let score = 0;
export let timeLeft = 10;
export let timerInterval;

export function startGame() {
  score = 0;
  timeLeft = 10;
  updateScoreDisplay();
  updateTimerDisplay();
  clickButton.disabled = false;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  updateTimerDisplay();
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    clickButton.disabled = true;
    alert(`Time's up! Your score is ${score}`);
    updateBestScore(score);
  }
}

function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
}

function updateBestScore(currentScore) {
  const bestScore = getBestScore();
  if (currentScore > bestScore) {
    saveBestScore(currentScore);
  }
}

function saveBestScore(score) {
  if (typeof(Storage) !== 'undefined') {
    localStorage.setItem('bestScore', score);
  }
}

function getBestScore() {
  if (typeof(Storage) !== 'undefined') {
    const score = localStorage.getItem('bestScore');
    return score ? parseInt(score, 10) : 0;
  }
  return 0;
}
