# Level Backgrounds and Color Themes Plan

This plan introduces unique visual themes (sky gradients, hill colors, and platform colors) for each of the 11 levels.

## 🏛️ Architecture & Code Changes

### 1. Level Themes Configuration (`eaterplatform-themes`)
- Add a new constant `LEVEL_THEMES` in `web/js/game.js` containing aesthetic color configurations for all 11 levels:
```javascript
const LEVEL_THEMES = {
  1: { // Green Fields (Day)
    skyStart: '#a5f3fc', skyEnd: '#e0f2fe',
    hillsBack: '#bbf7d0', hillsMid: '#86efac', hillsFore: '#4ade80',
    platformFill: '#1e1b4b', platformStroke: '#312e81'
  },
  2: { // Twilight Night
    skyStart: '#0f172a', skyEnd: '#1e1b4b',
    hillsBack: '#1e293b', hillsMid: '#334155', hillsFore: '#475569',
    platformFill: '#020617', platformStroke: '#0f172a'
  },
  3: { // Deep Forest
    skyStart: '#ecfdf5', skyEnd: '#d1fae5',
    hillsBack: '#15803d', hillsMid: '#166534', hillsFore: '#14532d',
    platformFill: '#451a03', platformStroke: '#7c2d12'
  },
  4: { // Golden Desert
    skyStart: '#fef08a', skyEnd: '#fde047',
    hillsBack: '#eab308', hillsMid: '#ca8a04', hillsFore: '#a16207',
    platformFill: '#7c2d12', platformStroke: '#9a3412'
  },
  5: { // Toxic Swamp
    skyStart: '#064e3b', skyEnd: '#022c22',
    hillsBack: '#047857', hillsMid: '#065f46', hillsFore: '#064e3b',
    platformFill: '#1f2937', platformStroke: '#374151'
  },
  6: { // Cyber Neon
    skyStart: '#311042', skyEnd: '#1e1b4b',
    hillsBack: '#581c87', hillsMid: '#701a75', hillsFore: '#86198f',
    platformFill: '#020617', platformStroke: '#3b0764'
  },
  7: { // Icy Kingdom
    skyStart: '#ecfeff', skyEnd: '#cffafe',
    hillsBack: '#a5f3fc', hillsMid: '#67e8f9', hillsFore: '#22d3ee',
    platformFill: '#1e293b', platformStroke: '#334155'
  },
  8: { // Volcanic Core
    skyStart: '#450a0a', skyEnd: '#7f1d1d',
    hillsBack: '#991b1b', hillsMid: '#b91c1c', hillsFore: '#dc2626',
    platformFill: '#180202', platformStroke: '#3f0712'
  },
  9: { // Candy Land
    skyStart: '#fdf2f8', skyEnd: '#fce7f3',
    hillsBack: '#f472b6', hillsMid: '#ec4899', hillsFore: '#db2777',
    platformFill: '#5b21b6', platformStroke: '#7c3aed'
  },
  10: { // Autumn Harvest
    skyStart: '#ffedd5', skyEnd: '#fed7aa',
    hillsBack: '#ea580c', hillsMid: '#c2410c', hillsFore: '#9a3412',
    platformFill: '#3f2305', platformStroke: '#543d2b'
  },
  11: { // Void of Space
    skyStart: '#030712', skyEnd: '#0b0f19',
    hillsBack: '#111827', hillsMid: '#1f2937', hillsFore: '#374151',
    platformFill: '#000000', platformStroke: '#111827'
  }
};
```

### 2. Aesthetic Background & Platform Drawing (`eaterplatform-themes`)
- In `draw()`, extract the active theme matching the current level:
```javascript
  const theme = LEVEL_THEMES[level] || LEVEL_THEMES[1];
```
- Sky Background:
```javascript
  const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGrad.addColorStop(0, theme.skyStart);
  skyGrad.addColorStop(1, theme.skyEnd);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
```
- Hills drawing:
  - Back hills: Set `ctx.fillStyle = theme.hillsBack;`
  - Mid hills: Set `ctx.fillStyle = theme.hillsMid;`
  - Trees/details: Set `ctx.fillStyle = theme.hillsFore;`
- Platform drawing:
  - Set `ctx.fillStyle = theme.platformFill;`
  - Set `ctx.strokeStyle = theme.platformStroke;`

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Define the `LEVEL_THEMES` object constant.
- Refactor the rendering functions (`draw()`, `drawTree()`, platforms render loops) to fetch and use the colors from the active level theme.
