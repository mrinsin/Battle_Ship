var html = "";
//Start Game
console.log("The Game starts");

$(document).ready(function() {

  for(counter = 0; counter < 10; counter++) {
    html = html + "<tr>";

    for(counterTwo = 0; counterTwo < 10; counterTwo++) {
      html = html + "<td id=" + counter + counterTwo + ">mrim</td>";
    }

    html = html + "</tr>"
  }

$("table").append(html);
});
