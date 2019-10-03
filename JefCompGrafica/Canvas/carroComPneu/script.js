'use strict';

var canvas = document.getElementById('tela');
var ctx = canvas.getContext('2d');


var x = 50, y = 70, larg = 30, alt = 45;
var x2, y2, larg2 = 5, alt2 = 5;
var x3, y3, larg3 = 10, alt3 = 15;
var sx = 1, sy = 1;
var angulo = 0, angulo2 = Math.PI / 2, anguloRoda = 0;
var velocidade = 0;
var re = false;

// inicia um vetor de 56 teclas
var teclas = [];

for (var i = 0; i < 56; i++) {
    teclas[i] = false;
}

function desenhar() {
    processaTeclas();

    var cor = hexToRgb(document.getElementById('cor').value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    ctx.translate(x, y);
    ctx.scale(sx, sy);
    ctx.rotate(angulo);

    // Pneus
    ctx.fillStyle = 'rgb(0, 0, 0)';

    ctx.fillRect(-larg3 / 2 + 13, -alt3 / 2 - 15, larg3, alt3);
    ctx.fillRect(-larg3 / 2 - 13, -alt3 / 2 - 15, larg3, alt3);

    ctx.rotate(anguloRoda);
    ctx.fillRect(-larg3 / 2 + 13, -alt3 / 2 + 15, larg3, alt3);
    ctx.fillRect(-larg3 / 2 - 13, -alt3 / 2 + 15, larg3, alt3);

    ctx.rotate(-anguloRoda);

    // Lataria
    ctx.fillStyle = cor;
    ctx.fillRect(-larg / 2, -alt / 2, larg, alt);

    // Faróis
    ctx.fillStyle = 'rgb(255, 255, 0)';

    ctx.fillRect(-larg2 / 2 + 13, alt / 2 - alt2, larg2, alt2);
    ctx.fillRect(-larg2 / 2 - 13, alt / 2 - alt2, larg2, alt2);

    if (re) {
        ctx.fillStyle = 'rgb(255, 255, 255)';
    }

    ctx.fillRect(-larg2 / 2 + 7, -alt / 2, alt2, alt2);
    ctx.fillRect(-larg2 / 2 - 7, -alt / 2, larg2, alt2);

    // Frente
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(-larg / 2, alt - 15, larg, 7);

    // Triângulo
    ctx.translate(0, alt / 2 - 1);
    ctx.beginPath();
    ctx.moveTo(-larg / 2, 0);
    ctx.lineTo(larg / 2, 0);
    ctx.lineTo(0, 30);
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();

    // Número
    ctx.font = '25px Arial';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillText("1", -larg / 2 + 7, -alt / 2 + 12);

    ctx.restore();

    requestAnimationFrame(desenhar);
}

desenhar();

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
    anguloRoda = 0;
}

document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
}

function processaTeclas() {
    // Buzina
    if (teclas[72]) {
        document.getElementById('buzina').play();
    }

    // Buzina
    if (teclas[109]) {
        sx = sy = sx - 0.1;
    } else if (teclas[107]) {
        sx = sy = sx + 0.1;
    }

    // Velocidade
    if (teclas[32] && teclas[87]) {
        velocidade = 20;
        document.getElementById('turbo').play();
    } else if (teclas[87]) {
        velocidade = 5;
        document.getElementById('motor').play();
        document.getElementById('turbo').pause();
    } else if (teclas[83]) {
        velocidade = 2.5;
        re = true;
    } else {
        document.getElementById('motor').pause();
        document.getElementById('turbo').pause();
        re = false;
    }

    // Esquerda
    if (teclas[68]) {
        anguloRoda = Math.PI / 15;
        if (teclas[87] ) {
            angulo += Math.PI / 45;
        } else {
            if (teclas[83] ) {
                angulo -= Math.PI / 45;
            }
        }
        
    }

    // Direita
    if (teclas[65] ) {
        anguloRoda = -Math.PI / 15;
        if (teclas[87]) {
            angulo -= Math.PI / 45;
        } else {
            if (teclas[83]) {
                angulo += Math.PI / 45;
            }
        }
    }

    if (teclas[87]) {
        x += velocidade * Math.cos(Math.PI / 2 + angulo);
        y += velocidade * Math.sin(Math.PI / 2 + angulo);
        x2 += velocidade * Math.cos(Math.PI + angulo);
        y2 += velocidade * Math.sin(Math.PI + angulo);
    }

    if (teclas[83]) {
        x -= velocidade * Math.cos(Math.PI / 2 + angulo);
        y -= velocidade * Math.sin(Math.PI / 2 + angulo);
        x2 -= velocidade * Math.cos(Math.PI + angulo);
        y2 -= velocidade * Math.sin(Math.PI + angulo);
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')' : 
        'rgb(0, 0, 0)';
}
