// HTML Elements
const statusDiv = document.querySelector('.status');
const solveDiv = document.querySelector('.solve');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.cell');
const candidateDivs = document.querySelectorAll('.candidate');
let listItems ;
var selectedCell = null ;
// game constants
let sudo;
// game variables
let gameIsLive = true;
let xIsNext = true;

window.onload = function(){
  document.addEventListener("keydown", keyPush);
}

const fillGrid = (index) =>{
  let grid = sudo.allGrids[index];
  let row, col;
  for(row = 0; row < 9; row++){
    for(col = 0; col < 9; col++){
      let gridCell = grid[row][col], cellNumber = indexOf(row,col), divCell = cellDivs[cellNumber];
      if(gridCell.hasValue()){
        divCell.style.visibility = "visible";
        divCell.innerHTML = gridCell.value;
        if(!gridCell.fixed) {
          divCell.style.color = 'blue';
        }
        else{
          divCell.style.color = 'black';
        }
        if(gridCell.changed){
          divCell.style.backgroundColor = "#8AC1FF"
        }
        else{
          divCell.style.backgroundColor = "#D1DDE5"
        }
      }
      else{
        divCell.style.visibility = "hidden";
        let candidate;
        for(let k = 1; k <= 9; k++){

          candidate = candidateDivs[9* cellNumber + k-1];
          if(!gridCell.avSet.has(k)){
            if(gridCell.changedAvSet.has(k)){
              candidate.style.visibility = "visible";
              candidate.style.color = "red";
            }
            else {
              candidate.style.visibility = "hidden";
            }
          }
          else{
            candidate.style.visibility = "visible";
            if(gridCell.rootAvSet.has(k)){
              candidate.style.color = "#8AC1FF";
            }
            else {
              candidate.style.color = "black";
            }
          }
        }
      }
    }
  }
}
let runExample=()=>{
  cellDivs[indexOf(0,5)].innerHTML = "4";
  cellDivs[indexOf(0,6)].innerHTML = "9";
  cellDivs[indexOf(1,0)].innerHTML = "5";
  cellDivs[indexOf(1,1)].innerHTML = "4";
  cellDivs[indexOf(1,3)].innerHTML = "7";
  cellDivs[indexOf(1,5)].innerHTML = "6";
  cellDivs[indexOf(2,0)].innerHTML = "8";
  cellDivs[indexOf(2,2)].innerHTML = "3";
  cellDivs[indexOf(2,3)].innerHTML = "1";
  cellDivs[indexOf(2,7)].innerHTML = "7";
  cellDivs[indexOf(3,0)].innerHTML = "2";
  cellDivs[indexOf(3,1)].innerHTML = "6";
  cellDivs[indexOf(3,2)].innerHTML = "8";
  cellDivs[indexOf(3,4)].innerHTML = "1";
  cellDivs[indexOf(3,5)].innerHTML = "7";
  cellDivs[indexOf(3,7)].innerHTML = "5";
  cellDivs[indexOf(3,8)].innerHTML = "4";
  cellDivs[indexOf(4,4)].innerHTML = "5";
  cellDivs[indexOf(4,5)].innerHTML = "8";
  cellDivs[indexOf(4,6)].innerHTML = "6";
  cellDivs[indexOf(5,0)].innerHTML = "4";
  cellDivs[indexOf(5,1)].innerHTML = "1";
  cellDivs[indexOf(5,4)].innerHTML = "3";
  cellDivs[indexOf(5,5)].innerHTML = "2";
  cellDivs[indexOf(5,6)].innerHTML = "8";
  cellDivs[indexOf(5,7)].innerHTML = "9";
  cellDivs[indexOf(5,8)].innerHTML = "7";
  cellDivs[indexOf(6,5)].innerHTML = "1";
  cellDivs[indexOf(6,7)].innerHTML = "4";
  cellDivs[indexOf(6,8)].innerHTML = "3";
  cellDivs[indexOf(7,0)].innerHTML = "6";
  cellDivs[indexOf(7,2)].innerHTML = "4";
  cellDivs[indexOf(7,6)].innerHTML = "1";
  cellDivs[indexOf(7,8)].innerHTML = "9";
  cellDivs[indexOf(8,1)].innerHTML = "3";
  cellDivs[indexOf(8,3)].innerHTML = "8";
}
let runExample2=()=>{
  cellDivs[indexOf(0,1)].innerHTML = "3";
  cellDivs[indexOf(0,2)].innerHTML = "2";
  cellDivs[indexOf(0,5)].innerHTML = "6";
  cellDivs[indexOf(0,6)].innerHTML = "1";
  cellDivs[indexOf(1,0)].innerHTML = "4";
  cellDivs[indexOf(1,1)].innerHTML = "1";
  cellDivs[indexOf(2,3)].innerHTML = "9";
  cellDivs[indexOf(2,5)].innerHTML = "1";
  cellDivs[indexOf(3,0)].innerHTML = "5";
  cellDivs[indexOf(3,4)].innerHTML = "9";
  cellDivs[indexOf(3,8)].innerHTML = "4";
  cellDivs[indexOf(4,1)].innerHTML = "6";
  cellDivs[indexOf(4,7)].innerHTML = "7";
  cellDivs[indexOf(4,8)].innerHTML = "1";
  cellDivs[indexOf(5,0)].innerHTML = "3";
  cellDivs[indexOf(5,4)].innerHTML = "2";
  cellDivs[indexOf(5,8)].innerHTML = "5";
  cellDivs[indexOf(6,3)].innerHTML = "5";
  cellDivs[indexOf(6,5)].innerHTML = "8";
  cellDivs[indexOf(7,6)].innerHTML = "5";
  cellDivs[indexOf(7,7)].innerHTML = "1";
  cellDivs[indexOf(7,8)].innerHTML = "9";
  cellDivs[indexOf(8,1)].innerHTML = "5";
  cellDivs[indexOf(8,2)].innerHTML = "7";
  cellDivs[indexOf(8,5)].innerHTML = "9";
  cellDivs[indexOf(8,6)].innerHTML = "8";
  cellDivs[indexOf(8,7)].innerHTML = "6";
}
let runExample3=()=>{

  cellDivs[indexOf(0,1)].innerHTML = "2";
  cellDivs[indexOf(0,3)].innerHTML = "9";
  cellDivs[indexOf(0,4)].innerHTML = "4";
  cellDivs[indexOf(0,5)].innerHTML = "3";
  cellDivs[indexOf(0,6)].innerHTML = "7";
  cellDivs[indexOf(0,7)].innerHTML = "1";
  cellDivs[indexOf(0,8)].innerHTML = "5";
  cellDivs[indexOf(1,0)].innerHTML = "9";
  cellDivs[indexOf(1,2)].innerHTML = "4";
  cellDivs[indexOf(1,6)].innerHTML = "6";
  cellDivs[indexOf(2,0)].innerHTML = "7";
  cellDivs[indexOf(2,1)].innerHTML = "5";
  cellDivs[indexOf(2,7)].innerHTML = "4";
  cellDivs[indexOf(3,0)].innerHTML = "5";
  cellDivs[indexOf(3,3)].innerHTML = "4";
  cellDivs[indexOf(3,4)].innerHTML = "8";
  cellDivs[indexOf(4,0)].innerHTML = "2";
  cellDivs[indexOf(4,6)].innerHTML = "4";
  cellDivs[indexOf(4,7)].innerHTML = "5";
  cellDivs[indexOf(4,8)].innerHTML = "3";
  cellDivs[indexOf(5,0)].innerHTML = "4";
  cellDivs[indexOf(5,3)].innerHTML = "3";
  cellDivs[indexOf(5,4)].innerHTML = "5";
  cellDivs[indexOf(5,5)].innerHTML = "2";
  cellDivs[indexOf(6,1)].innerHTML = "4";
  cellDivs[indexOf(6,2)].innerHTML = "2";
  cellDivs[indexOf(6,7)].innerHTML = "8";
  cellDivs[indexOf(6,8)].innerHTML = "1";
  cellDivs[indexOf(7,2)].innerHTML = "5";
  cellDivs[indexOf(7,5)].innerHTML = "4";
  cellDivs[indexOf(7,6)].innerHTML = "2";
  cellDivs[indexOf(7,7)].innerHTML = "6";
  cellDivs[indexOf(8,1)].innerHTML = "9";
  cellDivs[indexOf(8,3)].innerHTML = "2";
  cellDivs[indexOf(8,5)].innerHTML = "8";
  cellDivs[indexOf(8,6)].innerHTML = "5";
  cellDivs[indexOf(8,8)].innerHTML = "4";

}
let runExample4=()=>{
  cellDivs[indexOf(0,0)].innerHTML = "";
  cellDivs[indexOf(0,1)].innerHTML = "";
  cellDivs[indexOf(0,2)].innerHTML = "";
  cellDivs[indexOf(0,3)].innerHTML = "";
  cellDivs[indexOf(0,4)].innerHTML = "3";
  cellDivs[indexOf(0,5)].innerHTML = "";
  cellDivs[indexOf(0,6)].innerHTML = "";
  cellDivs[indexOf(0,7)].innerHTML = "8";
  cellDivs[indexOf(0,8)].innerHTML = "6";
  cellDivs[indexOf(1,0)].innerHTML = "";
  cellDivs[indexOf(1,1)].innerHTML = "";
  cellDivs[indexOf(1,2)].innerHTML = "";
  cellDivs[indexOf(1,3)].innerHTML = "";
  cellDivs[indexOf(1,4)].innerHTML = "2";
  cellDivs[indexOf(1,5)].innerHTML = "";
  cellDivs[indexOf(1,6)].innerHTML = "";
  cellDivs[indexOf(1,7)].innerHTML = "4";
  cellDivs[indexOf(1,8)].innerHTML = "";
  cellDivs[indexOf(2,0)].innerHTML = "";
  cellDivs[indexOf(2,1)].innerHTML = "9";
  cellDivs[indexOf(2,2)].innerHTML = "";
  cellDivs[indexOf(2,3)].innerHTML = "";
  cellDivs[indexOf(2,4)].innerHTML = "7";
  cellDivs[indexOf(2,5)].innerHTML = "8";
  cellDivs[indexOf(2,6)].innerHTML = "5";
  cellDivs[indexOf(2,7)].innerHTML = "2";
  cellDivs[indexOf(2,8)].innerHTML = "";
  cellDivs[indexOf(3,0)].innerHTML = "3";
  cellDivs[indexOf(3,1)].innerHTML = "7";
  cellDivs[indexOf(3,2)].innerHTML = "1";
  cellDivs[indexOf(3,3)].innerHTML = "8";
  cellDivs[indexOf(3,4)].innerHTML = "5";
  cellDivs[indexOf(3,5)].innerHTML = "6";
  cellDivs[indexOf(3,6)].innerHTML = "2";
  cellDivs[indexOf(3,7)].innerHTML = "9";
  cellDivs[indexOf(3,8)].innerHTML = "4";
  cellDivs[indexOf(4,0)].innerHTML = "9";
  cellDivs[indexOf(4,1)].innerHTML = "";
  cellDivs[indexOf(4,2)].innerHTML = "";
  cellDivs[indexOf(4,3)].innerHTML = "1";
  cellDivs[indexOf(4,4)].innerHTML = "4";
  cellDivs[indexOf(4,5)].innerHTML = "2";
  cellDivs[indexOf(4,6)].innerHTML = "3";
  cellDivs[indexOf(4,7)].innerHTML = "7";
  cellDivs[indexOf(4,8)].innerHTML = "5";
  cellDivs[indexOf(5,0)].innerHTML = "4";
  cellDivs[indexOf(5,1)].innerHTML = "";
  cellDivs[indexOf(5,2)].innerHTML = "";
  cellDivs[indexOf(5,3)].innerHTML = "3";
  cellDivs[indexOf(5,4)].innerHTML = "9";
  cellDivs[indexOf(5,5)].innerHTML = "7";
  cellDivs[indexOf(5,6)].innerHTML = "6";
  cellDivs[indexOf(5,7)].innerHTML = "1";
  cellDivs[indexOf(5,8)].innerHTML = "8";
  cellDivs[indexOf(6,0)].innerHTML = "2";
  cellDivs[indexOf(6,1)].innerHTML = "";
  cellDivs[indexOf(6,2)].innerHTML = "";
  cellDivs[indexOf(6,3)].innerHTML = "7";
  cellDivs[indexOf(6,4)].innerHTML = "";
  cellDivs[indexOf(6,5)].innerHTML = "3";
  cellDivs[indexOf(6,6)].innerHTML = "8";
  cellDivs[indexOf(6,7)].innerHTML = "5";
  cellDivs[indexOf(6,8)].innerHTML = "9";
  cellDivs[indexOf(7,0)].innerHTML = "";
  cellDivs[indexOf(7,1)].innerHTML = "3";
  cellDivs[indexOf(7,2)].innerHTML = "9";
  cellDivs[indexOf(7,3)].innerHTML = "2";
  cellDivs[indexOf(7,4)].innerHTML = "";
  cellDivs[indexOf(7,5)].innerHTML = "5";
  cellDivs[indexOf(7,6)].innerHTML = "4";
  cellDivs[indexOf(7,7)].innerHTML = "6";
  cellDivs[indexOf(7,8)].innerHTML = "7";
  cellDivs[indexOf(8,0)].innerHTML = "7";
  cellDivs[indexOf(8,1)].innerHTML = "";
  cellDivs[indexOf(8,2)].innerHTML = "";
  cellDivs[indexOf(8,3)].innerHTML = "9";
  cellDivs[indexOf(8,4)].innerHTML = "";
  cellDivs[indexOf(8,5)].innerHTML = "4";
  cellDivs[indexOf(8,6)].innerHTML = "1";
  cellDivs[indexOf(8,7)].innerHTML = "3";
  cellDivs[indexOf(8,8)].innerHTML = "2";
}
let runExample5=()=>{
  cellDivs[indexOf(0,0)].innerHTML = "";
  cellDivs[indexOf(0,1)].innerHTML = "2";
  cellDivs[indexOf(0,2)].innerHTML = "";
  cellDivs[indexOf(0,3)].innerHTML = "9";
  cellDivs[indexOf(0,4)].innerHTML = "4";
  cellDivs[indexOf(0,5)].innerHTML = "3";
  cellDivs[indexOf(0,6)].innerHTML = "7";
  cellDivs[indexOf(0,7)].innerHTML = "1";
  cellDivs[indexOf(0,8)].innerHTML = "5";
  cellDivs[indexOf(1,0)].innerHTML = "9";
  cellDivs[indexOf(1,1)].innerHTML = "";
  cellDivs[indexOf(1,2)].innerHTML = "4";
  cellDivs[indexOf(1,3)].innerHTML = "";
  cellDivs[indexOf(1,4)].innerHTML = "";
  cellDivs[indexOf(1,5)].innerHTML = "";
  cellDivs[indexOf(1,6)].innerHTML = "6";
  cellDivs[indexOf(1,7)].innerHTML = "";
  cellDivs[indexOf(1,8)].innerHTML = "";
  cellDivs[indexOf(2,0)].innerHTML = "7";
  cellDivs[indexOf(2,1)].innerHTML = "5";
  cellDivs[indexOf(2,2)].innerHTML = "";
  cellDivs[indexOf(2,3)].innerHTML = "";
  cellDivs[indexOf(2,4)].innerHTML = "";
  cellDivs[indexOf(2,5)].innerHTML = "";
  cellDivs[indexOf(2,6)].innerHTML = "";
  cellDivs[indexOf(2,7)].innerHTML = "4";
  cellDivs[indexOf(2,8)].innerHTML = "";
  cellDivs[indexOf(3,0)].innerHTML = "5";
  cellDivs[indexOf(3,1)].innerHTML = "";
  cellDivs[indexOf(3,2)].innerHTML = "";
  cellDivs[indexOf(3,3)].innerHTML = "4";
  cellDivs[indexOf(3,4)].innerHTML = "8";
  cellDivs[indexOf(3,5)].innerHTML = "";
  cellDivs[indexOf(3,6)].innerHTML = "";
  cellDivs[indexOf(3,7)].innerHTML = "";
  cellDivs[indexOf(3,8)].innerHTML = "";
  cellDivs[indexOf(4,0)].innerHTML = "2";
  cellDivs[indexOf(4,1)].innerHTML = "";
  cellDivs[indexOf(4,2)].innerHTML = "";
  cellDivs[indexOf(4,3)].innerHTML = "";
  cellDivs[indexOf(4,4)].innerHTML = "";
  cellDivs[indexOf(4,5)].innerHTML = "";
  cellDivs[indexOf(4,6)].innerHTML = "4";
  cellDivs[indexOf(4,7)].innerHTML = "5";
  cellDivs[indexOf(4,8)].innerHTML = "3";
  cellDivs[indexOf(5,0)].innerHTML = "4";
  cellDivs[indexOf(5,1)].innerHTML = "";
  cellDivs[indexOf(5,2)].innerHTML = "";
  cellDivs[indexOf(5,3)].innerHTML = "3";
  cellDivs[indexOf(5,4)].innerHTML = "5";
  cellDivs[indexOf(5,5)].innerHTML = "2";
  cellDivs[indexOf(5,6)].innerHTML = "";
  cellDivs[indexOf(5,7)].innerHTML = "";
  cellDivs[indexOf(5,8)].innerHTML = "";
  cellDivs[indexOf(6,0)].innerHTML = "";
  cellDivs[indexOf(6,1)].innerHTML = "4";
  cellDivs[indexOf(6,2)].innerHTML = "2";
  cellDivs[indexOf(6,3)].innerHTML = "";
  cellDivs[indexOf(6,4)].innerHTML = "";
  cellDivs[indexOf(6,5)].innerHTML = "";
  cellDivs[indexOf(6,6)].innerHTML = "";
  cellDivs[indexOf(6,7)].innerHTML = "8";
  cellDivs[indexOf(6,8)].innerHTML = "1";
  cellDivs[indexOf(7,0)].innerHTML = "";
  cellDivs[indexOf(7,1)].innerHTML = "";
  cellDivs[indexOf(7,2)].innerHTML = "5";
  cellDivs[indexOf(7,3)].innerHTML = "";
  cellDivs[indexOf(7,4)].innerHTML = "";
  cellDivs[indexOf(7,5)].innerHTML = "4";
  cellDivs[indexOf(7,6)].innerHTML = "2";
  cellDivs[indexOf(7,7)].innerHTML = "6";
  cellDivs[indexOf(7,8)].innerHTML = "";
  cellDivs[indexOf(8,0)].innerHTML = "";
  cellDivs[indexOf(8,1)].innerHTML = "9";
  cellDivs[indexOf(8,2)].innerHTML = "";
  cellDivs[indexOf(8,3)].innerHTML = "2";
  cellDivs[indexOf(8,4)].innerHTML = "";
  cellDivs[indexOf(8,5)].innerHTML = "8";
  cellDivs[indexOf(8,6)].innerHTML = "5";
  cellDivs[indexOf(8,7)].innerHTML = "";
  cellDivs[indexOf(8,8)].innerHTML = "4";
}
let runExample6=()=>{
  cellDivs[indexOf(0,0)].innerHTML = "";
  cellDivs[indexOf(0,1)].innerHTML = "";
  cellDivs[indexOf(0,2)].innerHTML = "";
  cellDivs[indexOf(0,3)].innerHTML = "";
  cellDivs[indexOf(0,4)].innerHTML = "1";
  cellDivs[indexOf(0,5)].innerHTML = "";
  cellDivs[indexOf(0,6)].innerHTML = "";
  cellDivs[indexOf(0,7)].innerHTML = "";
  cellDivs[indexOf(0,8)].innerHTML = "";
  cellDivs[indexOf(1,0)].innerHTML = "";
  cellDivs[indexOf(1,1)].innerHTML = "6";
  cellDivs[indexOf(1,2)].innerHTML = "";
  cellDivs[indexOf(1,3)].innerHTML = "";
  cellDivs[indexOf(1,4)].innerHTML = "";
  cellDivs[indexOf(1,5)].innerHTML = "";
  cellDivs[indexOf(1,6)].innerHTML = "";
  cellDivs[indexOf(1,7)].innerHTML = "9";
  cellDivs[indexOf(1,8)].innerHTML = "";
  cellDivs[indexOf(2,0)].innerHTML = "";
  cellDivs[indexOf(2,1)].innerHTML = "";
  cellDivs[indexOf(2,2)].innerHTML = "8";
  cellDivs[indexOf(2,3)].innerHTML = "2";
  cellDivs[indexOf(2,4)].innerHTML = "4";
  cellDivs[indexOf(2,5)].innerHTML = "";
  cellDivs[indexOf(2,6)].innerHTML = "";
  cellDivs[indexOf(2,7)].innerHTML = "";
  cellDivs[indexOf(2,8)].innerHTML = "6";
  cellDivs[indexOf(3,0)].innerHTML = "4";
  cellDivs[indexOf(3,1)].innerHTML = "";
  cellDivs[indexOf(3,2)].innerHTML = "";
  cellDivs[indexOf(3,3)].innerHTML = "5";
  cellDivs[indexOf(3,4)].innerHTML = "2";
  cellDivs[indexOf(3,5)].innerHTML = "";
  cellDivs[indexOf(3,6)].innerHTML = "";
  cellDivs[indexOf(3,7)].innerHTML = "3";
  cellDivs[indexOf(3,8)].innerHTML = "";
  cellDivs[indexOf(4,0)].innerHTML = "";
  cellDivs[indexOf(4,1)].innerHTML = "";
  cellDivs[indexOf(4,2)].innerHTML = "";
  cellDivs[indexOf(4,3)].innerHTML = "";
  cellDivs[indexOf(4,4)].innerHTML = "";
  cellDivs[indexOf(4,5)].innerHTML = "1";
  cellDivs[indexOf(4,6)].innerHTML = "";
  cellDivs[indexOf(4,7)].innerHTML = "";
  cellDivs[indexOf(4,8)].innerHTML = "2";
  cellDivs[indexOf(5,0)].innerHTML = "";
  cellDivs[indexOf(5,1)].innerHTML = "";
  cellDivs[indexOf(5,2)].innerHTML = "5";
  cellDivs[indexOf(5,3)].innerHTML = "";
  cellDivs[indexOf(5,4)].innerHTML = "";
  cellDivs[indexOf(5,5)].innerHTML = "9";
  cellDivs[indexOf(5,6)].innerHTML = "";
  cellDivs[indexOf(5,7)].innerHTML = "";
  cellDivs[indexOf(5,8)].innerHTML = "";
  cellDivs[indexOf(6,0)].innerHTML = "";
  cellDivs[indexOf(6,1)].innerHTML = "";
  cellDivs[indexOf(6,2)].innerHTML = "4";
  cellDivs[indexOf(6,3)].innerHTML = "8";
  cellDivs[indexOf(6,4)].innerHTML = "6";
  cellDivs[indexOf(6,5)].innerHTML = "";
  cellDivs[indexOf(6,6)].innerHTML = "";
  cellDivs[indexOf(6,7)].innerHTML = "";
  cellDivs[indexOf(6,8)].innerHTML = "9";
  cellDivs[indexOf(7,0)].innerHTML = "";
  cellDivs[indexOf(7,1)].innerHTML = "";
  cellDivs[indexOf(7,2)].innerHTML = "";
  cellDivs[indexOf(7,3)].innerHTML = "";
  cellDivs[indexOf(7,4)].innerHTML = "";
  cellDivs[indexOf(7,5)].innerHTML = "5";
  cellDivs[indexOf(7,6)].innerHTML = "";
  cellDivs[indexOf(7,7)].innerHTML = "";
  cellDivs[indexOf(7,8)].innerHTML = "";
  cellDivs[indexOf(8,0)].innerHTML = "3";
  cellDivs[indexOf(8,1)].innerHTML = "";
  cellDivs[indexOf(8,2)].innerHTML = "";
  cellDivs[indexOf(8,3)].innerHTML = "";
  cellDivs[indexOf(8,4)].innerHTML = "";
  cellDivs[indexOf(8,5)].innerHTML = "";
  cellDivs[indexOf(8,6)].innerHTML = "7";
  cellDivs[indexOf(8,7)].innerHTML = "";
  cellDivs[indexOf(8,8)].innerHTML = "";
}
let runExample7=()=>{
  cellDivs[indexOf(0,0)].innerHTML = "";
  cellDivs[indexOf(0,1)].innerHTML = "9";
  cellDivs[indexOf(0,2)].innerHTML = "";
  cellDivs[indexOf(0,3)].innerHTML = "";
  cellDivs[indexOf(0,4)].innerHTML = "";
  cellDivs[indexOf(0,5)].innerHTML = "";
  cellDivs[indexOf(0,6)].innerHTML = "";
  cellDivs[indexOf(0,7)].innerHTML = "";
  cellDivs[indexOf(0,8)].innerHTML = "3";
  cellDivs[indexOf(1,0)].innerHTML = "";
  cellDivs[indexOf(1,1)].innerHTML = "2";
  cellDivs[indexOf(1,2)].innerHTML = "";
  cellDivs[indexOf(1,3)].innerHTML = "";
  cellDivs[indexOf(1,4)].innerHTML = "6";
  cellDivs[indexOf(1,5)].innerHTML = "";
  cellDivs[indexOf(1,6)].innerHTML = "";
  cellDivs[indexOf(1,7)].innerHTML = "";
  cellDivs[indexOf(1,8)].innerHTML = "5";
  cellDivs[indexOf(2,0)].innerHTML = "";
  cellDivs[indexOf(2,1)].innerHTML = "1";
  cellDivs[indexOf(2,2)].innerHTML = "";
  cellDivs[indexOf(2,3)].innerHTML = "";
  cellDivs[indexOf(2,4)].innerHTML = "9";
  cellDivs[indexOf(2,5)].innerHTML = "2";
  cellDivs[indexOf(2,6)].innerHTML = "7";
  cellDivs[indexOf(2,7)].innerHTML = "";
  cellDivs[indexOf(2,8)].innerHTML = "";
  cellDivs[indexOf(3,0)].innerHTML = "";
  cellDivs[indexOf(3,1)].innerHTML = "";
  cellDivs[indexOf(3,2)].innerHTML = "";
  cellDivs[indexOf(3,3)].innerHTML = "";
  cellDivs[indexOf(3,4)].innerHTML = "3";
  cellDivs[indexOf(3,5)].innerHTML = "";
  cellDivs[indexOf(3,6)].innerHTML = "";
  cellDivs[indexOf(3,7)].innerHTML = "";
  cellDivs[indexOf(3,8)].innerHTML = "";
  cellDivs[indexOf(4,0)].innerHTML = "5";
  cellDivs[indexOf(4,1)].innerHTML = "";
  cellDivs[indexOf(4,2)].innerHTML = "";
  cellDivs[indexOf(4,3)].innerHTML = "";
  cellDivs[indexOf(4,4)].innerHTML = "2";
  cellDivs[indexOf(4,5)].innerHTML = "";
  cellDivs[indexOf(4,6)].innerHTML = "";
  cellDivs[indexOf(4,7)].innerHTML = "3";
  cellDivs[indexOf(4,8)].innerHTML = "7";
  cellDivs[indexOf(5,0)].innerHTML = "";
  cellDivs[indexOf(5,1)].innerHTML = "6";
  cellDivs[indexOf(5,2)].innerHTML = "";
  cellDivs[indexOf(5,3)].innerHTML = "";
  cellDivs[indexOf(5,4)].innerHTML = "4";
  cellDivs[indexOf(5,5)].innerHTML = "";
  cellDivs[indexOf(5,6)].innerHTML = "";
  cellDivs[indexOf(5,7)].innerHTML = "1";
  cellDivs[indexOf(5,8)].innerHTML = "";
  cellDivs[indexOf(6,0)].innerHTML = "";
  cellDivs[indexOf(6,1)].innerHTML = "";
  cellDivs[indexOf(6,2)].innerHTML = "";
  cellDivs[indexOf(6,3)].innerHTML = "9";
  cellDivs[indexOf(6,4)].innerHTML = "";
  cellDivs[indexOf(6,5)].innerHTML = "3";
  cellDivs[indexOf(6,6)].innerHTML = "";
  cellDivs[indexOf(6,7)].innerHTML = "";
  cellDivs[indexOf(6,8)].innerHTML = "";
  cellDivs[indexOf(7,0)].innerHTML = "6";
  cellDivs[indexOf(7,1)].innerHTML = "";
  cellDivs[indexOf(7,2)].innerHTML = "";
  cellDivs[indexOf(7,3)].innerHTML = "4";
  cellDivs[indexOf(7,4)].innerHTML = "";
  cellDivs[indexOf(7,5)].innerHTML = "";
  cellDivs[indexOf(7,6)].innerHTML = "3";
  cellDivs[indexOf(7,7)].innerHTML = "";
  cellDivs[indexOf(7,8)].innerHTML = "";
  cellDivs[indexOf(8,0)].innerHTML = "8";
  cellDivs[indexOf(8,1)].innerHTML = "";
  cellDivs[indexOf(8,2)].innerHTML = "";
  cellDivs[indexOf(8,3)].innerHTML = "";
  cellDivs[indexOf(8,4)].innerHTML = "7";
  cellDivs[indexOf(8,5)].innerHTML = "";
  cellDivs[indexOf(8,6)].innerHTML = "";
  cellDivs[indexOf(8,7)].innerHTML = "";
  cellDivs[indexOf(8,8)].innerHTML = "4";
}
const handleSolve = () => {
  //runExample7();
  let mat = [];
  for(let i=0; i<9; i++) {
    mat[i] = new Array(9).fill(0);
  }
  let str = ""
  for(let index = 0; index < 81; index++){
    if(!Number.isNaN(parseInt(cellDivs[index].innerHTML))) {
      mat[rowOf(index)][colOf(index)] = parseInt(cellDivs[index].innerHTML);
    }
  }
  for (let row of SudokuGrid.I){
    for(let col of SudokuGrid.I){
      str += mat[row][col].toString();
    }
  }
  console.log(str)


  sudo = new SudokuGrid(mat);
  sudo.solve();
  createList(sudo.stagesList)
  fillGrid(0);
  let strRes = ""
  for (let row of SudokuGrid.I){
    for(let col of SudokuGrid.I){
      strRes += sudo.grid[row][col].value.toString();
    }
  }
  console.log(strRes)

};

