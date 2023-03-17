/** @type {HTMLCanvasElement} */
// tell vscode this is a canvas project and will get canvas suggestions
const canvas = document.getElementById("canvas3");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 10;
const enemiesArray = [];
let gameframe = 0;
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy1.png";

    //this.speeed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.height = this.spriteHeight / 2.5;
    this.width = this.spriteWidth / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() {
    this.x += Math.random() * 3 - 1.5;
    this.y += Math.random() * 3 - 1.5;
    // animate
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
