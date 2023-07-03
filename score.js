let score = 0;
const maxScore = 100;

export function addScore(scoreType) {
  if (scoreType === "hit") {
    if (score === 0) {
      score += 30;
    } else if (score > 100) {
      score = Math.floor(score / 100) * 100;
    } else {
      score *= 1.4;
    }
  } else if (scoreType === "close") {
    score *= 0.7;
  }

  // Restrict score to be within the range of 0 to 100
  score = Math.max(0, Math.min(score, maxScore));

  updateScoreDisplay(score);
  updateFill(score); // Call the updateFill function with the updated score
  console.log(score);
}

export function decreaseScore() {
  score -= 5;
  score = Math.max(0, score); // Ensure score never goes below 0
  updateScoreDisplay(score);
  updateFill(score); // Call the updateFill function with the updated score
}

function updateScoreDisplay(score) {
  const percentage = Math.floor((score / maxScore) * 100);
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.textContent = `${percentage}%`;
}

function updateFill(score) {
  const semiDonut = document.getElementById('semi-donut');
  semiDonut.style.setProperty('--percentage', `${score}%`);
  semiDonut.textContent = `${score}%`;
}

export function resetScore() {
  updateScoreDisplay(0);
  updateFill(0); // Call the updateFill function to reset the fill to 0%
}

// export default score;
