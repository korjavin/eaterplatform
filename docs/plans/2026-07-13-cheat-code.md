# Cheat Code Plan

This plan implements the classic `iddqd` cheat code to grant players 3 extra lives when typed within a 5-second window.

## 🏛️ Architecture & Code Changes

### 1. Cheat Input Buffer (`eaterplatform-wmt`)
- Add rolling cheat inputs tracking in `web/js/game.js`:
```javascript
let cheatBuffer = [];
const CHEAT_CODE = 'iddqd';
const CHEAT_TIMEOUT_MS = 5000;
```

### 2. Input Handling (`eaterplatform-wmt`)
- Inside the `keydown` event listener, if the key is single character:
  - Call `handleCheatInput(e.key)`.
- Implement `handleCheatInput(keyChar)`:
  - Filter out items in `cheatBuffer` older than `CHEAT_TIMEOUT_MS` relative to `Date.now()`.
  - Add `{ char: keyChar.toLowerCase(), time: Date.now() }` to `cheatBuffer`.
  - If `cheatBuffer.map(i => i.char).join('').endsWith(CHEAT_CODE)` is true:
    - Grant `+3` lives, capped at `5` lives maximum: `lives = Math.min(5, lives + 3)`.
    - Play a synthesized success tone (pitch sweep upwards: 880Hz to 1320Hz in 0.4 seconds) so the player knows it worked.
    - Clear `cheatBuffer`.
    - Call `updateHUD()`.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Define state variables and constants for cheats.
- Implement `handleCheatInput()`.
- Add keyboard key listener binding in the global keydown event handler.
