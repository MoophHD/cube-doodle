import * as THREE from 'three'
import CubicMesh from './components/CubicMesh'

import AbstractApplication from 'views/AbstractApplication'


class Main extends AbstractApplication {
    constructor(){

        super();
        this.MAX_CUBES = 10;

        this._renderer.setClearColor(0xEAA5A5, 1)        

        var geometry = new THREE.BoxGeometry( 50, 50, 50 );
        let material = new THREE.MeshBasicMaterial({
            color: 0xfffffff,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })

        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );

        var geo = new THREE.EdgesGeometry( this.mesh.geometry );
        // geo = this.smoothenGeo(geo);
        var mat = new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 3 } );
        var wireframe = new THREE.LineSegments( geo, mat );
        this.mesh.add( wireframe );

        this.mesh.geometry.computeVertexNormals();

        for (let i = 0; i < this.mesh.children; i++) {
            this.mesh.children[i].geometry.computeVertexNormals();
        }

        this.mesh.geometry = this.smoothenGeo(this.mesh.geometry);

        //grid
        // var gridHelper = new THREE.GridHelper( 100, 10 );
        // this.scene.add( gridHelper );

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
        for (let i = 0; i<this.MAX_CUBES; i++) {
            let cube = new CubicMesh(new THREE.Vector3(Math.random()*50, Math.random()*50, Math.random()*50),new THREE.Quaternion(), 50, 50, 50)
            cube.init(this.scene);
        }
        console.log(this.scene)
    }

}

export default Main;