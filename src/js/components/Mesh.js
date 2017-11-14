import * as THREE from 'three'

class Mesh {

    /**
     * 
     * @param {Vector3} pos 
     * @param {Quaternion} rot 
     */

    constructor(pos, rot) {
        this._pos = pos;
        this._rot = rot;

        

        this._mat = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: .5,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })
    }

    init(scene) {
        scene.add(this._mesh)

        var outlineMaterial = new THREE.MeshBasicMaterial( { color: 0x333333, side: THREE.BackSide } );
        var outlineMesh = new THREE.Mesh( this.mesh.geometry, outlineMaterial );
        outlineMesh.position.copy(this.mesh.position);
        outlineMesh.scale.multiplyScalar(1.02);
        scene.add( outlineMesh );
    }

    get pos() {
        return this._pos;
    }
    
    set pos(value) {
        this._mesh.position.copy(value);
    }

    get rot() {
        return this._pos;
    }

    set rot(value) {
        this._mesh.position.copy(value);
    }

    get mesh() {
        return this._mesh;
    }
}

export default Mesh;