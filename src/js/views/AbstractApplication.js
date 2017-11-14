/* eslint-disable */
import 'three'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/renderers/CanvasRenderer'


class AbstractApplication {

    constructor(){
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20000 );
        this._camera.position.set(0, 150, 400);
        this._camera.lookAt(this._scene.position);

        this._renderer = new THREE.WebGLRenderer({antialias:true});
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        // this._renderer.shadowMap.enabled = true;
        // this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // setInterval(() => {
        //     console.log(this._camera.position)
        // }, 500)


        document.body.appendChild( this._renderer.domElement );

        this._controls = new THREE.OrbitControls( this._camera, this._renderer.domElement );

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );


    }

    get renderer(){

        return this._renderer;

    }

    get camera(){

        return this._camera;

    }

    get scene(){

        return this._scene;

    }

    get controls() {
        return this._controls;
    }


    onWindowResize() {

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize( window.innerWidth, window.innerHeight );

    }

    animate(timestamp) {
        requestAnimationFrame( this.animate.bind(this) );
        
        this._renderer.render( this._scene, this._camera );

    }


}
export default AbstractApplication;