let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const spriteWidth = 575;
const spriteHeight = 523;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

let gameFrame = 0;
// slow down animation
const staggerFramer = 5;
const spriteAnimations = [];

// Name and how many frames
const animationsStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "getHit", frames: 4 },
];

animationsStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

// sprite animations --------------------------------------

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFramer) %
    spriteAnimations[playerState].loc.length;
  // cycles through animations horizontally
  let frameX = spriteWidth * position;
  // cycles through animations vertically
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage, //Sprite
    frameX, //sx source x-axis
    frameY, //sy source y-axis
    spriteWidth, //sw source width
    spriteHeight, //sh source height
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

console.log(ctx);
