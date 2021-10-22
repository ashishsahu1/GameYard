//declarations : variables and constants
let inputDir = {x:0 ,y:0};
const foodSound = new Audio('./Music/food.mp3');
const gameOverSound = new Audio('./Music/gameover.mp3');
const moveSound = new Audio('./Music/move.mp3');
const musicSound = new Audio('./Music/music.mp3');
let speed = 2;
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

function gameEngine() {
    //Part 1: updating the snake variable and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game over");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    //Part 2: display/render the snake and food
    //displaying the snake
    board.innerHtml = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
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
})