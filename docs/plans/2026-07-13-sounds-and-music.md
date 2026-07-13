# Web Audio API Synthesized Sound Effects and Background Music Plan

This plan outlines the design and implementation of dynamically synthesized sound effects and a background melody using the native browser Web Audio API for `eaterplatform-g46`.

## 🏛️ Architecture & Code Changes

### 1. Web Audio Context and Synthesis Engine
- Use the standard `AudioContext` (or `webkitAudioContext`) inside `web/js/game.js`.
- Initialize the audio context lazily on the first user interaction (like clicking "Start Game" or clicking settings toggle) to satisfy browser autoplay policies.
- Implement a helper `playTone(freqStart, freqEnd, duration, type, gainStart)` that creates a temporary oscillator and gain node, sweeps the frequency exponentially or linearly, and handles scheduling.

### 2. Specific Sound Effects
Only play sounds if `settings.sound` is true:
- **Jump Sound (`playJumpSound()`)**:
  - Frequency sweep: 150Hz to 350Hz in 0.12 seconds.
  - Oscillator type: `triangle` (warm, soft sound).
- **Eat Dot Sound (`playEatSound()`)**:
  - Frequency sweep: 500Hz to 900Hz in 0.08 seconds.
  - Oscillator type: `sine` (pure, bright tone).
- **Die Sound (`playDieSound()`)**:
  - Frequency sweep: 400Hz down to 80Hz in 0.35 seconds.
  - Oscillator type: `sawtooth` (rough, electronic buzz).
- **Level Complete / Portal Sound (`playLevelCompleteSound()`)**:
  - A fast arpeggio of 3-4 notes (e.g. C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)) played in sequence, each note lasting 0.1 seconds.
  - Oscillator type: `sine` or `triangle`.

### 3. Background Music (`playBackgroundMusic()`, `stopBackgroundMusic()`)
- Implement a simple background synthesizer loop:
  - A simple chiptune melody or a cute 8-bar bassline played on a timer interval using `setTimeout` or Web Audio scheduling.
  - Keep it soft (low volume) so it doesn't distract the player.
  - Dynamically start the loop when the game starts/resumes, and stop/pause it on game over, victory, or when `settings.sound` is toggled off.

---

## 🛠️ File Edits Detail

### 1. `web/js/game.js`
- Create `SoundEffects` class or simple functions:
  - `initAudio()`: Creates `audioCtx` if not exists.
  - Hooks:
    - In player jump logic: `playJumpSound()`.
    - In dot eating logic: `playEatSound()`.
    - In enemy collision/dying logic: `playDieSound()`.
    - In portal collision/level complete: `playLevelCompleteSound()`.
  - Background music scheduler that plays a simple loop.
