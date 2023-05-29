import * as THREE from "three";
import { gsap } from "gsap";
import { InteractionManager } from "three.interactive";

export function game() {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;

  // Lights
  const light = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(light);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(50, 50, 100);
  scene.add(pointLight);

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Geometry/Material - Ball
  const activeBalls = [];

  function createBall(xPos, key) {
    const geometry = new THREE.SphereGeometry(4, 20, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xfffff });
    const sphere = new THREE.Mesh(geometry, material);
    activeBalls.push({ sphere, key });

    document.addEventListener("keydown", function (event) {
      if (event.key === key) {
        const activeBall = activeBalls.find((ball) => ball.key === key);
        if (activeBall) {
          checkBallHit(activeBall.sphere);
        }
      }
    });

    sphere.position.set(xPos, 200, -300);
    scene.add(sphere);
    gsap.to(sphere.position, {
      z: 40,
      y: -30,
      x: xPos,
      duration: 5,
      onComplete: () => {
        const index = activeBalls.findIndex((ball) => ball.sphere === sphere);
        if (index !== -1) {
          activeBalls.splice(index, 1);
        }
        scene.remove(sphere);
      },
      ease: "none",
    });
  }

  const posArray = [-12, 0, 12];
  const keyArray = ["a", "s", "d"];

  setInterval(() => {
    const randomNum = Math.floor(Math.random() * 3);
    const randomPos = posArray[randomNum];
    const key = keyArray[randomNum];
    createBall(randomPos, key);
  }, 500);

  // Geometry/Material - Circle
  const geometry2 = new THREE.RingGeometry(5, 4, 32);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });

  const leftCircle = new THREE.Mesh(geometry2, material2);
  leftCircle.position.set(-12, -25, 30);
  scene.add(leftCircle);

  const midCircle = new THREE.Mesh(geometry2, material2);
  midCircle.position.set(0, -25, 30);
  scene.add(midCircle);

  const rightCircle = new THREE.Mesh(geometry2, material2);
  rightCircle.position.set(12, -25, 30);
  scene.add(rightCircle);

  let isMessageDisplayed = false;

  function updateMessage(message, id) {
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
  // Check if a ball is inside its designated circle and handle the hit accordingly
  function checkBallHit(ball) {
    const ballPosition = ball.position;
    const yThreshold = -29;
    const zThreshold = 28;

    if (ballPosition.y >= yThreshold && ballPosition.z <= zThreshold) {
      updateMessage("Missed", "missed");
    } else if (
      ballPosition.y >= yThreshold - 2 &&
      ballPosition.z <= zThreshold + 2
    ) {
      updateMessage("That was close!", "close");
    } else {
      updateMessage("Hit", "hit");
    }
  }

  //click events

  // Check if a key press corresponds to a ball and handle the hit accordingly

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}
