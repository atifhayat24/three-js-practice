import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//scene
const scene = new THREE.Scene();
//create scene

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);

scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");

const render = new THREE.WebGL1Renderer({ canvas });
render.setSize(size.width, size.height);
render.setPixelRatio(2);
render.render(scene, camera);

//controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resize

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  //update camera
  camera.updateProjectionMatrix();
  camera.aspect = size.width / size.height;
  render.setSize(size.width, size.height);
});

const loop = () => {
  controls.update();
  render.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
