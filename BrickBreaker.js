var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

canvas.width = 0.6 * window.innerWidth;
canvas.height = 0.35 * window.innerWidth;

var brickRowCount = 7;
var brickColumnCount = 9;
var brickWidth = (canvas.width-1)/brickColumnCount - 1;
var brickHeight = 20;
var brickPadding = 1;
var brickOffsetTop = 30;
var brickOffsetLeft = 1;

var bricks = [];
var won = false;
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var paddleHeight = 15;
var paddleWidth = 90;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var score = 10;
var brickCount = brickRowCount * brickColumnCount;

var isGameStarted = false;
var isGameOver = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#663399';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#663399';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#663399';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#663399';
    ctx.fillText('Score: ' + score, 8, 20);
}

function drawWinMessage() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#663399';
    ctx.fillText('You Win!', canvas.width / 2 - 50, canvas.height / 2);
    drawPlayAgain();
}

function drawPlayAgain() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#663399';
    ctx.fillText('Click to Play Again', canvas.width / 2 - 80, canvas.height / 2 + 30);
}

function drawGameOver() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#663399';
    ctx.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
    drawPlayAgain();
}

function drawStartScreen() {
    ctx.font = '30px Arial';
    ctx.fillStyle = '#663399';
    ctx.fillText('Click to Start', canvas.width / 2 - 85, canvas.height / 2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isGameStarted && !isGameOver) {
        drawStartScreen();
    } else if (isGameOver) {
        if (won) {
            drawWinMessage();
        }
        else {
            drawGameOver();
        }
    } else {
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        collisionDetection();

        if (score === brickCount) {
            won = true;
            isGameOver = true;
        }

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                if (rightPressed && dx < 0) {
                    dx *= 2;
                }
                if (rightPressed && dx > 0) {
                    dx *= 0.5;
                }
                if (leftPressed && dx > 0) {
                    dx *=2;
                }
                if (leftPressed && dx < 0) {
                    dx *=0.5;
                }
                dy = -dy;
            } else {
                isGameOver = true;
                isGameStarted = false;
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
}

document.addEventListener('click', function () {
    if (!isGameStarted) {
        resetGame();
        isGameStarted = true;
        isGameOver = false;
        won = false;
        draw();
    } else if (isGameOver) {
        resetGame();
        isGameStarted = true;
        isGameOver = false;
        draw();
        won = false;
    }
});

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function resetGame() {
    score = 0;
    bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}

draw();
