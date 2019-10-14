"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth
    / window.innerHeight, 0.1, 1000);

// with the antialias the curve looks like more soft
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);
var i = 0;

var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var geometriaLinha = new THREE.Geometry();

//Creating Box geometry
var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1 );
var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
var cube = new THREE.Mesh( geometry, material );
var luzPonto = new THREE.PointLight(0x999999);
luzPonto.position.z = 4;
cena.add(luzPonto);



//-- Catmull-Rom Splines
var curva = new THREE.SplineCurve([
    new THREE.Vector3(-0.7, 0.1, 0),
    new THREE.Vector3(1, -0.2, 0),
    new THREE.Vector3(1.5, 0.3, 0),
    new THREE.Vector3(2, 0.7, 0),
    new THREE.Vector3(0.5, 1.5, 0),
    new THREE.Vector3(-0.7, 1.5, 0),
    new THREE.Vector3(-1.3, 0.5, 0),
    new THREE.Vector3(-0.7, 0.1, 0)
])
var caminho = new THREE.Path(curva.getPoints(50));
geometriaLinha = caminho.createPointsGeometry(50);


var linha = new THREE.Line(geometriaLinha, materialLinha);

cena.add(cube);
cena.add(linha);

camera.position.z = 10;

var sobe = false;

function desenhar() {
    
    
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);