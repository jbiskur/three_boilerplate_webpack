import "three"
import "three/examples/js/controls/OrbitControls"

export default class Application {

  constructor(){
    this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this._camera.position.z = 400;

    this._scene = new THREE.Scene();

    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    if ($("canvas").length != 0) {
      $("canvas").remove();
    }

    $(document.body).append(this._renderer.domElement);

    this.controls = new THREE.OrbitControls( this._camera, this._renderer.domElement);

    $(window).resize( this._windowResize.bind(this));
  }

  GetRenderer() {
    return this._renderer;
  }

  GetCamera() {
    return this._camera;
  }

  GetScene() {
    return this._scene;
  }

  _windowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize( window.innerWidth, window.innerHeight);
  }

  Run() {
    this.Render();
  }

  Render(timestamp) {
    requestAnimationFrame(this.Render.bind(this));

    this._renderer.render( this._scene, this._camera);
  }
};