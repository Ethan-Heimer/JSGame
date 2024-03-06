import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import input from "./engine/input"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

const raycaster = new THREE.Raycaster();
let INTERSECTED;

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;
controls.xSpeed = 10;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material2 = new THREE.MeshBasicMaterial( { color: 0xff4477 } );

const cube = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material2 );

const group = new THREE.Group();
group.add(cube)
group.add(cube2);

scene.add(group);

cube2.position.x = 1;

camera.position.z = 5;

let rotSpeed = .1;

function animate() {
    requestAnimationFrame( animate );
    
    controls.update();
   
    cube.scale.y = 2;

    if(input.GetKeyDown("ArrowDown"))
      group.rotation.x += rotSpeed;
    else if(input.GetKeyDown("ArrowUp"))
      group.rotation.x -= rotSpeed;
    else if(input.GetKeyDown("ArrowLeft"))
      group.rotation.y += rotSpeed
    else if(input.GetKeyDown("ArrowRight"))
      group.rotation.y -= rotSpeed

    raycaster.setFromCamera( input.MousePos, camera );

		const intersects = raycaster.intersectObjects( scene.children, false );

    if ( intersects.length > 0 ) {

      const targetDistance = intersects[0].distance;

      camera.focusAt( targetDistance ); // using Cinematic camera focusAt method
      if (INTERSECTED != intersects[0].object ) {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        
        INTERSECTED = intersects[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );

      }

    } else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;

    }

    console.log(input.MousePos);
    
	renderer.render( scene, camera );
}

animate();