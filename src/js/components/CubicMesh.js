import * as THREE from 'three'
import Mesh from './Mesh'

class CubicMesh extends Mesh{
    /**
     * 
     * @param {Vector3} pos 
     * @param {Quaternion} rot 
     */
    constructor(pos, rot, height, width, depth) {
        super(pos, rot)
        this._geo = new THREE.BoxGeometry(height, width, depth)

        this._mesh = new THREE.Mesh( this._geo, this._mat );
        this._mesh.quaternion.copy(rot);
        this._mesh.position.copy(pos);
    }
}

export default CubicMesh;