/** @type {HTMLCanvasElement} */
// tell vscode this is a canvas project and will get canvas suggestions
const canvas = document.getElementById("canvas6");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 50;
const enemiesArray = [];
let gameframe = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy4.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.height = this.spriteHeight / 2.5;
    this.width = this.spriteWidth / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * canvas.width;
    this.newY = Math.random() * canvas.height;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update() {
    // animate
    if (gameframe % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    // distance on horizontal x axis
    let dx = this.x - this.newX;
    // distance on vertical y axis
    let dy = this.y - this.newY;

    this.x -= dx / 70;
    this.y -= dy / 20;

    if (this.x + this.width < 0) this.x = canvas.width;

    if (gameframe % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      // where you want to place it
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

// create enemies based off how much numberOfEnemies there are
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // enemy1.update();
  // enemy1.draw();
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
  gameframe++;
  requestAnimationFrame(animate);
}
animate();
