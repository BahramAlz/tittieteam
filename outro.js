import { init, shortInit } from "./index";
import { landing } from "./landing";
import { stopSong } from "./song";

function restart() {
	stopSong();
	document.getElementById("threeCanvas").remove();
	document.getElementById("outroContainer").remove();

	landing();
}

export function outro() {
	const outroContainer = document.createElement("div");
	outroContainer.id = "outroContainer";

	document.body.appendChild(outroContainer);

	const outroTitle = document.createElement("h2");
	const paragraph = document.createElement("p");
	const longButton = document.createElement("button");
	const shortButton = document.createElement("button");

	outroTitle.innerHTML = "Congrats!"; // corrected assignment
	paragraph.innerHTML =
		"You've done it! You finished with an accuracy of [whatever]. Here is the presave link. Do you want to play again?";

	longButton.innerHTML = "Play the full game";
	shortButton.innerHTML = "Play a short game";

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
