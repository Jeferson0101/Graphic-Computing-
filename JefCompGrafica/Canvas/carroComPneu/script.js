"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");


var x = 50, y = 70, larg = 30, alt = 60;
var x2, y2, larg2 = 5, alt2 = 5;
var x3, y3, larg3 = 10, alt3 = 15;
var sx = 2, sy = 2;
var angulo = 0, angulo2 = Math.PI / 2, anguloRoda = 0;
var velocity = 5;

// inicia um vetor de 56 teclas
var teclas = [];
for (var i = 0; i < 56; i++) {
    teclas[i] = false;
}
function desenhar() {
    processaTeclas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.strokeStyle = "rgb(255, 128, 0)";
    ctx.lineWidth = 2;
    ctx.save();
    // a ordem de onde está a escala altera o resultado

    // sx += 0.005;
    // sy += 0.01;

    ctx.translate(x, y);
    //ctx.scale(sx,sy);
    ctx.rotate(angulo);

    //lataria
    ctx.fillRect(-larg / 2, -alt / 2, larg, alt);
    ctx.fillStyle = "rgb(255, 255, 0)";

    // Farois
    ctx.fillRect(-larg2 / 2 + 13, -alt2 / 2 + 30, larg2, alt2);
    ctx.fillRect(-larg2 / 2 - 13, -alt2 / 2 + 30, larg2, alt2);
   
    // Pneus
    ctx.fillStyle = "rgb(0, 0, 0)";

    //trazeira
    ctx.fillRect(-larg3 / 2 + 13, -alt3 / 2 - 15, larg3, alt3);
    ctx.fillRect(-larg3 / 2 - 13, -alt3 / 2 - 15, larg3, alt3);



    //frente
    ctx.rotate(anguloRoda);
    ctx.fillRect(-larg3 / 2 + 13, -alt3 / 2 + 15, larg3, alt3);
    ctx.fillRect(-larg3 / 2 - 13, -alt3 / 2 + 15, larg3, alt3);


    ctx.restore();

    requestAnimationFrame(desenhar);
}

desenhar();

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
    anguloRoda = 0;
    velocity = 5;
}

document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;

}


function processaTeclas() {
    if (teclas[39]) {

        anguloRoda = Math.PI / 15;
        if (teclas[38] ) {
            angulo += Math.PI / 45;
        }else{
            if (teclas[40] ) {
                angulo -= Math.PI / 45;
            }
            
        }
        
    }
    if (teclas[37]) {
        anguloRoda = - Math.PI / 15;
        if (teclas[38]) {
            angulo -= Math.PI / 45;
        }else{
            if (teclas[40]) {
                angulo += Math.PI / 45;
            }
        }
    }
    if (teclas[38]) {
        x += velocity * Math.cos(Math.PI / 2 + angulo);
        y += velocity * Math.sin(Math.PI / 2 + angulo);
        x2 += velocity * Math.cos(Math.PI + angulo);
        y2 += velocity * Math.sin(Math.PI + angulo);
    }
    if (teclas[40]) {
        x -= velocity * Math.cos(Math.PI / 2 + angulo);
        y -= velocity * Math.sin(Math.PI / 2 + angulo);
        x2 -= velocity * Math.cos(Math.PI + angulo);
        y2 -= velocity * Math.sin(Math.PI + angulo);
    }
    if (teclas[32] && teclas[38]) {
        velocity = 20;
    }


}



