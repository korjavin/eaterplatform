const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('game-overlay');
const scoreVal = document.getElementById('score-val');
const livesVal = document.getElementById('lives-val');
const levelVal = document.getElementById('level-val');

// Game state
let score = 0;
let lives = 3;
let level = 1;
let gameActive = false;
let mouthAngle = 0.2;
let mouthClosing = false;

// Physics configuration
const GRAVITY = 0.5;
const FRICTION = 0.85;

// Player configuration
const player = {
  x: 50,
  y: 300,
  radius: 15,
  vx: 0,
  vy: 0,
  speed: 4,
  jumpForce: 10,
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
      { x: 610, y: 120, collected: false },
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
      { x: 520, y: 110, collected: false },
      { x: 700, y: 190, collected: false },
      { x: 200, y: 350, collected: false },
      { x: 600, y: 350, collected: false }
    ],
    enemies: [
      { x: 250, y: 205, width: 20, height: 15, vx: 1.2, range: 120, startX: 250 },
      { x: 450, y: 125, width: 20, height: 15, vx: 1.8, range: 120, startX: 450 },
      { x: 50, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 50 }
    ],
    portal: { x: 50, y: 240, width: 40, height: 60, active: false }
  }
};

// Setup input listeners
window.addEventListener('keydown', (e) => {
  if (e.code in keys) keys[e.code] = true;
  if (['ArrowUp', 'Space', 'KeyW'].includes(e.code) && gameActive) {
    e.preventDefault(); // Prevent page scroll
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code in keys) keys[e.code] = false;
});

startBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  if (lives <= 0 || (level === 1 && !gameActive)) {
    resetGame();
  } else {
    loadLevel(level);
  }
  if (!gameActive) {
    gameActive = true;
    gameLoop();
  }
});

function loadLevel(levelNum) {
  const lvlConfig = LEVELS[levelNum];
  platforms = lvlConfig.platforms.map(p => ({ ...p }));
  dots = lvlConfig.dots.map(d => ({ ...d }));
  enemies = lvlConfig.enemies.map(e => ({ ...e }));
  portal = { ...lvlConfig.portal };
  resetPlayer();
  updateHUD();
}

function gameVictory() {
  gameActive = false;
  overlay.querySelector('h2').textContent = 'Victory!';
  overlay.querySelector('p').textContent = `Congratulations! You beat all levels with a score of ${score}!`;
  overlay.querySelector('button').textContent = 'Play Again';
  overlay.classList.remove('hidden');
  level = 1;
}

function resetGame() {
  score = 0;
  lives = 3;
  level = 1;
  loadLevel(level);
}

function resetPlayer() {
  player.x = 50;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;
  player.grounded = false;
}

