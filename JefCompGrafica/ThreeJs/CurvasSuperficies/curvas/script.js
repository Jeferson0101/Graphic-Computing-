"use strict";

var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth 
    / window.innerHeight, 0.1, 1000);
    var render = new THREE.WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    var canvas = render.domElement;
    document.body.appendChild(canvas);

    var materialLinha = new THREE.LineBasicMaterial({color: 0xFFFFFF});
    var geometriaLinha = new THREE.Geometry();

    var raio = 1;

    // for(var ang = 0; ang < Math.PI * 2; ang += Math.PI /25){
    //     var x = raio * Math.cos(ang);
    //     var y = raio * Math.sin(ang);
    //     geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
    // }

    for(var y = -1; y <= 1; y += 0.01){
        var x = Math.sqrt(raio * raio - y * y);
        geometriaLinha.vertices.push(new THREE.Vector3(x, y, 0));
    }

    // fecha o círculo
    // var x = raio * Math.cos(ang);
    // var y = raio * Math.sin(ang);

    //geometriaLinha.vertices.push(new THREE.Vector3(x ,y, 0));

    var linha = new THREE.Line(geometriaLinha, materialLinha);
    cena.add(linha);
    camera.position.z = 5;
    
    function desenhar(){
        render.render(cena, camera);
        requestAnimationFrame(desenhar);
    }

    requestAnimationFrame(desenhar);