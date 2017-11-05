import * as THREE from 'three'
import AbstractApplication from 'views/AbstractApplication'

class Main extends AbstractApplication {
    constructor(){

        super();
        this.MAX_CUBES = 10;

        this._renderer.setClearColor(0xffffff, 1)        

        var geometry = new THREE.BoxGeometry( 50, 50, 50 );
        var material = new THREE.MeshBasicMaterial( { color: 0x333333 } );

        let lastVert, localLn;
        let geoLn = new THREE.Geometry();
        let matLn = new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 1
        });
        let ln = new THREE.Line(geoLn, matLn);

        for (let i of geometry.vertices) {
            console.log(i);
            if (lastVert) {
                localLn = ln.clone();
                localLn.geometry.vertices.push( lastVert, i);
                this._scene.add(localLn);
            }
            lastVert = i;
        }


        this._mesh = new THREE.Mesh( geometry, material );
        this._scene.add( this._mesh );


        //grid
        // var gridHelper = new THREE.GridHelper( 100, 10 );
        // this._scene.add( gridHelper );

        this.animate();
    }
    
    spawn() {
        // for (let i = 0; i<this.MAX_CUBES; i++) {
        //     let geo = new THREE.BoxGeometry( 50, 50, 50 );
        //     let material = new THREE.MeshBasicMaterial( { color: 0x333333 } );

        //     let cube = new THREE.Mesh(geo, material);
        //     cube.position.copy(new THREE.Vector3(Math.random()*50, Math.random()*50, Math.random()*50))
        //     this._scene.add(cube);
        // }
    }

}

export default Main;