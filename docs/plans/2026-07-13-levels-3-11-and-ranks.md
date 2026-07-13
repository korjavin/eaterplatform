# Levels 3-11 and Special Player Ranks Plan

This plan adds levels 3 to 11 to the game configuration and implements a dynamic player ranking system based on the level reached.

## 🏛️ Architecture & Code Changes

### 1. Dynamic Rank System (`eaterplatform-8be`)
- Define special ranks achieved upon completing each level (or currently active on each level):
  - Level 1: Beginner
  - Level 2: Dot Hunter
  - Level 3: Apprentice
  - Level 4: Senior
  - Level 5: Gravity Defier
  - Level 6: Milord
  - Level 7: Portal Weaver
  - Level 8: Speedrunner
  - Level 9: Green Legend
  - Level 10: Ascended Eater
  - Level 11: Chomping Deity
- Translate these ranks for all supported languages: English (`en`), German (`de`), Russian (`ru`).
- Add translation key `level_hud_value` to represent the HUD level display:
  - English: `level_hud_value: '{level} ({rank})'`
  - German: `level_hud_value: '{level} ({rank})'`
  - Russian: `level_hud_value: '{level} ({rank})'`
- In `updateHUD()`, use `setTranslatedText` on `levelVal` to dynamically inject the translated rank name:
  `const rankKey = 'rank_' + level;`
  `setTranslatedText(levelVal, 'level_hud_value', { level, rank: t(rankKey) });`

### 2. Levels 3-11 Configurations (`eaterplatform-8be`)
Extend the `LEVELS` object in `web/js/game.js` with new levels (3 to 11):
- Platforms: Use varied heights and sizes; ensure they are fully reachable with the jump degradation mechanics in mind.
- Dots: Include a mix of small and big dots (stars). Place big dots on high or far platforms as gating puzzles.
- Enemies: Position patrols at safe distances from spawn points.
- Portals: Place at the ends of levels.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- **Translations**: Add `rank_1` through `rank_11` and `level_hud_value` in `TRANSLATIONS.en`, `TRANSLATIONS.de`, and `TRANSLATIONS.ru`.
- **LEVELS configuration**: Add keys `3` through `11` with full coordinates:
  - **Level 3**:
    - platforms: ground (0, 380, 800), (100, 300, 120), (300, 220, 120), (500, 140, 120), (200, 110, 120)
    - dots: (160, 270), (360, 190), (560, 110, big: true), (260, 80)
    - enemies: (300, 205, range: 100, vx: 1.5)
    - portal: (720, 320)
  - **Level 4** (Senior):
    - platforms: ground (0, 380, 800), (50, 310, 120), (220, 240, 120), (390, 170, 120), (560, 240, 120), (700, 310, 80)
    - dots: (110, 280), (280, 210), (450, 140, big: true), (620, 210), (740, 280)
    - enemies: (220, 225, range: 100, vx: 1.6), (560, 225, range: 100, vx: -1.6)
    - portal: (720, 320)
  - **Level 5**:
    - platforms: ground, (150, 300, 150), (400, 300, 150), (275, 210, 150), (275, 120, 150)
    - dots: (225, 270), (475, 270), (350, 180), (350, 90, big: true)
    - enemies: (150, 285, range: 120, vx: 1.4), (400, 285, range: 120, vx: -1.4)
    - portal: (720, 320)
  - **Level 6** (Milord):
    - platforms: ground, (50, 290, 120), (200, 200, 120), (350, 290, 120), (500, 200, 120), (650, 290, 120)
    - dots: (110, 260), (260, 170), (410, 260, big: true), (560, 170), (710, 260)
    - enemies: (200, 185, range: 100, vx: 1.8), (500, 185, range: 100, vx: -1.8)
    - portal: (20, 320)
  - **Level 7**:
    - platforms: ground, (100, 310, 100), (250, 240, 100), (400, 170, 100), (550, 240, 100), (700, 310, 100), (250, 100, 300)
    - dots: (150, 280), (300, 210), (450, 140), (600, 210), (750, 280), (400, 70, big: true)
    - enemies: (250, 85, range: 260, vx: 2)
    - portal: (720, 320)
  - **Level 8**:
    - platforms: ground, (50, 300, 80), (150, 220, 80), (250, 150, 80), (350, 150, 80), (450, 220, 80), (550, 300, 80), (650, 220, 80)
    - dots: (90, 270), (190, 190), (290, 120), (390, 120, big: true), (490, 190), (590, 270), (690, 190)
    - enemies: (350, 135, range: 60, vx: 1.2)
    - portal: (740, 320)
  - **Level 9**:
    - platforms: ground, (100, 300, 600), (200, 210, 400), (300, 120, 200)
    - dots: (150, 270), (650, 270), (250, 180), (550, 180), (350, 90), (450, 90, big: true)
    - enemies: (200, 195, range: 360, vx: 2.2), (300, 105, range: 160, vx: -1.8)
    - portal: (50, 320)
  - **Level 10**:
    - platforms: ground, (50, 300, 100), (200, 230, 100), (350, 160, 100), (500, 230, 100), (650, 300, 100), (350, 80, 100)
    - dots: (100, 270), (250, 200), (400, 130), (550, 200), (700, 270), (400, 50, big: true)
    - enemies: (200, 215, range: 80, vx: 1.5), (500, 215, range: 80, vx: -1.5)
    - portal: (740, 320)
  - **Level 11**:
    - platforms: ground, (50, 310, 700), (100, 230, 600), (150, 150, 500), (200, 70, 400)
    - dots: (100, 280), (700, 280), (150, 200), (650, 200), (200, 120), (600, 120), (400, 40, big: true)
    - enemies: (100, 215, range: 560, vx: 2.5), (150, 135, range: 460, vx: -2.0)
    - portal: (720, 320)
- **HUD Update**: Update `updateHUD()` to format the level display with the active rank.
