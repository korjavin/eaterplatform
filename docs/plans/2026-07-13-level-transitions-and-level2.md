# Design Level 2 and Add Level Transition Logic

This plan outlines the architecture and implementation steps to fix the unreachable left platform in Level 1, add dynamic level loading, design Level 2, and fix the level transition logic.

## 🏛️ Architecture & Refactoring Steps

Currently, the game layout (platforms, dots, enemies, portal) is hardcoded into global variables in `web/js/game.js`. When a level is completed, the game increases the level number but resets back to Level 1 because the button click handler calls `resetGame()` which overrides everything.

We will refactor this layout to be dynamically loaded:

### 1. Define a `LEVELS` Configuration Object
We will create a central dictionary containing the configurations for all levels:
- **Level 1**: Existing layout, with the unreachable left platform fixed by adding a small stepping platform.
- **Level 2**: A new platforming layout with distinct platform placements, dots, and patrolling enemies.
- **Portal Placement**: The portal position will be dynamic per level.

### 2. Implement Dynamic Loading
- Refactor the global lists `platforms`, `dots`, and `enemies` to be dynamically populated.
- Implement `loadLevel(levelNum)` which will deep-copy the configurations from `LEVELS[levelNum]`, update the HUD, and reset the player's position.
- Implement a victory state (`gameVictory()`) when all levels are completed.

### 3. Fix Button Click Handler
- In the `startBtn` click listener, determine whether to restart the entire game (`resetGame()`) or load the next level (`loadLevel(level)`) based on current state (e.g., if the player has lives and is transitioning).

---

## 🛠️ Detailed Code Changes

### Step 1: Add step platform to Level 1
Add a step platform at `{ x: 10, y: 290, width: 80, height: 15 }` so the player can jump Ground (380) -> Step (290) -> Left Platform (200).

### Step 2: Define `LEVELS` in `web/js/game.js`
```javascript
const LEVELS = {
  1: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 150, y: 300, width: 120, height: 15 },
      { x: 350, y: 220, width: 120, height: 15 },
      { x: 550, y: 150, width: 120, height: 15 },
      { x: 50, y: 200, width: 100, height: 15 },
      { x: 10, y: 290, width: 80, height: 15 } // Unreachable platform fix
    ],
    dots: [
      { x: 210, y: 270, collected: false },
      { x: 410, y: 190, collected: false },
      { x: 610, y: 120, collected: false },
      { x: 100, y: 170, collected: false },
      { x: 380, y: 350, collected: false }
    ],
    enemies: [
      { x: 350, y: 205, width: 20, height: 15, vx: 1, range: 100, startX: 350 },
      { x: 150, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 150 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  2: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 300, width: 150, height: 15 },
      { x: 250, y: 220, width: 150, height: 15 },
      { x: 450, y: 140, width: 150, height: 15 },
      { x: 650, y: 220, width: 100, height: 15 }
    ],
    dots: [
      { x: 120, y: 270, collected: false },
      { x: 320, y: 190, collected: false },
      { x: 520, y: 110, collected: false },
      { x: 700, y: 190, collected: false },
      { x: 200, y: 350, collected: false },
      { x: 600, y: 350, collected: false }
    ],
    enemies: [
      { x: 250, y: 205, width: 20, height: 15, vx: 1.2, range: 120, startX: 250 },
      { x: 450, y: 125, width: 20, height: 15, vx: 1.8, range: 120, startX: 450 },
      { x: 50, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 50 }
    ],
    portal: { x: 50, y: 240, width: 40, height: 60, active: false }
  }
};
```

### Step 3: Implement Dynamic Load functions
- Initialize variables:
```javascript
let platforms = [];
let dots = [];
let enemies = [];
let portal = { x: 0, y: 0, width: 40, height: 60, active: false };
```
- Create `loadLevel(levelNum)`:
```javascript
function loadLevel(levelNum) {
  const lvlConfig = LEVELS[levelNum];
  if (!lvlConfig) {
    gameVictory();
    return;
  }
  platforms = lvlConfig.platforms.map(p => ({ ...p }));
  dots = lvlConfig.dots.map(d => ({ ...d }));
  enemies = lvlConfig.enemies.map(e => ({ ...e }));
  portal = { ...lvlConfig.portal };
  resetPlayer();
  updateHUD();
}
```
- Implement `gameVictory()`:
```javascript
function gameVictory() {
  gameActive = false;
  overlay.querySelector('h2').textContent = 'Victory!';
  overlay.querySelector('p').textContent = `Congratulations! You beat all levels with a score of ${score}!`;
  overlay.querySelector('button').textContent = 'Play Again';
  overlay.classList.remove('hidden');
  level = 1;
}
```

### Step 4: Fix `resetGame()` and startBtn Click Handler
- In `resetGame()`:
```javascript
function resetGame() {
  score = 0;
  lives = 3;
  level = 1;
  loadLevel(level);
}
```
- Update `startBtn` event listener:
```javascript
startBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  if (lives <= 0 || (level === 1 && !gameActive)) {
    resetGame();
  } else {
    loadLevel(level);
  }
  gameActive = true;
  gameLoop();
});
```

---

## 🧪 Acceptance Criteria
1. The game displays a stepping platform on the left in Level 1.
2. Collecting all dots in Level 1 activates the portal.
3. Colliding with the portal transitions to the level complete screen.
4. Clicking the transition button loads Level 2 with current score and lives preserved.
5. Completing Level 2 transitions to a Victory screen.
