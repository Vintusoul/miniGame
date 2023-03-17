/** @type {HTMLCanvasElement} */
// tell vscode this is a canvas project and will get canvas suggestions
const canvas = document.getElementById("canvas5");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 50;
const enemiesArray = [];
let gameframe = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy3.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.height = this.spriteHeight / 2.5;
    this.width = this.spriteWidth / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 100;
    this.angleSpeed = Math.random() * 1.7 + 0.5;
  }
  update() {
    // If you struggle with sin and cos you can look at the example image in this folder ./sinAndCos.png
    this.x =
      (canvas.width / 2) * Math.cos((this.angle * Math.PI) / 200) +
      canvas.width / 2 -
      this.width / 2;
    this.y =
      (canvas.height / 2) * Math.sin((this.angle * Math.PI) / 300) +
      canvas.height / 2 -
      this.height / 2;
    this.angle += this.angleSpeed;
    // animate
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
