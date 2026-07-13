# Physics Rebalancing and Level Accessibility Plan

This plan tunes the growth scaling, shrink scaling, and jump degradation formulas to ensure that all levels are fully navigable and passable without softlocks.

## 🏛️ Architecture & Code Changes

### 1. Growth and Shrink Rate Balancing (`eaterplatform-erl`)
- **Problem**: A 10% growth rate per dot (`* 1.10`) causes the player to expand too rapidly. Within 5 dots, the player is extremely heavy, causing their jump height to degrade to a point where they cannot climb basic platforms.
- **Fix**: Reduce the growth rate to 5% (`* 1.05`) per dot. This makes growth more gradual (requiring 4 small dots to reach the Big Star threshold of 18).
- **Match Shrink Rate**: Update the Red Star shrink factor to division by `1.05` instead of `1.10`.

### 2. Milder Jump Force Degradation (`eaterplatform-erl`)
- **Problem**: The jump degradation floor was too low (`5`), which only allowed a jump height of `31px`. The height difference between platforms in many levels is `80px`, meaning a heavy player is immediately softlocked on lower platforms.
- **Fix**: Use a linear jump force degradation with a higher floor:
```javascript
  const sizeDiff = player.radius - 15;
  const currentJumpForce = Math.max(7.2, player.jumpForce - sizeDiff * 0.25);
```
- With a floor of `7.2`, the minimum jump height is `7.2^2 / 0.8 = 64.8px`.
- Combined with horizontal momentum and platform edge jumping, this guarantees that even at maximum size, Eater can always navigate standard vertical platform arrangements.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Update dot collection growth multiplier: `player.radius *= 1.05;`
- Update Red Star shrink divisor: `player.radius = Math.max(MIN_PLAYER_RADIUS, player.radius / 1.05);`
- Update the jumping logic in `update()` to use:
  `const currentJumpForce = Math.max(7.2, player.jumpForce - sizeDiff * 0.25);`
