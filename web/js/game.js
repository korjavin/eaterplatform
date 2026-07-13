const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('game-overlay');
const scoreVal = document.getElementById('score-val');
const livesVal = document.getElementById('lives-val');
const levelVal = document.getElementById('level-val');
const resetSizeBtn = document.getElementById('reset-size-btn');
const playerNameField = document.getElementById('player-name-field');
const playerNameInput = document.getElementById('player-name');
const playerNameError = document.getElementById('player-name-error');
const leaderboardBody = document.getElementById('leaderboard-body');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const soundToggle = document.getElementById('setting-sound');
const languageSelect = document.getElementById('setting-lang');

const DEFAULT_SETTINGS = {
  sound: true,
  language: 'en'
};

const TRANSLATIONS = {
  en: {
    title: '🟡 Eater Platformer',
    subtitle: "A blocky green monster's chomp-tastic arcade adventure!",
    intro_text: 'Eat dots, avoid ghost blocks, and reach the exit portal!',
    start_game: 'Start Game',
    try_again: 'Try Again',
    play_again: 'Play Again',
    start_level: 'Start Level {level}',
    game_over: 'Game Over',
    game_over_message: 'You scored {score} points. Try again!',
    victory: 'Victory!',
    victory_message: 'Congratulations! You beat all levels with a score of {score}!',
    level_complete: 'Level Complete!',
    level_complete_message: 'Proceeding to Level {level} ({rank}). Great job!',
    score: 'Score',
    lives: 'Lives',
    level: 'Level',
    reset_size_btn: 'Reset Size (-0.5 ❤)',
    level_hud_value: '{level} ({rank})',
    rank_1: 'Beginner',
    rank_2: 'Dot Hunter',
    rank_3: 'Apprentice',
    rank_4: 'Senior',
    rank_5: 'Gravity Defier',
    rank_6: 'Milord',
    rank_7: 'Portal Weaver',
    rank_8: 'Speedrunner',
    rank_9: 'Green Legend',
    rank_10: 'Ascended Eater',
    rank_11: 'Chomping Deity',
    how_to_play: 'How to Play',
    move_instruction: 'Use ← → or A D to Move',
    jump_instruction: 'Press Space or W to Jump',
    collect_dots: 'Collect all yellow dots to open the exit portal',
    avoid_spikes: 'Avoid spikes and patrolling enemies',
    settings_title: 'Settings',
    setting_sound_label: 'Sound Effects',
    setting_lang_label: 'Language',
    close_btn: 'Close',
    player_name_label: 'Choose your player name',
    player_name_placeholder: 'Player name',
    player_name_required: 'Enter a player name to start.',
    leaderboard: '🏆 Leaderboard',
    rank: 'Rank',
    player: 'Player',
    loading: 'Loading...',
    no_scores: 'No scores yet. Be the first!',
    leaderboard_unavailable: 'Leaderboard unavailable.'
  },
  de: {
    title: '🟡 Eater Platformer',
    subtitle: 'Ein blockiges grünes Monster in einem mampfigen Arcade-Abenteuer!',
    intro_text: 'Friss Punkte, meide Geisterblöcke und erreiche das Ausgangsportal!',
    start_game: 'Spiel starten',
    try_again: 'Erneut versuchen',
    play_again: 'Nochmal spielen',
    start_level: 'Level {level} starten',
    game_over: 'Spiel vorbei',
    game_over_message: 'Du hast {score} Punkte erzielt. Versuch es noch einmal!',
    victory: 'Sieg!',
    victory_message: 'Glückwunsch! Du hast alle Level mit {score} Punkten geschafft!',
    level_complete: 'Level geschafft!',
    level_complete_message: 'Weiter zu Level {level} ({rank}). Gut gemacht!',
    score: 'Punkte',
    lives: 'Leben',
    level: 'Level',
    reset_size_btn: 'Größe zurücksetzen (-0.5 ❤)',
    level_hud_value: '{level} ({rank})',
    rank_1: 'Anfänger',
    rank_2: 'Punktejäger',
    rank_3: 'Lehrling',
    rank_4: 'Senior',
    rank_5: 'Schwerkraftbezwinger',
    rank_6: 'Milord',
    rank_7: 'Portalweber',
    rank_8: 'Speedrunner',
    rank_9: 'Grüne Legende',
    rank_10: 'Aufgestiegener Eater',
    rank_11: 'Kauende Gottheit',
    how_to_play: 'Spielanleitung',
    move_instruction: 'Nutze ← → oder A D zum Bewegen',
    jump_instruction: 'Drücke Leertaste oder W zum Springen',
    collect_dots: 'Sammle alle gelben Punkte, um das Ausgangsportal zu öffnen',
    avoid_spikes: 'Meide Stacheln und patrouillierende Gegner',
    settings_title: 'Einstellungen',
    setting_sound_label: 'Soundeffekte',
    setting_lang_label: 'Sprache',
    close_btn: 'Schließen',
    player_name_label: 'Wähle deinen Spielernamen',
    player_name_placeholder: 'Spielername',
    player_name_required: 'Gib einen Spielernamen ein, um zu starten.',
    leaderboard: '🏆 Bestenliste',
    rank: 'Rang',
    player: 'Spieler',
    loading: 'Lädt...',
    no_scores: 'Noch keine Punkte. Sei der Erste!',
    leaderboard_unavailable: 'Bestenliste nicht verfügbar.'
  },
  ru: {
    title: '🟡 Eater Platformer',
    subtitle: 'Аркадное чавкающее приключение блочного зеленого монстра!',
    intro_text: 'Ешь точки, избегай блоков-призраков и доберись до портала выхода!',
    start_game: 'Начать игру',
    try_again: 'Попробовать снова',
    play_again: 'Играть снова',
    start_level: 'Начать уровень {level}',
    game_over: 'Игра окончена',
    game_over_message: 'Ты набрал {score} очков. Попробуй снова!',
    victory: 'Победа!',
    victory_message: 'Поздравляем! Ты прошел все уровни со счетом {score}!',
    level_complete: 'Уровень пройден!',
    level_complete_message: 'Переход на уровень {level} ({rank}). Отличная работа!',
    score: 'Счет',
    lives: 'Жизни',
    level: 'Уровень',
    reset_size_btn: 'Сбросить размер (-0.5 ❤)',
    level_hud_value: '{level} ({rank})',
    rank_1: 'Новичок',
    rank_2: 'Охотник за точками',
    rank_3: 'Ученик',
    rank_4: 'Старший',
    rank_5: 'Покоритель гравитации',
    rank_6: 'Милорд',
    rank_7: 'Ткач порталов',
    rank_8: 'Спидраннер',
    rank_9: 'Зеленая легенда',
    rank_10: 'Вознесенный едок',
    rank_11: 'Жующее божество',
    how_to_play: 'Как играть',
    move_instruction: 'Используй ← → или A D для движения',
    jump_instruction: 'Нажми Пробел или W для прыжка',
    collect_dots: 'Собери все желтые точки, чтобы открыть портал выхода',
    avoid_spikes: 'Избегай шипов и патрулирующих врагов',
    settings_title: 'Настройки',
    setting_sound_label: 'Звуковые эффекты',
    setting_lang_label: 'Язык',
    close_btn: 'Закрыть',
    player_name_label: 'Выбери имя игрока',
    player_name_placeholder: 'Имя игрока',
    player_name_required: 'Введи имя игрока, чтобы начать.',
    leaderboard: '🏆 Таблица лидеров',
    rank: 'Место',
    player: 'Игрок',
    loading: 'Загрузка...',
    no_scores: 'Результатов пока нет. Будь первым!',
    leaderboard_unavailable: 'Таблица лидеров недоступна.'
  }
};

