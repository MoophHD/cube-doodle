import * as THREE from 'three'
// import 'tween.js'

import AbstractApplication from 'views/AbstractApplication'

import MeshMap from './containers/MeshMap'


class Main extends AbstractApplication {
    constructor(){
        super();
        this._renderer.setClearColor(0xffffff, 1) 

        // let material = new THREE.MeshLambertMaterial({
        //     color: 0xffffff,
        //     emissive: 0xffffff,
        //     emissiveIntensity: .5,
        //     polygonOffset: true,
        //     polygonOffsetFactor: 1,
        //     polygonOffsetUnits: 1
        // })

        //PLANE
        const HEIGHT = 10000;
        const WIDTH = 10000;
        
        let planeMat = new THREE.MeshBasicMaterial({
            color: 0xCCCCC9,
            polygonOffset: true,
            polygonOffsetFactor: 0.5,
            polygonOffsetUnits: 1
        })
        var planeGeo = new THREE.PlaneGeometry(WIDTH, HEIGHT, 100, 100);
        var plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -90 * Math.PI / 180;
        plane.position.y = 0;
        
        this.scene.add(plane);

        //PLANE GRID
        const MAX_X = 100;
        const MAX_Y = 100;
        const X_GAP = WIDTH/MAX_X;
        const Y_GAP = HEIGHT/MAX_Y;
        
        let lineMat = new THREE.LineBasicMaterial( { 
            color: 0xDC143C,
            linewidth: 1
         } );
        let lineGeo = new THREE.Geometry();

        let xPos = -WIDTH/2, yPos = -HEIGHT/2, zPos = plane.position.z, localGeo;

        // for (let i = 0; i < MAX_Y; i++) {
        //     localGeo = lineGeo.clone();
        //     localGeo.push(new THREE.Vector3(-WIDTH/2, yPos, zPos));
        //     localGeo.push(new THREE.Vector3(-WIDTH/2, WIDTH, zPos));
        //     plane.add(new THREE.Line(localGeo, lineMat));

        //     yPos += Y_GAP;
        // }

        for (let i = 0; i < MAX_Y+1; i++) {
            localGeo = lineGeo.clone();
            localGeo.vertices.push(new THREE.Vector3(xPos, -HEIGHT/2, zPos));
            localGeo.vertices.push(new THREE.Vector3(xPos, HEIGHT/2, zPos));
            plane.add(new THREE.Line(localGeo, lineMat));
            
            xPos += X_GAP;
        }

        for (let i = 0; i < MAX_X+1; i++) {
            localGeo = lineGeo.clone();
            localGeo.vertices.push(new THREE.Vector3(-WIDTH/2, yPos, zPos));
            localGeo.vertices.push(new THREE.Vector3(WIDTH/2, yPos, zPos));
            plane.add(new THREE.Line(localGeo, lineMat));

            yPos += Y_GAP;
        }

        //LIGHT 
        var light2 = new THREE.DirectionalLight(0xffffff, 0.6);
        light2.position.copy(this.camera.position);
        this.scene.add(light2);

        this.controls.addEventListener("change", () => {
            light2.position.copy(this.camera.position);
        })

        // new TWEEN.Tween(this.mesh.position) //onUpdate
        //     .to({ x: 500, y: 500 }, 5000)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .start();
         
        // requestAnimationFrame(animate);
         
        // function animate(time) {
        //     requestAnimationFrame(animate);
        //     TWEEN.update(time);
        // }

        this.animate();
        
        //GEN SETTINGS
        const CELLS_X = 10;
        const CELLS_Z = 10;

        let meshMap = new MeshMap(CELLS_X,CELLS_Z, HEIGHT, this.scene);
        meshMap.gen();

        this._meshMap = meshMap;
    }

    spawn() {
        this._meshMap.gen();
    }

    checkCollision(obj) {
        for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++)
        {       
            var localVertex = obj.geometry.vertices[vertexIndex].clone();
            var globalVertex = obj.matrix.multiplyVector3(localVertex);
            var directionVector = globalVertex.subSelf( obj.position );
        
            var ray = new THREE.Ray( obj.position, directionVector.clone().normalize() ); // eslint-disable-line
            // var collisionResults = ray.intersectObjects( collidableMeshList );
            // if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
            // {
            //     // a collision occurred... do something...
            // }
        }

    }



}

export default Main;