# Stagger Level 5 Platforms Plan

This plan adjusts Level 5 platforms and coordinates to ensure the level is passable.

## 🏛️ Architecture & Code Changes

### 1. Shift Top Platform & Big Star (`eaterplatform-fpw`)
- In `web/js/game.js`, inside `LEVELS[5]`:
  - Change the top platform x-coordinate:
    `{ x: 275, y: 120, width: 150, height: 15 }` -> `{ x: 200, y: 120, width: 150, height: 15 }`
  - Shift the big star x-coordinate to remain centered on the platform:
    `{ x: 350, y: 90, ... }` -> `{ x: 275, y: 90, ... }`
  - This staggers the top and middle platforms, allowing the player to leap onto it without collision blockage.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Modify coordinates for Level 5 platforms and dots.
