import { landing } from "./landing";
import { game } from "./game";
import { playSong } from "./song";
import { outro } from "./outro";
import { tunnel } from "./reactiveTunnel";

export const shortGameButton = document.createElement("button");
export const fullGameButton = document.createElement("button");

function main() {
	const container = document.getElementById("landingContainer");
	const title = document.createElement("h1");
	title.innerHTML = "Enter the Titty Experience";
	title.id = "startTitle";

	//whole game button
	container.appendChild(title);
	container.appendChild(fullGameButton);
	fullGameButton.innerHTML = "Start game -- full song";
	fullGameButton.id = "fullGameBtn";
	fullGameButton.addEventListener("click", init);

	//whole game button
	container.appendChild(shortGameButton);
	shortGameButton.innerHTML = "Start game -- 30 seconds";
	shortGameButton.id = "shortGameBtn";
	shortGameButton.addEventListener("click", shortInit);
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
		}, 20000);
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
	playSong();
	landing();
	game();
	function runFor30Seconds() {
		console.log("game starts");
		setTimeout(() => {
			outro();
		}, 20000);
	}
	runFor30Seconds();
}

main();
