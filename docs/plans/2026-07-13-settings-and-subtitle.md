# Settings Panel (Sound/Language) and Comic Subtitle Plan

This plan implements the Sound/Language Settings Panel (`eaterplatform-gng`) and the comic-themed subtitle update (`eaterplatform-2xx`).

## 🏛️ Architecture & Code Changes

### 1. Subtitle Update (`eaterplatform-2xx`)
- Modify `web/index.html`'s header subtitle to a comic style:
  `A blocky green monster's chomp-tastic arcade adventure!`

### 2. Settings Panel UI & Button (`eaterplatform-gng`)
- Add a floating gear icon button ⚙️ (`#settings-btn`) in the header or main section of `web/index.html`.
- Create a Settings Modal `#settings-modal` in `web/index.html`:
  - Sound Toggle switch or button (Sound On / Sound Off).
  - Language Select dropdown (English, German, Russian).
  - "Close" button.
- Style the settings modal and button in `web/css/style.css` matching our modern dark theme:
  - Background overlay (`.modal-overlay`).
  - Centered dialog box with Outfit typography, smooth animations, and cyan glows.

### 3. Settings Functionality & Translations (`eaterplatform-gng`)
- In `web/js/game.js`, load initial settings from `localStorage` (defaulting to Sound: true, Language: 'en').
- Add translations dictionary for English, German, and Russian:
  - Texts: Title, Subtitle, Start Game, Game Over, Victory, Level Complete, Score, Lives, Level, How to Play, Move, Jump, Collect dots, Avoid spikes.
- Implement `applyLanguage(lang)` to dynamically translate all UI text nodes on the page using data attributes or direct element ID text injection.
- Implement sound toggle function that updates the settings object and saves to `localStorage`.

---

## 🛠️ File Edits Detail

### 1. `web/index.html`
- Subtitle change.
- Settings button:
```html
<button id="settings-btn" class="settings-btn" aria-label="Settings">⚙️</button>
```
- Settings modal structure:
```html
<div id="settings-modal" class="modal hidden">
  <div class="modal-content">
    <h2 data-i18n="settings_title">Settings</h2>
    <div class="setting-item">
      <label for="setting-sound" data-i18n="setting_sound_label">Sound Effects</label>
      <input type="checkbox" id="setting-sound" checked>
    </div>
    <div class="setting-item">
      <label for="setting-lang" data-i18n="setting_lang_label">Language</label>
      <select id="setting-lang">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="ru">Русский</option>
      </select>
    </div>
    <button id="settings-close-btn" class="btn btn-secondary" data-i18n="close_btn">Close</button>
  </div>
</div>
```

### 2. `web/css/style.css`
Style the settings button, modal overlay, check toggles, dropdown select, and transition animations.

### 3. `web/js/game.js`
- Load settings on startup.
- Translation map (`TRANSLATIONS`):
  - English, German, Russian strings for all UI labels.
- Event listeners for modal open/close and sound/language changes.
