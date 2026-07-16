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
const rulesModal = document.getElementById('rules-modal');
const openRulesBtn = document.getElementById('open-rules-btn');
const closeRulesBtn = document.getElementById('close-rules-btn');

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
    reset_size_btn: 'Reset Size (Spit Star)',
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
    leaderboard_unavailable: 'Leaderboard unavailable.',
    open_rules_btn: 'Game Rules',
    rules_title: 'Game Rules & Mentor Tips',
    close_rules_btn: 'Let\'s Play!',
    mentor_label: 'Mentor:',
    eater_label: 'Eater:',
    rule_dialogue_1: 'Listen up, green monster! Eat all dots and reach the cyan portal. Simple, right?',
    rule_dialogue_2: 'Chomp! What about the big orange stars? They look juicy!',
    rule_dialogue_3: "You're too small! Eat standard yellow dots to grow to size 18 first. But warning: as you grow, you get heavier and jump lower!",
    rule_dialogue_4: 'Oh no! Can I get stuck?',
    rule_dialogue_5: 'Yes! If you get too heavy to climb, click the "Reset Size" button or press "R" to deflate. It spits one of your collected stars back onto the field, but saves your run! Alternatively, eat Red Stars to shrink without any penalty!',
    rule_dialogue_6: 'And the glowing green stars?',
    rule_dialogue_7: "They give you massive speed and jump height for 10 seconds, but you'll slip and slide when landing! Don't slip off the platforms!",
    rule_dialogue_8: 'What happens if I fall?',
    rule_dialogue_9: 'Falling off the bottom of the screen or touching red hunters costs 1 life. But perfect runs (no damage) reward you with +2 lives instead of +1 at the portal!',
    rule_dialogue_10: "Sweet! Let's chomp!",
    rule_dialogue_11: 'And one last thing: do NOT cheat!',
    rule_dialogue_12: 'Uh... chomp? *whistles innocently*'
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
    reset_size_btn: 'Größe zurücksetzen (Stern spucken)',
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
    leaderboard_unavailable: 'Bestenliste nicht verfügbar.',
    open_rules_btn: 'Spielregeln',
    rules_title: 'Spielregeln & Mentor-Tipps',
    close_rules_btn: 'Lass uns spielen!',
    mentor_label: 'Mentor:',
    eater_label: 'Eater:',
    rule_dialogue_1: 'Hör zu, grünes Monster! Friss alle Punkte und erreiche das cyanfarbene Portal. Einfach, oder?',
    rule_dialogue_2: 'Mampf! Was ist mit den großen orangenen Sternen? Die sehen saftig aus!',
    rule_dialogue_3: 'Du bist zu klein! Friss zuerst normale gelbe Punkte, um auf Größe 18 zu wachsen. Aber Warnung: Je größer du wirst, desto schwerer wirst du und desto niedriger springst du!',
    rule_dialogue_4: 'Oh nein! Kann ich stecken bleiben?',
    rule_dialogue_5: 'Ja! Wenn du zu schwer zum Klettern wirst, klicke auf die Schaltfläche "Größe zurücksetzen" oder drücke "R", um Luft abzulassen. Es spuckt einen deiner gesammelten Sterne zurück auf das Feld, rettet aber deinen Lauf! Alternativ kannst du rote Sterne essen, um ohne Strafe zu schrumpfen!',
    rule_dialogue_6: 'Und die leuchtend grünen Sterne?',
    rule_dialogue_7: 'Sie verleihen dir 10 Sekunden lang enorme Geschwindigkeit und Sprunghöhe, aber bei der Landung wirst du rutschen und schlindern! Rutsche nicht von den Plattformen!',
    rule_dialogue_8: 'Was passiert, wenn ich herunterfalle?',
    rule_dialogue_9: 'Das Herunterfallen vom unteren Bildschirmrand oder das Berühren roter Jäger kostet 1 Leben. Aber fehlerfreie Läufe (ohne Schaden) belohnen dich am Portal mit +2 Leben anstelle von +1!',
    rule_dialogue_10: 'Süß! Lass uns mampfen!',
    rule_dialogue_11: 'Und eine letzte Sache: Betrüge NICHT!',
    rule_dialogue_12: 'Äh... mampf? *pfeift unschuldig*'
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
    reset_size_btn: 'Сбросить размер (Выплюнуть звезду)',
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
    leaderboard_unavailable: 'Таблица лидеров недоступна.',
    open_rules_btn: 'Правила игры',
    rules_title: 'Правила игры и советы ментора',
    close_rules_btn: 'Поехали!',
    mentor_label: 'Ментор:',
    eater_label: 'Едок:',
    rule_dialogue_1: 'Слушай сюда, зеленый монстр! Сьешь все точки и доберись до бирюзового портала. Просто, да?',
    rule_dialogue_2: 'Хрум! А как же большие оранжевые звезды? Выглядят сочно!',
    rule_dialogue_3: 'Ты слишком мал! Сначала ешь обычные желтые точки, чтобы вырасти до размера 18. Но предупреждаю: по мере роста ты становишься тяжелее и прыгаешь ниже!',
    rule_dialogue_4: 'О нет! Я могу застрять?',
    rule_dialogue_5: 'Да! Если ты станешь слишком тяжелым для подъема, нажми кнопку «Сбросить размер» или клавишу «R», чтобы сдуться. Это вернет одну из собранных звезд обратно на поле, но спасет твою попытку! Либо ешь красные звезды, чтобы уменьшаться без штрафов!',
    rule_dialogue_6: 'А светящиеся зеленые звезды?',
    rule_dialogue_7: 'Они дают огромную скорость и высоту прыжка на 10 секунд, но при приземлении ты будешь скользить! Смотри не соскользни с платформ!',
    rule_dialogue_8: 'Что будет, если я упаду?',
    rule_dialogue_9: 'Падение за нижний край экрана или касание красных охотников стоит 1 жизни. Но идеальные уровни (без потерь) вознаграждают тебя +2 жизнями вместо +1 на выходе!',
    rule_dialogue_10: 'Круто! Погнали хрустеть!',
    rule_dialogue_11: 'И последнее: НЕ читери!',
    rule_dialogue_12: 'Э-э... хрум? *невинно насвистывает*'
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

  playCheatSuccessSound() {
    this.playTone(880, 1320, 0.4, 'sine', 0.08);
  }

  playHeartPickupSound() {
    this.playTone(600, 1000, 0.15, 'sine', 0.09);
  }

  playEnemySpawnSound() {
    this.playTone(220, 60, 0.4, 'sawtooth', 0.1);
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
let levelStartLives = 3;
let level = 1;
let gameActive = false;
let scoreSubmitted = false;
let mouthAngle = 0.2;
let mouthClosing = false;
let cheatBuffer = [];
let cheatTextEndTime = 0;

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

// Enemies move slower overall, and slower still when the player is low on lives.
const BASE_ENEMY_SPEED_SCALE = 0.7;
function getEnemySpeedScale() {
  let livesScale = 1;
  if (lives <= 1) livesScale = 0.6;
  else if (lives <= 2) livesScale = 0.8;
  return BASE_ENEMY_SPEED_SCALE * livesScale;
}
const MIN_PLAYER_RADIUS = 10;
const INVINCIBILITY_FRAMES = 90;
const CHEAT_CODE = 'iddqd';

// A bigger eater jumps a bit weaker - heavier, less spring. Shared by the
// player's own jump and by the roaming enemy, which jumps only as high as
// the eater currently can.
function getPlayerJumpForce() {
  const sizeDiff = player.radius - 15;
  return Math.max(7.2, player.jumpForce - sizeDiff * 0.25);
}
const CHEAT_TIMEOUT_MS = 5000;

// Player configuration
const player = {
  x: 50,
  y: 300,
  vx: 0,
  vy: 0,
  radius: 15,
  speed: BASE_PLAYER_SPEED,
  jumpForce: BASE_JUMP_FORCE,
  grounded: false,
  facingLeft: false,
  speedBoostTimer: 0,
  invincibleTimer: 0,
  boostedJumpActive: false,
  spitAnimationTimer: 0
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
let heartBox = null;

// Rare bonus box: 10% chance per level. Grants a heart on touch, then
// blinks for a second before spawning a roaming enemy that hunts the
// player instead of patrolling a fixed range - a small risk/reward trade.
const HEART_BOX_SPAWN_CHANCE = 0.1;
const HEART_BOX_SIZE = 24;
const HEART_BOX_BLINK_MS = 1000;
const ROAM_ENEMY_WIDTH = 26;
const ROAM_ENEMY_HEIGHT = 22;
const ROAM_ENEMY_SPEED_FACTOR = 0.7;
const ROAM_ENEMY_JUMP_CHANCE = 0.01;

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
      { x: 380, y: 350, collected: false },
      { x: 650, y: 350, collected: false }
    ],
    enemies: [
      { x: 400, y: 205, width: 20, height: 15, vx: 1, range: 40, startX: 400 },
      { x: 200, y: 285, width: 20, height: 15, vx: 1.5, range: 40, startX: 200 }
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
      { x: 315, y: 205, width: 20, height: 15, vx: 1.2, range: 55, startX: 315 },
      { x: 515, y: 125, width: 20, height: 15, vx: 1.8, range: 55, startX: 515 },
      { x: 115, y: 285, width: 20, height: 15, vx: 1.5, range: 55, startX: 115 }
    ],
    portal: { x: 50, y: 240, width: 40, height: 60, active: false }
  },
  3: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 100, y: 300, width: 120, height: 15 },
      { x: 300, y: 220, width: 120, height: 15 },
      { x: 500, y: 140, width: 120, height: 15 },
      { x: 200, y: 135, width: 120, height: 15 }
    ],
    dots: [
      { x: 160, y: 270, collected: false },
      { x: 360, y: 190, collected: false },
      { x: 560, y: 110, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 260, y: 105, collected: false },
      { x: 300, y: 350, collected: false, red: true },
      { x: 50, y: 350, collected: false },
      { x: 650, y: 350, collected: false }
    ],
    enemies: [
      { x: 350, y: 205, width: 20, height: 15, vx: 1.5, range: 40, startX: 350 }
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
      { x: 740, y: 280, collected: false },
      { x: 150, y: 350, collected: false }
    ],
    enemies: [
      { x: 270, y: 225, width: 20, height: 15, vx: 1.6, range: 40, startX: 270 },
      { x: 610, y: 225, width: 20, height: 15, vx: -1.6, range: 40, startX: 610 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  },
  5: {
    platforms: [
      { x: 0, y: 380, width: 800, height: 20 },
      { x: 150, y: 300, width: 150, height: 15 },
      { x: 400, y: 300, width: 150, height: 15 },
      { x: 275, y: 210, width: 150, height: 15 },
      { x: 200, y: 120, width: 150, height: 15 }
    ],
    dots: [
      { x: 225, y: 270, collected: false },
      { x: 475, y: 270, collected: false },
      { x: 350, y: 180, collected: false },
      { x: 275, y: 90, collected: false, big: true, radius: BIG_DOT_RADIUS },
      { x: 400, y: 350, collected: false, red: true },
      { x: 50, y: 350, collected: false },
      { x: 650, y: 350, collected: false }
    ],
    enemies: [
      { x: 215, y: 285, width: 20, height: 15, vx: 1.4, range: 55, startX: 215 },
      { x: 465, y: 285, width: 20, height: 15, vx: -1.4, range: 55, startX: 465 }
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
      { x: 650, y: 350, collected: false, green: true },
      { x: 400, y: 350, collected: false }
    ],
    enemies: [
      { x: 250, y: 185, width: 20, height: 15, vx: 1.8, range: 40, startX: 250 },
      { x: 550, y: 185, width: 20, height: 15, vx: -1.8, range: 40, startX: 550 }
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
      { x: 150, y: 100, width: 300, height: 15 }
    ],
    dots: [
      { x: 150, y: 280, collected: false },
      { x: 300, y: 210, collected: false },
      { x: 450, y: 140, collected: false },
      { x: 600, y: 210, collected: false },
      { x: 750, y: 280, collected: false },
      { x: 300, y: 70, collected: false, big: true, radius: BIG_DOT_RADIUS }
    ],
    enemies: [
      { x: 300, y: 85, width: 20, height: 15, vx: 2, range: 125, startX: 300 }
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
      { x: 380, y: 135, width: 20, height: 15, vx: 1.2, range: 20, startX: 380 }
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
      { x: 395, y: 195, width: 20, height: 15, vx: 2.2, range: 175, startX: 395 },
      { x: 395, y: 105, width: 20, height: 15, vx: -1.8, range: 75, startX: 395 }
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
      { x: 240, y: 215, width: 20, height: 15, vx: 1.5, range: 30, startX: 240 },
      { x: 540, y: 215, width: 20, height: 15, vx: -1.5, range: 30, startX: 540 }
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
      { x: 395, y: 215, width: 20, height: 15, vx: 2.5, range: 275, startX: 395 },
      { x: 395, y: 135, width: 20, height: 15, vx: -2.0, range: 225, startX: 395 }
    ],
    portal: { x: 720, y: 320, width: 40, height: 60, active: false }
  }
};

