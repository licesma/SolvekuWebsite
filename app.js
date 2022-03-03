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

    console.log("length: ",sudo.allGrids.length, ", index: ", index)

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
            candidate.style.visibility = "hidden";
          }
          else{
            candidate.style.visibility = "visible";
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

const handleSolve = () => {
  runExample3();

  let mat = [];
  for(let i=0; i<9; i++) {
    mat[i] = new Array(9).fill(0);
  }
  for(let index = 0; index < 81; index++){
    if(!Number.isNaN(parseInt(cellDivs[index].innerHTML))) {
      mat[rowOf(index)][colOf(index)] = parseInt(cellDivs[index].innerHTML);
    }
  }
  sudo = new SudokuGrid(mat, 9);
  sudo.solve();
  createList(sudo.stagesList)
  fillGrid(0);
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
    console.log(stage);
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
  console.log("ok");
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
    this.changedAvSet = null;
  }
  hasValue() {
    return this.value !== 0;
  }
  safeAvSetRemove(num){
    if(!this.hasValue() && this.avSet.has(num)){
      this.avSet.delete(num);
    }
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
    let root = Math.round(Math.sqrt(SudokuGrid.n));
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
    let root = Math.round(Math.sqrt(SudokuGrid.n));
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
    }
  }
}

let rowType = "ROW";
let colType = "COL";
let boxType = "BOX";

class SudokuGrid{
  boxOf(row, col){
    let root = Math.round((Math.sqrt(SudokuGrid.n)));
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
    console.log("row: ", row, ",   col: ", col);
    this.grid[row][col].value = num;
    this.grid[row][col].avSet = null;
    if(this.brackets.rowImage[row].has(num) || this.brackets.colImage[col].has(num) || this.brackets.boxImage[this.boxOf(row,col)].has(num)){

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
    if(changes){
      this.addDeepCopy("stage 1", changedCells);
      this.stageOne();
    }
    else{
      this.stageTwo();
    }
  }

  stageTwo(){
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
    }
    if(changes){
      this.addDeepCopy("stage 2", changedCells);
      this.stageTwo();
    }
  }
  rootDiv(index){
    return Math.round(index/Math.sqrt(SudokuGrid.n));
  }
  rootMod(index){
    return Math.round(index%Math.sqrt(SudokuGrid.n));
  }
  getTargetBracket(rootIndex, cellIndex, rootType, targetType){
    if(rootType === rowType){
      return this.brackets.box[this.boxOf(rootIndex, cellIndex)];
    }
    else if(rootType === colType){
      return this.brackets.box[this.boxOf(cellIndex, rootIndex)];
    }
    else{
      if(targetType === rowType){
        return this.brackets.row[this.rowOf(rootIndex, cellIndex)];
      }
      else{
        return this.brackets.col[this.colOf(rootIndex, cellIndex)];
      }
    }
  }
  pruneBracket(targetBracket, intersection, candidate){
    for (let cell of targetBracket){
      if(!intersection.has(cell)){
        if(cell.avSet !== null && cell.avSet.has(candidate)) {
          cell.safeAvSetRemove(candidate);
          console.log(cell)
        }
      }
    }
  }

  findIntersection(bracketArray, splitFunction, rootType, targetType) {
    let targetMap = new Map();
    let cellIndexMap = new Map();
    let res = []
    for (let rootIndex of SudokuGrid.I) {
      targetMap.clear();
      cellIndexMap.clear();
      let root = bracketArray[rootIndex];
      for (let cellIndex of SudokuGrid.I) {
        let cell = root[cellIndex];
        let targetIndex = splitFunction(cellIndex);

        if(! cell.hasValue()) {
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
          console.log(candidate)
          let targetBracket = this.getTargetBracket(rootIndex, cellIndexMap.get(candidate)[0], rootType, targetType);
          let getCell = (index) => {return root[index]};
          let intersection = new Set(cellIndexMap.get(candidate).map(getCell));
          this.pruneBracket(targetBracket, intersection, candidate);
        }
      }
    }
  }
  stageThree(){
    let changes = false;
  }


  solve(){
    //this.stageTwo();

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
          for (k = 1; k <= 9; k++) {
            if(this.grid[i][j].avSet.has(k)) {
              cell.avSet.add(k)
            }
            else if (this.grid[i][j].changedAvSet != null && this.grid[i][j].changedAvSet.has(k)){
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

  }
  static n = 9;
  static I = Array.from(Array(SudokuGrid.n).keys())
  static Omega = Array.from({length: SudokuGrid.n}, (_, i) => i + 1)
  constructor(numberGrid, n){
    this.allGrids = [];
    this.stagesList = [];
    SudokuGrid.n = n;
    this.grid = new Array(9);
    for(let i=0; i<9; i++) {
      this.grid[i] = new Array(9);
      for(let j = 0; j < 9; j++){
        this.grid[i][j] = new SudokuCell();
      }
    }
    let i, j, value;
    for(i = 0; i < SudokuGrid.n; i++){
      for(j = 0; j < SudokuGrid.n; j++){
        value = numberGrid[i][j];
        if(value !== 0){
          this.grid[i][j].value = value;
          this.grid[i][j].fixed = true;
        }
        else{
          this.grid[i][j].avSet = new Set();
          for(let k = 1; k <= n; k++){
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