const handleReset = () => {

  for(let index = 0; index < 81; index++){
    cellDivs[index].innerHTML = "";
    cellDivs[index].style.visibility = "visible";
  }
};

let createList = (stageList)=>{
  let list = document.getElementById('list');
  let i, n = stageList.length;
  for(i = 0; i < n; i++){
    stage = stageList[i];
    let liNode = document.createElement("LI");
    liNode.innerHTML = stage;
    list.appendChild(liNode);
  }
  listItems = document.getElementById("list").childNodes;
  for(const itDiv of listItems){
    itDiv.addEventListener('click', handleListClick)
  }
}
let changeSelectedCell = (newCell)=>{
  if(selectedCell != null){
    selectedCell.style.border = "none";
  }
  if(newCell == selectedCell){
    selectedCell = null
  }
  else{
    selectedCell = newCell;
    selectedCell.style.border = "3px solid #44A8FB";
    //selectedCell.style.visibility = "hidden";
  }
}
let printGrid = (index)=>{
  let grid = sudo.allGrids[index];
  let row, col, str;
  for(row = 0; row < 9; row++){
    str = "";
    for(col = 0; col < 9; col++){
      str = str.concat(grid[row][col].value + " ");
    }
    console.log(str);
  }
  console.log(" ");
}
let nextSelectedCell = () =>{
  let index = selectedIndex(), row = rowOf(index), col = colOf(index)+1;
  if(col === 9){
    col = 0; row++;
    if(row === 9){
      row = 0;
    }
  }
  changeSelectedCell(cellDivs[indexOf(row, col)])
}
const handleCellClick = (e) => {
  let newCell = e.target;
  changeSelectedCell(newCell);
};
function keyPush(key){
  const keyCode = key.keyCode;
  if(37 <= keyCode && keyCode <= 40){
    let index = selectedIndex();
    let row = rowOf(index), col = colOf(index);
    switch (keyCode) {
            case 37: //left arrow
              col = col-1;
              if(col < 0){
                col = 8;
              }
              break;
            case 38://up arrow
              row = (row-1);
              if(row < 0){
                row = 8;
              }
              break;
            case 39://right arrow
              col = (col+1);
              if(8 < col){
                col = 0;
              }
              break;
            case 40://down arrow
              row = (row+1)%9;
              if(8 < row){
                row = 0;
              }
              break;
    }
    let newCell = cellDivs[indexOf(row,col)];
    changeSelectedCell(newCell);
  }
  else if(49 <= keyCode && keyCode <= 57){
    if(selectedCell != null){
      selectedCell.innerHTML = String.fromCharCode(keyCode);
      nextSelectedCell();
  }
  }
  else if(keyCode == 32 ){
    if(selectedCell != null){
      selectedCell.innerHTML = '';
      nextSelectedCell()
  }
}
}

