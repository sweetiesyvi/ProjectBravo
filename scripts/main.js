import { startGame } from './scripts/game.js';
import { initializeSettingsForm } from './scripts/settings.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeSettingsForm();
  startGame();
});
