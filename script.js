
const grid = document.getElementById('grid');
let squares = [];
let currentSnake = [2,1,0];
let diretion =1 ;
let appleIndex =1;
let score =0;
let timerId=0;
let intervalTime = 200;
function creatBoard(){
    for(let i =0;i<400;i++){
    const squre = document.createElement('div');
    // const squareChild[];
    grid.appendChild(square);
    squares.push(square);
}
}
creatBoard();
