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

  function createBall() {
    const geometry = new THREE.SphereGeometry(5, 32, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xfffff });
    const sphere = new THREE.Mesh(geometry, material);

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

    sphere.position.set(0, 80, -100);
    scene.add(sphere);
    gsap.to(sphere.position, {
      z: 50,
      y: -70,
      x: 0,
      duration: 3.5,
      ease: "steps (12)",
    });
  }
  setInterval(createBall, 500);
  //camera position
  camera.position.z = 100;

  //geometry/material - circle
  const geometry2 = new THREE.RingGeometry(7, 6, 32);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
  });
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(0, -25, 30);
  scene.add(mesh2);

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
