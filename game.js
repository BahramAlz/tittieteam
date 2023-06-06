import * as THREE from "three";
import { gsap } from "gsap";
import { addScore, decreaseScore } from "./score,js";

class Game {
	constructor() {
		this.activeBalls = [];

		this.scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.set(0, 30, 100);
		camera.lookAt(0, 0, -200);

		// Lights
		const light = new THREE.AmbientLight(0x404040); // Soft white light
		this.scene.add(light);
		const pointLight = new THREE.PointLight(0xffffff);
		pointLight.position.set(50, 50, 100);
		this.scene.add(pointLight);
		// Renderer
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		renderer.setClearColor(0x000000, 0);

		const render = () => {
			requestAnimationFrame(render);
			renderer.render(this.scene, camera);
		};

		const resize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener("resize", resize);

		render();
	}

	generateBalls() {
		const posArray = [-12, 0, 12];
		setInterval(() => {
			const randomNum = Math.floor(Math.random() * 3);
			const randomPos = posArray[randomNum];
			this.createBall(randomPos);
		}, 500);
	}

	createBall(randomPos) {
		const ball = new Ball(randomPos, (ball) => {
			this.scene.remove(ball.sphere);
			const index = this.activeBalls.indexOf(ball);
			this.activeBalls.splice(index, 1);
		});

		this.scene.add(ball.sphere);
		this.activeBalls.push(ball);
	}
}

class Ball {
	constructor(xPos, onComplete) {
		const geometry = new THREE.SphereGeometry(4, 20, 10);
		const material = new THREE.MeshStandardMaterial({ color: 0xfffff });
		this.sphere = new THREE.Mesh(geometry, material);
		this.sphere.position.set(xPos, 0, -400);

		gsap.to(this.sphere.position, {
			z: 40,
			y: 0,
			x: xPos,
			duration: 0.5 * 4,
			onComplete: () => {
				onComplete(this);
			},
			ease: "none",
		});
	}
}

class HitManager {
	constructor() {
		const geometry2 = new THREE.RingGeometry(5, 4, 32);
		const material2 = new THREE.MeshBasicMaterial({
			color: 0xffff00,
			side: THREE.DoubleSide,
		});
		this.leftCircle = new THREE.Mesh(geometry2, material2);
		this.leftCircle.position.set(-12, 0, 30);

		this.midCircle = new THREE.Mesh(geometry2, material2);
		this.midCircle.position.set(0, 0, 30);

		this.rightCircle = new THREE.Mesh(geometry2, material2);
		this.rightCircle.position.set(12, 0, 30);
	}

