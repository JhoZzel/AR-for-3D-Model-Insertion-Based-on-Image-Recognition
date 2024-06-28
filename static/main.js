import {loadGLTF} from "./libs/loader.js";
import {mockWithVideo} from './libs/camera-mock.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    //mockWithVideo('../../assets/mock-videos/musicband1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '/static/assets/targets/a.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    //const house = await loadGLTF('/static/assets/models/musicband-house/scene.gltf');
    // const house = await loadGLTF('/static/assets/models/musicband-house/scene.gltf');
    const house = await loadGLTF('/static/assets/models/medieval_house_int/scene.gltf');
    const house_sin = await loadGLTF('/static/assets/models/medieval_house_int/scene.gltf');
    house.scene.scale.set(0.1, 0.1, 0.1);
    house_sin.scene.scale.set(0, 0.1, 0.1);
    house.scene.position.set(0, 0, 0);
    
    // const house_int = await loadGLTF('/static/assets/models/medieval_house/scene_int.gltf');
    // house.scene.scale.set(0.1, 0.1, 0.1);
    // house.scene.position.set(0, 0, 0);

    house.scene.rotation.x = Math.PI / 2;  // 45 grados en el eje X
    // house.scene.rotation.y = Math.PI / 4;  // 45 grados en el eje Y
    // house.scene.rotation.z = Math.PI / 4;  // 45 grados en el eje Z

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(house.scene);
    var val = 0;
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      house.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      if(val == 1) {
        
      }
      renderer.render(scene, camera);
      // house.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      // if (val == 1) {
        // house.scene.scale.set(0, 0, 0);
        // house_int.scene.scale.set(0.1, 0.1, 0.1);
        // house_int.scene.position.set(0, 0, 0);
        // house_int.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      // }
      // else {
        // house.scene.scale.set(0.1, 0.1, 0.1);
        // house.scene.position.set(0, 0, 0);
        // house.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      // }
    });
    const rotateButton = document.getElementById('rotate-button');
    rotateButton.addEventListener('click', () => {
      val = (val + 1) % 2;
      // if (val === 1) val = 0; else val = 1;
      // house.scene.rotation.y += 0.01; // Incrementa la rotación en el eje Y
    });
    // Rotacion
  }
  start();
});
