'use strict';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

const box = 32;

let score = 0;

const leftBorder = 1;
const rightBorder  = 17;
const downBorder = 15;
const upBorder = 3;

let food = {
  x: Math.floor((Math.random() * rightBorder + leftBorder)) * box,
  y: Math.floor((Math.random() * downBorder + upBorder)) * box,
};

const snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener('keydown', direction);

let dir;

let snakeSpeed = prompt('Enter snake speed: Slow, Medium, Fast');


if (snakeSpeed === 'Fast' || snakeSpeed === 'fast') {
  snakeSpeed = 100;
} else if (snakeSpeed === 'Medium' || snakeSpeed === 'medium') {
  snakeSpeed = 150;
} else if (snakeSpeed === 'Slow' || snakeSpeed === 'slow') {
  snakeSpeed = 200;
} else {
  alert('Use only words like in example, no numbers');
}


const game = setInterval(drawGame, snakeSpeed);

const key = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

function direction(event) {
  if (event.keyCode === key.left && dir !== 'right')
    dir = 'left';
  else if (event.keyCode === key.up && dir !== 'down')
    dir = 'up';
  else if (event.keyCode === key.right & dir !== 'left')
    dir = 'right';
  else if (event.keyCode === key.down && dir !== 'up')
    dir = 'down';
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y)
      clearInterval(game);
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'Blue' : 'DeepSkyBlue';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.FillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * rightBorder + leftBorder)) * box,
      y: Math.floor((Math.random() * downBorder + upBorder)) * box,
    };
  } else {
    snake.pop();
  }


  if (snakeX < box || snakeX > box * rightBorder ||
    snakeY < upBorder * box || snakeY > box * rightBorder) {
    alert('YOU DIED');
    clearInterval(game);

  }

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  const newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}









//
