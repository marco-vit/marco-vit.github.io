const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const gridSize = 20;
let score = 0;

canvas.width = box * gridSize;
canvas.height = box * gridSize;


let snake = [{ x: 10, y: 10 }];
let direction = "RIGHT";


let food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
};


document.addEventListener("keydown", function(event) {
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if(event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if(event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if(event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // disegno del serpente
    for(let i = 0; i < snake.length; i++){
    if(i === 0){
        ctx.fillStyle = "lime";  
    } else {
        ctx.fillStyle = "green"; 
    }
    ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
    }

    // disegno del cibo
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);

    // nuova posizione testa
    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction === "LEFT") headX--;
    if(direction === "RIGHT") headX++;
    if(direction === "UP") headY--;
    if(direction === "DOWN") headY++;

    // controllo collisione muro
    if(headX < 0 || headX >= gridSize || headY < 0 || headY >= gridSize) {
        clearInterval(game);
        setTimeout(() => alert("Game Over! Punteggio: " + score), 10);
        return;
    }   

    // mangia cibo?
    if(headX === food.x && headY === food.y){
        score++;
        let scoreElement = document.getElementById("score");
        scoreElement.innerText = score;
        
        food.x = Math.floor(Math.random() * gridSize);
        food.y = Math.floor(Math.random() * gridSize);
    } else {
        snake.pop();
    }

    // controllo collisione con il corpo
    for(let i = 0; i < snake.length; i++){
        if(snake[i].x === headX && snake[i].y === headY){
            clearInterval(game);
            setTimeout(() => alert("Game Over! Punteggio: " + score), 10);
            return;
        }
    }

    snake.unshift({ x: headX, y: headY });
}


let game = setInterval(draw, 150);