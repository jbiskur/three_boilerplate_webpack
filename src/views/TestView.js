import Application from "../application/application"

export default class TestView extends Application {
  constructor() {
    super();

    var geometry = new THREE.BoxGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { color: new THREE.Color("#ffffff") } );

    this._mesh = new THREE.Mesh( geometry, material );
    super.GetScene().add( this._mesh );
  }
};