const getListItemIndex = (listItem)=> {
  let i, itDiv, n = sudo.stagesList.length;
  for(i = 0; i <= n; i++){
    itDiv = listItems[i];
    if(listItem === itDiv){
      return i-1;
    }
  }
  return -1;
}
const handleListClick = (e) =>{
  let itClicked = e.target;
  fillGrid(getListItemIndex(itClicked));
}


// event listeners
solveDiv.addEventListener('click', handleSolve);
resetDiv.addEventListener('click', handleReset);


for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}
let selectedIndex = () => {
  for (let i = 0; i < 81; i++) {
    let c = cellDivs[i];
    if (c === selectedCell) {
      return i;
    }
  }
    return -1;

}
let boxOf = (row, col) => 3*Math.floor(row/3) + Math.floor(col/3);
let indexOf = (row,col) => boxOf(row,col)*9 + 3*(row%3) + col%3
let boxInGrid = (index) => Math.floor(index/9);
let cellInBox = index => index%9;
let rowOf = (index) => Math.floor(cellInBox(index)/3)+ 3*Math.floor(boxInGrid(index)/3);
let colOf = (index) => cellInBox(index)%3 + 3*(boxInGrid(index)%3);




class SudokuCell{
  constructor() {
    this.value = 0;
    this.fixed = false;
    this.avSet = null;
    this.changed = false;
    this.changedAvSet = new Set();
    this.rootAvSet = new Set();
  }
  hasValue() {
    return this.value !== 0;
  }
  safeAvSetRemove(num){
    if(!this.hasValue() && this.avSet.has(num)){
      this.avSet.delete(num);
      if(this.avSet.size === 0){
        throw "Unsolvable puzzle";
      }
      return true
    }
    else{
      return false
    }
  }
  deepCopy(){
    let res = new SudokuCell()
    res.value = this.value
    res.fixed = this.fixed
    if(this.avSet != null) {
      res.avSet = new Set()
      for (let omega of this.avSet) {
        res.avSet.add(omega)
      }
    }
    return res;
  }
}



