import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
//import * as dat from 'dat.gui'
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js'
import {ColladaLoader} from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/ColladaLoader.js'
import {GUI} from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/dat.gui.module'

//console.log(dat)

//Create constants
let pylons, wayout, decision, wayfinding, regulatory, locations, groundPlane
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.01, 1000 )
const renderer = new THREE.WebGLRenderer()
const gltfLoader = new GLTFLoader

init()
animate()

function init() {

camera.position.z = 1.4
camera.position.y = 2
camera.position.x = -1
camera.lookAt( 3, 0, 0)

//Adding fog
var fogColor = new THREE.Color(0x999999);
scene.fog = new THREE.Fog(fogColor, 0.5, 12);

//Add grid helper
const grid = new THREE.GridHelper( 200, 400, 0xffffff, 0xffffff )
grid.material.opacity = 0.3
grid.material.transparent = true
scene.add( grid )

//Load GLTF model
gltfLoader.load('./assets/GLB_TamakiEstate_02.glb', function (terrainScene) {
    
    //Adjust GLFT transforms
    terrainScene.scene.position.y = -0.1
    scene.add( terrainScene.scene )
},
    // called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	
})   

//Load Collada model
const loadingManager1 = new THREE.LoadingManager( function() {
    scene.add(wayfinding)
})

const loader1 = new ColladaLoader(loadingManager1)
loader1.load('./assets/Wayfinding.dae', function (collada) {

    wayfinding = collada.scene
    wayfinding.position.y = -0.19
    wayfinding.position.z = 0.30
    wayfinding.position.x = -0.40
    wayfinding.scale.set(0.19, 0.19, 0.19)
    
    const pylons = collada.scene.getObjectByName( 'pylon_signs' )
    const wayout = collada.scene.getObjectByName( 'wayout_signs' )
    const decision = collada.scene.getObjectByName( 'decision_points' )
    const regulatory = collada.scene.getObjectByName( 'regulatory_signs' )
    const locations = collada.scene.getObjectByName( 'locations' )

    console.log(pylons)

    //Add GUI
    const gui = new GUI()
    const folder = gui.addFolder("Layer Visibility")


    folder.add( pylons, 'visible', false).name("Pylons").onChange( function ( val ) {
        pylons.visible = val
    })
    folder.add( wayout, 'visible', false).name("Egress signs").onChange( function ( val ) {
        wayout.visible = val
    })
    folder.add( regulatory, 'visible', false).name("Regulatory signs").onChange( function ( val ) {
        regulatory.visible = val
    })
    folder.add( locations, 'visible', false).name("Sign locations").onChange( function ( val ) {
        locations.visible = val
    })
    folder.add( decision, 'visible', false).name("Decision points").onChange( function ( val ) {
        decision.visible = val
    })
    folder.add( wayfinding, 'visible', true).name("All").onChange( function ( val ) {
        wayfinding.visible = val
    })
    folder.open()
})

//Create scene lights
const ambient = new THREE.AmbientLight(0x303030, 10.0)
const hemiLight = new THREE.HemisphereLight( 0xe5fbfc, 0x080820, 2 )
scene.add(hemiLight, ambient)

//Create OrbitController
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 0.1
controls.maxDistance = 7
controls.enablePan = true
controls.maxPolarAngle = Math.PI/2 - 0.2

//Window resize
window.addEventListener( 'resize', onWindowResize )

//Set renderer options
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

//Resize window
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight )
}
}

//Animate
function animate() {
    requestAnimationFrame(animate)
    //box.rotation.x += 0.01
    render()
}

//Render
function render() {
    renderer.render(scene, camera)
}
