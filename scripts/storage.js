function saveScore(score) {
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

function updateBestScore(currentScore) {
  const bestScore = getBestScore();
  if (currentScore > bestScore) {
    saveScore(currentScore);
  }
}
