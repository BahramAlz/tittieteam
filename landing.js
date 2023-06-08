import { gsap } from "gsap";

//playing the animation with values from audio

function greeting() {
  const h1 = document.createElement("h1");
  h1.textContent = "The Game starts in:";
  h1.id = "landingTitle";
  introContainer.appendChild(h1);
  setTimeout(displayCountdown);
  setTimeout(displayInstructions, 200);
  console.log("greeting is being called");
}

function displayInstructions() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    playingMobile();
  } else {
    playingDesktop();
  }
}

function playingMobile() {
  const instructions = document.createElement("p");
  instructions.style.opacity = 0;
  instructions.id = "landingInstructionsMobile";
  introContainer.appendChild(instructions);

  const textStrings = [
    "Hello and welcome to the Mobile Experience of the <br> Yung Titties Game",
    "Click the balls when they are inside the circle.",
    "Try to get the best accuracy possible!<br> Good luck brah.",
  ];
  let currentIndex = 0;

  function displayNextString() {
    gsap.to(instructions, {
      opacity: 0,
      duration: 0.5,
      onComplete: updateText,
    });
  }

  function updateText() {
    instructions.innerHTML = textStrings[currentIndex];
    gsap.to(instructions, { opacity: 1, duration: 0.5, delay: 0.5 });
    currentIndex = (currentIndex + 1) % textStrings.length;
  }

  updateText();
  setInterval(displayNextString, 5000);
}

function playingDesktop() {
  const instructions = document.createElement("p");
  instructions.style.opacity = 0;
  instructions.id = "landingInstructionsDesktop";
  introContainer.appendChild(instructions);

  const textStrings = [
    "Hello and welcome to the Desktop Experience of the <br>Yung Titties Game",
    "Use the keys 'A', 'S' and 'D' on your keyboard.<br> Try hitting the balls when they reach the circle.",
    "Try to get the best accuracy possible! <br>Good luck brah.",
  ];
  let currentIndex = 0;

  function displayNextString() {
    gsap.to(instructions, {
      opacity: 0,
      duration: 0.5,
      onComplete: updateText,
    });
  }

  function updateText() {
    instructions.innerHTML = textStrings[currentIndex];
    gsap.to(instructions, { opacity: 1, duration: 0.5, delay: 0.5 });
    currentIndex = (currentIndex + 1) % textStrings.length;
  }

  updateText();
  setInterval(displayNextString, 5000);
}

function displayCountdown() {
  var countdown = 15;

  const countdownDisplay = document.createElement("p");
  countdownDisplay.textContent = countdown;
  introContainer.appendChild(countdownDisplay);
  countdownDisplay.id = "landingCountdown";

  var countdownInterval = setInterval(function () {
    countdown--;
    if (countdown === 0) {
      countdownDisplay.textContent = "GO!";
      clearInterval(countdownInterval);
      return;
    }

    countdownDisplay.textContent = countdown;
  }, 1000);
}

function removeGreeting() {
  introContainer.remove();
}

export function landing() {
  const introContainer = document.createElement("div");
  introContainer.id = "introContainer";
  document.body.appendChild(introContainer);

  function runForSixteenSeconds() {
    greeting();
    setTimeout(function () {
      removeGreeting();
    }, 16000); // 5000 milliseconds = 5 seconds
  }
  runForSixteenSeconds();
  console.log("landing is being called");
}
