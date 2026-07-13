# Jump Height Degradation Plan

This plan scales the player's jump height downwards as they grow in size, making it harder to jump when they are large.

## 🏛️ Architecture & Code Changes

### 1. Jump Force Scaling Math
- When the player presses jump keys (Up, W, Space), calculate a scaled jump force:
  - Base jump force is `player.jumpForce = 10`.
  - Base radius is `15`.
  - Scaled jump force formula:
    `const sizeFactor = Math.max(0.5, 1 - (player.radius - 15) * 0.035);`
    `const currentJumpForce = player.jumpForce * sizeFactor;`
  - This ensures that as the player grows, the jump force decreases by 3.5% per pixel of growth, with a floor of 50% base jump force (so they can always make at least a small hop).

### 2. Code Integration
- In `web/js/game.js`, locate the jump input check in `update()`:
```javascript
  // Jumping
  if ((keys.ArrowUp || keys.KeyW || keys.Space) && player.grounded) {
    player.vy = -player.jumpForce;
    player.grounded = false;
    soundEffects.playJumpSound();
  }
```
- Replace it to calculate and apply `currentJumpForce`:
```javascript
  // Jumping (scaled by size/weight)
  if ((keys.ArrowUp || keys.KeyW || keys.Space) && player.grounded) {
    const sizeDiff = player.radius - 15;
    const currentJumpForce = Math.max(5, player.jumpForce * (1 - sizeDiff * 0.035));
    player.vy = -currentJumpForce;
    player.grounded = false;
    soundEffects.playJumpSound();
  }
```

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Modify the jump execution check in `update()` as planned.
