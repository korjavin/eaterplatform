# Mobile Touch Controls and Button Tuning Plan

This plan scales down the size of the Reset Size button and implements touch d-pad and action buttons overlay for mobile devices.

## 🏛️ Architecture & Code Changes

### 1. Reset Size Button Size Reduction
- Style `.reset-size-btn` in `web/css/style.css` to be smaller and more compact:
```css
.reset-size-btn {
  justify-self: center;
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 6px;
  background: rgba(255, 0, 127, 0.12);
  border: 1px solid rgba(255, 0, 127, 0.4);
  color: var(--text-bright);
  margin-top: 4px;
}
```

### 2. Mobile Touch Controls HTML Overlay
- Add a new container `.mobile-controls-overlay` inside the relative `.game-container` in `web/index.html`:
```html
          <!-- Mobile Touch Controls -->
          <div id="mobile-controls" class="mobile-controls-overlay">
            <div class="dpad">
              <button id="touch-left" class="touch-btn" type="button" aria-label="Move Left">◀</button>
              <button id="touch-right" class="touch-btn" type="button" aria-label="Move Right">▶</button>
            </div>
            <div class="action-buttons">
              <button id="touch-jump" class="touch-btn jump-btn" type="button" aria-label="Jump">▲</button>
            </div>
          </div>
```

### 3. Responsive Styling
- Style the touch buttons in `web/css/style.css` to float on top of the canvas:
  - Transparent glassmorphic buttons (circles).
  - Hide them on desktop by default (`display: none`).
  - Display them on devices matching `(max-width: 1024px)` or `(pointer: coarse)` (touch screens).

### 4. JavaScript Touch Events Integration
- In `web/js/game.js`, wire `touchstart`, `touchend`, and `touchcancel` event handlers to set key values:
  - Left button sets `keys.ArrowLeft`.
  - Right button sets `keys.ArrowRight`.
  - Jump button sets `keys.Space` (or `keys.ArrowUp`).

---

## 🛠️ File Edits Detail

### 1. `web/index.html`
- Insert the mobile controls overlay inside `.game-container`.

### 2. `web/css/style.css`
- Scale down `.reset-size-btn` properties.
- Add styles for `.mobile-controls-overlay`, `.touch-btn`, and media queries.

### 3. `web/js/game.js`
- Implement `configureMobileControls()` and call it on startup.
