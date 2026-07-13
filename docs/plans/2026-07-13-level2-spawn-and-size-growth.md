# Level 2 Spawn Fix and Eater Size Growth Mechanic Plan

This plan fixes the instant-death bug at Level 2 spawn and implements the star-eating size growth mechanic.

## 🏛️ Architecture & Code Changes

### 1. Level 2 Spawn Bug Fix (`eaterplatform-3td`)
- **Root Cause**: The player spawns at `(50, 300)`. In Level 2, an enemy is configured to start at `(50, 285)`. This causes immediate collision detection on spawn, resulting in rapid loss of all 3 lives within 3 frames, triggering an instant "Game Over" screen right as the level transitions.
- **Fix**: Move the enemy's starting position away from the spawn point:
  - Change Level 2 enemy 3 from `{ x: 50, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 50 }` to `{ x: 150, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 150 }`.

### 2. Player Size Scaling logic
- In `web/js/game.js`, the player drawing logic in `draw()` has hardcoded sizing based on a base radius of `15`.
- We will refactor the player rendering math to scale dynamically based on the current `player.radius` value.
- Map all drawing offsets dynamically:
  - `player.x - 15` -> `player.x - player.radius`
  - `player.x + 15` -> `player.x + player.radius`
  - `player.y - 15` -> `player.y - player.radius`
  - `player.y + 9` -> `player.y + player.radius * 0.6`
  - `player.y + 15` -> `player.y + player.radius`
  - `player.y - 20` -> `player.y - player.radius * 1.333`
  - `player.y - 3` -> `player.y - player.radius * 0.2`
  - `mouthHeight` -> scale proportionally with `player.radius / 15`.

### 3. Star-Eating Size Growth Mechanic
- When a dot (star) is collected in `update()`, scale the player's radius by `10%`:
  `player.radius *= 1.10;`
- Ensure the radius resets back to `15` upon:
  - Starting the game or restarting.
  - Loading any level.
  - Dying/losing a life.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Update Level 2 configuration in `LEVELS[2]`.
- Add `player.radius = 15;` in `resetPlayer()`.
- Multiply `player.radius *= 1.10;` inside the dot collision loop.
- Refactor the player drawing code in `draw()` to use `player.radius` instead of hardcoded numbers.
