# Star Blurping on Size Reduction Plan

This plan replaces the half-life penalty of the R/Reset size button with a dynamic, physical star-blurping mechanic.

## 🏛️ Architecture & Code Changes

### 1. Blurp Trigger & Size Shrink (`eaterplatform-dsw`)
- In `web/js/game.js`, update `triggerSizeReset()`:
  - If `player.radius <= 15`, do nothing (already at baseline size).
  - Otherwise:
    - Shrink Eater by 5%: `player.radius = Math.max(15, player.radius / 1.05);`
    - Decrement score by 10 (since they spit out a star): `score = Math.max(0, score - 10);`
    - Spawn a new moving dot at Eater's mouth position.
    - Play a synthesized "blurp" sound sweep (triangle wave, 300Hz down to 150Hz in 0.2 seconds).
    - Update the HUD and verify level solvability.

### 2. Ejected Star Physics & Platforms (`eaterplatform-dsw`)
- When spawning the ejected star:
  - Select a random upward angle: `const angle = Math.PI * (1.2 + Math.random() * 0.6);`
  - Select a random initial speed: `const speed = 6 + Math.random() * 4;`
  - Store variables on the dot: `vx`, `vy`, and `isSpitMoving = true`.
- In `update()`:
  - For each dot in `dots` with `isSpitMoving === true`:
    - Apply gravity: `dot.vy += GRAVITY;`
    - Update position: `dot.x += dot.vx;` and `dot.y += dot.vy;`
    - Keep star on screen (bounce off left/right walls: `dot.vx = -dot.vx * 0.5` and clamp).
    - If moving down (`dot.vy >= 0`):
      - Check for landings on any platform top surface.
      - If it lands:
        - Place resting on top: `dot.y = plat.y - 6;` (assuming standard 6px dot radius).
        - Stop moving: `dot.vx = 0; dot.vy = 0; dot.isSpitMoving = false;`
    - If it falls to the bottom of the screen (pitfall bounds for stars):
      - Place resting on ground: `dot.y = canvas.height - 20;`
      - Stop moving: `dot.vx = 0; dot.vy = 0; dot.isSpitMoving = false;`

### 3. Collection Rules (`eaterplatform-dsw`)
- In the player collision/collection check loop in `update()`:
  - Skip dot collection if `dot.isSpitMoving` is true (prevents immediate re-collection upon spitting).

### 4. UI Text Update
- Update button translations for `#reset-size-btn` from `Reset Size (-0.5 ❤)` to `Reset Size (Blurp Star)`.
- Update `TRANSLATIONS` keys in English, German, and Russian.
