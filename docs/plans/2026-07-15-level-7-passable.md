# Shift Level 7 Top Platform Plan

This plan adjusts Level 7 platform layout to ensure the level is passable.

## 🏛️ Architecture & Code Changes

### 1. Shift Top Platform, Big Star, and Enemy (`eaterplatform-8e1`)
- In `web/js/game.js`, inside `LEVELS[7]`:
  - Change the top platform x-coordinate:
    `{ x: 250, y: 100, width: 300, height: 15 }` -> `{ x: 150, y: 100, width: 300, height: 15 }`
  - Shift the big star x-coordinate to center it:
    `{ x: 400, y: 70, ... }` -> `{ x: 300, y: 70, ... }`
  - Shift the patrolling enemy x-coordinate and range anchor to match the new center:
    `{ x: 395, y: 85, width: 20, height: 15, vx: 2, range: 125, startX: 395 }` -> `{ x: 300, y: 85, width: 20, height: 15, vx: 2, range: 125, startX: 300 }`
  - This offsets the top platform from the middle-apex platform, leaving the right half of the middle platform uncovered for jumping.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Modify coordinates for Level 7 platform, dot, and enemy.
