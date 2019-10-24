"use strict";
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);

var canvas = render.domElement;
document.body.appendChild(canvas);

//Orbit Controls
var controles = new THREE.OrbitControls(camera, render.domElement);

//Luz
var luzAmbiente = new THREE.AmbientLight(0x999999);
cena.add(luzAmbiente);



function gerarCilindroLinhas(raio = 1, altura = 2, pRaio = 8){
    var geometria = new THREE.Geometry();

    for(var a =0; a <= Math.PI*2; a += (Math.PI * 2) / pRaio){
        var x = Math.sin(a) * raio;
        var z = Math.cos(a) * raio;

        var v = new THREE.Vector3(x, -altura/2, z);
        geometria.vertices.push(v);

        v = new THREE.Vector3(x, altura/2, z);
        geometria.vertices.push(v);
    }
    return geometria;
}


function gerarCilindro(r = 1, alt = 1, pRaio = 4, pAlt = 1){
    var geo = new THREE.Geometry();
    var nc= 0, nl = 0;

    for(var y = -alt/2; y <= alt/2;  y+= alt/pAlt){
        nl++;nc=0;
        for(var a = 0; a<= Math.PI*2; a+= (Math.PI * 2)/pRaio){
            nc++;
            var x= Math.sin(a) * r;
            var z= Math.cos(a) * r;
            var v = new THREE.Vector3(x,y,z);
            geo.vertices.push(v);
        }
    }

    //precisamos criar 3 faces de 3 vértices cada: Triangulos
    for(var L = 0; L < nl-1; L++){
        for(var c = 0; c < nc-1; c +=1){
            geo.faces.push(new THREE.Face3( L*nc+c,
                                            L*nc+c+1,
                                            (L+1)*nc+c)   );
            geo.faces.push(new THREE.Face3((L+1)*nc+c+1,
                                            (L+1)*nc+c,
                                            L*nc+c+1)     );

        }
    }
    geo.computeFaceNormals();
    return geo;
}

function gerarQuadro(larg = 1, alt =1){
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(-larg/2, alt/2));
    geo.vertices.push(new THREE.Vector3(larg/2,  alt/2));
    geo.vertices.push(new THREE.Vector3(-larg/2, -alt/2));
    geo.vertices.push(new THREE.Vector3(larg/2, -alt/2));
    geo.faces.push(new THREE.Face3(0,2,1));
    geo.faces.push(new THREE.Face3(1,2,3));
    geo.computeFaceNormals();
    return geo;
}


//-----------------------------------------------Superficies geradas por deslocamento------------------------------------------//

function gerarSuperficiePlana(lar = 1, alt = 1, p = 1){
    var geo = new THREE.Geometry();
    var nc = 0, nl = 0;
    for(var y = -alt/2; y <= alt/2; y+= alt/2){
        nl++;
        nc = 0;
        for(var x = -lar/2; x <= lar/2; x += lar/p){
            nc++;
            var v = new THREE.Vector3(x,y,0);
            geo.vertices.push(v);
        }
    }

    for(var L = 0; L < nl-1; L++){
        for(var c = 0; c <nc-1; c++){
            geo.faces.push(new THREE.Face3(L*nc+c, L*nc+c+1, (L+1)*nc+c));

            geo.faces.push(new THREE.Face3((L+1)*nc+c+1, (L+1)*nc+c, L*nc+c+1));
        }
    }

    geo.computeFaceNormals();
    return geo;
}




// var forma = new THREE.LineSegments(
//     gerarCilindroLinhas(1,2,360),
//     new THREE.MeshPhongMaterial({color: 0xffffff})
// );

var forma = new THREE.Mesh(
    gerarSuperficiePlana(2,3,5),
    new THREE.MeshPhongMaterial({color: 0xffffff})
);

forma.material.wireframe = true;
//forma.material.side = THREE.DoubleSide;

cena.add(forma);


function desenhar() {
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}


requestAnimationFrame(desenhar);