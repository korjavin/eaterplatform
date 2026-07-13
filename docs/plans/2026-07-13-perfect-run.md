# Perfect Run Reward Plan

This plan tracks if the player completes a level without losing any lives or hearts, and rewards them with `+2` lives instead of `+1` (capped at 5).

## 🏛️ Architecture & Code Changes

### 1. Level Start Lives Tracking (`eaterplatform-586`)
- Define a global state variable `levelStartLives`:
```javascript
let levelStartLives = 3;
```
- In `loadLevel(levelNum)`, record the current lives:
```javascript
levelStartLives = lives;
```
- In `resetGame()`, reset `levelStartLives = 3;`.

### 2. Perfect Run Reward Logic (`eaterplatform-586`)
- In `levelComplete()`, check if the player's current lives are greater than or equal to `levelStartLives`:
```javascript
  const perfectRun = lives >= levelStartLives;
  const reward = perfectRun ? 2 : 1;
  lives = Math.min(5, lives + reward);
  updateHUD();
```
- This doubles the reward if the player didn't take any damage or reset their size during the level.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Define `levelStartLives` variable.
- Set `levelStartLives` in `resetGame()` and `loadLevel()`.
- Update `levelComplete()` to apply `perfectRun ? 2 : 1` life reward.