const settings = loadSettings();

class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.musicTimer = null;
    this.musicStep = 0;
    this.musicPlaying = false;
    this.musicPattern = [
      261.63, 329.63, 392.00, 329.63,
      293.66, 349.23, 440.00, 349.23,
      329.63, 392.00, 493.88, 392.00,
      261.63, 329.63, 392.00, 523.25
    ];
  }

  initAudio() {
    if (!settings.sound) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playTone(freqStart, freqEnd, duration, type = 'sine', gainStart = 0.08, startAt = 0) {
    if (!settings.sound) return;

    const audioCtx = this.initAudio();
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const startTime = audioCtx.currentTime + startAt;
    const endTime = startTime + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freqStart, startTime);
    if (freqStart > 0 && freqEnd > 0) {
      oscillator.frequency.exponentialRampToValueAtTime(freqEnd, endTime);
    } else {
      oscillator.frequency.linearRampToValueAtTime(freqEnd, endTime);
    }

    gain.gain.setValueAtTime(gainStart, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, endTime);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start(startTime);
    oscillator.stop(endTime + 0.02);
  }

  playJumpSound() {
    this.playTone(150, 350, 0.12, 'triangle', 0.09);
  }

  playEatSound() {
    this.playTone(500, 900, 0.08, 'sine', 0.06);
  }

  playDieSound() {
    this.playTone(400, 80, 0.35, 'sawtooth', 0.08);
  }

  playSizeResetSound() {
    this.playTone(300, 150, 0.25, 'triangle', 0.07);
  }

  playLevelCompleteSound() {
    [523.25, 659.25, 783.99, 1046.50].forEach((frequency, index) => {
      this.playTone(frequency, frequency * 1.01, 0.1, 'triangle', 0.07, index * 0.09);
    });
  }

  startBackgroundMusic() {
    if (this.musicPlaying || !settings.sound) return;
    if (!this.initAudio()) return;

    this.musicPlaying = true;
    this.scheduleMusicStep();
  }

  stopBackgroundMusic() {
    this.musicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  scheduleMusicStep() {
    if (!this.musicPlaying || !settings.sound || !gameActive) {
      this.stopBackgroundMusic();
      return;
    }

    const melodyFrequency = this.musicPattern[this.musicStep % this.musicPattern.length];
    const bassFrequency = melodyFrequency / 2;
    this.playTone(melodyFrequency, melodyFrequency, 0.14, 'square', 0.018);
    if (this.musicStep % 2 === 0) {
      this.playTone(bassFrequency, bassFrequency, 0.24, 'triangle', 0.025);
    }
    this.musicStep++;
    this.musicTimer = setTimeout(() => this.scheduleMusicStep(), 220);
  }
}

const soundEffects = new SoundEffects();

// Game state
let score = 0;
let lives = 3;
let level = 1;
let gameActive = false;
let scoreSubmitted = false;
let mouthAngle = 0.2;
let mouthClosing = false;

// Physics configuration
const GRAVITY = 0.5;
const BASE_PLAYER_SPEED = 4;
const BASE_JUMP_FORCE = 10;
const BASE_FRICTION = 0.85;
const BOOSTED_PLAYER_SPEED = 8;
const BOOSTED_JUMP_FORCE = 14;
const BOOSTED_FRICTION = 0.96;
const BOOST_DURATION_FRAMES = 600;
const BOOST_SLIP_SPEED = 8;
const SMALL_DOT_RADIUS = 6;
const BIG_DOT_RADIUS = 12;
const BIG_DOT_MIN_PLAYER_RADIUS = 18;
const MIN_PLAYER_RADIUS = 10;

// Player configuration
const player = {
  x: 50,
  y: 300,
  radius: 15,
  vx: 0,
  vy: 0,
  speed: BASE_PLAYER_SPEED,
  jumpForce: BASE_JUMP_FORCE,
  speedBoostTimer: 0,
  boostedJumpActive: false,
  grounded: false,
  facingLeft: false
};

// Controls mapping
const keys = {
  ArrowRight: false,
  ArrowLeft: false,
  KeyD: false,
  KeyA: false,
  ArrowUp: false,
  KeyW: false,
  Space: false
};

