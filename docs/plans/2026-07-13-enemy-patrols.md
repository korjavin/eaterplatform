# Restrict Enemy Patrols to Platform Boundaries Plan

This plan reviews and corrects all patrolling enemy coordinates and ranges across all 11 levels in `web/js/game.js` to ensure they never walk off platform edges into mid-air.

## 🏛️ Architecture & Code Changes

### 1. Level Configurations Review (`eaterplatform-66g`)
Check all levels containing patrolling enemies (`range` property present) and restrict their movement to their platform coordinates:

- **Level 1**:
  - platforms: ground (0, 380, 800), (350, 270, 150, 15), (550, 190, 150, 15)
  - enemies: `{ x: 350, y: 255, range: 60, startX: 350 }`
    - Patrols from 290 to 410. Platform is at 350 to 500. Patrol is going off left edge (starts at 350).
    - **Fix**: Move `startX` to `425`, `range` to `65` (patrols between `360` and `490`, fully on platform!).
  - enemies: `{ x: 550, y: 175, range: 60, startX: 550 }`
    - Patrols from 490 to 610. Platform is at 550 to 700. Patrol is going off left edge (starts at 550).
    - **Fix**: Move `startX` to `625`, `range` to `65` (patrols between `560` and `690`, fully on platform!).

- **Level 2**:
  - platforms: (50, 300, 150), (250, 220, 150), (450, 140, 150)
  - enemies: `{ x: 250, y: 205, range: 120, startX: 250 }`
    - Patrols from 130 to 370. Platform is at 250 to 400. Goes off left edge in mid-air.
    - **Fix**: Move `startX` to `325`, `range` to `65` (patrols between `260` and `390`, fully on platform!).
  - enemies: `{ x: 450, y: 125, range: 120, startX: 450 }`
    - Patrols from 330 to 570. Platform is at 450 to 600. Goes off left edge in mid-air.
    - **Fix**: Move `startX` to `525`, `range` to `65` (patrols between `460` and `590`, fully on platform!).
  - enemies: `{ x: 150, y: 285, range: 70, startX: 150 }`
    - Patrols from 80 to 220. Platform is at 50 to 200. Goes off right edge in mid-air.
    - **Fix**: Move `startX` to `125`, `range` to `65` (patrols between `60` and `190`, fully on platform!).

- **Level 3**:
  - platforms: (100, 300, 120)
  - enemies: `{ x: 300, y: 205, range: 100, startX: 300 }`
    - Platform is `(300, 220, 120)`. Patrols from 200 to 400. Goes off left edge.
    - **Fix**: Move `startX` to `360`, `range` to `50` (patrols between `310` and `410`, fully on platform!).

- **Level 4**:
  - platforms: (220, 240, 120), (560, 240, 120)
  - enemies:
    - `{ x: 220, y: 225, range: 100, startX: 220 }` -> **Fix**: `startX: 280, range: 50` (patrols between `230` and `330`).
    - `{ x: 560, y: 225, range: 100, startX: 560 }` -> **Fix**: `startX: 620, range: 50` (patrols between `570` and `670`).

- **Level 5**:
  - platforms: (150, 300, 150), (400, 300, 150)
  - enemies:
    - `{ x: 150, y: 285, range: 120, startX: 150 }` -> **Fix**: `startX: 225, range: 65` (patrols between `160` and `290`).
    - `{ x: 400, y: 285, range: 120, startX: 400 }` -> **Fix**: `startX: 475, range: 65` (patrols between `410` and `540`).

- **Level 6**:
  - platforms: (200, 200, 120), (500, 200, 120)
  - enemies:
    - `{ x: 200, y: 185, range: 100, startX: 200 }` -> **Fix**: `startX: 260, range: 50` (patrols between `210` and `310`).
    - `{ x: 500, y: 185, range: 100, startX: 500 }` -> **Fix**: `startX: 560, range: 50` (patrols between `510` and `610`).

- **Level 7**:
  - platforms: (250, 100, 300)
  - enemies: `{ x: 250, y: 85, range: 260, startX: 250 }`
    - Platform ends at 550. Patrols from -10 to 510. Walks in mid-air on the left.
    - **Fix**: Move `startX` to `400`, `range` to `130` (patrols between `270` and `530`, fully on platform!).

- **Level 8**:
  - platforms: (350, 150, 80)
  - enemies: `{ x: 350, y: 135, range: 60, startX: 350 }`
    - Patrols from 290 to 410. Platform is 350 to 430. Goes off left.
    - **Fix**: Move `startX` to `390`, `range` to `30` (patrols between `360` and `420`, fully on platform!).

- **Level 9**:
  - platforms: (200, 210, 400), (300, 120, 200)
  - enemies:
    - `{ x: 200, y: 195, range: 360, startX: 200 }`
      - Platform is 200 to 600. Patrols from -160 to 560. Walks off left edge.
      - **Fix**: Move `startX` to `400`, `range` to `180` (patrols between `220` and `580`, fully on platform!).
    - `{ x: 300, y: 105, range: 160, startX: 300 }`
      - Platform is 300 to 500. Patrols from 140 to 460. Walks off left edge.
      - **Fix**: Move `startX` to `400`, `range` to `80` (patrols between `320` and `480`, fully on platform!).

- **Level 10**:
  - platforms: (200, 230, 100), (500, 230, 100)
  - enemies:
    - `{ x: 200, y: 215, range: 80, startX: 200 }` -> **Fix**: `startX: 250, range: 40` (patrols between `210` and `290`).
    - `{ x: 500, y: 215, range: 80, startX: 500 }` -> **Fix**: `startX: 550, range: 40` (patrols between `510` and `590`).

- **Level 11**:
  - platforms: (100, 230, 600), (150, 150, 500)
  - enemies:
    - `{ x: 100, y: 215, range: 560, startX: 100 }`
      - Platform is 100 to 700. Patrols from -460 to 660. Walks off left edge.
      - **Fix**: Move `startX` to `400`, `range` to `280` (patrols between `120` and `680`, fully on platform!).
    - `{ x: 150, y: 135, range: 460, startX: 150 }`
      - Platform is 150 to 650. Patrols from -310 to 610. Walks off left edge.
      - **Fix**: Move `startX` to `400`, `range` to `230` (patrols between `170` and `630`, fully on platform!).

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Modify the `LEVELS` object configurations to apply the corrected `startX` and `range` coordinates for all enemies.