class Bracket{
  indexOfRow(rowIndex){
    return rowIndex;
  }
  indexOfCol(colIndex){
    return SudokuGrid.n + colIndex;
  }
  indexOfBox(boxIndex){
    return 2*SudokuGrid.n + boxIndex;
  }
  rowOfBox(boxIndex, cellIndex){
    let root = Math.floor(Math.sqrt(SudokuGrid.n));
    return root*Math.floor(boxIndex/root) + Math.floor(cellIndex/root);
  }

  getRow(bracketIndex, cellIndex){
    if(bracketIndex < SudokuGrid.n){ // bracket is a row
      return bracketIndex;
    }
    else if (bracketIndex < 2*SudokuGrid.n){// bracket is a col
      return cellIndex;
    }
    else{ // bracket is a box
      return this.rowOfBox(bracketIndex-2*SudokuGrid.n, cellIndex);
    }
  }

  colOfBox(boxIndex, cellIndex){
    let root = Math.floor(Math.sqrt(SudokuGrid.n));
    return root*(boxIndex%root) + (cellIndex%root);
  }
  getCol(bracketIndex, cellIndex){
    if(bracketIndex < SudokuGrid.n){ // bracket is a row
      return cellIndex;
    }
    else if (bracketIndex < 2*SudokuGrid.n){
      return bracketIndex-SudokuGrid.n;
    }
    else{
      return this.colOfBox(bracketIndex-2*SudokuGrid.n, cellIndex);
    }
  }

