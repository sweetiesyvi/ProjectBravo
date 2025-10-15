export function savePlayerName(name) {
  localStorage.setItem('playerName', name);
  playerNameInput.value = loadPlayerName();

}

export function loadPlayerName() {
  return localStorage.getItem('playerName') || '';
}


