"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");


var pontos = [];
pontos.push({ x: 20, y: 20, r: 255, g: 0, b: 0 }); // 0 CE
pontos.push({ x: 580, y: 20, r: 0, g: 255, b: 0 }); // 1 CD
pontos.push({ x: 580, y: 480, r: 255, g: 0, b: 255 }); // 2 BD
pontos.push({ x: 20, y: 480, r: 255, g: 255, b: 0 }); // 3 BE

var lado = 5;


function desenhar() {
    for (let p of pontos) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = "rgb(" + p.r + "," + p.g + "," + p.b + ")";
        ctx.fillRect(-lado / 2, -lado / 2, lado, lado);
        ctx.restore();
    }
    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);


function bilinearInt(xm, ym) {
    // interpolação das linhas superior e inferior

    // distância entre os cantos
    var maxx = pontos[1].x - pontos[0].x;

    //proporção de intensidade da direita
    var dx = (xm - pontos[0].x) / maxx;

    // proporção de intensidade da esquerda (complemento)
    var ex = 1 - dx;

    //R do ponto superior interpolado
    var rc = pontos[0].r * ex + pontos[1].r * dx;

    //R do ponto inferior interpolado
    var rb = pontos[3].r * ex + pontos[2].r * dx;

    //G do ponto superior interpolado
    var gc = pontos[0].g * ex + pontos[1].g * dx;

    //G do ponto inferior interpolado
    var gb = pontos[3].g * ex + pontos[2].g * dx;


    //B do ponto superior interpolado
    var bc = pontos[0].b * ex + pontos[1].b * dx;

    //B do ponto inferior interpolado
    var bb = pontos[3].b * ex + pontos[2].b * dx;


    //Distancia entre os pontos interpolados
    var maxy = pontos[3].y - pontos[0].y;

    //proporção de intensidade do ponto interpolado de baixo
    var by = (ym - pontos[0].y) / maxy;

    //proporção de intensidade do ponto interpolado de cima
    var ty = 1 - by;

    //R do ponto central interpolado

    var rm = Math.round(rc * ty + rb * by);

    //---
    var gm = Math.round(gc * ty + gb * by);
    var bm = Math.round(bc * ty + bb * by);

    //Resultado
    return { x: xm, y: ym, r: rm, g: gm, b: bm };
} //end

canvas.addEventListener("mousedown", function (e) {
    pontos.push(bilinearInt(e.offsetX, e.offsetY));
}, false);

