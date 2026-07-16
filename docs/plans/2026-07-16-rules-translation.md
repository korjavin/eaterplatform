# Rules Overlay Translation Plan

This plan enables dynamic translation for the Game Rules onboarding dialogue modal overlay.

## 🏛️ Architecture & Code Changes

### 1. Dialogue HTML Internationalization (`eaterplatform-3ik`)
- In `web/index.html`, inside the `#rules-modal` dialogue container:
  - Wrap character names (Eater/Mentor) in `<strong data-i18n="mentor_label">` and `<strong data-i18n="eater_label">` tags.
  - Wrap tip messages in `<span data-i18n="rule_dialogue_X">` tags.
  - This utilizes the existing `applyLanguage()` DOM parser without altering JS rendering logic.

### 2. Translation Dictionary Additions (`eaterplatform-3ik`)
- In `web/js/game.js`, add `mentor_label`, `eater_label`, and `rule_dialogue_1` through `rule_dialogue_12` text strings to each supported locale object (`en`, `de`, `ru`).

---

## 🛠️ File Edits Detail

### 1. `web/index.html`
- Markup adjustments to include `data-i18n` attributes.

### 2. `web/js/game.js`
- Define localized strings inside `TRANSLATIONS`.
