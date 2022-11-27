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
const camera = new THREE.PerspectiveCamera( 35, innerWidth / innerHeight, 0.01, 1000 )
const renderer = new THREE.WebGLRenderer()
const gltfLoader = new GLTFLoader

init()
animate()

function init() {

camera.position.z = 3
camera.position.y = 2.5
camera.position.x = -5
camera.lookAt( 0, 0, 0)

//Adding fog
var fogColor = new THREE.Color(0x7c7c7c);
scene.fog = new THREE.Fog(fogColor, 0.5, 15);

//Add grid helper
const grid = new THREE.GridHelper( 200, 400, 0xffffff, 0x000000 )
grid.material.opacity = 0.6
grid.material.transparent = true
scene.add( grid )

//Load GLTF model
gltfLoader.load('./assets/GLB_TamakiEstate_02.glb', function (terrainScene) {
    
    //Adjust GLFT transforms
    terrainScene.scene.position.y = -0.1

    //terrain.scene.scale.set(5, 5, 5)
    //terrain.scene.rotation.z = 2

    scene.add( terrainScene.scene )
    //scene.add( model );
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
    //model.rotation.x = 1
    wayfinding.scale.set(0.19, 0.19, 0.19)
    
    const pylons = collada.scene.getObjectByName( 'pylon_signs' )
    const wayout = collada.scene.getObjectByName( 'wayout_signs' )
    const decision = collada.scene.getObjectByName( 'decision_points' )
    const regulatory = collada.scene.getObjectByName( 'regulatory_signs' )
    const locations = collada.scene.getObjectByName( 'locations' )

    console.log(pylons)

    //Add GUI
    const gui = new GUI( { title: 'Model Layers' } )

    gui.add( pylons, 'visible', true).onChange( function ( val ) {
        pylons.visible = val
    })
    gui.add( wayout, 'visible', true).onChange( function ( val ) {
        wayout.visible = val
    })
    gui.add( decision, 'visible', true).onChange( function ( val ) {
        decision.visible = val
    })
    gui.add( regulatory, 'visible', true).onChange( function ( val ) {
        regulatory.visible = val
    })
    gui.add( locations, 'visible', true).onChange( function ( val ) {
        locations.visible = val
    })


/*
    const params = {
					Pylons: pylons.visible,
					WayOut Signage: wayout.visible,
					Domes: decision.visible,
					Regulatory signage: regulatory.visible,
					Sign locations: locations.visible
				}

	gui.add( params, 'Pylons', true ).onChange( function ( val ) {
        pylons.visible = val
    })
*/
    gui.open()

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
