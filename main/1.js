 //  Height and Width Variables
 var width = window.innerWidth;
 var height = window.innerHeight;

 //  Basic Variables
 var camera, renderer, scene;

 var planeFight = new THREE.Mesh(), spotLight;

 //  Controls Variable
 var controls;
 var gltfloader1;
 var dragon;
 var bird;
 var camaro;
 var tween;
 var target = { x: 100, y: 100, z: 100 };
 var box;

 init();
 animate();


 //  Once everything is loaded, we run our Three.js stuff.
 function init() {

     scene = new THREE.Scene();

     var reflectionCube = new THREE.CubeTextureLoader()
         .setPath('../texture/sky/')
         .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
     reflectionCube.format = THREE.RGBFormat;
     scene.background = reflectionCube;
     camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
     scene.fog = new THREE.Fog(0xefd1b5, 100, 400);

     renderer = new THREE.WebGLRenderer({ antialias: true });
     renderer.setClearColor(new THREE.Color(0x000000));
     renderer.setSize(width, height);
     controls = new THREE.OrbitControls(camera, renderer.domElement);

     //  Enable animation loop when using damping or autorotation
     controls.enableDamping = true;
     controls.dampingFactor = 0.25;
     controls.enableZoom = false;

     //  Position and point the camera to the center of the scene
     camera.position.x = 1;
     camera.position.y = 0;
     camera.position.z = -20;


     document.getElementById("web-gl").appendChild(renderer.domElement);
     window.addEventListener('keyup', onDocumentKeyUp, false);

     var spotLight = new THREE.SpotLight(0xffffff);
     spotLight.angle = 0.7;
     spotLight.penumbra = 0.3;

     var 

     var road = new THREE.PlaneGeometry(20, 1350);
     var roadMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.DoubleSide, map: textureRoad });
     var roadMesh = new THREE.Mesh(road, roadMaterial);
     roadMesh.rotateY(Math.PI / 2);
     roadMesh.rotateX(Math.PI / 2);
     roadMesh.position.y = -49;
     roadMesh.position.z = 0;
     scene.add(roadMesh);

     var roadSecond = roadMesh.clone();
     roadSecond.position.x = 20;
     scene.add(roadSecond);




     //  ObjectLoader
     //  Car.json
     var objectLoader = new THREE.ObjectLoader();
     objectLoader.load("../model/camaro.json", function (camaro) {
         camaro.position.y = -49;
         camaro.position.z = 0;
         camaro.position.x = 0;
         camaro.scale.set(4, 4, 4);
         camaro.rotateY(1)
         scene.add(camaro);
         camera.lookAt(camaro);
     });

     var ambiColor = "#ffffff";
     var ambientLight = new THREE.AmbientLight(ambiColor, 1);
     scene.add(ambientLight);
 }

 function animate() {
     renderer.render(scene, camera);
     TWEEN.update();
     controls.update();
     requestAnimationFrame(animate);
 }

 function camarofront() {
     camaro.position.x += 10
 }

 //  Code 87 == W key
 function onDocumentKeyUp(event) {
     if (event.keyCode === 87) {
         tween.start();
         camarofront()
     }
 }