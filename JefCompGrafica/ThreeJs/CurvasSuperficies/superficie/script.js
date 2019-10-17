"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth
    / window.innerHeight, 0.1, 1000);
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);


// Orbit controls
var controles = new THREE.OrbitControls(camera, render.domElement);



function geraCilindroLinhas(raio = 1, altura = 2, pRaio = 15){
    var geometria = new THREE.Geometry();
    for (var a = 0; a <= Math.PI*2; a += (Math.PI*2)/ pRaio){
        var x = Math.sin(a) * raio;
        var z = Math.cos(a) * raio;
        var v = new THREE.Vector3(x, -altura/2, z);
        geometria.vertices.push(v);
        v = new THREE.Vector3(x, altura/2, z);
        geometria.vertices.push(v);
        
    }
    return geometria;
}

function gerarQuadrado(larg = 1, alt =1){
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(-larg/2, alt/2));
    geo.vertices.push(new THREE.Vector3(larg/2, alt/2));
    geo.vertices.push(new THREE.Vector3(-larg/2, -alt/2));
    geo.vertices.push(new THREE.Vector3(larg/2, -alt/2));
    geo.faces.push(new THREE.Face3(0,1,2)); // se inverter o sentido muda a face renderizada
    geo.faces.push(new THREE.Face3(1,2,3));
    geo.computeFaceNormals();
    return geo;
}

// desenha um cilindo segmentado
// var forma = new THREE.LineSegments(
//     geraCilindroLinhas(1, 2, 100),
//     new THREE.MeshPhongMaterial({color: 0xffffff})

// );

var forma = new THREE.Mesh(
    gerarQuadrado(2, 2),
    new THREE.MeshPhongMaterial({color: 0xffffff})

);

var luzAmbiente = new THREE.AmbientLight(0x333333);
cena.add(luzAmbiente);



cena.add(forma);
camera.position.z = 5;

function desenhar() {
    
    render.render(cena, camera);
    requestAnimationFrame(desenhar);

}

requestAnimationFrame(desenhar);