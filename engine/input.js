import * as THREE from 'three';

let currentKey;
const MousePos = new THREE.Vector2();

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    currentKey = event.key;
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    currentKey = "";
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

window.addEventListener( 'pointermove', onDocumentMouseMove );
function onDocumentMouseMove( event ) {

    event.preventDefault();

    MousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    MousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function GetKeyDown(keycode){
    return keycode == currentKey;
}

export default {
    GetKeyDown,
    MousePos
}
  