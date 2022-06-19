
    //  Height and Width Variables
    var width = window.innerWidth;
    var height = window.innerHeight;
    var mouse = new THREE.Vector2();
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    //  Basic Variables
    var scene, camera, renderer;
    var container, controls;

    //  Object Variables
    var objectLoader, city;

    //  Particle Variables
    var particles, geometry, materials = [], parameters, i, h, color, sprite, size;
    var clock = new THREE.Clock();


    init();
    animate();


    function init() {

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xcccccc, 10,1500);

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
        camera.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(width, height);

        container = document.getElementById("web-gl");
        container.appendChild(renderer.domElement);

        controls = new THREE.TrackballControls(camera);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        //  Add  ambient lighting
        var ambiColor = "#c2c5cc";
        var ambientLight = new THREE.AmbientLight(ambiColor);
        scene.add(ambientLight);

        var loader = new THREE.GLTFLoader();

        loader.load('../../model/gltf/san_francisco_city/scene.gltf', function (gltf) {

            city = gltf;

            scene.add(city.scene);
        });
            geometry = new THREE.Geometry();

        var textureLoader = new THREE.TextureLoader();

        sprite1 = textureLoader.load("../../texture/snowflake1.png");
        sprite2 = textureLoader.load("../../texture/snowflake2.png");
        sprite3 = textureLoader.load("../../texture/snowflake3.png");
        sprite4 = textureLoader.load("../../texture/snowflake4.png");
        sprite5 = textureLoader.load("../../texture/snowflake5.png");
        sprite6 = textureLoader.load("../../texture/snow.png");

        for (i = 0; i < 4000; i++) {

            var vertex = new THREE.Vector3();
            vertex.x = Math.random() * 2000 - 1000;
            vertex.y = Math.random() * 2000 - 1000;
            vertex.z = Math.random() * 2000 - 1000;
            geometry.vertices.push(vertex);
        }

        parameters = [
            // [[Color in HSL], texture, size
            [[1.0, 0.2, 0.5], sprite2, 1],
            [[0.95, 0.1, 0.5], sprite3, 2],
            [[0.90, 0.05, 0.5], sprite1, 3],
            [[0.85, 0, 0.5], sprite5, 1.5],
            [[0.80, 0, 0.5], sprite4, 2.5],
            [[0.75, 0, 0.5], sprite6,3.5]
        ];

        for (i = 0; i < parameters.length; i++) {

            color = parameters[i][0];
            sprite = parameters[i][1];
            size = parameters[i][2];

            materials[i] = new THREE.PointsMaterial({
                size: size,
                map: sprite,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true
            });

            materials[i].color.setHSL(color[0], color[1], color[2]);

            particles = new THREE.Points(geometry, materials[i]);
            particles.rotation.x = Math.random() * 6;
            particles.rotation.y = Math.random() * 6;
            particles.rotation.z = Math.random() * 6;
            scene.add(particles);

            renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
            window.addEventListener('resize', onWindowResize, false);
        }
    }

    function onDocumentMouseMove(event) {

        event.preventDefault();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {

        requestAnimationFrame(animate);

        var t = (Date.now() / 1000);

        camera.position.z -= Math.cos(t) * 8;
        camera.position.x += Math.sin(t) * 7;
        camera.position.y += 0.2;


        // city.rotation.y += 0.001;

        for (i = 0; i < scene.children.length; i++) {

            var object = scene.children[i];
            if (object instanceof THREE.Points) {
                object.rotation.y = t * ( i < 400 ? i + 1 : -( i + 1 ) );
            }
        }
        render();
    }

    function render() {

        controls.update();
        renderer.render(scene, camera);
    }