  defineInversePartitions(){
    this.inversePartitions = []
    for (let bracket of this.all) {
      let partitionImage = []
      for(let omega of SudokuGrid.Omega){
        let imageElement = new Set()
        for(let index of SudokuGrid.I){
          let cell = bracket[index];
          if(cell.avSet !== null && cell.avSet.has(omega)){
            imageElement.add(index);
          }
        }
        if(0 < imageElement.size) {
          partitionImage.push(imageElement)
        }
        else{
          partitionImage.push(null);
        }
      }
      this.inversePartitions.push(new Partition(SudokuGrid.Omega, partitionImage))
    }
  }

  definePartitions(){
    this.partitions = []
    for (let bracket of this.all) {
      let partitionImage = []
      for (let cell of bracket) {
        partitionImage.push(cell.avSet)
      }
      this.partitions.push(new Partition(SudokuGrid.I, partitionImage))
    }

  }

  getNormalPartition(bracket, omega){
    let res = new Set()
    for(let cellIndex of SudokuGrid.I){
      let cell = bracket[cellIndex];
      if(cell.avSet !== null && cell.avSet.has(omega)){
        res.add(cellIndex)
      }
    }
    if(res.size === 0){
      return null
    }
    else {
      return res
    }
  }


  createNormalPartitions(partitions, bracketArray){
    partitions.push(null);
    for(let omega of SudokuGrid.Omega){
      let normalImage = []
      for(let bracketIndex of SudokuGrid.I){
        normalImage.push(this.getNormalPartition(bracketArray[bracketIndex],omega))
      }
      partitions.push(new Partition(SudokuGrid.I, normalImage))
    }
  }
  defineNormalPartitions(){
    this.normalRowPartition = []
    this.createNormalPartitions(this.normalRowPartition, this.row);
    this.normalColPartition = []
    this.createNormalPartitions(this.normalColPartition, this.col);
  }

  assignBracket(sudoku){
    for(let i of SudokuGrid.I){
      this.row.push(sudoku.grid[i]);
      this.col.push(Array(9));
      this.box.push(Array(9));
      const boxIndexes = sudoku.boxIndexes(i)
      for(let j of SudokuGrid.I){
        this.col[i][j] = sudoku.grid[j][i];
        this.box[i][j] = boxIndexes[j];
      }
      for(let i of SudokuGrid.I){
        this.all[i] = this.row[i];
        this.all[SudokuGrid.n + i] = this.col[i];
        this.all[2*SudokuGrid.n + i] = this.box[i];
      }
    }
  }

  getImage(index){
    let res = new Set();
    let bracket = this.all[index];
    for(let cell of bracket) {
      if (cell.hasValue()) {
        if (res.has(cell.value)) {
          throw "Bracket constraint violated";
        } else {
          res.add(cell.value);
        }
      }
    }
    return res;
  }