const LEVEL_THEMES = {
  1: {
    skyStart: '#a5f3fc', skyEnd: '#e0f2fe',
    hillsBack: '#bbf7d0', hillsMid: '#86efac', hillsFore: '#4ade80',
    platformFill: '#1e1b4b', platformStroke: '#312e81'
  },
  2: {
    skyStart: '#0f172a', skyEnd: '#1e1b4b',
    hillsBack: '#1e293b', hillsMid: '#334155', hillsFore: '#475569',
    platformFill: '#020617', platformStroke: '#0f172a'
  },
  3: {
    skyStart: '#ecfdf5', skyEnd: '#d1fae5',
    hillsBack: '#15803d', hillsMid: '#166534', hillsFore: '#14532d',
    platformFill: '#451a03', platformStroke: '#7c2d12'
  },
  4: {
    skyStart: '#fef08a', skyEnd: '#fde047',
    hillsBack: '#eab308', hillsMid: '#ca8a04', hillsFore: '#a16207',
    platformFill: '#7c2d12', platformStroke: '#9a3412'
  },
  5: {
    skyStart: '#064e3b', skyEnd: '#022c22',
    hillsBack: '#047857', hillsMid: '#065f46', hillsFore: '#064e3b',
    platformFill: '#1f2937', platformStroke: '#374151'
  },
  6: {
    skyStart: '#311042', skyEnd: '#1e1b4b',
    hillsBack: '#581c87', hillsMid: '#701a75', hillsFore: '#86198f',
    platformFill: '#020617', platformStroke: '#3b0764'
  },
  7: {
    skyStart: '#ecfeff', skyEnd: '#cffafe',
    hillsBack: '#a5f3fc', hillsMid: '#67e8f9', hillsFore: '#22d3ee',
    platformFill: '#1e293b', platformStroke: '#334155'
  },
  8: {
    skyStart: '#450a0a', skyEnd: '#7f1d1d',
    hillsBack: '#991b1b', hillsMid: '#b91c1c', hillsFore: '#dc2626',
    platformFill: '#180202', platformStroke: '#3f0712'
  },
  9: {
    skyStart: '#fdf2f8', skyEnd: '#fce7f3',
    hillsBack: '#f472b6', hillsMid: '#ec4899', hillsFore: '#db2777',
    platformFill: '#5b21b6', platformStroke: '#7c3aed'
  },
  10: {
    skyStart: '#ffedd5', skyEnd: '#fed7aa',
    hillsBack: '#ea580c', hillsMid: '#c2410c', hillsFore: '#9a3412',
    platformFill: '#3f2305', platformStroke: '#543d2b'
  },
  11: {
    skyStart: '#030712', skyEnd: '#0b0f19',
    hillsBack: '#111827', hillsMid: '#1f2937', hillsFore: '#374151',
    platformFill: '#000000', platformStroke: '#111827'
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

function configureMobileControls() {
  const controls = [
    { element: document.getElementById('touch-left'), code: 'ArrowLeft' },
    { element: document.getElementById('touch-right'), code: 'ArrowRight' },
    { element: document.getElementById('touch-jump'), code: 'Space' }
  ];

  const setControlState = (control, isPressed) => {
    if (!control.element) return;
    keys[control.code] = isPressed;
    control.element.classList.toggle('active', isPressed);
  };

  controls.forEach((control) => {
    if (!control.element) return;

    control.element.addEventListener('touchstart', (event) => {
      event.preventDefault();
      setControlState(control, true);
    }, { passive: false });

    control.element.addEventListener('touchend', (event) => {
      event.preventDefault();
      setControlState(control, false);
    }, { passive: false });

    control.element.addEventListener('touchcancel', () => {
      setControlState(control, false);
    });

    control.element.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse') return;
      event.preventDefault();
      control.element.setPointerCapture(event.pointerId);
      setControlState(control, true);
    });

    control.element.addEventListener('pointerup', (event) => {
      if (event.pointerType === 'mouse') return;
      event.preventDefault();
      setControlState(control, false);
    });

    control.element.addEventListener('pointercancel', () => {
      setControlState(control, false);
    });
  });
}

