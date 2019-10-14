"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth
    / window.innerHeight, 0.1, 1000);
var render = new THREE.WebGLRenderer({ antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
var canvas = render.domElement;
document.body.appendChild(canvas);
var i = 0;

var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var geometriaLinha = new THREE.Geometry();

//variáveis Curva hérmite
// var p1 = new THREE.Vector3(1, 1, 0);
// var t1 = new THREE.Vector3(0.5, 2, 0);
// var p2 = new THREE.Vector3(-1, 1, 0);
// var t2 = new THREE.Vector3(1, 1, 0);
//-------CurvaBezier---------------
// var curve = new THREE.CubicBezierCurve(
// 	new THREE.Vector3( -1, 0, 0 ),
// 	new THREE.Vector3( -0.5, 1, 0 ),
// 	new THREE.Vector3( 0.5, -1, 0 ),
// 	new THREE.Vector3( 1, 0, 0)
// );
//geometriaLinha.vertices = curve.getPoints( 50 );


//-- Catmull-Rom Splines
var curva = new THREE.SplineCurve([
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1.5, 0.5, 0),
    new THREE.Vector3(2, 0, 0),
])
var caminho = new THREE.Path(curva.getPoints(50));
geometriaLinha = caminho.createPointsGeometry(50);

//circulo completo
// for(var ang = 0; ang < Math.PI * 2; ang += Math.PI /25){
//     var x = raio * Math.cos(ang);
//     var y = raio * Math.sin(ang);
//     geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
// }

// fecha o círculo
// var x = raio * Math.cos(ang);
// var y = raio * Math.sin(ang);

//geometriaLinha.vertices.push(new THREE.Vector3(x ,y, 0));

// curva 
// for(var y = -1; y <= 1; y += 0.01){
//     var x = Math.sqrt(raio * raio - y * y);
//     geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
// }



//Curva de Hermite
// for(var s = 0; s <= 1; s+= 0.01){
//     var s2 = s * s;
//     var s3 = s2 * s;
//     var h1 = 2 * s3 - 3 * s2 + 1;
//     var h2 = -2 * s3 + 3 * s2;
//     var h3 = s3 - 2 * s2 + s;
//     var h4 = s3 - s2;
//     var pt = new THREE.Vector3(0,0,0);
//     pt.add(p1.clone().multiplyScalar(h1));
//     pt.add(p2.clone().multiplyScalar(h2));
//     pt.add(t1.clone().multiplyScalar(h3));
//     pt.add(t2.clone().multiplyScalar(h4));
//     geometriaLinha.vertices.push(pt);
// }



var raio = 1;

var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);

camera.position.z = 10;


var sobe = false;

function desenhar() {
    


    // movimentação dos pontos de dois pontos da curva
    // curva.points[0].y -= 0.01;
    // curva.points[1].x -= 0.05;
    // var caminho = new THREE.Path(curva.getPoints(50));
    // linha.geometry = caminho.createPointsGeometry(50);


    if (!sobe){
        linha.geometry.vertices[0].y -= 0.01;
        if (linha.geometry.vertices[0].y < -2) {
            sobe = true;
        }
    } else {
        linha.geometry.vertices[0].y += 0.01;
        if (linha.geometry.vertices[0].y > 2) {
            sobe = false;
        }
    }
    linha.geometry.verticesNeedUpdate = true;
    render.render(cena, camera);
    requestAnimationFrame(desenhar);

}

requestAnimationFrame(desenhar);