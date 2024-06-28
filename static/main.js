import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '/static/assets/targets/houses.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const house1 = await loadGLTF('/static/assets/models/medieval_house/scene.gltf');
    const house2 = await loadGLTF('/static/assets/models/house2/scene.gltf');
    const house3 = await loadGLTF('/static/assets/models/house3/scene.gltf');
    house1.scene.scale.set(0.1, 0.1, 0.1);
    house2.scene.scale.set(0.07, 0.07, 0.07);
    house3.scene.scale.set(0.1, 0.1, 0.1);

    house1.scene.position.set(0, 0, 0);
    house2.scene.position.set(0, 0, 0);
    house3.scene.position.set(0, 0, 0);

    house1.scene.rotation.x = Math.PI / 2;  // 45 grados en el eje X
    house2.scene.rotation.x = Math.PI / 2;  // 45 grados en el eje X
    house3.scene.rotation.x = Math.PI / 2;  // 45 grados en el eje X


    const anchor1 = mindarThree.addAnchor(0);
    const anchor2 = mindarThree.addAnchor(1);
    const anchor3 = mindarThree.addAnchor(2);
    anchor1.group.add(house1.scene);
    anchor2.group.add(house2.scene);
    anchor3.group.add(house3.scene);

    var val = 0;
    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      house1.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      house2.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      house3.scene.rotation.y += 0.01 * val; // Incrementa la rotación en el eje Y
      
      renderer.render(scene, camera);
    });
    const rotateButton = document.getElementById('rotate-button');
    rotateButton.addEventListener('click', () => {
      val = (val + 1) % 2;
    });
  }
  start();
});
