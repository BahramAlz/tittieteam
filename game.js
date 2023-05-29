import * as THREE from "three";
import { gsap } from "gsap";
import { InteractionManager } from "three.interactive";

export function game() {
  //scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //lights
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(50, 50, 100);
  scene.add(pointLight);

  //renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //geometry/material - ball

  function createBall(xPos, key) {
    const geometry = new THREE.SphereGeometry(4, 20, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xfffff });
    const sphere = new THREE.Mesh(geometry, material);

    document.addEventListener("keydown", function (event) {
      if (event.key === key) {
        // Event for pressing the Q key
        console.log("correct");
        // Add your code here to handle the event
      } else {
        console.log("not right", event.key);
      }
    });

    //click events (ball)
    sphere.addEventListener("click", (event) => {
      console.log(event);

      if (event.distance > 67 && event.distance < 69) {
        console.log("hit");
      } else if (event.distance > 69 && event.distance < 75) {
        console.log("that was close!");
      } else if (event.distance > 62 && event.distance < 67) {
        console.log("u missed");
      } else {
        console.log("dumbass");
      }
    });
    interactionManager.add(sphere);

    sphere.position.set(xPos, 200, -300);
    scene.add(sphere);
    gsap.to(sphere.position, {
      z: 40,
      y: -30,
      x: xPos,
      duration: 5,
      onComplete: () => {
        // Ball reached the destination
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

  //camera position
  camera.position.z = 100;

  //geometry/material - circle
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

  //interaction manager for click
  const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );

  //animation
  function animate() {
    requestAnimationFrame(animate);
    // Perform the animation using GSAP
    renderer.render(scene, camera);

    //controls.update();
  }
  animate();
}
