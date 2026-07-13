# Size Carryover and Red Stars Plan

This plan implements size persistence between level loads and adds Red Stars that shrink Eater, allowing him to jump higher to navigate tough vertical sections.

## 🏛️ Architecture & Code Changes

### 1. Size Carryover Between Levels
- Modify `resetPlayer(preserveRadius)` in `web/js/game.js` to accept a boolean flag:
```javascript
function resetPlayer(preserveRadius = false) {
  player.x = 50;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;
  player.grounded = false;
  if (!preserveRadius) {
    player.radius = 15;
  }
}
```
- In `loadLevel(levelNum)`:
  - If `levelNum > 1`, preserve the player's radius: `resetPlayer(true);`
  - Otherwise, reset the player's radius: `resetPlayer(false);`
- In `resetGame()` and `gameOver()`, ensure we reset player radius to 15.

### 2. Red Stars (Shrink mechanic)
- Define a red star (dot) structure:
  - Flag: `red: true`
  - Color: Red `#e74c3c`
  - Radius: 6 (same as standard dot)
- When a Red Star is eaten in `update()`:
  - Decrease Eater's radius: `player.radius = Math.max(10, player.radius / 1.10);` (shrinks the player back down, allowing him to jump higher, with a floor of 10px).
  - Play the eat sound and update score by 100 points.
- Place Red Stars strategically in some levels:
  - **Level 3**: Place a red star at `(300, 350)` on the ground.
  - **Level 5**: Place a red star at `(400, 350)` on the ground.
  - **Level 8**: Place a red star at `(550, 350)` on the ground.

### 3. Rendering Updates
- In `draw()`, check if the dot has the `red` flag:
  - If `dot.red === true`, draw it using color `#e74c3c` (red) with a red glowing shadow (`ctx.shadowColor = '#e74c3c'`).
  - Standard stars are yellow `#f3ca20`.
  - Big stars are orange `#f39c12`.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Modify `resetPlayer()` signature and body.
- Update `loadLevel()` to call `resetPlayer(levelNum > 1)`.
- Update dot collision logic in `update()` to handle `dot.red` collection.
- Update dot rendering loop in `draw()` to draw red stars.
- Add red dots to Level 3, 5, and 8 config.
