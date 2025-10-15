# Click Click Game
**Date:** October 2025  
**Author:** Sweetie  


## Game Objective
Try to accumulate the highest number of clicks before the timer is up!  
Clicking your mouse, or rather each click, adds a point to your score, and your top score is written down in **Local Storage**.  


## How to Play
1. Tap on **Click!** to get going.  
2. The 10-second timer starts without delay.  
3. Click as many times as you can—every single click counts for 1 point.  
4. Your final score gets displayed when the time runs out.  
5. Try to beat your **best score** (stored locally)!  

## Features
- Current **ES6 Modules** (`game.js` and `storage.js`)
- **Bootstrap 5 Navbar** with links to Play, How to Play, and Settings
- High scores saved using **Local Storage**
- Use of the **Google Font** is to create a retro game feeling
- **Responsive design** for mobile as well as desktop
- **User-friendly UI** (semantic HTML, visible focus, aria-live updates, etc.)
- **Easter Egg:** Type `themeSwap()` in the console to change the theme!


## Tech Used
- HTML5  
- CSS3 (custom + Bootstrap 5)  
- JavaScript ES Modules  
- Local Storage  
- Google Fonts  
- GitHub Pages for hosting  


## Wireframe
![Wireframe of Click Click Game](/images/wireframe.png)

The wireframe shows a simple one-page layout:
- Top **navbar**
- Central **game area** with a button and score
- **Footer** with project and validation links


## Useful Links
- https://sweetiesyvi.github.io/ClickClickGame/
- https://github.com/sweetiesyvi/ProjectBravo
- [NU HTML Validator] https://validator.w3.org/nu/?doc=https://sweetiesyvi.github.io/ClickClickGame/
- [WAVE Accessibility Checker] https://wave.webaim.org/report#/https://sweetiesyvi.github.io/ClickClickGame/


## Code Snippet Explanation
```js
// Save and retrieve high score using Local Storage
if (score > highScore) {
  highScore = score;
  storage.set("highScore", highScore);
  highScoreDisplay.textContent = `Best Score: ${highScore}`;
}

## Collaboration and ressources
- wc3.com
- Youtube
- chatgpt for explaination and correction 
