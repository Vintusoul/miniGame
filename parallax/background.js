// parallax effect is when foreground layer moves faster than the background layer

const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;

const backgroundlayer1 = new Image();
backgroundlayer1.src = "layer-1.png";
const backgroundlayer2 = new Image();
backgroundlayer2.src = "layer-2.png";
const backgroundlayer3 = new Image();
backgroundlayer3.src = "layer-3.png";
const backgroundlayer4 = new Image();
backgroundlayer4.src = "layer-4.png";
const backgroundlayer5 = new Image();
backgroundlayer5.src = "layer-5.png";

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer4 = new Layer(backgroundlayer4, 2.5);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer4.update();
  layer4.draw();
  requestAnimationFrame(animate);
}

animate();
