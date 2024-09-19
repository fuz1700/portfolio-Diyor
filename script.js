const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [
    {x: 160, y: 160},
    {x: 140, y: 160},
    {x: 120, y: 160},
    {x: 100, y: 160}
];

let direction = 'RIGHT';
let food = spawnFood();
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (isGameOver()) return;

    setTimeout(function() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Chegarani ko'rsatish uchun panjara (grid) chizish
    drawGrid();
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(part.x, part.y, boxSize, boxSize);
    });
}

function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};

    if (direction === 'RIGHT') head.x += boxSize;
    else if (direction === 'LEFT') head.x -= boxSize;
    else if (direction === 'UP') head.y -= boxSize;
    else if (direction === 'DOWN') head.y += boxSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (keyPressed === 38 && direction !== 'DOWN') direction = 'UP';
    else if (keyPressed === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (keyPressed === 40 && direction !== 'UP') direction = 'DOWN';
}

function spawnFood() {
    let foodX = Math.floor(Math.random() * canvas.width / boxSize) * boxSize;
    let foodY = Math.floor(Math.random() * canvas.height / boxSize) * boxSize;
    return {x: foodX, y: foodY};
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Chegarani ko'rsatish uchun grid (panjara) chizamiz
function drawGrid() {
    ctx.strokeStyle = 'grey';
    for (let x = 0; x < canvas.width; x += boxSize) {
        for (let y = 0; y < canvas.height; y += boxSize) {
            ctx.strokeRect(x, y, boxSize, boxSize);
        }
    }
}

function isGameOver() {
    // Ilonning o'z tanasiga urilishi
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    // Ilon devorlarga urilganda
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) return true;

    return false;
}

gameLoop();
