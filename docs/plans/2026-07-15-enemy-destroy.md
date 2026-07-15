# Enemy Destruction by Spit Stars Plan

This plan allows spit-moving stars to destroy enemies they collide with, making the star-spitting mechanic a tactical weapon.

## 🏛️ Architecture & Code Changes

### 1. Spit Star & Enemy Collision Check (`eaterplatform-3au`)
- In `web/js/game.js`, inside the spit-moving dots update loop in `update()`:
  - For each active spit-moving dot:
    - Iterate backwards through the `enemies` array.
    - Check if the dot's bounding box/circle intersects with the enemy's rectangular bounding box:
      `dot.x + dotRadius > enemy.x && dot.x - dotRadius < enemy.x + enemy.width && dot.y + dotRadius > enemy.y && dot.y - dotRadius < enemy.y + enemy.height`
    - If a collision is detected:
      - Remove the enemy from the game: `enemies.splice(i, 1);`
      - Play a satisfying "explosion/pop" sound effect using `soundEffects.playTone(400, 120, 0.2, 'sawtooth', 0.08);`.
      - The star remains intact and continues its physical trajectory.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Integrate enemy collision checks in the spit-moving dots update section of `update()`.
