# Level Completion Reward Life Plan

This plan rewards players with an extra life when completing a level, up to a maximum cap of 5 lives.

## 🏛️ Architecture & Code Changes

### 1. Reward Life Addition (`eaterplatform-q9l`)
- In `levelComplete()` in `web/js/game.js`, add the extra life reward before showing the complete screen:
```javascript
  lives = Math.min(5, lives + 1);
  updateHUD();
```
- This rewards the player with `+1` life, capped at `5` lives maximum (to keep HUD layout clean).

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Modify `levelComplete()` to increment `lives` and call `updateHUD()`.
