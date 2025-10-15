export function initializeSettingsForm() {
  const form = document.getElementById('settingsForm');
  form.addEventListener('submit', handleFormSubmit);

  // Load saved settings
  const playerName = localStorage.getItem('playerName');
  const difficulty = localStorage.getItem('difficulty');
  if (playerName) {
    document.getElementById('playerName').value = playerName;
  }
  if (difficulty) {
    document.getElementById('difficulty').value = difficulty;
    applyDifficulty(difficulty);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const playerName = document.getElementById('playerName').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  if (playerName) {
    localStorage.setItem('playerName', playerName);
  }
  localStorage.setItem('difficulty', difficulty);
  applyDifficulty(difficulty);
  alert('Settings saved');
}

function applyDifficulty(difficulty) {
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
