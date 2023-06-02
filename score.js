let score = 0;

export function addScore() {
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.textContent = "Score: " + (score++ + 1);
  scoreDisplay.classList.add("animate__animated", "animate__pulse");
  setTimeout(function () {
    scoreDisplay.classList.remove("animate__pulse");
  }, 1000);
}