  constructor(sudoku) {
    this.row = [];
    this.rowImage = new Array(SudokuGrid.n);
    this.col = [];
    this.colImage = new Array(SudokuGrid.n);
    this.box = [];
    this.boxImage = new Array(SudokuGrid.n);
    this.all = new Array(3*SudokuGrid.n);
    this.allImage = new Array(3*SudokuGrid.n);
    this.assignBracket(sudoku);
    for(let i of SudokuGrid.I){
      this.rowImage[i] = this.getImage(i)
      this.colImage[i] = this.getImage(SudokuGrid.n + i)
      this.boxImage[i] = this.getImage(2*SudokuGrid.n + i)
      this.allImage[i] = this.rowImage[i];
      this.allImage[SudokuGrid.n + i] = this.colImage[i];
      this.allImage[2*SudokuGrid.n + i] = this.boxImage[i];
    }
  }
}

class Partition{

  eqSet(set1, set2) {
    if (set1.size !== set2.size) return false;
    for (let a of set1) if (!set2.has(a)) return false;
    return true;
  }
  addCurrent(set){
    for (const elem of set){
      this.current.add(elem);
    }
  }
  minusCurrent(set){
    for(const elem of set){
      this.current.delete(elem);
    }
  }
  union(set){// no es necesario en python
    const union = new Set(this.current);
    for (const elem of set) {
      union.add(elem);
    }
    return union;
  }

  findPair(){ // lo puedes hacer en O(n) en python
    let len = this.domain.length;
    for(let i of this.valid_indexes){
      if(!this.used[i]) {
        for (let ii of this.valid_indexes) {
          if(i < ii && !this.used[ii]){
            let unionI = this.union(this.image[i]);
            let unionII = this.union(this.image[ii])
            if(unionI.size === this.m && this.eqSet(unionI,unionII)){
              this.domainRes = new Set();
              this.used[i] = true
              this.used[ii] = true
              for(let index = 0; index < len; index++){
               if(this.used[index]){
                 this.domainRes.add(this.domain[index]);
               }
              }
              this.imageRes = this.union(unionI);
              for(let imageElement of this.imageRes){
                for (let index of SudokuGrid.I){
                  if(!this.domainRes.has(this.domain[index]) && this.image[index] !== null && this.image[index].has(imageElement)) {
                    return true;
                  }
                }
              }
              this.used[i] = false;
              this.used[ii] = false;
            }
          }
        }
      }
    }
    return false;
  }
  currentCopy(){
    let set = new Set();
    for(let elem of this.current){
      set.add(elem);
    }
    return set;
  }
  clear(){
    this.imageRes = null
    this.domainRes = null
    this.current = new Set()
    this.valid_indexes = []
    for (let index of SudokuGrid.I){
      if(this.image[index] != null && this.image[index].size <= this.m){
        this.valid_indexes.push(index);
      }
    }
    this.used = new Array(SudokuGrid.n).fill(false);
  }
  getSubPartition(m){
    this.m = m
    this.clear()
    if (this.findSubPartition(m)){
      return [this.domainRes, this.imageRes]
    }
    else{
      return null
    }
  }
  findSubPartition(partitionSize){
    if(partitionSize === 2){
      let used_elem = []
      for(let j of SudokuGrid.I){
        if(this.used[j]){
          used_elem.push(j);
        }
      }
      return this.findPair();
    }
    else{
      for(let i of this.valid_indexes){
        if(!this.used[i]) {
          this.used[i] = true;
          let pastCurrent = this.currentCopy();
          this.addCurrent(this.image[i]); // diferente en python
          if (this.current.size <= this.m) {
            if (this.findSubPartition(partitionSize - 1)) {
              return true;
            }
          }
          this.used[i] = false;
          this.current = pastCurrent; //diferente en python
        }
      }
      return false;
    }
  }


  constructor(domain, image) {
    this.domain = domain
    this.image = image
    this.used = []
    for (let i of SudokuGrid.I){
        this.used.push(false);
    }
    this.current =  new Set();
  }
}

let rowType = "ROW";
let colType = "COL";
let boxType = "BOX";

class SudokuGrid{
  boxOf(row, col){
    let root = Math.floor((Math.sqrt(SudokuGrid.n)));
    return root*Math.floor(row/root) + Math.floor(col/root);
  }
  rowOf(box, cell){
    let root = Math.floor((Math.sqrt(SudokuGrid.n)));
    return root*Math.floor(box/root) + Math.floor(cell/root);
  }
  colOf(box, cell){
    let root = Math.floor((Math.sqrt(SudokuGrid.n)));
    return root*Math.floor(box%root) + Math.floor(cell%root);
  }
  boxIndexes(index){
    let res = [];
    let root = Math.floor(Math.sqrt(SudokuGrid.n)), startRow = root*Math.floor(index/root), startCol = root*Math.floor(index%root);
    for(let i = 0; i < root; i++){
      for(let j =0; j < root; j++){
        res.push(this.grid[startRow+i][startCol+j]);
      }
    }
    return res;
  }
  defineAvailableSets(){
    let row, col, val;
    let cell;
    for(row = 0; row < SudokuGrid.n; row++){
      for(col = 0; col < SudokuGrid.n; col++){
        cell = this.grid[row][col];
        if(!cell.hasValue()){
          for(val = 1; val <= SudokuGrid.n; val++){
            if(this.brackets.rowImage[row].has(val) || this.brackets.colImage[col].has(val) || this.brackets.boxImage[this.boxOf(row,col)].has(val)){
              cell.avSet.delete(val);
            }
          }
        }
      }
    }
  }

  updateNeighborsAvailableSet(row, col, num){
    for(let it = 0; it < SudokuGrid.n; it++){
      this.brackets.row[row][it].safeAvSetRemove(num);
      this.brackets.col[col][it].safeAvSetRemove(num);
      this.brackets.box[boxOf(row,col)][it].safeAvSetRemove(num);
    }
}
  updateCell(row, col, num){
    this.grid[row][col].value = num;
    this.grid[row][col].avSet = null;
    if(this.brackets.rowImage[row].has(num) || this.brackets.colImage[col].has(num) || this.brackets.boxImage[this.boxOf(row,col)].has(num)){
      throw "Unsolvable puzzle";
    }
    this.brackets.rowImage[row].add(num);
    this.brackets.colImage[col].add(num);
    this.brackets.boxImage[this.boxOf(row,col)].add(num);
    this.updateNeighborsAvailableSet(row,col,num);
  }

  stageOne(){
    let changes = false;
    let changedCells = [];
    let row, col;
    for(row = 0; row < SudokuGrid.n; row++){
      for(col = 0; col < SudokuGrid.n; col++){
        let cell = this.grid[row][col];
        if(!cell.hasValue() && cell.avSet.size === 1){
          changedCells.push([row,col]);
          changes = true;
          let [num] = cell.avSet;
          this.updateCell(row, col, num);
        }
      }
    }
    if(changes) {
      this.addDeepCopy("stage 1", changedCells);
    }
    return changes
  }

