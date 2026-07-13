# Green Stars (Speed Boost & Slip) Plan

This plan implements Green Stars that grant a temporary speed and jump height boost, but introduce a slippery sliding side-effect when moving or landing.

## 🏛️ Architecture & Code Changes

### 1. Green Star Properties
- Flag: `green: true`
- Color: Neon green `#2ecc71`
- Radius: 6 (same as standard dot)

### 2. Boost State & Timers
- Add properties to the `player` state in `web/js/game.js`:
  - `player.speedBoostTimer = 0` (frames remaining for the speed boost).
- Base parameters (when not boosted):
  - `player.speed = 4`
  - `player.jumpForce = 10`
  - `FRICTION = 0.85`
- Boosted parameters (when `player.speedBoostTimer > 0`):
  - `player.speed = 8` (double speed!)
  - `player.jumpForce = 14` (much higher jump!)
  - `FRICTION = 0.96` (very slippery!)
- During the `update()` function:
  - If `player.speedBoostTimer > 0`:
    - Decrement `player.speedBoostTimer` by 1.
    - If the timer hits 0, restore the player's base parameters.
  - Draw a green trail or aura around the player to indicate they are boosted!

### 3. "Slip" Mechanic After Jumping
- When the player is boosted (`player.speedBoostTimer > 0`) and lands from a jump:
  - If `player.grounded` just became true in this frame, apply a slide/slip impulse:
    `player.vx = player.facingLeft ? -8 : 8;` (slips forward in the direction they are facing!).

### 4. Level Design Placement
- Add Green Stars to:
  - **Level 6**: Place a green star at `(650, 350)` on the ground.
  - **Level 9**: Place a green star at `(100, 350)` on the ground.
  - **Level 11**: Place a green star at `(400, 350)` on the ground.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Update `player` definition:
  - Add `speedBoostTimer: 0`.
- Update dot collision in `update()`:
  - If `dot.green === true`, set `player.speedBoostTimer = 600` (10 seconds at 60 FPS).
- Update physics parameters in `update()` dynamically based on `player.speedBoostTimer > 0`.
- Implement landing check to apply the slip impulse:
  - Track `wasGrounded` at the start of `update()`.
  - If `!wasGrounded && player.grounded && player.speedBoostTimer > 0`, set `player.vx = player.facingLeft ? -8 : 8;`.
- Update dot rendering loop in `draw()` to draw green stars with a neon green aura.
- Add green dots to Level 6, 9, and 11 config.
