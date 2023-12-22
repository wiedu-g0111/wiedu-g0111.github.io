var dotSize = 20;
var gameBoardSize = 400;
var direction = 'Right';
var snake = [{ top: 0, left: 0 }];
var apple = null;
var gameInterval;
var score = 0;

function startGame() {
  // Clear existing game interval
  if (gameInterval) {
    clearInterval(gameInterval);
  }

  // Reset game state
  snake = [{ top: 0, left: 0 }];
  direction = 'Right';
  apple = null;
  gameInProgress = true;
  score = 0;

  // Create a new element to display the score
  var gameBoard = document.getElementById('game-board');
  var scoreElement = document.createElement('div');
  scoreElement.style.position = 'absolute';
  scoreElement.style.left = '50%';
  scoreElement.style.top = '50%';
  scoreElement.style.transform = 'translate(-50%, -50%)';
  scoreElement.id = 'score'; // Add an id to the score element for later reference
  gameBoard.appendChild(scoreElement);

  // Start game loop
  gameInterval = setInterval(function () {
    if (!gameInProgress) {
      clearInterval(gameInterval);
      return;
    }

    var head = Object.assign({}, snake[0]); // copy head
    switch (direction) {
      case 'Left':
        head.left -= dotSize;
        break;
      case 'Right':
        head.left += dotSize;
        break;
      case 'Up':
        head.top -= dotSize;
        break;
      case 'Down':
        head.top += dotSize;
        break;
    }

    // Check if the snake is out of bounds
    if (
      head.left < 0 ||
      head.top < 0 ||
      head.left >= gameBoardSize ||
      head.top >= gameBoardSize
    ) {
      gameInProgress = false;
      alert('Game Over: You hit the boundary!');
      return;
    }

    snake.unshift(head);

    if (apple && apple.left === head.left && apple.top === head.top) {
      // eat apple
      apple = null;
      score++; // increase score when apple is eaten
    } else {
      snake.pop();
    }

    if (!apple) {
      // create new apple
      apple = {
        top: Math.floor((Math.random() * gameBoardSize) / dotSize) * dotSize,
        left: Math.floor((Math.random() * gameBoardSize) / dotSize) * dotSize,
      };
    }

    drawGame();
  }, 200);
}

function drawGame() {
  var gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  // Draw the head
  drawDot(snake[0], 'head', gameBoard);

  // Draw the body
  snake.slice(1).forEach(function (dot) {
    drawDot(dot, 'body', gameBoard);
  });

  drawDot(apple, 'apple', gameBoard);

  // Update the score display
  var scoreElement = document.getElementById('score');
  if (!scoreElement) {
    scoreElement = document.createElement('div');
    scoreElement.id = 'score'; // Add an id to the score element for later reference
    scoreElement.style.color = 'white'; // Set the color of the score to white
    gameBoard.appendChild(scoreElement);
  }
  scoreElement.innerText = 'Score: ' + score;
}

function drawDot(position, id, gameBoard) {
  var dot = document.createElement('div');
  dot.style.top = `${position.top}px`;
  dot.style.left = `${position.left}px`;
  dot.className = id;
  gameBoard.appendChild(dot);
}

var gameInProgress = false;

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowUp':
      direction = 'Up';
      break;
    case 'ArrowDown':
      direction = 'Down';
      break;
    case 'ArrowLeft':
      direction = 'Left';
      break;
    case 'ArrowRight':
      direction = 'Right';
      break;
  }
});
