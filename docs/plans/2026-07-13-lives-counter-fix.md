# Lives Counter Fix Plan

This plan fixes the issue where the lives counter sometimes doesn't update visually or causes the game engine to crash.

## 🏛️ Architecture & Code Changes

### 1. Collision Loop Break (`eaterplatform-zoi`)
- **Problem**: When a player collides with an enemy, `lives` is decremented, and the game either resets the player or calls `gameOver()`. However, the loop continues checking other enemies in the same frame. If the player overlaps another enemy at the same time (or right at the spawn location), `lives` gets decremented again.
- **Fix**: Immediately `break` out of the enemy update loop after a collision is handled:
```javascript
      lives--;
      soundEffects.playDieSound();
      updateHUD();
      if (lives <= 0) {
        gameOver();
        break; // Stop checking other collisions
      } else {
        resetPlayer();
        break; // Stop checking other collisions
      }
```

### 2. RangeError Prevention in `updateHUD` (`eaterplatform-zoi`)
- **Problem**: If `lives` drops below 0 (due to multiple collisions before the game loop terminates), calling `'❤'.repeat(lives)` throws `RangeError: Invalid count value`, crashing the execution.
- **Fix**: Ensure that the count passed to `repeat` is never negative:
```javascript
function updateHUD() {
  scoreVal.textContent = String(score).padStart(4, '0');
  livesVal.textContent = '❤'.repeat(Math.max(0, lives));
  levelVal.textContent = level;
}
```

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Add `break;` inside both branches of the collision handling.
- Modify `livesVal.textContent = '❤'.repeat(Math.max(0, lives));` in `updateHUD()`.
