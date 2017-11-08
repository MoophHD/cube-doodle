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
        let wireframe = new THREE.LineSegments( 
            new THREE.EdgesGeometry( this._mesh.geometry ),
            new THREE.LineBasicMaterial( { color: 0x333333, linewidth: 3, transparent:true, opacity: .5} )
        );

        this._mesh.add(wireframe);

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