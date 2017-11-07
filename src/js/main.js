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

        this._renderer.setClearColor(0xEAA5A5, 1)        

        var geometry = new THREE.BoxGeometry( 200, 200, 200 );
        let material = new THREE.MeshBasicMaterial({
            color: 0xfffffff,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })


        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );

        var geo = new THREE.EdgesGeometry( this.mesh.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 3 } );
        var wireframe = new THREE.LineSegments( geo, mat );
        this.mesh.add( wireframe );

        new TWEEN.Tween(this.mesh.position)
            .to({ x: 500, y: 500 }, 5000)
            .onUpdate(function() {
                console.log(this.x, this.y);
            })
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
         
        requestAnimationFrame(animate);
         
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }

        var lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );


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

        for (let i = 0; i<3; i++) { // i < this.MAX_CUBES
            cylinder = new CylinderMesh(new THREE.Vector3((Math.random()*600)-200, Math.random()*50, Math.random()*100),new THREE.Quaternion(), 200, 50)
            cylinder.init(this.scene);
        }
    }

}

export default Main;