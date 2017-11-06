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

        this._mat = new THREE.MeshBasicMaterial({
            color: 0xfffffff,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        });
    }

    init(scene) {
        console.log(scene.add);
        scene.add(this._mesh)
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
}

export default Mesh;