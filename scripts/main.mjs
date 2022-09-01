import * as THREE from 'three';
import Chair from './objects/Chair.mjs';

export default class Main {
    constructor(element) {
        this.element = element;
        this.setupGraphics();
    }

    setupGraphics() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.element.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.update();
        this.mockup();

        window.addEventListener('resize', this.resize.bind(this));
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.update.bind(this));
    }

    mockup() { 
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        
        var chair = new Chair();
        this.scene.add(chair);
        this.scene.add(light);

        this.camera.position.z = 5;
        this.camera.position.y = 3;
        this.camera.position.x = -5;
            
        this.camera.lookAt(chair.position);
    }

    resize() { 
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

var application = new Main(document.body);