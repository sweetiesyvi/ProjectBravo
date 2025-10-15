export function saveScore(score) {
  if (typeof(Storage) !== 'undefined') {
    localStorage.setItem('bestScore', score);
  }
}

export function getBestScore() {
  if (typeof(Storage) !== 'undefined') {
    const score = localStorage.getItem('bestScore');
    return score ? parseInt(score, 10) : 0;
  }
  return 0;
}

export function updateBestScore(currentScore) {
  const bestScore = getBestScore();
  if (currentScore > bestScore) {
    saveScore(currentScore);
  }
}
