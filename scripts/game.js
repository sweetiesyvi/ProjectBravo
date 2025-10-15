export default class Game {
  constructor({ selectors = {} } = {}) {
    // ... (ton code existant)

    // Ajout de l'état pour le temps restant
    this.state.timeLeft = 10; // Temps en secondes
    this.state.timer = null;
    this.state.gameOver = false;
  }

  startRound() {
    if (this.state.running || this.state.gameOver) return;

    this.state.running = true;
    this.state.gameOver = false;
    this.state.timeLeft = 10;
    this.updateUI();

    this.startRoundBtn.disabled = true;
    this.stopRoundBtn.disabled = false;
    this.targetEl.classList.remove('ready');
    this.targetEl.classList.add('wait');
    this.targetLabel.textContent = 'Attendez le vert...';

    // Démarrer le compte à rebours
    this.state.timer = setInterval(() => {
      this.state.timeLeft--;
      this.updateUI();
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.timer);
        this.state.gameOver = true;
        this.stopRound();
      }
    }, 1000);

    // Délai aléatoire avant que la cible devienne verte
    const range = this.getDelayRange();
    const ms = Math.floor(Math.random() * (range.max - range.min)) + range.min;
    this.state.waitTimer = setTimeout(() => {
      this.goSignal();
    }, ms);
  }

  stopRound() {
    if (!this.state.running) return;

    clearTimeout(this.state.waitTimer);
    clearInterval(this.state.timer);
    this.state.running = false;
    this.state.gameOver = true;
    this.startRoundBtn.disabled = false;
    this.stopRoundBtn.disabled = true;
    this.targetEl.classList.remove('wait', 'ready');
    this.targetLabel.textContent = 'Arrêté';

    this.announce('Jeu terminé.');
  }

  updateUI() {
    super.updateUI(); // Appeler la méthode updateUI existante

    // Mettre à jour le temps restant
    const timeLeftEl = document.getElementById('timeLeft');
    if (timeLeftEl) {
      timeLeftEl.textContent = `Temps restant : ${this.state.timeLeft}s`;
    }
  }

  // ... (ton code existant)
}
