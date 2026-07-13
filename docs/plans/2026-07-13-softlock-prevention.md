# Softlock Prevention for Big Stars Plan

This plan implements an automatic detection and restoration mechanism for small stars to prevent the player from getting softlocked after dying or resetting their size.

## 🏛️ Architecture & Code Changes

### 1. Softlock Prevention Logic (`eaterplatform-7nh`)
- Implement `ensureLevelSolvable()` in `web/js/game.js`:
  - Check if there are any uncollected Big Stars:
    `const hasUncollectedBig = dots.some(d => !d.collected && d.big);`
  - If yes, count the uncollected standard stars:
    `const uncollectedStandardCount = dots.filter(d => !d.collected && !d.big && !d.red && !d.green).length;`
  - Calculate `maxPossibleRadius = player.radius * Math.pow(1.05, uncollectedStandardCount)`.
  - If `maxPossibleRadius < BIG_DOT_MIN_PLAYER_RADIUS` (18):
    - Calculate how many standard stars are needed to reach `18`:
      `const targetCount = Math.ceil(Math.log(BIG_DOT_MIN_PLAYER_RADIUS / player.radius) / Math.log(1.05));`
      `const restoreNeeded = targetCount - uncollectedStandardCount;`
    - Filter previously collected standard stars:
      `const collectedStandard = dots.filter(d => d.collected && !d.big && !d.red && !d.green);`
    - Shuffle the collected standard list and restore (set `collected = false`) up to `restoreNeeded` stars.

### 2. Integration Points (`eaterplatform-7nh`)
- Call `ensureLevelSolvable()` inside:
  - `resetPlayer()`: Triggers upon respawn (death/pitfall) and level load.
  - `triggerSizeReset()`: Triggers upon manual size reset.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Implement `ensureLevelSolvable()` helper function.
- Call `ensureLevelSolvable()` at the end of `resetPlayer()` and `triggerSizeReset()`.
