
//Start Game
console.log("The Game starts");

$(document).ready(function() {

for(counter = 0; counter < 10; counter++) {
  $("table").append("<tr>");

  for(counterTwo = 0; counterTwo < 10; counterTwo++) {
  $("table").append("<td id=" + counter + counterTwo + ">mrim</td>");
    }
  }

  $("table").append("</tr>");

});
