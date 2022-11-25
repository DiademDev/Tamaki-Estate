import * as THREE from 'https://ajax.googleapis.com/ajax/libs/threejs/r84/three.min.js';

const scene = new THREE.SCENE()
const camera = new THREE.PerspectiveCamera(
    75, 
    innerWidth / innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()