	addEventListeners(activeBalls) {
		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

		if (isMobile) {
			const targetAreaLeft = document.createElement("div");
			targetAreaLeft.id = "targetAreaLeft";
			const targetAreaMid = document.createElement("div");
			targetAreaMid.id = "targetAreaMid";
			const targetAreaRight = document.createElement("div");
			targetAreaRight.id = "targetAreaRight";

			document.body.appendChild(targetAreaLeft);
			document.body.appendChild(targetAreaMid);
			document.body.appendChild(targetAreaRight);

			targetAreaLeft.addEventListener("touchstart", (e) => {
				e.preventDefault();
				let detector = this.leftCircle;
				for (const ball of activeBalls) {
					if (
						ball.sphere.position.z >= detector.position.z - 10 &&
						ball.sphere.position.z <= detector.position.z + 10
					) {
						this.displayMessage("hit", "hit");
					} else if (
						ball.sphere.position.z >= detector.position.z - 10 - 7 && //prettier-ignore
							ball.sphere.position.z <= detector.position.z + 10 + 7 // prettier-ignore
					) {
						this.displayMessage("close", "close");
					} else if (
						ball.sphere.position.z >= detector.position.z - 17 - 7 && //prettier-ignore
							ball.sphere.position.z <= detector.position.z + 17 + 7 // prettier-ignore
					) {
						this.displayMessage("miss", "missed");
					}
				}
			});
			targetAreaMid.addEventListener("touchstart", (e) => {
				e.preventDefault();
				let detector = this.midCircle;
				for (const ball of activeBalls) {
					if (detector.position.x === ball.sphere.position.x) {
						if (
							ball.sphere.position.z >= detector.position.z - 9 &&
							ball.sphere.position.z <= detector.position.z + 9
						) {
							this.displayMessage("hit", "hit");
						} else if (
							ball.sphere.position.z >= detector.position.z - 9 - 7 && //prettier-ignore
								ball.sphere.position.z <= detector.position.z + 9 + 7 // prettier-ignore
						) {
							this.displayMessage("close", "close");
						} else if (
							ball.sphere.position.z >= detector.position.z - 16 - 7 && //prettier-ignore
								ball.sphere.position.z <= detector.position.z + 16 + 7 // prettier-ignore
						) {
							this.displayMessage("miss", "missed");
						}
					}
				}
			});
			targetAreaRight.addEventListener("touchstart", (e) => {
				e.preventDefault();
				let detector = this.rightCircle;
				for (const ball of activeBalls) {
					if (detector.position.x === ball.sphere.position.x) {
						if (
							ball.sphere.position.z >= detector.position.z - 9 &&
							ball.sphere.position.z <= detector.position.z + 9
						) {
							this.displayMessage("hit", "hit");
						} else if (
							ball.sphere.position.z >= detector.position.z - 9 - 7 && //prettier-ignore
								ball.sphere.position.z <= detector.position.z + 9 + 7 // prettier-ignore
						) {
							this.displayMessage("close", "close");
						} else if (
							ball.sphere.position.z >= detector.position.z - 16 - 7 && //prettier-ignore
								ball.sphere.position.z <= detector.position.z + 16 + 7 // prettier-ignore
						) {
							this.displayMessage("miss", "missed");
						}
					}
				}
			});

			// lägga till toRightevent listeners
		} else if (!isMobile) {
			window.addEventListener("keydown", (e) => {
				let detector = null;

				switch (e.key) {
					case "a":
						detector = this.leftCircle;
						break;
					case "s":
						detector = this.midCircle;
						break;
					case "d":
						detector = this.rightCircle;
						break;
					default:
						return;
				}

				for (const ball of activeBalls) {
					if (detector.position.x === ball.sphere.position.x) {
						if (
							ball.sphere.position.z >= detector.position.z - 5 &&
							ball.sphere.position.z <= detector.position.z + 5
						) {
							this.displayMessage("HIT", "hit");
							addScore("hit");
						} else if (
							ball.sphere.position.z >= detector.position.z - 5 - 5 && //prettier-ignore
							ball.sphere.position.z <= detector.position.z + 5 + 5 // prettier-ignore
						) {
							this.displayMessage("THAT WAS CLOSE", "close");
							addScore("close");
						} else if (
							ball.sphere.position.z >= detector.position.z - 10 - 20 && //prettier-ignore
							ball.sphere.position.z <= detector.position.z + 10 + 15 // prettier-ignore
						) {
							this.displayMessage("missed", "missed");
							decreaseScore("miss");
						}
					}
				}
			});
		}
	}

	addToScene(scene) {
		scene.add(this.leftCircle);
		scene.add(this.midCircle);
		scene.add(this.rightCircle);
	}

	displayMessage(message, id) {
		console.log("i am being called");
		let isMessageDisplayed = false;
		const container = document.querySelector(".messageContainer");
		const messageElement = document.getElementById(id);
		if (isMessageDisplayed) {
			if (messageElement) {
				container.removeChild(messageElement);
			}
			isMessageDisplayed = false;
		}
		const newMessageElement = document.createElement("div");
		newMessageElement.id = id;
		newMessageElement.textContent = message;
		container.appendChild(newMessageElement);
		isMessageDisplayed = true;
		setTimeout(() => {
			const messageToRemove = document.getElementById(id);
			if (messageToRemove) {
				container.removeChild(messageToRemove);
			}
			isMessageDisplayed = false;
		}, 300);
	}
}

class HitMessage {
	constructor() {
		this.messageEl = document.createElement("h2");
		this.messageContainer = document.querySelector(".messageContainer");
	}

	displayMessage(message) {
		this.messageEl.innerHTML = message;
	}
}

export function game() {
	const game = new Game();
	const hitManager = new HitManager();
	hitManager.addToScene(game.scene);
	hitManager.addEventListeners(game.activeBalls);

	game.generateBalls();
}
