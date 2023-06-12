import { init, shortInit } from "./index";
import { resetScore } from "./score";
import { stopSong } from "./song";

function restart() {
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
  const backButton = document.createElement("button");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const finalScore = scoreDisplay.innerText;
  console.log(JSON.stringify(finalScore));
  outroTitle.id = "outroTitle";
  longButton.id = "outroBtn";
  shortButton.id = "outroBtn";
  backButton.id = "backBtn";
  paragraph.id = "outroText";

  outroTitle.innerHTML = "Congrats!"; // corrected assignment
  paragraph.innerHTML = `You finished with an accuracy of ${finalScore}. <br></br> Do you want to play again?`;

  longButton.innerHTML = "Full Game";
  shortButton.innerHTML = "30 Seconds";
  backButton.innerHTML = "Exit Game";

  outroContainer.appendChild(outroTitle);
  outroContainer.appendChild(paragraph);
  outroContainer.appendChild(longButton);
  outroContainer.appendChild(shortButton);
  outroContainer.appendChild(backButton);

  longButton.addEventListener("click", () => {
    restart();
    init();
  });
  shortButton.addEventListener("click", () => {
    restart();
    shortInit();
  });

  backButton.addEventListener("click", () => {
    document.location.href = "https://titty-landing.vercel.app/";
  });
}
