//declarations : variables and constants
let inputDir = {x:0 ,y:0};
const foodSound = new Audio('./Music/food.mp3');
const gameOverSound = new Audio('./Music/gameover.mp3');
const moveSound = new Audio('./Music/move.mp3');
const musicSound = new Audio('./Music/music.mp3');
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];
let food = {x:6 ,y:7};
let score = 0;

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine() {
    //Part 1: updating the snake variable and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        // alert("Game Over. Press any key to play again!");
        scoreBox.innerHTML = "Score: 0";
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    //if food eaten increament the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: display/render the snake and food
    //displaying the snake
    board.innerHTML = "";
    let s_size = snakeArr.length;
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else if(index == s_size-1){
            snakeElement.classList.add('tail');
        }
        else{
            if(index%2===0)
                snakeElement.classList.add('snake1');
            else
                snakeElement.classList.add('snake2');
        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; 
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

//main logic
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1} //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("arrow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("arrow Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});