function updateHUD() {
  scoreVal.textContent = String(score).padStart(4, '0');
  livesVal.textContent = '❤'.repeat(lives);
  levelVal.textContent = level;
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
    player.vx *= FRICTION;
  }

  // Jumping
  if ((keys.ArrowUp || keys.KeyW || keys.Space) && player.grounded) {
    player.vy = -player.jumpForce;
    player.grounded = false;
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
      if (distance < player.radius + 6) {
        dot.collected = true;
        score += 100;
        updateHUD();
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
      updateHUD();
      if (lives <= 0) {
        gameOver();
      } else {
        resetPlayer();
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
  overlay.querySelector('h2').textContent = 'Game Over';
  overlay.querySelector('p').textContent = `You scored ${score} points. Try again!`;
  overlay.querySelector('button').textContent = 'Try Again';
  overlay.classList.remove('hidden');
}

function levelComplete() {
  gameActive = false;
  level++;
  const nextLvlConfig = LEVELS[level];
  if (!nextLvlConfig) {
    level--;
    gameVictory();
    return;
  }
  overlay.querySelector('h2').textContent = 'Level Complete!';
  overlay.querySelector('p').textContent = `Proceeding to Level ${level}. Great job!`;
  overlay.querySelector('button').textContent = `Start Level ${level}`;
  overlay.classList.remove('hidden');
}

// Rendering
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Background Grid
  ctx.strokeStyle = '#12161f';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

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
      ctx.fillStyle = '#f3ca20';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#f3ca20';
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 6, 0, Math.PI * 2);
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
  const mouthHeight = 12 * (mouthAngle / 0.25);
  const mouthCenterY = player.y - 3;
  const upperCeilingY = mouthCenterY - mouthHeight / 2;
  const lowerFloorY = mouthCenterY + mouthHeight / 2;

  // Outer green body path with cutout mouth gap
  ctx.fillStyle = '#3da842';
  ctx.beginPath();
  if (!player.facingLeft) {
    // Facing Right
    ctx.moveTo(player.x - 15, player.y - 15); // Top-left
    ctx.lineTo(player.x + 15, player.y - 15); // Top-right
    ctx.lineTo(player.x + 15, upperCeilingY);  // Down to mouth top
    ctx.lineTo(player.x - 2, upperCeilingY);   // In to mouth back
    ctx.lineTo(player.x - 2, lowerFloorY);     // Down to mouth bottom
    ctx.lineTo(player.x + 15, lowerFloorY);    // Out to mouth bottom
    ctx.lineTo(player.x + 15, player.y + 9);   // Down to bottom-right
    ctx.lineTo(player.x - 15, player.y + 9);   // Left to bottom-left
  } else {
    // Facing Left
    ctx.moveTo(player.x + 15, player.y - 15); // Top-right
    ctx.lineTo(player.x - 15, player.y - 15); // Top-left
    ctx.lineTo(player.x - 15, upperCeilingY);  // Down to mouth top
    ctx.lineTo(player.x + 2, upperCeilingY);   // In to mouth back
    ctx.lineTo(player.x + 2, lowerFloorY);     // Down to mouth bottom
    ctx.lineTo(player.x - 15, lowerFloorY);    // Out to mouth bottom
    ctx.lineTo(player.x - 15, player.y + 9);   // Down to bottom-left
    ctx.lineTo(player.x + 15, player.y + 9);   // Right to bottom-right
  }
  ctx.closePath();
  ctx.fill();

  // Draw Tongue (red shape at back wall)
  ctx.fillStyle = '#ff3366';
  ctx.beginPath();
  const tongueHeight = Math.min(6, mouthHeight * 0.6);
  if (!player.facingLeft) {
    ctx.moveTo(player.x - 2, mouthCenterY - tongueHeight / 2);
    ctx.quadraticCurveTo(player.x + 3, mouthCenterY, player.x - 2, mouthCenterY + tongueHeight / 2);
  } else {
    ctx.moveTo(player.x + 2, mouthCenterY - tongueHeight / 2);
    ctx.quadraticCurveTo(player.x - 3, mouthCenterY, player.x + 2, mouthCenterY + tongueHeight / 2);
  }
  ctx.fill();

  // Draw Teeth (yellow small triangular teeth inside the mouth gap)
  const toothHeight = Math.min(3, mouthHeight / 2);
  ctx.fillStyle = '#f3ca20';
  if (!player.facingLeft) {
    // Upper teeth pointing down
    ctx.beginPath();
    ctx.moveTo(player.x + 2, upperCeilingY);
    ctx.lineTo(player.x + 4.5, upperCeilingY + toothHeight);
    ctx.lineTo(player.x + 7, upperCeilingY);
    ctx.moveTo(player.x + 9, upperCeilingY);
    ctx.lineTo(player.x + 11.5, upperCeilingY + toothHeight);
    ctx.lineTo(player.x + 14, upperCeilingY);
    ctx.fill();

    // Lower teeth pointing up
    ctx.beginPath();
    ctx.moveTo(player.x + 2, lowerFloorY);
    ctx.lineTo(player.x + 4.5, lowerFloorY - toothHeight);
    ctx.lineTo(player.x + 7, lowerFloorY);
    ctx.moveTo(player.x + 9, lowerFloorY);
    ctx.lineTo(player.x + 11.5, lowerFloorY - toothHeight);
    ctx.lineTo(player.x + 14, lowerFloorY);
    ctx.fill();
  } else {
    // Upper teeth pointing down
    ctx.beginPath();
    ctx.moveTo(player.x - 7, upperCeilingY);
    ctx.lineTo(player.x - 4.5, upperCeilingY + toothHeight);
    ctx.lineTo(player.x - 2, upperCeilingY);
    ctx.moveTo(player.x - 14, upperCeilingY);
    ctx.lineTo(player.x - 11.5, upperCeilingY + toothHeight);
    ctx.lineTo(player.x - 9, upperCeilingY);
    ctx.fill();

    // Lower teeth pointing up
    ctx.beginPath();
    ctx.moveTo(player.x - 7, lowerFloorY);
    ctx.lineTo(player.x - 4.5, lowerFloorY - toothHeight);
    ctx.lineTo(player.x - 2, lowerFloorY);
    ctx.moveTo(player.x - 14, lowerFloorY);
    ctx.lineTo(player.x - 11.5, lowerFloorY - toothHeight);
    ctx.lineTo(player.x - 9, lowerFloorY);
    ctx.fill();
  }

  // Draw Eye (white circle + black pupil)
  const eyeX = player.facingLeft ? (player.x + 7) : (player.x - 7);
  const eyeY = player.y - 7;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Draw Cap (red dome on top of the head)
  ctx.fillStyle = '#ff3333';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(player.x, player.y - 15, 5, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw Legs (two simple black stick legs with horizontal foot lines)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Leg 1
  ctx.moveTo(player.x - 5, player.y + 9);
  ctx.lineTo(player.x - 5, player.y + 15);
  ctx.moveTo(player.x - 6.5, player.y + 15);
  ctx.lineTo(player.x - 3.5, player.y + 15);

  // Leg 2
  ctx.moveTo(player.x + 5, player.y + 9);
  ctx.lineTo(player.x + 5, player.y + 15);
  ctx.moveTo(player.x + 3.5, player.y + 15);
  ctx.lineTo(player.x + 6.5, player.y + 15);
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