let platforms = [];
let dots = [];
let enemies = [];
let portal = { x: 0, y: 0, width: 40, height: 60, active: false };

const LEVELS = {
  1: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 150, y: 300, width: 120, height: 15 },
      { x: 350, y: 220, width: 120, height: 15 },
      { x: 550, y: 150, width: 120, height: 15 },
      { x: 50, y: 200, width: 100, height: 15 },
      { x: 10, y: 290, width: 80, height: 15 } // Unreachable platform fix
    ],
    dots: [
      { x: 210, y: 270, collected: false },
      { x: 410, y: 190, collected: false },
      { x: 610, y: 120, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 100, y: 170, collected: false },
      { x: 380, y: 350, collected: false }
    ],
    enemies: [
      { x: 350, y: 205, width: 20, height: 15, vx: 1, range: 100, startX: 350 },
      { x: 150, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 150 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  2: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 300, width: 150, height: 15 },
      { x: 250, y: 220, width: 150, height: 15 },
      { x: 450, y: 140, width: 150, height: 15 },
      { x: 650, y: 220, width: 100, height: 15 }
    ],
    dots: [
      { x: 120, y: 270, collected: false },
      { x: 320, y: 190, collected: false },
      { x: 520, y: 110, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 700, y: 190, collected: false },
      { x: 200, y: 350, collected: false },
      { x: 600, y: 350, collected: false }
    ],
    enemies: [
      { x: 250, y: 205, width: 20, height: 15, vx: 1.2, range: 120, startX: 250 },
      { x: 450, y: 125, width: 20, height: 15, vx: 1.8, range: 120, startX: 450 },
      { x: 150, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 150 }
    ],
    portal: { x: 50, y: 240, width: 40, height: 60, active: false }
  },
  3: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 100, y: 300, width: 120, height: 15 },
      { x: 300, y: 220, width: 120, height: 15 },
      { x: 500, y: 140, width: 120, height: 15 },
      { x: 200, y: 110, width: 120, height: 15 }
    ],
    dots: [
      { x: 160, y: 270, collected: false },
      { x: 360, y: 190, collected: false },
      { x: 560, y: 110, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 260, y: 80, collected: false },
      { x: 300, y: 350, collected: false, red: true }
    ],
    enemies: [
      { x: 300, y: 205, width: 20, height: 15, vx: 1.5, range: 100, startX: 300 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  4: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 310, width: 120, height: 15 },
      { x: 220, y: 240, width: 120, height: 15 },
      { x: 390, y: 170, width: 120, height: 15 },
      { x: 560, y: 240, width: 120, height: 15 },
      { x: 700, y: 310, width: 80, height: 15 }
    ],
    dots: [
      { x: 110, y: 280, collected: false },
      { x: 280, y: 210, collected: false },
      { x: 450, y: 140, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 620, y: 210, collected: false },
      { x: 740, y: 280, collected: false }
    ],
    enemies: [
      { x: 220, y: 225, width: 20, height: 15, vx: 1.6, range: 100, startX: 220 },
      { x: 560, y: 225, width: 20, height: 15, vx: -1.6, range: 100, startX: 560 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  5: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 150, y: 300, width: 150, height: 15 },
      { x: 400, y: 300, width: 150, height: 15 },
      { x: 275, y: 210, width: 150, height: 15 },
      { x: 275, y: 120, width: 150, height: 15 }
    ],
    dots: [
      { x: 225, y: 270, collected: false },
      { x: 475, y: 270, collected: false },
      { x: 350, y: 180, collected: false },
      { x: 350, y: 90, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 400, y: 350, collected: false, red: true }
    ],
    enemies: [
      { x: 150, y: 285, width: 20, height: 15, vx: 1.4, range: 120, startX: 150 },
      { x: 400, y: 285, width: 20, height: 15, vx: -1.4, range: 120, startX: 400 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  6: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 290, width: 120, height: 15 },
      { x: 200, y: 200, width: 120, height: 15 },
      { x: 350, y: 290, width: 120, height: 15 },
      { x: 500, y: 200, width: 120, height: 15 },
      { x: 650, y: 290, width: 120, height: 15 }
    ],
    dots: [
      { x: 110, y: 260, collected: false },
      { x: 260, y: 170, collected: false },
      { x: 410, y: 260, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 560, y: 170, collected: false },
      { x: 710, y: 260, collected: false },
      { x: 650, y: 350, collected: false, green: true }
    ],
    enemies: [
      { x: 200, y: 185, width: 20, height: 15, vx: 1.8, range: 100, startX: 200 },
      { x: 500, y: 185, width: 20, height: 15, vx: -1.8, range: 100, startX: 500 }
    ],
    portal: { x: 20, y: 320, width: 40, height: 60, active: false }
  },
  7: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 100, y: 310, width: 100, height: 15 },
      { x: 250, y: 240, width: 100, height: 15 },
      { x: 400, y: 170, width: 100, height: 15 },
      { x: 550, y: 240, width: 100, height: 15 },
      { x: 700, y: 310, width: 100, height: 15 },
      { x: 250, y: 100, width: 300, height: 15 }
    ],
    dots: [
      { x: 150, y: 280, collected: false },
      { x: 300, y: 210, collected: false },
      { x: 450, y: 140, collected: false },
      { x: 600, y: 210, collected: false },
      { x: 750, y: 280, collected: false },
      { x: 400, y: 70, collected: false, big: true, radius: BIG_DOT_RADIUS }
    ],
    enemies: [
      { x: 250, y: 85, width: 20, height: 15, vx: 2, range: 260, startX: 250 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  8: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 300, width: 80, height: 15 },
      { x: 150, y: 220, width: 80, height: 15 },
      { x: 250, y: 150, width: 80, height: 15 },
      { x: 350, y: 150, width: 80, height: 15 },
      { x: 450, y: 220, width: 80, height: 15 },
      { x: 550, y: 300, width: 80, height: 15 },
      { x: 650, y: 220, width: 80, height: 15 }
    ],
    dots: [
      { x: 90, y: 270, collected: false },
      { x: 190, y: 190, collected: false },
      { x: 290, y: 120, collected: false },
      { x: 390, y: 120, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 490, y: 190, collected: false },
      { x: 590, y: 270, collected: false },
      { x: 690, y: 190, collected: false },
      { x: 550, y: 350, collected: false, red: true }
    ],
    enemies: [
      { x: 350, y: 135, width: 20, height: 15, vx: 1.2, range: 60, startX: 350 }
    ],
    portal: { x: 740, y: 320, width: 40, height: 60, active: false }
  },
  9: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 100, y: 300, width: 600, height: 15 },
      { x: 200, y: 210, width: 400, height: 15 },
      { x: 300, y: 120, width: 200, height: 15 }
    ],
    dots: [
      { x: 100, y: 350, collected: false, green: true },
      { x: 150, y: 270, collected: false },
      { x: 650, y: 270, collected: false },
      { x: 250, y: 180, collected: false },
      { x: 550, y: 180, collected: false },
      { x: 350, y: 90, collected: false },
      { x: 450, y: 90, collected: false, big: true, radius: BIG_DOT_RADIUS }
    ],
    enemies: [
      { x: 200, y: 195, width: 20, height: 15, vx: 2.2, range: 360, startX: 200 },
      { x: 300, y: 105, width: 20, height: 15, vx: -1.8, range: 160, startX: 300 }
    ],
    portal: { x: 50, y: 320, width: 40, height: 60, active: false }
  },
  10: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 300, width: 100, height: 15 },
      { x: 200, y: 230, width: 100, height: 15 },
      { x: 350, y: 160, width: 100, height: 15 },
      { x: 500, y: 230, width: 100, height: 15 },
      { x: 650, y: 300, width: 100, height: 15 },
      { x: 350, y: 80, width: 100, height: 15 }
    ],
    dots: [
      { x: 100, y: 270, collected: false },
      { x: 250, y: 200, collected: false },
      { x: 400, y: 130, collected: false },
      { x: 550, y: 200, collected: false },
      { x: 700, y: 270, collected: false },
      { x: 400, y: 50, collected: false, big: true, radius: BIG_DOT_RADIUS }
    ],
    enemies: [
      { x: 200, y: 215, width: 20, height: 15, vx: 1.5, range: 80, startX: 200 },
      { x: 500, y: 215, width: 20, height: 15, vx: -1.5, range: 80, startX: 500 }
    ],
    portal: { x: 740, y: 320, width: 40, height: 60, active: false }
  },
  11: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 50, y: 310, width: 700, height: 15 },
      { x: 100, y: 230, width: 600, height: 15 },
      { x: 150, y: 150, width: 500, height: 15 },
      { x: 200, y: 70, width: 400, height: 15 }
    ],
    dots: [
      { x: 100, y: 280, collected: false },
      { x: 700, y: 280, collected: false },
      { x: 150, y: 200, collected: false },
      { x: 650, y: 200, collected: false },
      { x: 200, y: 120, collected: false },
      { x: 600, y: 120, collected: false },
      { x: 400, y: 40, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 400, y: 350, collected: false, green: true }
    ],
    enemies: [
      { x: 100, y: 215, width: 20, height: 15, vx: 2.5, range: 560, startX: 100 },
      { x: 150, y: 135, width: 20, height: 15, vx: -2.0, range: 460, startX: 150 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  }
};

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem('eater-settings') || '{}');
    const language = TRANSLATIONS[stored.language] ? stored.language : getCookie('lang');
    return {
      sound: typeof stored.sound === 'boolean' ? stored.sound : DEFAULT_SETTINGS.sound,
      language: TRANSLATIONS[language] ? language : DEFAULT_SETTINGS.language
    };
  } catch (error) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  try {
    localStorage.setItem('eater-settings', JSON.stringify(settings));
  } catch (error) {
    console.warn('Unable to persist settings:', error);
  }
  setCookie('lang', settings.language);
}

