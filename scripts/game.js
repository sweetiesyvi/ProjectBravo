// /scripts/game.js
import { saveBestTime, getBestTime, saveSettings, getSettings } from './storage.js';

let startTime, timeoutId;
let bestTime = getBestTime();
let playerName = "";
let difficulty = "normal";

const gameArea = document.getElementById("game-area");
const message = document.getElementById("message");
const result = document.getElementById("result");
const best = document.getElementById("best");
const startBtn = document.getElementById("startBtn");
const settingsForm = document.getElementById("settingsForm");

best.textContent = bestTime ? `${bestTime} ms` : "—";

// === Function to start the game ===
function startGame() {
  clearTimeout(timeoutId);
  result.textContent = "";
  message.textContent = "Wait for green...";
  gameArea.style.backgroundColor = "#dc3545"; // red (Bootstrap danger)

  // delay time based on difficulty
  let delay;
  switch (difficulty) {
    case "easy":
      delay = Math.random() * 1000 + 1000; // 1–2 seconds
      break;
    case "normal":
      delay = Math.random() * 1500 + 1000; // 1–2.5 seconds
      break;
    case "hard":
      delay = Math.random() * 2000 + 1000; // 1–3 seconds
      break;
    default:
      delay = Math.random() * 2000 + 1000;
  }

  timeoutId = setTimeout(() => {
    gameArea.style.backgroundColor = "#198754"; // green (Bootstrap success)
    message.textContent = "Click now!";
    startTime = Date.now();
    gameArea.dataset.ready = "true";
  }, delay);
}

// === Function to handle click ===
function handleClick() {
  if (gameArea.dataset.ready === "true") {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Your time: ${reactionTime} ms`;

    if (!bestTime || reactionTime < bestTime) {
      bestTime = reactionTime;
      saveBestTime(bestTime);
      best.textContent = `${bestTime} ms`;
      result.textContent += " 🏆 New Record!";
    }

    gameArea.dataset.ready = "false";
    gameArea.style.backgroundColor = "#0d6efd"; // blue
    message.textContent = "Click Play to try again!";
  } else {
    if (message.textContent === "Wait for green...") {
      message.textContent = "Too soon! Wait for green.";
      clearTimeout(timeoutId);
      gameArea.style.backgroundColor = "#ffc107"; // yellow (Bootstrap warning)
    }
  }
}

// === Form handling ===
settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("playerName");
  const difficultySelect = document.getElementById("difficulty");

  if (!nameInput.checkValidity()) {
    nameInput.reportValidity();
    return;
  }

  playerName = nameInput.value.trim();
  difficulty = difficultySelect.value;

  saveSettings(playerName, difficulty);

  alert(`Welcome ${playerName}! Difficulty set to ${difficulty}.`);
});

// === Load saved settings ===
window.addEventListener("load", () => {
  const saved = getSettings();
  if (saved) {
    playerName = saved.name;
    difficulty = saved.difficulty;
    document.getElementById("playerName").value = playerName;
    document.getElementById("difficulty").value = difficulty;
  }

  // Easter egg hint
  console.log("%c🪄 Hint: Type secretTheme() in console for a surprise!", "color: #0d6efd");
});

// === Start button ===
startBtn.addEventListener("click", startGame);
gameArea.addEventListener("click", handleClick);

// === Easter egg: theme toggle ===
window.secretTheme = function () {
  document.body.classList.toggle("dark-theme");
  console.log("🌙 Dark theme toggled!");
};
