//playing the animation with values from audio
const container = document.getElementById("landingContainer");

function greeting() {
  const div = document.createElement("div");
  div.innerHTML = "Greetings, the game will start in 17 seconds";
  div.id = "greeting";

  container.appendChild(div);
}

function removeGreeting() {
  container.remove();
}

export function landing() {
  function runForFiveSeconds() {
    greeting();
    setTimeout(function () {
      removeGreeting();
    }, 2000); // 5000 milliseconds = 5 seconds
  }
  runForFiveSeconds();
}
