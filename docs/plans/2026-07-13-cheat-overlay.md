# Cheat Code Overlay Plan

This plan fixes the key repeat bug for the `iddqd` cheat code and adds the `VITALYMANAT` text overlay displaying for 16 seconds upon activation.

## 🏛️ Architecture & Code Changes

### 1. Key Repeat & Focus Handling (`eaterplatform-49j`)
- Modify the global `keydown` event listener in `web/js/game.js`:
  - If the active element is an input tag (e.g., player name field), ignore cheat code inputs:
    `if (document.activeElement && document.activeElement.tagName === 'INPUT') return;`
  - Only capture keydown character events when `!e.repeat` (ignores repeats from holding keys).

### 2. Triumphant Text Timer (`eaterplatform-49j`)
- Add `let cheatTextEndTime = 0;` globally.
- In `handleCheatInput(keyChar)`:
  - When the cheat is successfully entered:
    - Set `cheatTextEndTime = Date.now() + 16000;` (16 seconds!).

### 3. Rendering the Big Red Text Overlay (`eaterplatform-49j`)
- In `draw()`, if `Date.now() < cheatTextEndTime`:
  - Render "VITALYMANAT" in big red letters (font: `80px "Bangers", "Impact", "Arial Black"`, center of the canvas).
  - Outlined in thick black (`lineWidth = 8`) to maintain the comic-book theme.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Declare `cheatTextEndTime`.
- Update keydown listener logic.
- Update `handleCheatInput()`.
- Add drawing block at the end of the `draw()` function.
