import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)

scene.add(sphere)

camera.position.z = 10

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

