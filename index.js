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
}

function init() {
  document.getElementById("startBtn").remove();
  playSong();
  landing();
  game();
}

main();
