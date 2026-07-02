const grid=document.getElementById('grid');
const message=document.getElementById('message');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 25;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let fspeed = 150;
let intervalTime = 150;
let gameOn=false;
const bgMusic = new Audio('assets/backgroundmusic.mp3');
const eatSound = new Audio('assets/eatingsound.mp3');
const gameoSound = new Audio('assets/gameoversound.mp3');
const moveSound = new Audio('assets/movesound.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;
moveSound.volume = 0.2;
function createBoard(){
    for(let i=0; i<625; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();   
bgMusic.play();
function endGame() {



    return clearInterval(timerId);
}
function change_speed(){
    intervalTime = fspeed - 4*score;
    clearInterval(timerId);
    timerId = setInterval(move,intervalTime);
}
function move(){
    const hitBottom=(currentSnake[0]+25>=625 && direction === 25);
    const hitTop = (currentSnake[0]-25<0 && direction === -25);
    const hitRight = (currentSnake[0]%25 === 24 && direction === 1)
    const hitLeft = (currentSnake[0]%25 === 0 && direction === -1)
    const hitSelf = squares[currentSnake[0]+direction]?.classList.contains('snake');
    if (hitRight||hitBottom||hitTop|| hitLeft||hitSelf){
            message.textContent= "GAME OVER";
            bgMusic.pause();
    bgMusic.currentTime = 0;
    gameoSound.play();
    return endGame();
    }
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    const newHead = currentSnake[0] + direction;

    if (squares[newHead].classList.contains('apple')){
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        eatSound.play();
        scoreDisplay.textContent = score;

        generateApple();
        change_speed();
}
currentSnake.unshift(newHead);
squares[newHead].classList.add('snake');
    document.addEventListener('touched', (e) => {
    touchEndx= e.changedTouches[0].screenX;
     touchEndy= e.changedTouches[0].screenY;
     handleSwipe();
    
},false);
}

function startGame(){
        message.textContent= "";
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    score = 0;
    currentSnake = [2, 1, 0];
    scoreDisplay.textContent = score;
    direction = 1;   
     bgMusic.play();
    clearInterval(timerId);
    change_speed()

    generateApple();
    //gameOn=true;
}

function generateApple(){
    do{
        appleIndex = Math.floor(Math.random()* squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function changeDir(newDir) {
    if (direction + newDir !== 0) {
        direction = newDir;
        moveSound.currentTime = 0;
moveSound.play();
    }
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp'||e.key === 'w') changeDir(-25);
    if (e.key === 'ArrowDown'||e.key === 's') changeDir (25);
    if (e.key === 'ArrowLeft'||e.key === 'a') changeDir (-1);
    if (e.key === 'ArrowRight'||e.key === 'd') changeDir (1); 
    
});

function handleSwipe(){
    const dx = touchEndX - touchstartX;
    const dy = touchEndY - touchstartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx,absDy)> 30){
        if(absDx > absDy){
            if(dx>0)changeDir(-1);
            elsechangeDir(1);
        }else{
                if(dy>0)changeDir(20);
            elsechangeDir(-20);
        }
    }
}

