//Empty variable to create html code for our table
var html = "";

//creating a variable that tells us how many torpedos the user has left
var torpsLeft = 25;
console.log("You have " + torpsLeft + " torpedoes left.")

//creating our board, which is an empty array holding ten empty arrays
var board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];
      // console.log(board);

//creating a ship with a value of 1. This is a constant and therefore the value of ship wont change no matter where it is placed
const SHIP = 1;

//Counting how many times the user has hit a SHIP
var shipsHit = 0;

//array that stores ship locations
var shipsArray = [];

//storing the ship array in another array to avoid loops in our radar function
var fleetArray =[];

//number of ships in our game
var fleet = 0

//Start Game
console.log("The Game starts");

//document is ready to load
$(document).ready(function() {

  createBoard();
  placeShips();

  $("td").on("click", function(){

    //if there is a ship in that position, show ship image
    if (playGame($(this)) === "SHIP") {
      $(this).addClass("ship_img");
      shipsHit++;
    }
    //if there is no ship in that position, show torpedo image
    if (playGame($(this)) === "PEDO" && torpsLeft > 0) {
      $(this).addClass("box_img");
    }

    //Updating the number of torps the user has left to use
    torpsLeft--;

    if (torpsLeft > 0 && shipsHit === 5) {
      $("h4").text("You win!!");
      $("td").off();
    }

    if (torpsLeft > 0 && shipsHit < 5) {
    //alerting the user about how many torps they have left
      $("h4").text("You have " + torpsLeft + " torpedoes left!");
    }
    if (torpsLeft === 0 && shipsHit < 5) {
      //alerting the user that they are out of moves
      $("h4").text("You are out of torpedoes! Game over.");
      //turning off the click function since the game is now over
      $(this).off();
      showShips();
    }

    //This box cannot be played again
    $(this).off();

    });
  })


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
  var randomRow;
  var randomColumn;

  while (fleet === 0) {
    //to generate a random number for each index
    randomRow = Math.floor(Math.random()*9);
    randomColumn = Math.floor(Math.random()*9);
    shipsArray.push("" + randomRow + randomColumn);

    //check if the position is empty, if it is, add a ship
    if (board[randomRow][randomColumn] != SHIP) {
      board[randomRow][randomColumn] = SHIP;
      //See where the ships are placed in the 2d array
      console.log("Ship added at " + randomRow + randomColumn);
      fleet++;
    }

  }

  while(fleet >= 1 && fleet < 5) {
    //to generate a random number for each index
    randomRow = Math.floor(Math.random()*9);
    randomColumn = Math.floor(Math.random()*9);
    shipsArray.push("" + randomRow + randomColumn);
    //check if the position is empty, if it is, add a ship
    if (board[randomRow][randomColumn] != SHIP && (radar()===true)) {
      board[randomRow][randomColumn] = SHIP;
      //See where the ships are placed in the 2d array
      console.log("Ship added at " + randomRow + randomColumn);
      fleet++;
    }
      console.log("the array after the second while loop " + shipsArray);

  }

  console.log("The final array " + shipsArray);
  fleetArray = shipsArray;
}

//This function takes an ID and turns that string into 2 integers(to use as indexes for our board)
function playGame(box) {
  var num = box.attr("id");
  console.log("box variable: " + box);
  var row = num.charAt(0);
  console.log("row variable: " + row);
  var column = num.charAt(1);
  console.log("Column var : " + column);

  //creating values to be used when placing a ship image or a bomb image
  if(board[row][column] == 1) {
    return "SHIP";
  };
  if (board[row][column] == 0) {
      return "PEDO";
  };

};

//Shows the user where all ships were placed at the end of the game
function showShips() {
  for(row = 0; row < 10; row++){
    for (col = 0; col < 10; col++) {
    if (board[row][col] == SHIP) {
      $("#"+row+col).addClass("shipsBox");
      }
    }
  }
};


function radar() {

  //create placeholders for each row and column value
  var rowDigit;
  var colDigit;

  //create empty arrays that will srtore potential row and col values per loop
  var prv = [];
  var pcv = [];

  //to keep track of ships in our radar
  var rad = 0;

  //if there is already at least one ship that has been placed
  if (fleetArray.length >= 1) {

    //loop through the array that holds all 5 ship positions
    fleetArray.forEach(function(element){

      //the first part of that element is the value of our current row
      rowDigit = parseInt(element.charAt(0));
      //the second part of that element is the value of our current column
      colDigit = parseInt(element.charAt(1));


      if ((rowDigit - 1) >= 0 && (rowDigit - 1)< 9) {
        prv.push(rowDigit - 1);
      }
      if (rowDigit >= 0 && rowDigit < 9) {
        prv.push(rowDigit + 0);
      }
      if ((rowDigit + 1) >= 0 && (rowDigit + 1) < 9) {
        prv.push(rowDigit + 1);
      }
      if ((colDigit - 1) >= 0 && (colDigit - 1) < 9) {
        pcv.push(colDigit - 1);
      }
      if (colDigit >= 0 && colDigit < 9) {
        pcv.push(colDigit + 0);
      }
      if ((colDigit + 1) >= 0 && (colDigit + 1) < 9) {
        pcv.push(colDigit + 1);
      }

      console.log(pcv);
      console.log(prv);
      //creating arrays with possible coordinates
      prv.forEach(function(row) {
        pcv.forEach(function(column) {
          if (board[row][column] === 1){

          rad++;
          }
        });
        pcv = [];
        prv= [];
      });
    });
  }

  if (rad > 0) {
    return false;
  } else if (rad === 0) {
    return true;
  }

}
