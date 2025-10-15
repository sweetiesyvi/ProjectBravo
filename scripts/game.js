import { storage } from './storage.js';
import { el } from './ui.js';

export default class Game {
  constructor({ selectors = {} } = {}){
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
      difficulty: 'normal'
    };

    this.loadPrefs();
    this.attachUI();
    this.updateUI();
  }

  loadPrefs(){
    const prefs = storage.get('reaction:prefs', {});
    if(prefs.name) this.state.playerName = prefs.name;
    if(prefs.bestTime) this.state.bestTime = prefs.bestTime;
    if(prefs.difficulty) this.state.difficulty = prefs.difficulty;
    document.getElementById('playerName')?.value = prefs.name || '';
    document.getElementById('difficulty')?.value = prefs.difficulty || 'normal';
    // theme if stored
    if(prefs.theme === 'dark') document.body.classList.add('theme-dark');
  }

  savePrefs(){
    storage.set('reaction:prefs', {
      name: this.state.playerName,
      bestTime: this.state.bestTime,
      difficulty: this.state.difficulty,
      theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light'
    });
  }

  attachUI(){
    // Start / Reset nav button
    document.getElementById('startBtn')?.addEventListener('click', ()=> this.resetGame());

    // Start/Stop round
    this.startRoundBtn?.addEventListener('click', ()=> this.startRound());
    this.stopRoundBtn?.addEventListener('click', ()=> this.stopRound());

    // target click
    this.targetEl?.addEventListener('click', (e)=> this.onTargetClick(e));
    // keyboard activation
    this.targetEl?.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.onTargetClick(e);
      }
    });

    // nav settings form
    const navForm = document.getElementById('navSettings');
    navForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = navForm.playerName.value.trim();
      if(!name || name.length < 2){
        navForm.playerName.classList.add('is-invalid');
        return;
      }
      navForm.playerName.classList.remove('is-invalid');
      this.state.playerName = name;
      this.state.difficulty = navForm.difficulty.value;
      this.savePrefs();
      this.updateUI();
      this.announce(`Bienvenue, ${name}`);
    });

    // settings panel
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = settingsPanel.name?.value?.trim();
      const theme = settingsPanel.theme.value;
      if(!name || name.length < 2){
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
    document.getElementById('resetBtn')?.addEventListener('click', ()=> {
      this.state.bestTime = null;
      storage.remove('reaction:prefs');
      this.savePrefs();
      this.updateUI();
      this.announce('Best time cleared');
    });

    // hint / easter egg via console (see index.html)
  }

  startRound(){
    if(this.state.running) return;
    this.state.running = true;
    this.startRoundBtn.disabled = true;
    this.stopRoundBtn.disabled = false;
    this.targetEl.classList.remove('ready');
    this.targetEl.classList.add('wait');
    this.targetLabel.textContent = 'Wait for green...';
    this.announce('Get ready...');
    // random delay influenced by difficulty
    const range = this.getDelayRange();
    const ms = Math.floor(Math.random() * (range.max - range.min)) + range.min;
    // store timer
    this.state.waitTimer = setTimeout(()=> {
      this.goSignal();
    }, ms);
  }

  stopRound(){
    if(!this.state.running) return;
    clearTimeout(this.state.waitTimer);
    this.state.running = false;
    this.startRoundBtn.disabled = false;
    this.stopRoundBtn.disabled = true;
    this.targetEl.classList.remove('wait','ready');
    this.targetLabel.textContent = 'Stopped';
    this.announce('Round stopped.');
  }

  getDelayRange(){
    // difficulty modifies min/max
    const d = document.getElementById('difficulty')?.value || this.state.difficulty || 'normal';
    if(d === 'easy') return { min: 1000, max: 3000 };
    if(d === 'hard') return { min: 400, max: 1600 };
    return { min: 700, max: 2200 };
  }

  goSignal(){
    this.goTime = performance.now();
    this.targetEl.classList.remove('wait');
    this.targetEl.classList.add('ready');
    this.targetLabel.textContent = 'CLICK!';
    this.announce('Now! Click!');
  }

  onTargetClick(e){
    // If not started -> false start
    if(!this.state.running){
      // false start
      this.announce('Press Start first!');
      // small visual feedback
      this.flashMessage('Please press Start before clicking.', true);
      return;
    }
    // If clicked before green -> false start
    if(!this.targetEl.classList.contains('ready')){
      // false start: cancel and penalize
      clearTimeout(this.state.waitTimer);
      this.state.running = false;
      this.startRoundBtn.disabled = false;
      this.stopRoundBtn.disabled = true;
      this.targetEl.classList.remove('wait');
      this.targetLabel.textContent = 'Too soon! Try again';
      this.incrementAttempts();
      this.announce('False start.');
      return;
    }
    // valid click
    const clickedAt = performance.now();
    const delta = Math.round(clickedAt - this.goTime);
    this.lastTimeEl.textContent = delta;
    this.incrementAttempts();
    this.state.running = false;
    this.startRoundBtn.disabled = false;
    this.stopRoundBtn.disabled = true;
    this.targetEl.classList.remove('ready');
    this.targetLabel.textContent = 'Nice!';
    this.announce(`Your time: ${delta} ms`);

    // update best
    if(this.state.bestTime === null || delta < this.state.bestTime){
      this.state.bestTime = delta;
      this.flashMessage('New best time!', false);
    }

    this.savePrefs();
    this.updateUI();
  }

  incrementAttempts(){
    this.state.attempts = (this.state.attempts || 0) + 1;
  }

  updateUI(){
    this.displayNameEl.textContent = this.state.playerName || 'Player';
    const best = this.state.bestTime;
    this.bestTimeEl.textContent = best ? `${best} ms` : '—';
    this.bestTimeEl2.textContent = best ? `${best}` : '—';
    this.attemptsEl.textContent = this.state.attempts || 0;
    // progress bar: percent of improvement relative to a baseline (simple)
    let pct = 0;
    if(this.state.bestTime) {
      const baseline = 1000; // 1s baseline
      pct = Math.max(0, Math.min(100, Math.round((1 - (this.state.bestTime / baseline)) * 100)));
    }
    this.progressBar.style.width = pct + '%';
    this.progressBar.setAttribute('aria-valuenow', pct);
    this.progressBar.textContent = pct + '%';
  }

  announce(text){
    if(this.messageEl) this.messageEl.textContent = text;
    const aria = document.getElementById('ariaStatus');
    if(aria) aria.textContent = text;
  }

  flashMessage(text, isError = false){
    const prev = this.messageEl.textContent;
    this.messageEl.textContent = text;
    if(isError) this.messageEl.classList.add('text-danger');
    setTimeout(()=> {
      this.messageEl.textContent = prev;
      if(isError) this.messageEl.classList.remove('text-danger');
    }, 1200);
  }

  resetGame(){
    this.state.attempts = 0;
    this.state.bestTime = null;
    this.state.running = false;
    clearTimeout(this.state.waitTimer);
    this.savePrefs();
    this.updateUI();
    this.announce('Game reset.');
  }

  toggleSecret(){
    document.body.classList.toggle('theme-dark');
    this.announce('Secret theme toggled!');
    this.savePrefs();
  }
}