function t(key, values = {}) {
  const dictionary = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const template = dictionary[key] || TRANSLATIONS.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function setTranslatedText(element, key, values = {}) {
  element.dataset.i18n = key;
  element.dataset.i18nValues = JSON.stringify(values);
  element.textContent = t(key, values);
}

function getI18nValues(element) {
  if (!element.dataset.i18nValues) return {};
  try {
    return JSON.parse(element.dataset.i18nValues);
  } catch (error) {
    return {};
  }
}

function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;

  settings.language = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n, getI18nValues(element));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  if (languageSelect.value !== lang) languageSelect.value = lang;
  saveSettings();
  updateHUD();
}

function syncSettingsControls() {
  soundToggle.checked = settings.sound;
  languageSelect.value = settings.language;
}

function openSettings() {
  soundEffects.initAudio();
  settingsModal.classList.remove('hidden');
  settingsCloseBtn.focus();
}

function closeSettings() {
  settingsModal.classList.add('hidden');
  settingsBtn.focus();
}

function configureSettingsPanel() {
  syncSettingsControls();
  settingsBtn.addEventListener('click', openSettings);
  settingsCloseBtn.addEventListener('click', closeSettings);
  settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) closeSettings();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !settingsModal.classList.contains('hidden')) closeSettings();
  });
  soundToggle.addEventListener('change', () => {
    settings.sound = soundToggle.checked;
    saveSettings();
    if (settings.sound && gameActive) {
      soundEffects.startBackgroundMusic();
    } else {
      soundEffects.stopBackgroundMusic();
    }
  });
  languageSelect.addEventListener('change', () => {
    applyLanguage(languageSelect.value);
  });
}

// Setup input listeners
window.addEventListener('keydown', (e) => {
  if (e.code in keys) keys[e.code] = true;
  if (e.code === 'KeyR' && !e.repeat) {
    triggerSizeReset();
  }
  if (['ArrowUp', 'Space', 'KeyW'].includes(e.code) && gameActive) {
    e.preventDefault(); // Prevent page scroll
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code in keys) keys[e.code] = false;
});

