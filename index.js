import { landing } from "./landing";
import { game } from "./game";
import { playSong } from "./song";

function main() {
  var container = document.getElementById("landingContainer");
  var button = document.createElement("button");
  container.appendChild(button);
  button.innerHTML = "Start game";
  button.id = "startBtn";
  button.addEventListener("click", init);

  document.addEventListener("keydown", function (event) {
    if (event.key === "q") {
      // Event for pressing the Q key
      console.log("Q key pressed");
      // Add your code here to handle the event
    } else if (event.key === "w") {
      // Event for pressing the W key
      console.log("W key pressed");
      // Add your code here to handle the event
    } else if (event.key === "e") {
      // Event for pressing the E key
      console.log("E key pressed");
      // Add your code here to handle the event
    }
  });
}

function init() {
  document.getElementById("startBtn").remove();
  playSong();
  landing();
  game();
}

main();
