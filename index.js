import { landing } from "./landing";
import { game } from "./game";
import { playSong, stopSong } from "./song";
import { outro } from "./outro";

export const shortGameButton = document.createElement("button");
export const fullGameButton = document.createElement("button");

function main() {
  const title = document.createElement("h1");
  title.innerHTML = "Start the game";
  title.id = "startTitle";

  //landing container
  const container = document.createElement("div");
  container.id = "landingContainer";
  document.body.appendChild(container);

  //whole game button
  container.appendChild(title);
  container.appendChild(fullGameButton);
  fullGameButton.innerHTML = "Full song";
  fullGameButton.id = "fullGameBtn";
  fullGameButton.addEventListener("click", () => {
    document.getElementById("landingContainer").remove();
    init();
  });

  //short game button
  container.appendChild(shortGameButton);
  shortGameButton.innerHTML = "30 seconds";
  shortGameButton.id = "shortGameBtn";
  shortGameButton.addEventListener("click", () => {
    document.getElementById("landingContainer").remove();
    shortInit();
  });
}

export function init() {
  if (document.getElementById("fullGameBtn")) {
    document.getElementById("fullGameBtn").remove();
  }
  if (document.getElementById("shortGameBtn")) {
    document.getElementById("shortGameBtn").remove();
  }
  if (document.getElementById("startTitle")) {
    document.getElementById("startTitle").remove();
  }

  playSong();
  landing();
  game();
  function runForFullSong() {
    console.log("full game starts");
    setTimeout(() => {
      console.log("full game ends");
      outro();
      stopSong();
    }, 180000); // ändra till 180000
  }
  runForFullSong();
}

export function shortInit() {
  if (document.getElementById("fullGameBtn")) {
    document.getElementById("fullGameBtn").remove();
  }
  if (document.getElementById("shortGameBtn")) {
    document.getElementById("shortGameBtn").remove();
  }
  if (document.getElementById("startTitle")) {
    document.getElementById("startTitle").remove();
  }

  game();
  playSong();
  landing();

  function runFor30Seconds() {
    console.log("game starts");
    setTimeout(() => {
      outro();
      stopSong();
    }, 47000); // ändra till 47000
  }
  runFor30Seconds();
}

main();
