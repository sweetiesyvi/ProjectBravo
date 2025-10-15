import { storage } from './storage.js';

export default class Game {
  constructor({ selectors = {} } = {}) {
    this.selectors = selectors;
    this.displayNameEl = document.querySelector(selectors.displayName);
    this.bestTimeEl = document.querySelector(selectors.bestTime);
    this.bestTimeEl2 = document.querySelector(selectors.bestTime2);
    this.attemptsEl = document.querySelector(selectors.attempts);
    this.targetEl = document.querySelector(selectors.target);
    this.targetLabel = document.querySelector(selectors.targetLabel);
    this.startRoundBtn = document.querySelector(selectors.startRound);
    this.stopRoundBtn = document.querySelector(selectors.stopRound);
    this.lastTimeEl = document.querySelector(selectors.lastTime);
    this.progressBar = document.querySelector(selectors.progressBar);
    this.messageEl = document.querySelector(selectors.message);

    // state
    this.state = {
      playerName: '',
      bestTime: null, // ms, lower is better
      attempts: 0,
      running: false,
      waitTimer: null,
      goTime: null,
      difficulty: 'normal',
      score: 0,
      countdown: 10,
      countdownTimer: null,
    };

    this.loadPrefs();
    this.attachUI();
    this.updateUI();
  }

  loadPrefs() {
    const prefs = storage.get('reaction:prefs', {});
    if (prefs.name) this.state.playerName = prefs.name;
    if (prefs.bestTime) this.state.bestTime = prefs.bestTime;
    if (prefs.difficulty) this.state.difficulty = prefs.difficulty;
    document.getElementById('playerName')?.value = prefs.name || '';
    document.getElementById('difficulty')?.value = prefs.difficulty || 'normal';
    // theme if stored
    if (prefs.theme === 'dark') document.body.classList.add('theme-dark');
  }

  savePrefs() {
    storage.set('reaction:prefs', {
      name: this.state.playerName,
      bestTime: this.state.bestTime,
      difficulty: this.state.difficulty,
      theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light',
    });
  }

  attachUI() {
    // Start / Reset nav button
    document.getElementById('startBtn')?.addEventListener('click', () => this.startGame());

    // target click
    this.targetEl?.addEventListener('click', (e) => this.onTargetClick(e));
    // keyboard activation
    this.targetEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.onTargetClick(e);
      }
    });

    // settings panel
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = settingsPanel.name?.value?.trim();
      const theme = settingsPanel.theme.value;
      if (!name || name.length < 2) {
        settingsPanel.name.classList.add('is-invalid');
        return;
      }
      settingsPanel.name.classList.remove('is-invalid');
      this.state.playerName = name;
      document.body.classList.toggle('theme-dark', theme === 'dark');
      this.savePrefs();
      this.updateUI();
      this.announce('Paramètres appliqués');
    });

    // Reset best
    document.getElementById('resetBtn')?.addEventListener('click', () => {
      this.state.bestTime = null;
      storage.remove('reaction:prefs');
      this.savePrefs();
      this.updateUI();
      this.announce('Best time cleared');
    });

    // hint / easter egg via console (see index.html)
  }

  startGame() {
    this.state.score = 0;
    this.state.countdown = 10;
    this.state.running = true;
    this.updateUI();
    this.startCountdown();
    this.announce('Jeu démarré !');
  }

  startCountdown() {
    this.state.countdownTimer = setInterval(() => {
      if (this.state.countdown > 0) {
        this.state.countdown--;
        this.updateUI();
      } else {
        clearInterval(this.state.countdownTimer);
        this.state.running = false;
        this.announce('Temps écoulé !');
        this.updateUI();
      }
    }, 1000);
  }

  onTargetClick(e) {
    if (!this.state.running) {
      this.announce('Le jeu n\'est pas en cours.');
      return;
    }
    this.state.score++;
    this.updateUI();
  }

  updateUI() {
    document.getElementById('timer').textContent = this.state.countdown;
    document.getElementById('score').textContent = this.state.score;
    this.messageEl.textContent = `Score final : ${this.state.score}`;
  }

  announce(text) {
    if (this.messageEl) this.messageEl.textContent = text;
    const aria = document.getElementById('ariaStatus');
    if (aria) aria.textContent = text;
  }
}