startBtn.addEventListener('click', () => {
  if (!ensureUsername()) return;

  soundEffects.initAudio();
  overlay.classList.add('hidden');
  if (lives <= 0 || (level === 1 && !gameActive)) {
    resetGame();
  } else {
    loadLevel(level);
  }
  if (!gameActive) {
    gameActive = true;
    soundEffects.startBackgroundMusic();
    gameLoop();
  }
});

playerNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') startBtn.click();
});

resetSizeBtn.addEventListener('click', triggerSizeReset);

function getCookie(name) {
  const prefix = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie.split('; ').find(item => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : '';
}

function setCookie(name, value) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=31536000; path=/; SameSite=Lax`;
}

function configureUsernamePrompt() {
  const username = getCookie('username').trim();
  playerNameField.hidden = username !== '';
  if (!username) window.requestAnimationFrame(() => playerNameInput.focus());
}

function ensureUsername() {
  if (getCookie('username').trim()) return true;

  const username = playerNameInput.value.trim();
  if (!username) {
    setTranslatedText(playerNameError, 'player_name_required');
    playerNameInput.focus();
    return false;
  }

  setCookie('username', username);
  playerNameError.textContent = '';
  delete playerNameError.dataset.i18n;
  delete playerNameError.dataset.i18nValues;
  playerNameField.hidden = true;
  return true;
}

function showLeaderboardMessage(key) {
  leaderboardBody.replaceChildren();
  const row = leaderboardBody.insertRow();
  const cell = row.insertCell();
  cell.colSpan = 3;
  cell.className = 'leaderboard-message';
  setTranslatedText(cell, key);
}

async function fetchLeaderboard() {
  showLeaderboardMessage('loading');

  try {
    const response = await fetch('/api/scores');
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    const scores = await response.json();
    if (!Array.isArray(scores)) throw new Error('Unexpected leaderboard response');

    leaderboardBody.replaceChildren();
    const topScores = scores.slice(0, 10);
    if (topScores.length === 0) {
      showLeaderboardMessage('no_scores');
      return;
    }

    topScores.forEach((entry, index) => {
      const row = leaderboardBody.insertRow();
      row.insertCell().textContent = String(index + 1);
      row.insertCell().textContent = String(entry.name ?? 'Anonymous');
      row.insertCell().textContent = String(entry.score ?? 0);
    });
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
    showLeaderboardMessage('leaderboard_unavailable');
  }
}

async function submitScore(name, finalScore) {
  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score: finalScore })
    });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error('Failed to submit score:', error);
  } finally {
    await fetchLeaderboard();
  }
}

function submitCurrentScore() {
  if (scoreSubmitted) return;

  const username = getCookie('username').trim();
  if (!username) return;

  scoreSubmitted = true;
  void submitScore(username, score);
}

function loadLevel(levelNum) {
  const lvlConfig = LEVELS[levelNum];
  platforms = lvlConfig.platforms.map(p => ({ ...p }));
  dots = lvlConfig.dots.map(d => ({ ...d }));
  enemies = lvlConfig.enemies.map(e => ({ ...e }));
  portal = { ...lvlConfig.portal };
  resetPlayer(levelNum > 1);
  updateHUD();
}

function gameVictory() {
  gameActive = false;
  submitCurrentScore();
  setTranslatedText(overlay.querySelector('h2'), 'victory');
  setTranslatedText(overlay.querySelector('p'), 'victory_message', { score });
  setTranslatedText(overlay.querySelector('button'), 'play_again');
  overlay.classList.remove('hidden');
  level = 1;
}

function resetGame() {
  score = 0;
  lives = 3;
  level = 1;
  scoreSubmitted = false;
  loadLevel(level);
}

function resetPlayer(preserveRadius = false) {
  player.x = 50;
  player.y = 300;
  if (!preserveRadius) {
    player.radius = 15;
  }
  player.vx = 0;
  player.vy = 0;
  player.speed = BASE_PLAYER_SPEED;
  player.jumpForce = BASE_JUMP_FORCE;
  player.speedBoostTimer = 0;
  player.boostedJumpActive = false;
  player.grounded = false;
}

function updateHUD() {
  scoreVal.textContent = String(score).padStart(4, '0');
  const fullHearts = Math.max(0, Math.floor(lives));
  const hasHalfHeart = lives - fullHearts >= 0.5;
  livesVal.textContent = `${'❤'.repeat(fullHearts)}${hasHalfHeart ? '💔' : ''}`;
  setTranslatedText(levelVal, 'level_hud_value', { level, rank: getRankName(level) });
}

function triggerSizeReset() {
  if (!gameActive) return;

  lives -= 0.5;
  player.radius = 15;
  soundEffects.playSizeResetSound();
  updateHUD();
  if (lives <= 0) {
    gameOver();
  }
}

function getRankName(levelNum) {
  return t(`rank_${levelNum}`);
}

function getDotRadius(dot) {
  return dot.radius ?? (dot.big ? BIG_DOT_RADIUS : SMALL_DOT_RADIUS);
}

function getDotColor(dot) {
  if (dot.red) return '#e74c3c';
  if (dot.green) return '#2ecc71';
  return dot.big ? '#f39c12' : '#f3ca20';
}

function collectDot(dot) {
  dot.collected = true;

  if (dot.red) {
    player.radius = Math.max(MIN_PLAYER_RADIUS, player.radius / 1.10);
  } else if (dot.green) {
    player.speedBoostTimer = BOOST_DURATION_FRAMES;
    player.speed = BOOSTED_PLAYER_SPEED;
    player.jumpForce = BOOSTED_JUMP_FORCE;
  } else {
    player.radius *= 1.10;
  }

  score += 100;
  soundEffects.playEatSound();
  updateHUD();
}

// Collisions with platforms
function checkPlatformCollisions() {
  player.grounded = false;

  for (const plat of platforms) {
    // Check bounding box intersection
    const playerLeft = player.x - player.radius;
    const playerRight = player.x + player.radius;
    const playerTop = player.y - player.radius;
    const playerBottom = player.y + player.radius;

    if (playerRight > plat.x &&
        playerLeft < plat.x + plat.width &&
        playerBottom > plat.y &&
        playerTop < plat.y + plat.height) {
      
      // Calculate depth of intersection on both axes
      const overlapX = Math.min(playerRight - plat.x, plat.x + plat.width - playerLeft);
      const overlapY = Math.min(playerBottom - plat.y, plat.y + plat.height - playerTop);

      if (overlapY < overlapX) {
        // Collision is vertical
        if (player.vy > 0 && playerBottom - player.vy <= plat.y + 2) {
          // Landing on top of platform
          player.y = plat.y - player.radius;
          player.vy = 0;
          player.grounded = true;
        } else if (player.vy < 0) {
          // Hitting bottom of platform
          player.y = plat.y + plat.height + player.radius;
          player.vy = 0;
        }
      } else {
        // Collision is horizontal
        if (player.vx > 0) {
          player.x = plat.x - player.radius;
          player.vx = 0;
        } else if (player.vx < 0) {
          player.x = plat.x + plat.width + player.radius;
          player.vx = 0;
        }
      }
    }
  }
}

// Update game physics and logic
function update() {
  if (!gameActive) return;

  const wasGrounded = player.grounded;
  const boosted = player.speedBoostTimer > 0;
  if (boosted) {
    player.speed = BOOSTED_PLAYER_SPEED;
    player.jumpForce = BOOSTED_JUMP_FORCE;
  } else {
    player.speed = BASE_PLAYER_SPEED;
    player.jumpForce = BASE_JUMP_FORCE;
  }
  const friction = boosted ? BOOSTED_FRICTION : BASE_FRICTION;
  if (boosted) {
    player.speedBoostTimer--;
  }

  // Horizontal Movement
  if (keys.ArrowRight || keys.KeyD) {
    player.vx += player.speed * 0.15;
    if (player.vx > player.speed) player.vx = player.speed;
    player.facingLeft = false;
  } else if (keys.ArrowLeft || keys.KeyA) {
    player.vx -= player.speed * 0.15;
    if (player.vx < -player.speed) player.vx = -player.speed;
    player.facingLeft = true;
  } else {
    player.vx *= friction;
  }

  // Jumping (scaled by size/weight)
  if ((keys.ArrowUp || keys.KeyW || keys.Space) && player.grounded) {
    const sizeDiff = player.radius - 15;
    const currentJumpForce = Math.max(5, player.jumpForce * (1 - sizeDiff * 0.035));
    player.vy = -currentJumpForce;
    player.grounded = false;
    player.boostedJumpActive = player.speedBoostTimer > 0;
    soundEffects.playJumpSound();
  }

  // Apply Gravity
  player.vy += GRAVITY;

  // Apply velocities
  player.x += player.vx;
  player.y += player.vy;

  // Canvas bounds collision
  if (player.x - player.radius < 0) {
    player.x = player.radius;
    player.vx = 0;
  } else if (player.x + player.radius > canvas.width) {
    player.x = canvas.width - player.radius;
    player.vx = 0;
  }

  if (player.y - player.radius < 0) {
    player.y = player.radius;
    player.vy = 0;
  }

  // Platform collision resolution
  checkPlatformCollisions();
  if (!wasGrounded && player.grounded && player.boostedJumpActive) {
    player.vx = player.facingLeft ? -BOOST_SLIP_SPEED : BOOST_SLIP_SPEED;
    player.boostedJumpActive = false;
  }

  // Mouth animation
  if (Math.abs(player.vx) > 0.1) {
    if (mouthClosing) {
      mouthAngle -= 0.02;
      if (mouthAngle <= 0.05) mouthClosing = false;
    } else {
      mouthAngle += 0.02;
      if (mouthAngle >= 0.25) mouthClosing = true;
    }
  } else {
    mouthAngle = 0.15;
  }

  // Collectibles check
  let allCollected = true;
  for (const dot of dots) {
    if (!dot.collected) {
      allCollected = false;
      const dx = player.x - dot.x;
      const dy = player.y - dot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const dotRadius = getDotRadius(dot);
      if (distance < player.radius + dotRadius) {
        if (dot.big && player.radius < BIG_DOT_MIN_PLAYER_RADIUS) continue;

        collectDot(dot);
      }
    }
  }

  if (allCollected && !portal.active) {
    portal.active = true;
  }

  // Enemies update & check collision
  for (const enemy of enemies) {
    enemy.x += enemy.vx;
    if (Math.abs(enemy.x - enemy.startX) > enemy.range) {
      enemy.vx = -enemy.vx;
    }

    // Collision with player
    const playerLeft = player.x - player.radius;
    const playerRight = player.x + player.radius;
    const playerTop = player.y - player.radius;
    const playerBottom = player.y + player.radius;

    if (playerRight > enemy.x &&
        playerLeft < enemy.x + enemy.width &&
        playerBottom > enemy.y &&
        playerTop < enemy.y + enemy.height) {
      lives--;
      soundEffects.playDieSound();
      updateHUD();
      if (lives <= 0) {
        gameOver();
        break;
      } else {
        resetPlayer();
        break;
      }
    }
  }

  // Portal collision (Level exit)
  if (portal.active) {
    const playerLeft = player.x - player.radius;
    const playerRight = player.x + player.radius;
    const playerTop = player.y - player.radius;
    const playerBottom = player.y + player.radius;

    if (playerRight > portal.x &&
        playerLeft < portal.x + portal.width &&
        playerBottom > portal.y &&
        playerTop < portal.y + portal.height) {
      levelComplete();
    }
  }
}

function gameOver() {
  gameActive = false;
  soundEffects.stopBackgroundMusic();
  submitCurrentScore();
  resetPlayer(false);
  setTranslatedText(overlay.querySelector('h2'), 'game_over');
  setTranslatedText(overlay.querySelector('p'), 'game_over_message', { score });
  setTranslatedText(overlay.querySelector('button'), 'try_again');
  overlay.classList.remove('hidden');
}

function levelComplete() {
  gameActive = false;
  soundEffects.stopBackgroundMusic();
  soundEffects.playLevelCompleteSound();
  level++;
  const nextLvlConfig = LEVELS[level];
  if (!nextLvlConfig) {
    level--;
    gameVictory();
    return;
  }
  setTranslatedText(overlay.querySelector('h2'), 'level_complete');
  setTranslatedText(overlay.querySelector('p'), 'level_complete_message', {
    level,
    rank: getRankName(level)
  });
  setTranslatedText(overlay.querySelector('button'), 'start_level', { level });
  overlay.classList.remove('hidden');
}

// Rendering
function drawTree(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 4;

  ctx.fillStyle = '#8b5a2b';
  ctx.beginPath();
  ctx.moveTo(-10, 58);
  ctx.lineTo(-7, 10);
  ctx.quadraticCurveTo(0, 4, 7, 10);
  ctx.lineTo(10, 58);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#2fb65d';
  ctx.beginPath();
  ctx.moveTo(-31, 17);
  ctx.bezierCurveTo(-55, 5, -44, -27, -18, -24);
  ctx.bezierCurveTo(-12, -52, 27, -54, 34, -23);
  ctx.bezierCurveTo(61, -22, 63, 15, 37, 21);
  ctx.bezierCurveTo(26, 45, -13, 45, -22, 24);
  ctx.bezierCurveTo(-26, 23, -29, 21, -31, 17);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#74d66d';
  ctx.beginPath();
  ctx.arc(-9, -17, 8, 0, Math.PI * 2);
  ctx.arc(18, 2, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawComicBackground() {
  ctx.fillStyle = '#a5d8ff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff4a8';
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(70, 65, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#8fda62';
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-20, 320);
  ctx.quadraticCurveTo(120, 230, 285, 306);
  ctx.quadraticCurveTo(435, 372, 610, 287);
  ctx.quadraticCurveTo(720, 235, 840, 305);
  ctx.lineTo(840, canvas.height);
  ctx.lineTo(-20, canvas.height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#62c950';
  ctx.beginPath();
  ctx.moveTo(-20, 355);
  ctx.quadraticCurveTo(180, 312, 372, 352);
  ctx.quadraticCurveTo(575, 392, 840, 334);
  ctx.lineTo(840, canvas.height);
  ctx.lineTo(-20, canvas.height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  drawTree(118, 260, 0.9);
  drawTree(690, 235, 1.05);
  drawTree(525, 292, 0.7);

  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 2;
  for (let x = 18; x < canvas.width; x += 28) {
    const y = 360 + Math.sin(x * 0.05) * 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 3, y - 10, x + 8, y - 18);
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawComicBackground();

  // Draw Portal
  if (portal.active) {
    ctx.fillStyle = '#45f3ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#45f3ff';
    ctx.beginPath();
    ctx.ellipse(portal.x + portal.width/2, portal.y + portal.height/2, portal.width/2, portal.height/2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  } else {
    ctx.strokeStyle = '#223344';
    ctx.lineWidth = 3;
    ctx.strokeRect(portal.x, portal.y, portal.width, portal.height);
  }

  // Draw Platforms
  ctx.fillStyle = '#2f3b4c';
  for (const plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    // Draw top highlights
    ctx.fillStyle = '#45f3ff';
    ctx.fillRect(plat.x, plat.y, plat.width, 2);
    ctx.fillStyle = '#2f3b4c';
  }

  // Draw Dots
  for (const dot of dots) {
    if (!dot.collected) {
      const isBig = !!dot.big;
      const isGreen = !!dot.green;
      const dotRadius = getDotRadius(dot);
      const dotColor = getDotColor(dot);
      ctx.fillStyle = dotColor;
      ctx.shadowBlur = isBig ? 14 : (isGreen ? 12 : 8);
      ctx.shadowColor = dotColor;
      if (isBig || isGreen) {
        const pulse = 0.5 + Math.sin(performance.now() / 180) * 0.25;
        ctx.strokeStyle = isGreen ? `rgba(46, 204, 113, ${pulse})` : `rgba(243, 156, 18, ${pulse})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Draw Enemies
  ctx.fillStyle = '#ff007f';
  for (const enemy of enemies) {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }

  // Draw Player (Eater) - Blocky green monster matching design draft
  const scale = player.radius / 15;
  const mouthHeight = 12 * scale * (mouthAngle / 0.25);
  const mouthCenterY = player.y - player.radius * 0.2;
  const upperCeilingY = mouthCenterY - mouthHeight / 2;
  const lowerFloorY = mouthCenterY + mouthHeight / 2;
  const bodyLeft = player.x - player.radius;
  const bodyRight = player.x + player.radius;
  const bodyTop = player.y - player.radius;
  const bodyBottom = player.y + player.radius * 0.6;
  const mouthBackOffset = 2 * scale;

  if (player.speedBoostTimer > 0) {
    const boostPulse = 0.35 + Math.sin(performance.now() / 90) * 0.12;
    ctx.save();
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#2ecc71';
    ctx.strokeStyle = `rgba(46, 204, 113, ${boostPulse})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 7, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(46, 204, 113, 0.22)';
    ctx.beginPath();
    ctx.ellipse(
      player.x + (player.facingLeft ? 18 : -18) * scale,
      player.y + 2 * scale,
      10 * scale,
      5 * scale,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  }

  // Outer green body path with cutout mouth gap
  ctx.fillStyle = '#3da842';
  ctx.beginPath();
  if (!player.facingLeft) {
    // Facing Right
    ctx.moveTo(bodyLeft, bodyTop); // Top-left
    ctx.lineTo(bodyRight, bodyTop); // Top-right
    ctx.lineTo(bodyRight, upperCeilingY);  // Down to mouth top
    ctx.lineTo(player.x - mouthBackOffset, upperCeilingY);   // In to mouth back
    ctx.lineTo(player.x - mouthBackOffset, lowerFloorY);     // Down to mouth bottom
    ctx.lineTo(bodyRight, lowerFloorY);    // Out to mouth bottom
    ctx.lineTo(bodyRight, bodyBottom);   // Down to bottom-right
    ctx.lineTo(bodyLeft, bodyBottom);   // Left to bottom-left
  } else {
    // Facing Left
    ctx.moveTo(bodyRight, bodyTop); // Top-right
    ctx.lineTo(bodyLeft, bodyTop); // Top-left
    ctx.lineTo(bodyLeft, upperCeilingY);  // Down to mouth top
    ctx.lineTo(player.x + mouthBackOffset, upperCeilingY);   // In to mouth back
    ctx.lineTo(player.x + mouthBackOffset, lowerFloorY);     // Down to mouth bottom
    ctx.lineTo(bodyLeft, lowerFloorY);    // Out to mouth bottom
    ctx.lineTo(bodyLeft, bodyBottom);   // Down to bottom-left
    ctx.lineTo(bodyRight, bodyBottom);   // Right to bottom-right
  }
  ctx.closePath();
  ctx.fill();

  // Draw Tongue (red shape at back wall)
  ctx.fillStyle = '#ff3366';
  ctx.beginPath();
  const tongueHeight = Math.min(6 * scale, mouthHeight * 0.6);
  if (!player.facingLeft) {
    ctx.moveTo(player.x - mouthBackOffset, mouthCenterY - tongueHeight / 2);
    ctx.quadraticCurveTo(player.x + 3 * scale, mouthCenterY, player.x - mouthBackOffset, mouthCenterY + tongueHeight / 2);
  } else {
    ctx.moveTo(player.x + mouthBackOffset, mouthCenterY - tongueHeight / 2);
    ctx.quadraticCurveTo(player.x - 3 * scale, mouthCenterY, player.x + mouthBackOffset, mouthCenterY + tongueHeight / 2);
  }
  ctx.fill();

  // Draw Teeth (yellow small triangular teeth inside the mouth gap)
  const toothHeight = Math.min(3 * scale, mouthHeight / 2);
  ctx.fillStyle = '#f3ca20';
  if (!player.facingLeft) {
    // Upper teeth pointing down
    ctx.beginPath();
    ctx.moveTo(player.x + 2 * scale, upperCeilingY);
    ctx.lineTo(player.x + 4.5 * scale, upperCeilingY + toothHeight);
    ctx.lineTo(player.x + 7 * scale, upperCeilingY);
    ctx.moveTo(player.x + 9 * scale, upperCeilingY);
    ctx.lineTo(player.x + 11.5 * scale, upperCeilingY + toothHeight);
    ctx.lineTo(player.x + 14 * scale, upperCeilingY);
    ctx.fill();

    // Lower teeth pointing up
    ctx.beginPath();
    ctx.moveTo(player.x + 2 * scale, lowerFloorY);
    ctx.lineTo(player.x + 4.5 * scale, lowerFloorY - toothHeight);
    ctx.lineTo(player.x + 7 * scale, lowerFloorY);
    ctx.moveTo(player.x + 9 * scale, lowerFloorY);
    ctx.lineTo(player.x + 11.5 * scale, lowerFloorY - toothHeight);
    ctx.lineTo(player.x + 14 * scale, lowerFloorY);
    ctx.fill();
  } else {
    // Upper teeth pointing down
    ctx.beginPath();
    ctx.moveTo(player.x - 7 * scale, upperCeilingY);
    ctx.lineTo(player.x - 4.5 * scale, upperCeilingY + toothHeight);
    ctx.lineTo(player.x - 2 * scale, upperCeilingY);
    ctx.moveTo(player.x - 14 * scale, upperCeilingY);
    ctx.lineTo(player.x - 11.5 * scale, upperCeilingY + toothHeight);
    ctx.lineTo(player.x - 9 * scale, upperCeilingY);
    ctx.fill();

    // Lower teeth pointing up
    ctx.beginPath();
    ctx.moveTo(player.x - 7 * scale, lowerFloorY);
    ctx.lineTo(player.x - 4.5 * scale, lowerFloorY - toothHeight);
    ctx.lineTo(player.x - 2 * scale, lowerFloorY);
    ctx.moveTo(player.x - 14 * scale, lowerFloorY);
    ctx.lineTo(player.x - 11.5 * scale, lowerFloorY - toothHeight);
    ctx.lineTo(player.x - 9 * scale, lowerFloorY);
    ctx.fill();
  }

  // Draw Eye (white circle + black pupil)
  const eyeX = player.facingLeft ? (player.x + 7 * scale) : (player.x - 7 * scale);
  const eyeY = player.y - 7 * scale;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 4.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 1.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Draw Cap (red dome on top of the head)
  ctx.fillStyle = '#ff3333';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.arc(player.x, player.y - player.radius, 5 * scale, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw Legs (two simple black stick legs with horizontal foot lines)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  // Leg 1
  ctx.moveTo(player.x - 5 * scale, bodyBottom);
  ctx.lineTo(player.x - 5 * scale, player.y + player.radius);
  ctx.moveTo(player.x - 6.5 * scale, player.y + player.radius);
  ctx.lineTo(player.x - 3.5 * scale, player.y + player.radius);

  // Leg 2
  ctx.moveTo(player.x + 5 * scale, bodyBottom);
  ctx.lineTo(player.x + 5 * scale, player.y + player.radius);
  ctx.moveTo(player.x + 3.5 * scale, player.y + player.radius);
  ctx.lineTo(player.x + 6.5 * scale, player.y + player.radius);
  ctx.stroke();
}

function gameLoop() {
  if (gameActive) {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }
}

// Initial draw of static game screen
draw();
configureSettingsPanel();
applyLanguage(settings.language);
configureUsernamePrompt();
void fetchLeaderboard();
