// /scripts/game.js
let startTime, timeoutId;
let bestTime = parseInt(localStorage.getItem("bestTime")) || null;
let playerName = "";
let difficulty = "normal";

const gameArea = document.getElementById("game-area");
const message = document.getElementById("message");
const result = document.getElementById("result");
const best = document.getElementById("best");
const startBtn = document.getElementById("startBtn");
const settingsForm = document.getElementById("settingsForm");

best.textContent = bestTime ? `${bestTime} ms` : "—";

// ===== Functions =====
function startGame() {
  clearTimeout(timeoutId);
  result.textContent = "";
  message.textContent = "Wait for green...";
  gameArea.className = "rounded mx-auto my-3"; // reset

  let delay;
  switch (difficulty) {
    case "easy": delay = Math.random() * 1000 + 1000; break;      // 1–2s
    case "normal": delay = Math.random() * 1500 + 1000; break;    // 1–2.5s
    case "hard": delay = Math.random() * 2000 + 1000; break;      // 1–3s
    default: delay = Math.random() * 2000 + 1000;
  }

  timeoutId = setTimeout(() => {
    gameArea.classList.add("ready");
    message.textContent = "Click now!";
    startTime = Date.now();
    gameArea.dataset.ready = "true";
  }, delay);
}

function handleClick() {
  if (gameArea.dataset.ready === "true") {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Your time: ${reactionTime} ms`;

    if (!bestTime || reactionTime < bestTime) {
      bestTime = reactionTime;
      localStorage.setItem("bestTime", bestTime);
      best.textContent = `${bestTime} ms`;
      result.textContent += " 🏆 New Record!";
    }

    gameArea.dataset.ready = "false";
    gameArea.className = "rounded mx-auto my-3";
    message.textContent = "Click Play to try again!";
  } else {
    if (message.textContent === "Wait for green...") {
      message.textContent = "Too soon! Wait for green.";
      clearTimeout(timeoutId);
      gameArea.className = "rounded mx-auto my-3 too-soon";
    }
  }
}

// ===== Form Handling =====
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
  localStorage.setItem("settings", JSON.stringify({ name: playerName, difficulty }));
  alert(`Welcome ${playerName}! Difficulty set to ${difficulty}.`);
});

// Load saved settings
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("settings"));
  if (saved) {
    playerName = saved.name;
    difficulty = saved.difficulty;
    document.getElementById("playerName").value = playerName;
    document.getElementById("difficulty").value = difficulty;
  }

  console.log("%cHint: type secretTheme() in console for a surprise!", "color: teal; font-weight:600");
});

// Easter egg
window.secretTheme = function () {
  document.body.classList.toggle("dark-theme");
  console.log("🌙 Dark theme toggled!");
};

// ===== Event Listeners =====
startBtn.addEventListener("click", startGame);
gameArea.addEventListener("click", handleClick);