// Setup input listeners
window.addEventListener('keydown', (e) => {
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
  if (e.key && e.key.length === 1 && !e.repeat) handleCheatInput(e.key);
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
configureMobileControls();

openRulesBtn.addEventListener('click', () => {
  rulesModal.classList.remove('hidden');
});

closeRulesBtn.addEventListener('click', () => {
  rulesModal.classList.add('hidden');
});

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

function spawnHeartBox() {
  const plat = platforms[Math.floor(Math.random() * platforms.length)];
  const maxOffset = Math.max(0, plat.width - HEART_BOX_SIZE);
  return {
    x: plat.x + Math.random() * maxOffset,
    y: plat.y - HEART_BOX_SIZE,
    width: HEART_BOX_SIZE,
    height: HEART_BOX_SIZE,
    collected: false,
    blinkEndTime: 0,
    enemySpawned: false
  };
}

function spawnRoamingEnemy(centerX, topY) {
  return {
    x: centerX - ROAM_ENEMY_WIDTH / 2,
    y: topY - ROAM_ENEMY_HEIGHT,
    width: ROAM_ENEMY_WIDTH,
    height: ROAM_ENEMY_HEIGHT,
    vx: 0,
    vy: 0,
    roaming: true,
    grounded: false
  };
}

function loadLevel(levelNum) {
  const lvlConfig = LEVELS[levelNum];
  levelStartLives = lives;
  platforms = lvlConfig.platforms.map(p => ({ ...p }));
  dots = lvlConfig.dots.map(d => ({ ...d }));
  enemies = lvlConfig.enemies.map(e => ({ ...e }));
  portal = { ...lvlConfig.portal };
  heartBox = Math.random() < HEART_BOX_SPAWN_CHANCE ? spawnHeartBox() : null;
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
  levelStartLives = 3;
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
  player.invincibleTimer = INVINCIBILITY_FRAMES;
  player.boostedJumpActive = false;
  player.grounded = false;
  player.spitAnimationTimer = 0;
  ensureLevelSolvable();
}

function updateHUD() {
  scoreVal.textContent = String(score).padStart(4, '0');
  const fullHearts = Math.max(0, Math.floor(lives));
  const hasHalfHeart = lives - fullHearts >= 0.5;
  livesVal.textContent = `${'❤'.repeat(fullHearts)}${hasHalfHeart ? '💔' : ''}`;
  setTranslatedText(levelVal, 'level_hud_value', { level, rank: getRankName(level) });
  resetSizeBtn.disabled = (player.radius <= 15);
}

function handleCheatInput(keyChar) {
  const now = Date.now();
  cheatBuffer = cheatBuffer.filter(input => now - input.time <= CHEAT_TIMEOUT_MS);
  cheatBuffer.push({ char: keyChar.toLowerCase(), time: now });

  const currentStr = cheatBuffer.map(input => input.char).join('');

  if (currentStr.endsWith(CHEAT_CODE)) {
    lives = Math.min(5, lives + 3);
    cheatTextEndTime = Date.now() + 5000;
    soundEffects.playCheatSuccessSound();
    cheatBuffer = [];
    updateHUD();
    return;
  }

  // Debug level select cheat: iddwd<char>
  const debugPrefix = 'iddwd';
  if (currentStr.length >= debugPrefix.length + 1) {
    const lastPart = currentStr.slice(-(debugPrefix.length + 1));
    if (lastPart.startsWith(debugPrefix)) {
      const suffix = lastPart.charAt(debugPrefix.length);
      let targetLevel = -1;
      if (suffix >= '1' && suffix <= '9') {
        targetLevel = parseInt(suffix, 10);
      } else if (suffix === '0') {
        targetLevel = 10;
      } else if (suffix === 'a' || suffix === 'b' || suffix === 'e') {
        targetLevel = 11;
      }

      if (targetLevel !== -1 && LEVELS[targetLevel]) {
        level = targetLevel;
        loadLevel(level);
        soundEffects.playCheatSuccessSound();
        cheatBuffer = [];
      }
    }
  }
}

function triggerSizeReset() {
  if (!gameActive) return;
  if (player.radius <= 15) return; // Cannot deflate below baseline

  // Trigger spit animation
  player.spitAnimationTimer = 20;

  // Deflate by one star's worth
  player.radius = Math.max(15, player.radius / 1.05);
  score = Math.max(0, score - 100);
  
  // Spit out a yellow star
  const angle = Math.PI * (1.2 + Math.random() * 0.6); // Random upward parabola
  const speed = 6 + Math.random() * 4;
  dots.push({
    x: player.x,
    y: player.y - player.radius, // start at top mouth position
    collected: false,
    vx: speed * Math.cos(angle),
    vy: speed * Math.sin(angle),
    isSpitMoving: true
  });

  // Play blurp sound
  soundEffects.playSizeResetSound();

  ensureLevelSolvable();
  updateHUD();
}

function getRankName(levelNum) {
  return t(`rank_${levelNum}`);
}

function getDotRadius(dot) {
  return dot.radius ?? (dot.big ? BIG_DOT_RADIUS : SMALL_DOT_RADIUS);
}

// resetPlayer()'s starting radius - the fixed 0% point of every Big Star's
// gauge, so the bar always reads empty at the size a player actually starts
// at and full exactly at the size a Big Star requires.
const BIG_DOT_BASE_RADIUS = 15;

// How far across the [start size, star size] range the eater's current size
// sits, 0 to 1. Trivial and linear: star size sets the scale, the gap
// between current and star size is what's left to grow. Reads player.radius
// live, so it's automatically correct after growing, shrinking, or a
// death-respawn reset - no dot-counting involved.
function getBigDotProgress() {
  const scale = BIG_DOT_MIN_PLAYER_RADIUS - BIG_DOT_BASE_RADIUS;
  const remaining = BIG_DOT_MIN_PLAYER_RADIUS - player.radius;
  return Math.max(0, Math.min(1, 1 - remaining / scale));
}

const UNREACHABLE_DOT_COLOR = '#b0b8bf';

function getDotColor(dot, reachable = true) {
  if (dot.red) return '#e74c3c';
  if (!reachable) return UNREACHABLE_DOT_COLOR;
  if (dot.green) return '#2ecc71';
  return dot.big ? '#f39c12' : '#f3ca20';
}

// --- Reachability ---------------------------------------------------------
// A star is "unreachable" (drawn silver) if no chain of platform-to-platform
// jumps from the player's current position and size gets there. Everything
// here is recomputed fresh from live player.x/y/radius each frame, so it
// tracks growing, shrinking, dying, and moving around automatically.
const REACH_JUMP_FORCE = BASE_JUMP_FORCE;
const REACH_SPEED = BASE_PLAYER_SPEED;
const REACH_FULL_MAX_RISE = (REACH_JUMP_FORCE * REACH_JUMP_FORCE) / (2 * GRAVITY);

// Frames to rise/fall a vertical distance dy (positive = downward) when
// launched upward at REACH_JUMP_FORCE under GRAVITY. Null if dy is an
// upward distance beyond how high a jump can ever rise.
function reachJumpTime(dy) {
  const disc = REACH_JUMP_FORCE * REACH_JUMP_FORCE + 2 * GRAVITY * dy;
  if (disc < 0) return null;
  return (REACH_JUMP_FORCE + Math.sqrt(disc)) / GRAVITY;
}

// A bigger eater can't gain as much altitude from a jump: reach shrinks in
// proportion to how far the current radius has grown past the starting
// size, so growth alone - not just low ceilings - can put a jump out of
// reach.
function effectiveMaxRise(radius) {
  return REACH_FULL_MAX_RISE * Math.min(1, BIG_DOT_BASE_RADIUS / radius);
}

// Whether the player's head clears every platform along the way from
// (x0,y0) to (x1,y1) - bigger radius means less headroom, which is how
// size alone can make an otherwise in-range jump unreachable. excludePlat
// is the destination platform itself, if any: landing on it isn't "hitting
// a ceiling".
function jumpPathClear(x0, y0, x1, y1, radius, excludePlat) {
  const headTop0 = y0 - radius;
  const headTopTarget = y1 - radius;
  if (headTopTarget >= headTop0) return true;
  const minX = Math.min(x0, x1) - radius;
  const maxX = Math.max(x0, x1) + radius;
  for (const plat of platforms) {
    if (plat === excludePlat) continue;
    if (plat.x >= maxX || plat.x + plat.width <= minX) continue;
    const bottom = plat.y + plat.height;
    if (bottom > headTopTarget && bottom <= headTop0) return false;
  }
  return true;
}

function canReachPoint(x0, y0, x1, y1, radius, excludePlat) {
  const dy = y1 - y0;
  if (dy < 0 && -dy > effectiveMaxRise(radius)) return false;
  const t = reachJumpTime(dy);
  if (t === null) return false;
  if (Math.abs(x1 - x0) > REACH_SPEED * t) return false;
  return jumpPathClear(x0, y0, x1, y1, radius, excludePlat);
}

// A few candidate takeoff spots along a platform: both edges, plus the
// point closest to the target (walking there first is free).
function takeoffCandidates(plat, targetX) {
  const left = plat.x;
  const right = plat.x + plat.width;
  const near = Math.max(left, Math.min(right, targetX));
  return [...new Set([left, right, near])];
}

function canReachPointFromPlatform(plat, radius, targetX, targetY) {
  const y0 = plat.y - radius;
  for (const x0 of takeoffCandidates(plat, targetX)) {
    if (canReachPoint(x0, y0, targetX, targetY, radius)) return true;
  }
  return false;
}

function canReachPlatformFromPlatform(plat, radius, toPlat) {
  const y0 = plat.y - radius;
  const toXMin = toPlat.x;
  const toXMax = toPlat.x + toPlat.width;
  const toY = toPlat.y - radius;
  for (const x0 of takeoffCandidates(plat, (toXMin + toXMax) / 2)) {
    const x1 = Math.max(toXMin, Math.min(toXMax, x0));
    if (canReachPoint(x0, y0, x1, toY, radius, toPlat)) return true;
  }
  return false;
}

// BFS over platforms, starting from the player's live position, following
// edges that a single jump (at the player's current size) can cross.
function computeReachablePlatforms() {
  const radius = player.radius;
  const reachable = new Set();
  const queue = [];

  for (let i = 0; i < platforms.length; i++) {
    const plat = platforms[i];
    const landX = Math.max(plat.x, Math.min(plat.x + plat.width, player.x));
    if (canReachPoint(player.x, player.y, landX, plat.y - radius, radius, plat)) {
      reachable.add(i);
      queue.push(i);
    }
  }
  while (queue.length) {
    const plat = platforms[queue.pop()];
    for (let j = 0; j < platforms.length; j++) {
      if (reachable.has(j)) continue;
      if (canReachPlatformFromPlatform(plat, radius, platforms[j])) {
        reachable.add(j);
        queue.push(j);
      }
    }
  }
  return reachable;
}

function isPointReachable(x, y, reachablePlatforms) {
  const radius = player.radius;
  if (canReachPoint(player.x, player.y, x, y, radius)) return true;
  for (const i of reachablePlatforms) {
    if (canReachPointFromPlatform(platforms[i], radius, x, y)) return true;
  }
  return false;
}

function isStandardDot(dot) {
  return !dot.big && !dot.red && !dot.green;
}

function shuffleDots(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
}

function ensureLevelSolvable() {
  const hasUncollectedBig = dots.some(dot => !dot.collected && dot.big);
  if (!hasUncollectedBig || player.radius >= BIG_DOT_MIN_PLAYER_RADIUS) return;

  const uncollectedStandardCount = dots.filter(dot => !dot.collected && isStandardDot(dot)).length;
  const maxPossibleRadius = player.radius * Math.pow(1.05, uncollectedStandardCount);
  if (maxPossibleRadius >= BIG_DOT_MIN_PLAYER_RADIUS) return;

  const targetCount = Math.ceil(Math.log(BIG_DOT_MIN_PLAYER_RADIUS / player.radius) / Math.log(1.05));
  const restoreNeeded = targetCount - uncollectedStandardCount;
  const collectedStandard = dots.filter(dot => dot.collected && isStandardDot(dot));
  shuffleDots(collectedStandard);

  for (const dot of collectedStandard.slice(0, restoreNeeded)) {
    dot.collected = false;
  }
}

function collectDot(dot) {
  dot.collected = true;

  if (dot.red) {
    player.radius = Math.max(MIN_PLAYER_RADIUS, player.radius / 1.05);
  } else if (dot.green) {
    player.speedBoostTimer = BOOST_DURATION_FRAMES;
    player.speed = BOOSTED_PLAYER_SPEED;
    player.jumpForce = BOOSTED_JUMP_FORCE;
  } else {
    player.radius *= 1.05;
  }

  score += 100;
  soundEffects.playEatSound();
  updateHUD();
}

// Chases the player horizontally instead of patrolling a fixed range, and
// falls/lands on platforms under gravity like the player does, with an
// occasional low jump to cross gaps or reach a platform above it. Always
// 30% slower than the eater's own current speed (base or boosted).
function updateRoamingEnemy(enemy, speedScale) {
  const huntSpeed = player.speed * ROAM_ENEMY_SPEED_FACTOR;
  const dir = player.x > enemy.x + enemy.width / 2 ? 1 : -1;
  enemy.vx = dir * huntSpeed * speedScale;
  enemy.x += enemy.vx;
  if (enemy.x < 0) enemy.x = 0;
  if (enemy.x + enemy.width > canvas.width) enemy.x = canvas.width - enemy.width;

  // Pecking beak animation, independent of movement.
  enemy.beakAngle = enemy.beakAngle ?? 0;
  enemy.beakOpening = enemy.beakOpening ?? true;
  if (enemy.beakOpening) {
    enemy.beakAngle += 0.06;
    if (enemy.beakAngle >= 1) enemy.beakOpening = false;
  } else {
    enemy.beakAngle -= 0.06;
    if (enemy.beakAngle <= 0) enemy.beakOpening = true;
  }

  enemy.vy += GRAVITY;
  const prevBottom = enemy.y + enemy.height;
  enemy.y += enemy.vy;
  enemy.grounded = false;

  const bottom = enemy.y + enemy.height;
  if (enemy.vy >= 0) {
    for (const plat of platforms) {
      if (enemy.x + enemy.width > plat.x && enemy.x < plat.x + plat.width &&
          prevBottom <= plat.y && bottom >= plat.y) {
        enemy.y = plat.y - enemy.height;
        enemy.vy = 0;
        enemy.grounded = true;
        break;
      }
    }
  }

  if (enemy.y + enemy.height > canvas.height) {
    enemy.y = canvas.height - enemy.height;
    enemy.vy = 0;
    enemy.grounded = true;
  }

  if (enemy.grounded && Math.random() < ROAM_ENEMY_JUMP_CHANCE) {
    enemy.vy = -getPlayerJumpForce();
    enemy.grounded = false;
  }
}

// Collisions with platforms
function checkPlatformCollisions(prevX, prevY) {
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

      // Use last frame's position (before this frame's movement) to tell which
      // side the player approached from. Comparing overlap depth instead is
      // ambiguous near platform edges and can snap the player to the far side.
      // Growth tolerance accounts for the player's radius growing (eating a
      // dot) between the frame that set prevY and this one - without it, the
      // margin that used to clear plat.y no longer does, and a player
      // standing still gets misclassified as a horizontal hit and kicked
      // sideways off the platform.
      const growthTolerance = player.radius * 0.1;
      const wasAbove = prevY + player.radius <= plat.y + growthTolerance;
      const wasBelow = prevY - player.radius >= plat.y + plat.height - growthTolerance;

      if (wasAbove && player.vy >= 0) {
        // Landing on top of platform
        player.y = plat.y - player.radius;
        player.vy = 0;
        player.grounded = true;
      } else if (wasBelow && player.vy < 0) {
        // Hitting bottom of platform
        player.y = plat.y + plat.height + player.radius;
        player.vy = 0;
      } else if (player.vx > 0) {
        player.x = plat.x - player.radius;
        player.vx = 0;
      } else if (player.vx < 0) {
        player.x = plat.x + plat.width + player.radius;
        player.vx = 0;
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
  if (player.invincibleTimer > 0) {
    player.invincibleTimer--;
  }
  if (player.spitAnimationTimer > 0) {
    player.spitAnimationTimer--;
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
    player.vy = -getPlayerJumpForce();
    player.grounded = false;
    player.boostedJumpActive = player.speedBoostTimer > 0;
    soundEffects.playJumpSound();
  }

  // Apply Gravity
  player.vy += GRAVITY;

  // Apply velocities
  const prevX = player.x;
  const prevY = player.y;
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

  if (player.y - player.radius > canvas.height) {
    lives--;
    soundEffects.playDieSound();
    updateHUD();
    if (lives <= 0) {
      gameOver();
    } else {
      resetPlayer();
    }
    return;
  }

  // Platform collision resolution
  checkPlatformCollisions(prevX, prevY);
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

  // Update spit-moving dots
  for (const dot of dots) {
    if (dot.isSpitMoving) {
      dot.vy += GRAVITY;
      const prevDotY = dot.y;
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Screen boundaries check
      const dotRadius = getDotRadius(dot);
      if (dot.x - dotRadius < 0) {
        dot.x = dotRadius;
        dot.vx = -dot.vx * 0.5;
      } else if (dot.x + dotRadius > canvas.width) {
        dot.x = canvas.width - dotRadius;
        dot.vx = -dot.vx * 0.5;
      }

      // Check collision with enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (dot.x + dotRadius > enemy.x &&
            dot.x - dotRadius < enemy.x + enemy.width &&
            dot.y + dotRadius > enemy.y &&
            dot.y - dotRadius < enemy.y + enemy.height) {
          // Destroy enemy
          enemies.splice(i, 1);
          soundEffects.playTone(400, 100, 0.2, 'sawtooth', 0.08);
        }
      }

      // Ground check (if it falls to the bottom of the screen)
      if (dot.y + dotRadius >= canvas.height - 10) {
        dot.y = canvas.height - 10 - dotRadius;
        dot.vx = 0;
        dot.vy = 0;
        dot.isSpitMoving = false;
      } else if (dot.vy >= 0) {
        // Platform landing check when moving down
        for (const plat of platforms) {
          if (dot.x >= plat.x && dot.x <= plat.x + plat.width) {
            const prevBottom = prevDotY + dotRadius;
            const currBottom = dot.y + dotRadius;
            if (prevBottom <= plat.y && currBottom >= plat.y) {
              dot.y = plat.y - dotRadius;
              dot.vx = 0;
              dot.vy = 0;
              dot.isSpitMoving = false;
              break;
            }
          }
        }
      }
    }
  }

  // Collectibles check
  let allCollected = true;
  for (const dot of dots) {
    if (!dot.collected) {
      if (dot.isSpitMoving) {
        allCollected = false;
        continue;
      }
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

  // Heart box: grants a heart on touch, then blinks for a second before
  // spawning a roaming enemy where it stood.
  if (heartBox) {
    if (!heartBox.collected) {
      const dx = player.x - (heartBox.x + heartBox.width / 2);
      const dy = player.y - (heartBox.y + heartBox.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < player.radius + heartBox.width / 2) {
        heartBox.collected = true;
        heartBox.blinkEndTime = Date.now() + HEART_BOX_BLINK_MS;
        lives = Math.min(5, lives + 1);
        soundEffects.playHeartPickupSound();
        updateHUD();
      }
    } else if (!heartBox.enemySpawned && Date.now() >= heartBox.blinkEndTime) {
      heartBox.enemySpawned = true;
      enemies.push(spawnRoamingEnemy(heartBox.x + heartBox.width / 2, heartBox.y + heartBox.height));
      soundEffects.playEnemySpawnSound();
      heartBox = null;
    }
  }

  // Enemies update & check collision
  const enemySpeedScale = getEnemySpeedScale();
  for (const enemy of enemies) {
    if (enemy.roaming) {
      updateRoamingEnemy(enemy, enemySpeedScale);
    } else {
      enemy.x += enemy.vx * enemySpeedScale;
      if (Math.abs(enemy.x - enemy.startX) > enemy.range) {
        enemy.vx = -enemy.vx;
      }
    }

    if (player.invincibleTimer > 0) continue;

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
  const perfectRun = lives >= levelStartLives;
  const reward = perfectRun ? 2 : 1;
  lives = Math.min(5, lives + reward);
  updateHUD();
  setTranslatedText(overlay.querySelector('h2'), 'level_complete');
  setTranslatedText(overlay.querySelector('p'), 'level_complete_message', {
    level,
    rank: getRankName(level)
  });
  setTranslatedText(overlay.querySelector('button'), 'start_level', { level });
  overlay.classList.remove('hidden');
}

// Rendering
function drawTree(x, y, scale = 1, theme = LEVEL_THEMES[1]) {
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

  ctx.fillStyle = theme.hillsFore;
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

  ctx.fillStyle = theme.hillsMid;
  ctx.beginPath();
  ctx.arc(-9, -17, 8, 0, Math.PI * 2);
  ctx.arc(18, 2, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawComicBackground(theme) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGrad.addColorStop(0, theme.skyStart);
  skyGrad.addColorStop(1, theme.skyEnd);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff4a8';
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(70, 65, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.hillsBack;
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

  ctx.fillStyle = theme.hillsMid;
  ctx.beginPath();
  ctx.moveTo(-20, 355);
  ctx.quadraticCurveTo(180, 312, 372, 352);
  ctx.quadraticCurveTo(575, 392, 840, 334);
  ctx.lineTo(840, canvas.height);
  ctx.lineTo(-20, canvas.height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  drawTree(118, 260, 0.9, theme);
  drawTree(690, 235, 1.05, theme);
  drawTree(525, 292, 0.7, theme);

  ctx.strokeStyle = theme.hillsFore;
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
  const theme = LEVEL_THEMES[level] || LEVEL_THEMES[1];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawComicBackground(theme);

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
  ctx.fillStyle = theme.platformFill;
  ctx.strokeStyle = theme.platformStroke;
  ctx.lineWidth = 2;
  for (const plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
    // Draw top highlights
    ctx.fillStyle = theme.platformStroke;
    ctx.fillRect(plat.x, plat.y, plat.width, 2);
    ctx.fillStyle = theme.platformFill;
  }

  // Draw Heart Box - blinks for a second after being touched, right before
  // the roaming enemy it warns about spawns.
  if (heartBox) {
    const visible = !heartBox.collected || Math.floor(Date.now() / 120) % 2 === 0;
    if (visible) {
      ctx.fillStyle = '#5c3a21';
      ctx.strokeStyle = '#2e1c10';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(heartBox.x, heartBox.y, heartBox.width, heartBox.height, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ff4d6d';
      ctx.font = 'bold 16px "Arial", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤', heartBox.x + heartBox.width / 2, heartBox.y + heartBox.height / 2 + 1);
    }
  }

  // Draw Dots
  const reachablePlatforms = computeReachablePlatforms();
  for (const dot of dots) {
    if (!dot.collected) {
      const isBig = !!dot.big;
      const isGreen = !!dot.green;
      const dotRadius = getDotRadius(dot);
      const reachable = dot.red || isPointReachable(dot.x, dot.y, reachablePlatforms);
      const dotColor = getDotColor(dot, reachable);
      ctx.fillStyle = dotColor;
      ctx.shadowBlur = isBig ? 14 : (isGreen ? 12 : 8);
      ctx.shadowColor = dotColor;
      if (isBig || isGreen) {
        const pulse = 0.5 + Math.sin(performance.now() / 180) * 0.25;
        ctx.strokeStyle = !reachable
          ? `rgba(176, 184, 191, ${pulse})`
          : (isGreen ? `rgba(46, 204, 113, ${pulse})` : `rgba(243, 156, 18, ${pulse})`);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      if (isBig) {
        // Tight progress gauge hugging the star: a plain linear fill from
        // the eater's starting size (empty) to this star's required size
        // (full). No dot-counting, no steps - just current size against
        // the same two numbers every time, so it's always legible.
        const gaugeRadius = dotRadius + 8;
        const progress = getBigDotProgress();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, gaugeRadius, 0, Math.PI * 2);
        ctx.stroke();
        if (progress > 0) {
          ctx.strokeStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, gaugeRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
          ctx.stroke();
        }
      }
    }
  }

  // Draw Enemies
  for (const enemy of enemies) {
    if (enemy.roaming) {
      ctx.fillStyle = '#6a0dad';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#6a0dad';
      ctx.beginPath();
      ctx.roundRect(enemy.x, enemy.y, enemy.width, enemy.height, 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      const facingRight = enemy.vx >= 0;
      const dir = facingRight ? 1 : -1;
      const cx = enemy.x + enemy.width / 2;
      const cy = enemy.y + enemy.height / 2;
      const eyeX = cx + dir * enemy.width * 0.2;
      const eyeY = enemy.y + enemy.height * 0.3;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(eyeX + dir, eyeY, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Pecking beak, opens/closes independent of movement
      const beakX = facingRight ? enemy.x + enemy.width : enemy.x;
      const beakLen = 9;
      const beakGap = 2 + enemy.beakAngle * 6;
      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.moveTo(beakX, cy - beakGap);
      ctx.lineTo(beakX + dir * beakLen, cy);
      ctx.lineTo(beakX, cy);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(beakX, cy + beakGap);
      ctx.lineTo(beakX + dir * beakLen, cy);
      ctx.lineTo(beakX, cy);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = '#ff007f';
      ctx.shadowBlur = 0;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Laugh if cheat code is active
    if (Date.now() < cheatTextEndTime) {
      ctx.save();
      const bx = enemy.x + enemy.width / 2;
      const by = enemy.y - 20;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.roundRect(bx - 20, by - 10, 40, 16, 5);
      ctx.fill();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(bx - 4, by + 6);
      ctx.lineTo(bx, by + 11);
      ctx.lineTo(bx + 4, by + 6);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      
      ctx.font = 'bold 10px "Arial", sans-serif';
      ctx.fillStyle = '#ff007f';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('HAHA!', bx, by - 2);
      ctx.restore();
    }
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

  ctx.save();
  if (player.invincibleTimer > 0) {
    ctx.globalAlpha = 0.4 + 0.3 * Math.sin(performance.now() / 60);
  }

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

  const isSpitting = player.spitAnimationTimer > 0;
  if (isSpitting) {
    // Outer green body path (Spit pose looking up)
    const mouthWidth = 14 * scale;
    const mouthDepth = 12 * scale;
    ctx.fillStyle = '#3da842';
    ctx.beginPath();
    ctx.moveTo(bodyLeft, bodyTop);
    ctx.lineTo(player.x - mouthWidth / 2, bodyTop);
    ctx.lineTo(player.x - mouthWidth / 2, bodyTop + mouthDepth);
    ctx.lineTo(player.x + mouthWidth / 2, bodyTop + mouthDepth);
    ctx.lineTo(player.x + mouthWidth / 2, bodyTop);
    ctx.lineTo(bodyRight, bodyTop);
    ctx.lineTo(bodyRight, bodyBottom);
    ctx.lineTo(bodyLeft, bodyBottom);
    ctx.closePath();
    ctx.fill();

    // Draw Tongue (Spit pose)
    ctx.fillStyle = '#ff3366';
    ctx.beginPath();
    ctx.arc(player.x, bodyTop + mouthDepth, 4 * scale, Math.PI, 0);
    ctx.fill();

    // Draw Teeth (Spit pose)
    ctx.fillStyle = '#f3ca20';
    ctx.beginPath();
    ctx.moveTo(player.x - 5 * scale, bodyTop + mouthDepth);
    ctx.lineTo(player.x - 3 * scale, bodyTop + mouthDepth - 3 * scale);
    ctx.lineTo(player.x - 1 * scale, bodyTop + mouthDepth);
    ctx.moveTo(player.x + 1 * scale, bodyTop + mouthDepth);
    ctx.lineTo(player.x + 3 * scale, bodyTop + mouthDepth - 3 * scale);
    ctx.lineTo(player.x + 5 * scale, bodyTop + mouthDepth);
    ctx.fill();

    // Draw Eye (looking up)
    const eyeX = player.facingLeft ? (player.x + 7 * scale) : (player.x - 7 * scale);
    const eyeY = player.y - 3 * scale;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 4.5 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY - 2.5 * scale, 1.5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Draw Cap (tilted to the left)
    ctx.fillStyle = '#ff3333';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.arc(player.x - 9 * scale, player.y - 10 * scale, 5 * scale, Math.PI * 0.8, Math.PI * 1.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
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
  }

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
  ctx.restore();

  if (Date.now() < cheatTextEndTime) {
    ctx.save();
    ctx.font = '80px "Bangers", "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#ff3333';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeText('VITALYMANAT', canvas.width / 2, canvas.height / 2);
    ctx.fillText('VITALYMANAT', canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }
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
