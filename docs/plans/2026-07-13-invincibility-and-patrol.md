# Invincibility Frames and Enemy Patrol Fix Plan

This plan implements a 1.5-second invincibility frame window after spawning/respawning, complete with visual blinking, and tunes the patrol range of the Platform 1 enemy in Level 2.

## 🏛️ Architecture & Code Changes

### 1. Level 2 Enemy Patrol Tuning (`eaterplatform-z8a`)
- **Problem**: In Level 2, the enemy on the spawn platform starts at `startX = 150` with a patrol range of `100`. This allows it to patrol down to `x = 50`, which is exactly where the player spawns. If the player respawns after a death while the enemy is on the left side of its patrol, they instantly die again.
- **Fix**: Reduce the patrol range to `70` for this enemy:
  `{ x: 150, y: 285, width: 20, height: 15, vx: 1.5, range: 70, startX: 150 }`
  This limits its movement between `80` and `220`, keeping a safe distance of 15px from the spawn point at `x = 50` (player edge at `65`).

### 2. Player Invincibility Frames (`eaterplatform-z8a`)
- Add `invincibleTimer: 0` to the player state in `web/js/game.js`.
- In `resetPlayer()`, set `player.invincibleTimer = 90` (1.5 seconds at 60 FPS).
- In `update()`:
  - If `player.invincibleTimer > 0`, decrement it by 1.
  - In the enemy collision check loop, if `player.invincibleTimer > 0`, skip collision processing for that frame.
- In `draw()`, if `player.invincibleTimer > 0`, apply a blinking/translucent effect to Eater:
  - Wrap the player drawing code with `ctx.save()` and `ctx.restore()`.
  - Set `ctx.globalAlpha = 0.4 + 0.3 * Math.sin(performance.now() / 60);` (creates a smooth blinking effect).

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Tune Level 2 enemy 3 config.
- Update `player` properties to include `invincibleTimer: 0`.
- Update `resetPlayer()` to set `player.invincibleTimer = 90`.
- Update `update()` to decrement `player.invincibleTimer` and skip enemy collision check if it is active.
- Wrap player rendering in `draw()` with `ctx.save()` and `ctx.restore()` and set `ctx.globalAlpha` if `player.invincibleTimer > 0`.
