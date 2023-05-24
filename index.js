import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 100);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xfffff });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 30, -30);
scene.add(sphere);

camera.position.z = 100;

const geometry2 = new THREE.RingGeometry(7, 6, 32);
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, -25, 30);
scene.add(mesh2);

//const controls = new OrbitControls( camera, renderer.domElement );

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

//const audio = new Audio("../public/ugga.wav");

sphere.addEventListener("click", (event) => {
  console.log(event);
  //alert('NICEU');

  if (event.distance > 67 && event.distance < 69) {
    console.log("hit");
    //audio.play();
  } else if (event.distance > 69 && event.distance < 75) {
    console.log("that was close!");
  } else if (event.distance > 62 && event.distance < 67) {
    console.log("u missed");
  } else {
    console.log("dumbass");
  }
});

function animate() {
  requestAnimationFrame(animate);

  // Perform the animation using GSAP
  gsap.to(sphere.position, { z: 60, y: -60, x: 0, duration: 5 , ease: "steps (12)" });

  renderer.render(scene, camera);

  interactionManager.add(sphere);

  //controls.update();
}
animate();
