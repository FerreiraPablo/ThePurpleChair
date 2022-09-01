import * as THREE from 'three';

export default class Chair extends THREE.Group {
    constructor() {
        super();

        this.render();
        this.animate();
    }

    animate() {
        setInterval(function(chair) {
            chair.rotation.y += 0.01;
        }, 1000 / 60, this);
    }

    render() {
        var chairColor = 0x703CD8;
        var legs = [];

        for(var legIndex = 0; legs.length < 4; legIndex++) {
            legs.push(new THREE.Mesh(
                new THREE.BoxGeometry(0.1, 1, 0.1), 
                new THREE.MeshPhongMaterial({ color: chairColor }) 
            ));

            legs[legIndex].position.y = -0.5;
            this.add(legs[legIndex]);
        }

        legs[0].position.set(-0.45, legs[0].position.y, -0.45);
        legs[1].position.set(0.45, legs[1].position.y, -0.45);
        legs[2].position.set(0.45, legs[1].position.y, 0.45);
        legs[3].position.set(-0.45, legs[1].position.y, 0.45);

        var seat = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.1, 1),
            new THREE.MeshPhongMaterial({ color: chairColor })
        );

        this.add(seat);

        var back = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 0.1),
            new THREE.MeshPhongMaterial({ color: chairColor })
        );
        back.position.z = -0.45;
        back.position.y = 0.45;
        this.add(back);

        for(var children of this.children) {
            children.castShadow = true;
            children.receiveShadow = true;
        }
    }
}
