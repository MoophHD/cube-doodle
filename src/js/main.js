/* eslint-disable */
import * as THREE from 'three'
import 'tween.js'
import CubicMesh from './components/CubicMesh'
import CylinderMesh from './components/CylinderMesh'

import AbstractApplication from 'views/AbstractApplication'


class Main extends AbstractApplication {
    constructor(){

        super();
        this.MAX_CUBES = 10;

        this._renderer.setClearColor(0xffffff, 1) 

        var geometry = new THREE.BoxGeometry( 250, 250, 250 );
        let material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0x072534,
            emissiveIntensity: .5
            // side: THREE.DoubleSide,
            // polygonOffset: true,
            // polygonOffsetFactor: 1,
            // polygonOffsetUnits: 1
        })


        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.z = -500;
        this.mesh.position.x = -100;
        
        this.scene.add( this.mesh );



        var light = new THREE.AmbientLight(0xffffff, 0.5);
        var light2 = new THREE.PointLight(0xffffff, 0.5);

        this.scene.add(light);
        this.scene.add(light2);

        setInterval(() => {
            this.mesh.rotation.x += 0.05;
            this.mesh.rotation.y += 0.05;
            // this.animate();
        }, 24)

        // this.animate();

        // var geo = new THREE.EdgesGeometry( this.mesh.geometry );
        // var mat = new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 3 } );
        // var wireframe = new THREE.LineSegments( geo, mat );
        // this.mesh.add( wireframe );

        // new TWEEN.Tween(this.mesh.position) //onUpdate
        //     .to({ x: 500, y: 500 }, 5000)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .start();
         
        // requestAnimationFrame(animate);
         
        // function animate(time) {
        //     requestAnimationFrame(animate);
        //     TWEEN.update(time);
        // }




        // let planeMat = new THREE.MeshLambertMaterial({
        //      emissive: 0x072534,
            
        // })
        // let planeGeo = new THREE.PlaneGeometry(10000, 10000, 100, 100);
        // let planeMesh = new THREE(planeGeo, )

        this.animate();
    }

    smoothenGeo(geo) {
        let smooth = geo.clone();
        
        if (smooth.type == "BufferGeometry") {
            smooth = new THREE.Geometry().fromBufferGeometry(smooth);
            smooth.mergeVertices();
            smooth.computeVertexNormals();
            smooth.computeFaceNormals();

            return new THREE.BufferGeometry().fromGeometry(smooth);
        } else {
            smooth.mergeVertices();
            smooth.computeVertexNormals();
            smooth.computeFaceNormals();
            
            return smooth;
        }
    }
    
    spawn() {
        let cube, cylinder;
        for (let i = 0; i<0; i++) { // i < this.MAX_CUBES
            cube = new CubicMesh(new THREE.Vector3((Math.random()*600)-200, Math.random()*50, Math.random()*100),new THREE.Quaternion(), 200, 200, 200)
            cube.init(this.scene);
        }

        for (let i = 0; i<0; i++) { // i < this.MAX_CUBES
            cylinder = new CylinderMesh(new THREE.Vector3((Math.random()*600)-200, Math.random()*50, Math.random()*100),new THREE.Quaternion(), 200, 50)
            cylinder.init(this.scene);
        }
    }

}

export default Main;