  bracketHasAllCandidates(bracketIndex, map){
    // Checks if all the candidates are in a bracket in at leas one cell, or as a cell's value.
    // if not, then there is an error in the grid.
    for(let omega of SudokuGrid.Omega){
      if(!this.brackets.allImage[bracketIndex].has(omega) && !map.has(omega)){
        throw "Candidate missing in bracket";
      }
    }
  }
  stageTwo(){
    //Hermit elimination. Assigns a value to a cell, when it is the only one in a bracket with a specific candidate.
    let changes = false;
    let changedCells = [];
    for (let bracketIndex = 0; bracketIndex < this.brackets.all.length; bracketIndex++) {
      let bracket = this.brackets.all[bracketIndex];
      let map = new Map();
      for (let cellIndex of SudokuGrid.I) {
        let cell = bracket[cellIndex];
        if(!cell.hasValue()) {
          for (let candidate of cell.avSet) {
            if (map.has(candidate)) {
              map.set(candidate, -1);
            } else {
              map.set(candidate, cellIndex);
            }
          }
        }

      }

      for (let [candidate, cellIndex] of map) {
        if (0 <= cellIndex) {
          let row = this.brackets.getRow(bracketIndex, cellIndex), col = this.brackets.getCol(bracketIndex, cellIndex);
          this.updateCell(row, col, candidate);
          changes = true;
          changedCells.push([row,col]);
        }
      }
      this.bracketHasAllCandidates(bracketIndex, map)
    }
    if(changes){
      this.addDeepCopy("stage 2", changedCells);
    }
    return changes
  }
  rootDiv(index){
    return Math.floor(index/Math.sqrt(SudokuGrid.n));
  }
  rootMod(index){
    return Math.floor(index%Math.sqrt(SudokuGrid.n));
  }
  getTargetBracket(rootIndex, targetIndex, rootType, targetType){
    if(rootType === rowType){
      return this.brackets.box[this.boxOf(rootIndex, Math.sqrt(SudokuGrid.n)*targetIndex)];
    }
    else if(rootType === colType){
      return this.brackets.box[this.boxOf(Math.sqrt(SudokuGrid.n)*targetIndex, rootIndex)];
    }
    else{
      if(targetType === rowType){
        return this.brackets.row[this.rowOf(rootIndex, Math.sqrt(SudokuGrid.n)*targetIndex)];
      }
      else{
        return this.brackets.col[this.colOf(rootIndex, targetIndex)];
      }
    }
  }
  pruneBracket(targetBracket, intersection, candidate){
    let res = false;
    for (let cell of targetBracket){
      if(!intersection.has(cell)){
        if(cell.avSet !== null && cell.avSet.has(candidate)) {
          for(let inCell of intersection){
            inCell.rootAvSet.add(candidate);
          }
          cell.safeAvSetRemove(candidate);
          cell.changedAvSet.add(candidate);
          res = true;
        }
      }
    }
    return res;
  }

  clearRootAndChanged(){
    for(let row of SudokuGrid.I){
      for(let col of SudokuGrid.I){
        let cell = this.grid[row][col];
        cell.changedAvSet.clear();
        cell.rootAvSet.clear();
      }
    }
  }

  findIntersection(rootBracketArray, splitFunction, rootType, targetType) {
    let res = false;
    let targetMap = new Map();
    let cellIndexMap = new Map();
    for (let rootIndex of SudokuGrid.I) {
      targetMap.clear();
      cellIndexMap.clear();
      let root = rootBracketArray[rootIndex];
      for (let cellIndex of SudokuGrid.I) {
        let cell = root[cellIndex];
        let targetIndex = splitFunction(cellIndex);

        if(!cell.hasValue()) {
          for (let candidate of cell.avSet) {
            if (!targetMap.has(candidate)) {
              targetMap.set(candidate, targetIndex);
              cellIndexMap.set(candidate, [cellIndex]);
            } else {
              if (targetMap.get(candidate) === targetIndex) {
                cellIndexMap.set(candidate, cellIndexMap.get(candidate).concat([cellIndex]))
              } else {
                cellIndexMap.delete(candidate)
                targetMap.set(candidate,-1);
              }
            }
          }
        }

      }
      for (let [candidate, targetIndex] of targetMap){
        if(targetIndex !== -1){
          let targetBracket = this.getTargetBracket(rootIndex, targetIndex, rootType, targetType);
          let getCell = (index) => {return root[index]};
          let intersection = new Set(cellIndexMap.get(candidate).map(getCell));
          let pruneRes = this.pruneBracket(targetBracket, intersection, candidate);
          res = res || pruneRes;
        }
      }
    }
    return res;
  }

  stageThree(){
    let rowIntersections = this.findIntersection(this.brackets.box, this.rootDiv, boxType, rowType);
    let colIntersections = this.findIntersection(this.brackets.box, this.rootMod, boxType, colType);
    let boxRIntersections = this.findIntersection(this.brackets.row, this.rootDiv, rowType, boxType);
    let boxCIntersections = this.findIntersection(this.brackets.col, this.rootDiv, colType, boxType);
    let changes = rowIntersections || colIntersections || boxRIntersections || boxCIntersections;
    if(changes){
      this.addDeepCopy("stage 3", []);
    }
    return changes
  }

  pruneCells(cells, values){
    for(let cell of cells){
      for(let omega of values){
        cell.safeAvSetRemove(omega);
      }
    }
  }

  findNakedSubsets(m) {
    for (let index = 0; index < 3 * SudokuGrid.n; index++){
        let partition = this.brackets.partitions[index];
        let subPartition = partition.getSubPartition(m);
        if(subPartition !== null){
          let bracket = this.brackets.all[index];
          let nakedIndexes = subPartition[0];
          let pruneCells = []
          let sourceCells = []
          for(let i of SudokuGrid.I){
            if(!nakedIndexes.has(i)){
              pruneCells.push(bracket[i]);
            }
            else{
              sourceCells.push(bracket[i]);
            }
          }
          let nakedValues = subPartition[1];
          let pruneValues = Array.from(nakedValues);
          //console.log("NAKED SUBSET FOUND, Bracket: ", index, ", -cells: ", subPartition[0], " -values: ", subPartition[1])

          for(let value of nakedValues){
            for(let cell of pruneCells){
              if(cell.avSet != null && cell.avSet.has(value)) {
                cell.changedAvSet.add(value)
              }
            }
            for (let cell of sourceCells){
              if(cell.avSet != null && cell.avSet.has(value)) {
                cell.rootAvSet.add(value)
              }
            }
          }
          this.pruneCells(pruneCells, pruneValues);
          this.addDeepCopy('Naked Subset')
          return true;
        }
    }
    return false
  }

  findHiddenSubsets(m){
    for (let index = 0; index < 3 * SudokuGrid.n; index++){
      let partition = this.brackets.inversePartitions[index];
      let subPartition = partition.getSubPartition(m);
      if(subPartition !== null){
        let bracket = this.brackets.all[index];
        let hiddenIndexes = subPartition[1];
        let pruneCells = []
        for(let i of SudokuGrid.I){
          if(hiddenIndexes.has(i)) {
            pruneCells.push(bracket[i]);
          }
        }
        let hiddenValues = subPartition[0];
        let pruneValues = []
        for(let i of SudokuGrid.Omega){
          if(!hiddenValues.has(i)){
            pruneValues.push(i);
          }
        }
        for(let cell of pruneCells){
          for (let omega of SudokuGrid.Omega){
            if(hiddenValues.has(omega)){
              cell.rootAvSet.add(omega)
            }
            else{
              if(cell.avSet != null && cell.avSet.has(omega)) {
                cell.changedAvSet.add(omega)
              }
            }
          }
        }

        //console.log("HIDDEN SUBSET FOUND, Bracket: ", index, ", -cells: ", hiddenIndexes, " -values: ", hiddenValues)
        this.pruneCells(pruneCells, pruneValues)
        this.addDeepCopy('Hidden Subset')
        return true;
      }
    }
    return false
  }

  define_bracket_partitions(){
    this.brackets.definePartitions()
    this.brackets.defineInversePartitions()
  }

  stageFour(m){
    return  this.findNakedSubsets(m) || this.findHiddenSubsets(m)
  }

  define_normal_partitions(){
    this.brackets.defineNormalPartitions();
  }

  stageFive(m){
    let subPartition = null;
    for(let omega of SudokuGrid.Omega){
        subPartition = this.brackets.normalRowPartition[omega].getSubPartition(m)
        if(subPartition !== null){
          let exceptionIndexes = subPartition[0];
          let pruneBracketIndexes = subPartition[1];
          let pruneBrackets = [];
          for(let i of pruneBracketIndexes){
            pruneBrackets.push(this.brackets.col[i])
          }
          this.pruneNormalDifference(pruneBrackets, exceptionIndexes, omega, 'Row');
          return true;
        }
        subPartition = this.brackets.normalColPartition[omega].getSubPartition(m)
        if(subPartition !== null){
          let exceptionIndexes = subPartition[0];
          let pruneBracketIndexes = subPartition[1];
          let pruneBrackets = [];
          for(let i of pruneBracketIndexes){
            pruneBrackets.push(this.brackets.row[i])
          }
          this.pruneNormalDifference(pruneBrackets, exceptionIndexes, omega, 'Column');
          return true;
        }
    }
    return false
  }

