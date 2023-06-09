import * as THREE from "three";

export function tunnel() {
  let canvas = document.querySelector("#tunnel");

  let renderer = new THREE.WebGL1Renderer({ canvas });

  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const fov = 20;
  const aspect = 2;
  const near = 1;
  const far = 500;
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(3, 10 / 2, 0);
  camera.lookAt(far, -18, 0);

  const roadWidth = 30;
  const roadLength = far;
  const roadHeight = 30;
  //tunnel
  {
    function createTunnelMaterial(color) {
      const roadMaterial = new THREE.MeshStandardMaterial();
      roadMaterial.color.set(color);
      roadMaterial.roughness = 1;
      roadMaterial.metalness = 0.9;
      roadMaterial.side = THREE.BackSide;
      return roadMaterial;
    }

    let materials = [
      new THREE.MeshBasicMaterial({
        color: 0x000000,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
      }),
      createTunnelMaterial(0x4d2c00),
      createTunnelMaterial(0x1c1c1c),
      createTunnelMaterial(0x4d2c00),
      createTunnelMaterial(0x4d2c00),
    ];

    const roadGeometry = new THREE.BoxGeometry(
      roadLength,
      roadHeight,
      roadWidth
    );
    let roadMesh = new THREE.Mesh(roadGeometry, materials);
    roadMesh.position.x = roadLength / 3;
    roadMesh.position.y = roadHeight / 3;
    scene.add(roadMesh);
  }

  const vehicleSize = 1.0;
  const headLightColor = 0xff0080;
  const headLightIntensity = 100;
  const headLightDistance = 50;
  const headLightAngle = (1 * Math.PI) / 180;
  const headLightPenumbra = 10;
  const headLightDecay = 3;
  //viewer in car
  {
    function createHeadlight() {
      return new THREE.SpotLight(
        headLightColor,
        headLightIntensity,
        headLightDistance,
        headLightAngle,
        headLightPenumbra,
        headLightDecay
      );
    }

    let headLightRightTarget = new THREE.Object3D();
    headLightRightTarget.position.set(10, vehicleSize, 8 - roadWidth / 2);
    scene.add(headLightRightTarget);
    let headLightRight = createHeadlight();
    headLightRight.position.set(0, vehicleSize, vehicleSize);
    headLightRight.target = headLightRightTarget;
    scene.add(headLightRight);

    let headLightLeftTarget = new THREE.Object3D();
    headLightLeftTarget.position.set(10, vehicleSize, 2 - roadWidth / 2);
    scene.add(headLightLeftTarget);
    let headLightLeft = createHeadlight();
    headLightLeft.position.set(0, vehicleSize, -vehicleSize);
    headLightLeft.target = headLightLeftTarget;
    scene.add(headLightLeft);
  }

  let rectLights = [];

  function createCeilingLight() {
    const bulbGeometry = new THREE.PlaneBufferGeometry(10, 10);
    const bulbMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    let bulbMesh = new THREE.Mesh(bulbGeometry, bulbMat);

    bulbMesh.rotation.x = 10;
    bulbMesh.position.y = 50;

    let spotLight = new THREE.SpotLight(0xffffff, 10, 20, 90, 1, 2);
    spotLight.add(bulbMesh);

    // const helper = new THREE.SpotLightHelper(spotLight);
    // scene.add(helper);

    return spotLight;
  }

  for (let i = 150; i < roadLength + 251; i += 50) {
    let rectLight = createCeilingLight();
    rectLight.position.set(i, 10 - 0.1, 0);
    scene.add(rectLight);

    rectLights.push(rectLight);
  }

  let rightSideLights = [];
  let leftSideLights = [];

  function createSideLight() {
    const bulbGeometry = new THREE.BoxBufferGeometry(0.1, 0.8, 0.1);
    const bulbMat = new THREE.MeshBasicMaterial({
      color: 0xffff00,
    });
    let bulbMesh = new THREE.Mesh(bulbGeometry, bulbMat);
    bulbMesh.rotation.x = (90 * Math.PI) / 180;

    const spotLight = new THREE.SpotLight(0xff0080, 10, 30, -10, 1, 2);

    // const helper = new THREE.SpotLightHelper(spotLight);
    // scene.add(helper);

    return spotLight.add(bulbMesh);
  }

  for (let i = 100; i < roadLength + 1; i += 250) {
    let rightLight = createSideLight();
    rightLight.position.set(i, 5, roadWidth / 2 - 0.1 / 2 - 0.1);

    let leftLight = createSideLight();
    leftLight.position.set(i, 5, 0.1 / 2 + 0.1 - roadWidth / 2);

    leftLight.rotation.x = (-90 * Math.PI) / 180;
    rightLight.rotation.x = (90 * Math.PI) / 180;

    rightSideLights.push(rightLight);
    leftSideLights.push(leftLight);

    scene.add(leftLight);
    scene.add(rightLight);
  }

  let laneIndicators1 = [];
  let laneIndicators2 = [];
  let laneIndicators3 = [];
  let laneIndicators4 = [];

  function createLaneIndicator() {
    const bulbGeometry = new THREE.SphereBufferGeometry(0.08, 6, 8);
    const bulbMat = new THREE.MeshBasicMaterial({
      color: 0xd2af00,
    });
    return new THREE.Mesh(bulbGeometry, bulbMat);
  }

  const laneIndicatorFrequency = 20;
  const laneIndicatorRandomness = 30;

  for (let i = 50; i < roadLength + 1; i += laneIndicatorFrequency) {
    let laneIndicator = createLaneIndicator();
    laneIndicator.position.set(
      i + Math.random() * laneIndicatorRandomness,
      0,
      -roadWidth / 2
    );
    scene.add(laneIndicator);
    laneIndicators1.push(laneIndicator);
  }

  for (let i = 50; i < roadLength + 1; i += laneIndicatorFrequency) {
    let laneIndicator = createLaneIndicator();
    laneIndicator.position.set(
      i + Math.random() * laneIndicatorRandomness,
      0,
      roadWidth / 2 - roadWidth / 3
    );
    scene.add(laneIndicator);
    laneIndicators2.push(laneIndicator);
  }

  for (let i = 50; i < roadLength + 1; i += laneIndicatorFrequency) {
    let laneIndicator = createLaneIndicator();
    laneIndicator.position.set(
      i + Math.random() * laneIndicatorRandomness,
      0,
      roadWidth / 3 - roadWidth / 2
    );
    scene.add(laneIndicator);
    laneIndicators3.push(laneIndicator);
  }

  for (let i = 50; i < roadLength + 1; i += laneIndicatorFrequency) {
    let laneIndicator = createLaneIndicator();
    laneIndicator.position.set(
      i + Math.random() * laneIndicatorRandomness,
      0,
      roadWidth / 2
    );
    scene.add(laneIndicator);
    laneIndicators4.push(laneIndicator);
  }

  const listener = new THREE.AudioListener();

  const audio = new THREE.Audio(listener);
  const file = "./song.mp3";

  if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
    const loader = new THREE.AudioLoader();
    loader.load(file, function (buffer) {
      audio.setBuffer(buffer);
      audio.play();
    });
  } else {
    const mediaElement = new Audio(file);
    mediaElement.play();

    audio.setMediaElementSource(mediaElement);
  }

  let analyser = new THREE.AudioAnalyser(audio, 128);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const distanceTravel = 0.7;

  function render(time) {
    time *= 0.0001;

    const audioAverageFrequency = analyser.getAverageFrequency();

    for (let i = rectLights.length - 1; i >= 0; i--) {
      let light = rectLights[i];
      light.position.x = light.position.x - distanceTravel;

      light.intensity =
        (light.intensity + 30 + (audioAverageFrequency * 1 - 30)) / 3;

      if (light.position.x < -100) {
        light.position.x = roadLength - 100;
      }
    }

    for (let i = rightSideLights.length - 1; i >= 0; i--) {
      let light = rightSideLights[i];
      light.position.x = light.position.x - distanceTravel;

      light.intensity =
        (light.intensity + 10 + (audioAverageFrequency * 1 - 10)) / 3;

      if (light.position.x < -100) {
        light.position.x = roadLength - 100;
      }
    }

    for (let i = leftSideLights.length - 1; i >= 0; i--) {
      let light = leftSideLights[i];
      light.position.x = light.position.x - distanceTravel;

      light.intensity =
        (light.intensity + 20 + (audioAverageFrequency * 1 - 20)) / 3;

      if (light.position.x < -100) {
        light.position.x = roadLength - 100;
      }
    }

    for (let i = laneIndicators1.length - 1; i >= 0; i--) {
      let laneIndicator = laneIndicators1[i];
      laneIndicator.position.x = laneIndicator.position.x - distanceTravel;

      if (laneIndicator.position.x < 0) {
        laneIndicator.position.x = roadLength;
      }
    }

    for (let i = laneIndicators2.length - 1; i >= 0; i--) {
      let laneIndicator = laneIndicators2[i];
      laneIndicator.position.x = laneIndicator.position.x - distanceTravel;

      if (laneIndicator.position.x < 0) {
        laneIndicator.position.x = roadLength;
      }
    }

    for (let i = laneIndicators3.length - 1; i >= 0; i--) {
      let laneIndicator = laneIndicators3[i];
      laneIndicator.position.x = laneIndicator.position.x - distanceTravel;

      if (laneIndicator.position.x < 0) {
        laneIndicator.position.x = roadLength;
      }
    }

    for (let i = laneIndicators4.length - 1; i >= 0; i--) {
      let laneIndicator = laneIndicators4[i];
      laneIndicator.position.x = laneIndicator.position.x - distanceTravel;

      if (laneIndicator.position.x < 0) {
        laneIndicator.position.x = roadLength;
      }
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
