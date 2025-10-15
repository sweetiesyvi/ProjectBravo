export function savePlayerName(name) {
  localStorage.setItem('playerName', name);
}

export function loadPlayerName() {
  return localStorage.getItem('playerName') || '';
}

