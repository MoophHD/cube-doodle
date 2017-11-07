import * as THREE from 'three'
import Mesh from './Mesh'

class CylinderMesh extends Mesh {

    /**
     * 
     * @param {Vector3} pos 
     * @param {Quaternion} rot
     */

    constructor(pos, rot, height, radiusT, radiusB) {
        super(pos, rot);

        radiusB = radiusB || radiusT;

        this._geo = new THREE.CylinderGeometry(radiusT, radiusB, height, 64);
        this._mesh = new THREE.Mesh( this._geo, this._mat );
        this._mesh.quaternion.copy(rot);
        this._mesh.position.copy(pos);
    }
}

export default CylinderMesh;