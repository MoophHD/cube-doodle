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
        this._geo = new THREE.BoxGeometry(width, height, depth)
        new THREE.BoxGeometry()

        this._mesh = new THREE.Mesh( this._geo, this._mat );
        this._mesh.quaternion.copy(rot);
        this._mesh.position.copy(pos);
    }

    init(scene) {
        super.init(scene);
        
        var geo = new THREE.EdgesGeometry( this.mesh.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 1 } );
        var wireframe = new THREE.LineSegments( geo, mat );
        this._mesh.add( wireframe );
    }
}

export default CubicMesh;