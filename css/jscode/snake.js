'use strict';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

const box = 32;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

const snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener('keydown', direction);

let dir;

const game = setInterval(drawGame, 150);

const LEFT_ARROW_BUTTON_CODE = 37;
const UP_ARROW_BUTTON_CODE = 38;
const RIGHT_ARROW_BUTTON_CODE = 39;
const DONW_ARROW_BUTTON_CODE = 40;

function direction(event) {
  if (event.keyCode === LEFT_ARROW_BUTTON_CODE && dir !== 'right')
    dir = 'left';
  else if (event.keyCode === UP_ARROW_BUTTON_CODE && dir !== 'down')
    dir = 'up';
  else if (event.keyCode === RIGHT_ARROW_BUTTON_CODE & dir !== 'left')
    dir = 'right';
  else if (event.keyCode === DONW_ARROW_BUTTON_CODE && dir !== 'up')
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
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 ||
    snakeY < 3 * box || snakeY > box * 17) {
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
