import { init, shortInit } from "./index";
import { resetScore } from "./score";
import { stopSong } from "./song";

function restart() {
  stopSong();
  resetScore();
  document.getElementById("threeCanvas").remove();
  document.getElementById("outroContainer").remove();
}

export function outro() {
  const outroContainer = document.createElement("div");
  outroContainer.id = "outroContainer";

  document.body.appendChild(outroContainer);

  const outroTitle = document.createElement("h2");
  const paragraph = document.createElement("p");
  const longButton = document.createElement("button");
  const shortButton = document.createElement("button");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const finalScore = scoreDisplay.innerText;
  console.log(JSON.stringify(finalScore));
  outroTitle.id = "outroTitle";
  longButton.id = "outroBtn";
  shortButton.id = "outroBtn";

  outroTitle.innerHTML = "Congrats!"; // corrected assignment
  paragraph.innerHTML = `You've done it! You finished with an accuracy of ${finalScore}. Here is the presave link. Do you want to play again?`;

  longButton.innerHTML = "Full game";
  shortButton.innerHTML = "30 Seconds";

  outroContainer.appendChild(outroTitle);
  outroContainer.appendChild(paragraph);
  outroContainer.appendChild(longButton);
  outroContainer.appendChild(shortButton);

  longButton.addEventListener("click", () => {
    restart();
    init();
  });
  shortButton.addEventListener("click", () => {
    restart();
    shortInit();
  });
}
