# Debug Level Select Cheat Code Plan

This plan implements the debug level selection cheat code `iddwd<digit>` to allow developers to instantly jump to any level during gameplay.

## 🏛️ Architecture & Code Changes

### 1. Level Jump Key Detection (`eaterplatform-d8a`)
- In `web/js/game.js`, inside `handleCheatInput(keyChar)`:
  - Add checking for the `iddwd` prefix.
  - If the joined buffer ends with `iddwd` followed by a single character:
    - Suffix mapping:
      - `1` through `9` -> Load levels `1` to `9`.
      - `0` -> Load level `10`.
      - `a`, `b`, or `e` -> Load level `11`.
    - If the target level exists in the `LEVELS` object:
      - Set `level = targetLevel;`
      - Call `loadLevel(level);`
      - Play the success sound (`soundEffects.playCheatSuccessSound()`).
      - Clear `cheatBuffer`.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Update `handleCheatInput(keyChar)` to process the debug level cheat.
