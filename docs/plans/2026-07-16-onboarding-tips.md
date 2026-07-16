# Onboarding Tips Expansion Plan

This plan expands the Game Rules dialogue tips modal overlay to describe the silver (unreachable) star indicators and the new star-spitting combat/utility mechanics.

## 🏛️ Architecture & Code Changes

### 1. Dialogue Expansion (`eaterplatform-lj9`)
- In `web/index.html`, inside `#rules-modal`:
  - Add 5 new dialogue bubbles (3 from Eater, 2 from Mentor) detailing:
    - Silver stars: how growing heavy turns stars silver, denoting they are temporarily out of jump height reach.
    - Spitting: how ejecting a star shrinks the player (re-enabling jump reach) and destroys enemies upon contact.
- Apply `data-i18n` tags to all new elements.

### 2. Localization keys (`eaterplatform-lj9`)
- Add translation key mappings (`rule_dialogue_silver_1` through `rule_dialogue_silver_5`) in `web/js/game.js` for English, German, and Russian locales.

---

## 🛠️ File Edits Detail

### 1. `web/index.html`
- Markup additions for new dialogue bubbles.

### 2. `web/js/game.js`
- Translation definitions inside `TRANSLATIONS`.