  pruneNormalDifference(pruneBrackets, exceptionIndexes, omega, sourceType){
    for(let bracket of pruneBrackets){
      for(let index of SudokuGrid.I){
        let cell = bracket[index];
        if(!exceptionIndexes.has(index)){
          if(cell.safeAvSetRemove(omega)){
            cell.changedAvSet.add(omega)
          }
        }
        else{
          if(cell.avSet != null && cell.avSet.has(omega)){
            cell.rootAvSet.add(omega)
          }
        }
      }
    }
    this.addDeepCopy(sourceType + ' Orthogonal')
  }

  isFinished(){
    for(let index of SudokuGrid.I){
      if(this.brackets.rowImage[index].size !== 9){
        return false;
      }
    }
    return true;
  }
  solve(){
    this.stagesListStr = []
    while(!this.isFinished()) {
      if (this.stageOne()) {
        this.stagesListStr.push('Stage 1')
      } else {
        if (this.stageTwo()) {
          this.stagesListStr.push('Stage 2')
        }
        else{
          if(this.stageThree()){
            this.stagesListStr.push('Stage 3')
          }
          else{
            let m, half = Math.floor(SudokuGrid.n/2)
            this.define_bracket_partitions()
            this.define_normal_partitions()
            for(m = 2; m<= half; m++){
              if (this.stageFour(m)){
                this.stagesListStr.push('Stage 4')
                break;
              }
              if(this.stageFive(m)){
                this.stagesListStr.push('Stage 5')
                break;
              }
            }
            if(half < m){
              if(!this.isFinished()){
                let arr = this.findBacktrackCandidate()
                let row = arr[0], col = arr[1], omega = arr[2]
                let backtrackGrid = new SudokuGrid(this)
                backtrackGrid.updateCell(row, col, omega)
                try {
                  if (backtrackGrid.solve()) {
                    for(let g of backtrackGrid.allGrids) {
                      this.allGrids.push(g)
                    }
                    for(let s of backtrackGrid.stagesList){
                      this.stagesList.push(s)
                    }
                    this.stagesListStr.push('Backtrack')
                    this.stagesListStr = this.stagesListStr.concat(backtrackGrid.stagesListStr)
                    this.grid = backtrackGrid.grid;
                    return true;
                  } else {
                    this.pruneCells([this.grid[row][col]], [omega])
                  }
                }
                catch (error){
                  this.stagesListStr.push('Backtrack Prune')
                  this.pruneCells([this.grid[row][col]], [omega])
                }
              }

            }
          }
        }
      }
    }
    if(this.isFinished()){
      return true;
    }
    else{
      return false;
    }

  }

  rateBracket(mainCell, bracket, omega, rateArray){
    for(let cell of bracket){
      if(cell !== mainCell && cell.avSet !== null && cell.avSet.has(omega)){
        let av_set_size = cell.avSet.size
        if(2 <= av_set_size){
          rateArray[av_set_size-2]++;
        }
      }
    }
  }
  xor(condition1, condition2){
    return (condition1 && !condition2) || (!condition1 && condition2);
  }
  substractRepeatedCells(row, col, omega, rateArray){
    let root = Math.sqrt(SudokuGrid.n)
    let fullBox = this.brackets.box[this.boxOf(row,col)]
    let repeatedCells = []
    for(let index of SudokuGrid.I){
      if(this.xor(Math.floor(index/root) === row%root, index%root === col%root)){
        repeatedCells.push(fullBox[index]);
      }
    }

    for(let cell of repeatedCells){
        if(cell.avSet != null && cell.avSet.has(omega) && 2 <= cell.avSet.size){
          rateArray[cell.avSet.size-2]--;
        }
    }
  }
  rateCellCandidate(row, col, omega){
    let rateArray = new Array(SudokuGrid.n).fill(0);
    let cell = this.grid[row][col]
    rateArray[cell.avSet.size-2]++;
    this.rateBracket(cell, this.brackets.row[row], omega, rateArray);
    this.rateBracket(cell, this.brackets.col[col], omega, rateArray);
    this.rateBracket(cell, this.brackets.box[this.boxOf(row,col)], omega, rateArray);
    this.substractRepeatedCells(row, col, omega, rateArray)
    return rateArray;
  }

  findBacktrackCandidate(){
    let selectedRow, selectedCol, selectedOmega
    let max = new Array(SudokuGrid.n).fill(0)
    for(let row of SudokuGrid.I){
      for(let col of SudokuGrid.I){
        let cell = this.grid[row][col]
        if (cell.avSet !== null) {
          for (let omega of cell.avSet) {
            let current = this.rateCellCandidate(row, col, omega);
            for (let index of SudokuGrid.I) {
              if (max[index] < current[index]) {
                max = current;
                selectedRow = row;
                selectedCol = col;
                selectedOmega = omega;
              } else if (current[index] < max[index]) {
                break;
              }
            }
          }
        }
      }
    }
    //console.log('BACKTRACK: ','row: ', selectedRow, ' col: ', selectedCol, '  omega: ', selectedOmega)
    return [selectedRow, selectedCol, selectedOmega];
  }



  addDeepCopy(str, changedCells = []){
    let i,j,k, cell;
    let newGrid = new Array(9);
    for(i=0; i<9; i++) {
      newGrid[i] = new Array(9);
      for(j = 0; j < 9; j++){
        newGrid[i][j] = new SudokuCell();
      }
    }
    for(i=0 ; i < 9; i++){
      for(j = 0; j < 9; j++){
        cell = newGrid[i][j];
        cell.fixed = this.grid[i][j].fixed;
        if(!this.grid[i][j].hasValue()) {
          cell.avSet = new Set();
          cell.changedAvSet = new Set();
          cell.rootAvSet = new Set();
          for (k = 1; k <= 9; k++) {
            if(this.grid[i][j].avSet.has(k)) {
              cell.avSet.add(k)
              if (this.grid[i][j].rootAvSet.has(k)) {
                cell.rootAvSet.add(k)
              }
            }
            else if (this.grid[i][j].changedAvSet.has(k)){
              cell.changedAvSet.add(k)
            }
          }
        }
        else{
          cell.value = this.grid[i][j].value;
        }
      }
    }
    for(let pair of changedCells){
      newGrid[pair[0]][pair[1]].changed = true;
    }
    this.allGrids.push(newGrid);
    this.stagesList.push(str);
    this.clearRootAndChanged();
  }
  static n = 9;
  static I = Array.from(Array(SudokuGrid.n).keys())
  static Omega = Array.from({length: SudokuGrid.n}, (_, i) => i + 1)
  constructor(numberGrid){
    if(numberGrid instanceof  SudokuGrid){
      this.allGrids = [];
      this.stagesList = [];
      this.grid = new Array(9)
      for(let i of SudokuGrid.I){
        this.grid[i] = new Array(9)
      }
      for(let row of SudokuGrid.I){
        for(let col of SudokuGrid.I){
          this.grid[row][col] = numberGrid.grid[row][col].deepCopy();
        }
      }
      this.brackets = new Bracket(this)
      this.addDeepCopy('Backtrack')
    }
    else {
      this.allGrids = [];
      this.stagesList = [];
      this.grid = new Array(9);
      for (let i = 0; i < 9; i++) {
        this.grid[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
          this.grid[i][j] = new SudokuCell();
        }
      }
      let i, j, value;
      for (i = 0; i < SudokuGrid.n; i++) {
        for (j = 0; j < SudokuGrid.n; j++) {
          value = numberGrid[i][j];
          if (value !== 0) {
            this.grid[i][j].value = value;
            this.grid[i][j].fixed = true;
          } else {
            this.grid[i][j].avSet = new Set();
            for (let k = 1; k <= SudokuGrid.n; k++) {
              this.grid[i][j].avSet.add(k);
            }
          }
        }
      }
      this.brackets = new Bracket(this);
      this.defineAvailableSets();
      this.addDeepCopy("stage 0");
    }

  }

}
imageR = [new Set([1,5]), new Set([1,2,4,5]), new Set([2,4,5,7]), new Set([1,5,6,8]), new Set([1,5,6,8]), new Set([3,5,6,7,8]), new Set([1,6]), null,  new Set([3,4,6])]

