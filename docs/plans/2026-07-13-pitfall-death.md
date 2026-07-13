# Pitfall Death Plan

This plan implements a pitfall death check to handle when the player falls off the bottom edge of the canvas.

## 🏛️ Architecture & Code Changes

### 1. Bottom Canvas Bounds Check (`eaterplatform-pv1`)
- In `update()` in `web/js/game.js`, check if the player's top boundary goes below the bottom of the canvas:
```javascript
  if (player.y - player.radius > canvas.height) {
    lives--;
    soundEffects.playDieSound();
    updateHUD();
    if (lives <= 0) {
      gameOver();
    } else {
      resetPlayer();
    }
  }
```
- This triggers a death, plays the death sound, decrements lives, and either triggers Game Over or respawns the player on the starting platform.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Insert the bottom boundary death check into the `update()` function where canvas bounds are checked.
