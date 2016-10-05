//Empty variable to create html code for our table
var html = "";

//creating a variable that tells us how many torpedos the user has left
var torpsLeft = 25;
console.log("You have " + torpsLeft + " torpedoes left.")

//creating our board, which is an empty array holding ten empty arrays
var board = [[], [], [], [], [], [], [], [], [], []];
console.log(board);

//creating a ship with a value of 1. This is a constant and therefore the value of ship wont change no matter where it is placed
const SHIP = 1;

//Start Game
console.log("The Game starts");

//document is ready to load
$(document).ready(function() {

  createBoard();
  placeShips();

  $("td").on("click", function(){

    //When I click this box, an image appears
    $(this).addClass("box_img");

    //Updating the number of torps the user has left to use
    torpsLeft--;

    //alerting the user about how many torps they have left
    $("h4").text("You have " + torpsLeft + " torpedoes left!");

    //This box cannot be played again
    $(this).off();
  })
});



function print(board) {
  var b = board;

  console.log(b[0]);
  console.log(b[1]);
  console.log(b[2]);
  console.log(b[3]);
  console.log(b[4]);
  console.log(b[5]);
  console.log(b[6]);
  console.log(b[7]);
  console.log(b[8]);
  console.log(b[9]);
};

//creating a function to CREATE our game board
function createBoard() {
  //loop that creates table rows
  for(counter = 0; counter < 10; counter++) {
  html = html + "<tr>";

  //loop that creates table data and assigns it an ID correlating with the index of the corresponding array
  for(counterTwo = 0; counterTwo < 10; counterTwo++) {
    html = html + "<td id=" + counter + counterTwo + "></td>";
  }

  html = html + "</tr>"
  };

  $("table").append(html);
}

//function that randomly places 5 ships on our board
function placeShips() {
  var ships = 0
  var randomRow;
  var randomColumn;

  while(ships < 5) {
    //to generate a random number for each index
    randomRow = Math.floor(Math.random()*10);
    randomColumn = Math.floor(Math.random()*10);

    //check if the position is empty, if it is, add a ship
    if (board[randomRow][randomColumn] != SHIP) {
      board[randomRow][randomColumn] = SHIP;
      ships++;
    }

    //See where the ships are placed in the 2d array
    print(board);
  }
}

my name is timoddt9
