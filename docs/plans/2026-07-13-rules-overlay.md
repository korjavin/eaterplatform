# Game Rules and Funny Dialogue Overlay Plan

This plan documents the complete set of game rules for Eater Platformer and implements a styled comic-book dialogue overlay detailing these rules before the game starts.

## 📜 Official Game Rules

1. **Objective**: Collect all stars (dots) in the level and enter the cyan portal to advance to the next level. Complete Level 11 to win the game!
2. **Growth Mechanic**: Each standard yellow star eaten increases Eater's size by 5%.
3. **Weight & Jump height**: As Eater grows larger, he gets heavier. His jump force degrades linearly down to a minimum of 7.2 (allowing a minimum jump of ~65px, sufficient to clear standard platforms).
4. **Big Stars (Orange)**: Gated by size. Eater must be at least size 18 (requires eating 4 small yellow stars) to eat a Big Orange Star.
5. **Red Stars (Shrinking)**: Eating a Red Star shrinks Eater by 5% (down to a floor of 10), reducing his weight and allowing higher jumps.
6. **Green Stars (Speed & Slip)**: Temporarily grants double speed and double jump force for 10 seconds. However, friction is reduced (ice-like movement), and Eater will slip forward upon landing from a jump.
7. **Size Reset**: Press 'R' or click 'Reset Size' to return to size 15 instantly. This costs 0.5 lives.
8. **Lives & Respawns**: Hitting an enemy or falling off the bottom of the canvas (pitfall) costs 1 life and resets the player to the spawn point.
9. **Invincibility**: After spawning or restarting a level, Eater gains 1.5 seconds of invincibility (blinking indicator).
10. **Level Complete Rewards**:
    - Standard: Completing a level rewards you with +1 life (max cap 5).
    - Perfect Run: Completing a level without taking any damage or resetting size rewards you with +2 lives instead.
11. **Cheat Code**: Type `iddqd` in 5 seconds during gameplay to get 3 extra lives (max cap 5).

---

## 🏛️ UI and Code Changes

### 1. HTML Overlay structure (`eaterplatform-jby`)
- Add a new modal overlay `#rules-modal` in `web/index.html`:
```html
<div id="rules-modal" class="overlay hidden">
  <div class="overlay-content rules-content">
    <h2 data-i18n="rules_title">Game Rules & Tips</h2>
    <div class="dialogue-container">
      <!-- Wise Dot and Eater funny comic dialogue -->
      <div class="dialogue-bubble mentor">
        <strong>Mentor:</strong> Listen up, green monster! Eat all dots and reach the cyan portal. Simple, right?
      </div>
      <div class="dialogue-bubble eater">
        <strong>Eater:</strong> Chomp! What about the big orange stars? They look juicy!
      </div>
      <div class="dialogue-bubble mentor">
        <strong>Mentor:</strong> You're too small! Eat standard yellow dots to grow to size 18 first. But warning: as you grow, you get heavier and jump lower!
      </div>
      <div class="dialogue-bubble eater">
        <strong>Eater:</strong> Oh no! Can I get stuck?
      </div>
      <div class="dialogue-bubble mentor">
        <strong>Mentor:</strong> Yes! If you get too heavy to climb, click the "Reset Size" button or press "R" to deflate. It costs 0.5 hearts, but saves your run! Alternatively, eat Red Stars to shrink without any penalty!
      </div>
      <div class="dialogue-bubble eater">
        <strong>Eater:</strong> And the glowing green stars?
      </div>
      <div class="dialogue-bubble mentor">
        <strong>Mentor:</strong> They give you massive speed and jump height for 10 seconds, but you'll slip and slide when landing! Don't slip off the platforms!
      </div>
      <div class="dialogue-bubble eater">
        <strong>Eater:</strong> What happens if I fall?
      </div>
      <div class="dialogue-bubble mentor">
        <strong>Mentor:</strong> Falling off the bottom of the screen or touching red hunters costs 1 life. But perfect runs (no damage) reward you with +2 lives instead of +1 at the portal!
      </div>
      <div class="dialogue-bubble eater">
        <strong>Eater:</strong> Sweet! Let's chomp!
      </div>
    </div>
    <button id="close-rules-btn" class="btn btn-primary" data-i18n="close_btn">Let's Play!</button>
  </div>
</div>
```
- In the start card menu, add a "Rules" button `#open-rules-btn` next to the "Start" button:
```html
<button id="open-rules-btn" class="btn btn-secondary" type="button" data-i18n="open_rules_btn">Game Rules</button>
```

### 2. Localization
- Translate rule titles and buttons in `TRANSLATIONS.en`, `TRANSLATIONS.de`, and `TRANSLATIONS.ru`.

### 3. Styling (`eaterplatform-jby`)
- Style the dialogue box and speech bubbles in `web/css/style.css`. Use distinct bubble colors (e.g. mentor blue/white, Eater comic green) with thick black outlines, fitting the comic theme. Make the scrollable dialogue box look like a comic strip sequence.

### 4. Event Listeners (`eaterplatform-jby`)
- In `web/js/game.js`:
  - Bind `#open-rules-btn` click to show `#rules-modal`.
  - Bind `#close-rules-btn` click to hide `#rules-modal`.
