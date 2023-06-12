let circularProgress = document.getElementById("circularProgress");

let score = 0;
const maxScore = 100;

export function addScore(scoreType) {
  if (scoreType === "hit") {
    if (score === 0) {
      score += 30;
      // circularProgress.style.background = `conic-gradient(#7d2ae8 ${score}deg, #ededed 0deg)`;
    } else if (score > 100) {
      score = Math.floor(score / 100) * 100;
    } else {
      score *= 1.4;
    }
  } else if (scoreType === "close") {
    score *= 0.9;
    // circularProgress.style.background = `conic-gradient(#7d2ae8 ${score}deg, #ededed 0deg)`;
  }

  // Restrict score to be within the range of 0 to 100
  score = Math.max(0, Math.min(score, maxScore));

  updateScoreDisplay(score);
  console.log(score);
}

export function decreaseScore() {
  score -= 5;
  score = Math.max(0, score); // Ensure score never goes below 0
  updateScoreDisplay(score);
}

function updateScoreDisplay(score) {
  const percentage = Math.floor((score / maxScore) * 100);
  const scoreDisplay = document.getElementById("scoreDisplay");

  circularProgress.style.setProperty("--percentage", percentage);

  scoreDisplay.textContent = `${percentage}%`;
}

export function resetScore() {
  updateScoreDisplay(0);
}

// export default score;
