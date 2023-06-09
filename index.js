import { landing } from "./landing";
import { game } from "./game";
import { playSong, stopSong } from "./song";
import { outro } from "./outro";

export const shortGameButton = document.createElement("button");
export const fullGameButton = document.createElement("button");
export const exitButton = document.createElement("button");

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

  container.appendChild(exitButton);
  exitButton.id = "exitBtn";
  exitButton.innerHTML = "Exit Game";
  exitButton.addEventListener("click", () => {
    document.location.href = "https://titty-landing.vercel.app/";
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
  if (document.getElementById("exitBtn")) {
    document.getElementById("exitBtn").remove();
  }

  playSong();
  landing();
  game();
  function runForFullSong() {
    console.log("full game starts");
    setTimeout(() => {
      console.log("full game ends");
      stopSong();
      outro();
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
  if (document.getElementById("exitBtn")) {
    document.getElementById("exitBtn").remove();
  }

  game();
  playSong();
  landing();

  function runFor30Seconds() {
    console.log("game starts");
    setTimeout(() => {
      stopSong();
      outro();
    }, 47000); // ändra till 47000
  }
  runFor30Seconds();
}

main();
