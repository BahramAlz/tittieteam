import { landing } from "./landing";
import { game } from "./game";
import { playSong } from "./song";
import { tunnel } from "./reactiveTunnel";

function main() {
  var container = document.getElementById("landingContainer");
  var button = document.createElement("button");
  var title = document.createElement("h1");
  title.innerHTML = "Enter the Titty Experience";
  title.id = "startTitle";

  container.appendChild(title);
  container.appendChild(button);
  button.innerHTML = "Start game";
  button.id = "startBtn";
  button.addEventListener("click", init);
}

function init() {
  document.getElementById("startBtn").remove();
  // playSong();
  tunnel();
  landing();
  game();
}

main();
