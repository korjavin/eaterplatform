# Size Reset with Half-Life Penalty Plan

This plan adds a Size Reset button and 'R' keybinding that resets Eater's radius to 15, charging half a life (0.5 hearts) as a penalty to prevent soft-locks.

## 🏛️ Architecture & Code Changes

### 1. UI updates (`eaterplatform-xxc`)
- Add a reset size button in the header/hud area of `web/index.html`:
```html
<button id="reset-size-btn" class="btn btn-secondary reset-size-btn" data-i18n="reset_size_btn">Reset Size (-0.5 ❤)</button>
```
- Style this button in `web/css/style.css` next to the settings button (compact, red/dark themed button).

### 2. Localization
- Add `reset_size_btn` keys to `TRANSLATIONS`:
  - English: `Reset Size (-0.5 ❤)`
  - German: `Größe zurücksetzen (-0.5 ❤)`
  - Russian: `Сбросить размер (-0.5 ❤)`

### 3. Fractional Hearts HUD Rendering (`eaterplatform-xxc`)
- Refactor `updateHUD()` to draw fractional hearts:
  - For each full integer of `lives`, add a full heart `❤`.
  - If the remainder is `>= 0.5`, add a broken/half heart `💔`.
  - Example: `2.5` lives renders as `❤❤💔`.

### 4. Size Reset Logic (`eaterplatform-xxc`)
- Implement `triggerSizeReset()`:
  - Check if `gameActive` is true.
  - Decrement `lives` by `0.5`.
  - Reset `player.radius = 15`.
  - Play a synthesized deflating/shrinking sound (oscillator frequency sweep downwards: 300Hz to 150Hz in 0.25 seconds).
  - Call `updateHUD()`.
  - If `lives <= 0`, trigger `gameOver()`.
- Listen for KeyR:
  - Inside `window.addEventListener('keydown')`, if `e.code === 'KeyR'`, call `triggerSizeReset()`.

---

## 🛠️ File Edits Detail

### 1. `web/index.html`
- Insert `#reset-size-btn` inside the controls or settings section of the header.

### 2. `web/css/style.css`
- Add CSS styling for `.reset-size-btn` to fit into the game dashboard.

### 3. `web/js/game.js`
- Define the `reset-size-btn` DOM element.
- Update `TRANSLATIONS` maps.
- Refactor `updateHUD()` to support fractional hearts.
- Bind `KeyR` in keydown handler.
- Wire click listener on `reset-size-btn` to call `triggerSizeReset()`.
