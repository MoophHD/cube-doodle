import * as THREE from 'three'

import CubicMesh from '../components/CubicMesh'
import CylinderMesh from '../components/CylinderMesh'

import roll from '../gist/roll'
import converTwoDArray from '../gist/converTwoDArray'

class MeshMap {
    constructor(cellsX, cellsZ, planeSide, scene) {
        this.planeSide = planeSide;
        this.cellSide = planeSide/cellsX;
        this.scene = scene;

        this._cellsX = cellsX;
        this._cellsZ = cellsZ;

        this.Figures = {
            CUBE: 0,
            CYLINDER: 1
        }

        let group = new THREE.Group();
        group.position.x = group.position.z = -planeSide/2 + this.cellSide/2;
        group.position.y = 0 //this.cellSide/2-31;
        scene.add(group);

        this.group = group;
    }

    gen() {
        this.genMap();
        this.fillMap();
        this.init();
    }

    genMap() {
        const CELLS_X = this._cellsX;
        const CELLS_Z = this._cellsZ;


        let space = [];

        for (let i = 0; i < CELLS_X; i++) {
            space[i] = new Array(CELLS_Z);
        }
        this.space = space;
    }

    fillMap() {
        // const CUBES_COUNT = roll(10,15);
        const CYLINDERS_COUNT = roll(1,5);
        const CUBES_COUNT = 100;

        for (let j = 0; j < CUBES_COUNT; j++) {
            this.setFigure(this.Figures.CUBE);
        }

        for (let j = 0; j < CYLINDERS_COUNT; j++) {
            this.setFigure(this.Figures.CYLINDER);
        }
    }

    setFigure(type) {
        let x = roll(0, this._cellsX-1);
        let z = roll(0, this._cellsZ-1);
        // let size = Math.random() > 0.125 ? 1 : 4; //12.5% for a 2x2 cube;
        let side = this.cellSide;
        
        let cell = this.space[x][z];

        let cellInfo = {type:type, x:x*side, z:z*side};

        if (type == this.Figures.CUBE) {
            cellInfo = Object.assign(cellInfo, {h:side*2, w:side, d:side})
        } else if (type == this.Figures.CYLINDER) {
            cellInfo = Object.assign(cellInfo, {h:side, r:side/4})
        }

        if (cell) {
            cell.push(cellInfo);
        } else {
            this.space[x][z] = [cellInfo];
        }
    }

    init() {
        // console.log(this.space);
        let plane = converTwoDArray(this.space);
        
        let pos, rot, figure;
        let lastCellY = 0;

        plane.forEach(cell => {
            lastCellY = 0;
            cell.forEach(cellEl => {
                pos = new THREE.Vector3(cellEl.x, lastCellY, cellEl.z);
                rot = new THREE.Quaternion();
                
                if (cellEl.type == this.Figures.CUBE) {
                    figure = new CubicMesh(pos, rot, cellEl.h, cellEl.w, cellEl.d);
                } else if (cellEl.type == this.Figures.CYLINDER) {
                    figure = new CylinderMesh(pos, rot, cellEl.h, cellEl.r);
                }

                if (lastCellY !=0) { console.log(lastCellY); console.log(figure) }

                lastCellY += cellEl.h;
                figure.mesh.position.y += cellEl.h/2;
                figure.init(this.group);
            });
        });
    }
}

export default MeshMap;