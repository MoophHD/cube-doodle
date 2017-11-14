import * as THREE from 'three'
// import 'tween.js'

import AbstractApplication from 'views/AbstractApplication'

import CubicMesh from './components/CubicMesh'
import CylinderMesh from './components/CylinderMesh'
import getRandomInt from './gist/getRandomInt'


class Main extends AbstractApplication {
    constructor(){

        super();
        this.MAX_CUBES = 10;

        this._renderer.setClearColor(0xffffff, 1) 

        var geometry = new THREE.BoxGeometry( 80, 80, 80 );
        let material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: .5,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })

        //MESH
        this.mesh = new THREE.Mesh( geometry, material );
        
        this.scene.add( this.mesh );

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
        plane.position.y = -40;
        
        this.scene.add(plane);

        //PLANE GRID
        const MAX_X = 100;
        const MAX_Y = 100;
        const X_GAP = WIDTH/MAX_X;
        const Y_GAP = HEIGHT/MAX_Y;
        
        let lineMat = new THREE.LineBasicMaterial( { 
            color: 0xff0000,
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
            console.log(`from x ${xPos}, y ${-HEIGHT/2}`);
            console.log(`to x ${xPos}, y ${HEIGHT/2}`);
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

        console.log(this.scene);


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
    }

    spawn() {

        let cube, cylinder, pos, rot, height, width, depth, radius;
        for (let i = 0; i<1; i++) { // i < this.MAX_CUBES
            height = getRandomInt(200, 200);
            width = getRandomInt(200, 200);
            depth = getRandomInt(200, 200);
            
            pos = new THREE.Vector3(getRandomInt(400, 1000), height/2, getRandomInt(-500, 500));
            rot = new THREE.Quaternion();

            cube = new CubicMesh(pos, rot, height, width, depth);
            cube.init(this.scene);
        }

        for (let i = 0; i<1; i++) { // i < this.MAX_CUBES
            height = getRandomInt(300, 300);
            radius = getRandomInt(75, 75);
            
            pos = new THREE.Vector3(getRandomInt(400, 1000), height/2, getRandomInt(-500, 500));
            rot = new THREE.Quaternion();

            cylinder = new CylinderMesh(pos, rot, height, radius);
            cylinder.init(this.scene);
        }
    }

    checkCollision(obj) {
        for (var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++)
        {       
            var localVertex = obj.geometry.vertices[vertexIndex].clone();
            var globalVertex = obj.matrix.multiplyVector3(localVertex);
            var directionVector = globalVertex.subSelf( obj.position );
        
            var ray = new THREE.Ray( obj.position, directionVector.clone().normalize() ); // eslint-ignore-line
            // var collisionResults = ray.intersectObjects( collidableMeshList );
            // if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
            // {
            //     // a collision occurred... do something...
            // }
        }

    }



}

export default Main;