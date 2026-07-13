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

// Platforms (Level 1)
const platforms = [
  { x: 0, y: 380, width: 800, height: 20 },   // Ground
  { x: 150, y: 300, width: 120, height: 15 }, // Platform 1
  { x: 350, y: 220, width: 120, height: 15 }, // Platform 2
  { x: 550, y: 150, width: 120, height: 15 }, // Platform 3
  { x: 50, y: 200, width: 100, height: 15 }    // Platform 4
];

// Collectibles
let dots = [
  { x: 210, y: 270, collected: false },
  { x: 410, y: 190, collected: false },
  { x: 610, y: 120, collected: false },
  { x: 100, y: 170, collected: false },
  { x: 380, y: 350, collected: false }
];

// Enemies
let enemies = [
  { x: 350, y: 205, width: 20, height: 15, vx: 1, range: 100, startX: 350 },
  { x: 150, y: 285, width: 20, height: 15, vx: 1.5, range: 100, startX: 150 }
];

// Exit Portal
const portal = {
  x: 720,
  y: 320,
  width: 40,
  height: 60,
  active: false
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
  resetGame();
  overlay.classList.add('hidden');
  gameActive = true;
  gameLoop();
});

function resetGame() {
  score = 0;
  lives = 3;
  level = 1;
  updateHUD();
  resetPlayer();
  resetLevel();
}

function resetPlayer() {
  player.x = 50;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;
  player.grounded = false;
}

function resetLevel() {
  dots.forEach(d => d.collected = false);
  portal.active = false;
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

  // Draw Player (Eater)
  ctx.fillStyle = '#f3ca20';
  ctx.beginPath();
  const startAngle = player.facingLeft ? (Math.PI + mouthAngle * Math.PI) : (mouthAngle * Math.PI);
  const endAngle = player.facingLeft ? (Math.PI - mouthAngle * Math.PI) : (2 * Math.PI - mouthAngle * Math.PI);
  ctx.arc(player.x, player.y, player.radius, startAngle, endAngle);
  ctx.lineTo(player.x, player.y);
  ctx.closePath();
  ctx.fill();

  // Draw Eater Eye
  ctx.fillStyle = '#000';
  ctx.beginPath();
  const eyeX = player.x + (player.facingLeft ? -4 : 4);
  ctx.arc(eyeX, player.y - 6, 2, 0, Math.PI * 2);
  ctx.fill();
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
