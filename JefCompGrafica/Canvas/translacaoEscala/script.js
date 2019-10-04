"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");


var x = 50, y = 70, larg = 10, alt = 10;
var x2=100, y2=50, larg2 =40, alt2 = 30;

var angulo = 45, angulo2= Math.PI/2;


// inicia um vetor de 256 teclas
var teclas = [];
for(var i =0; i< 256; i++){
    teclas[i] =false;
}
function desenhar(){
    processaTeclas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 0, 200)";
    ctx.strokeStyle = "rgb(255, 128, 0)";
    ctx.lineWidth = 2;
    ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo);
        ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(50, 0);
        ctx.stroke();
        ctx.fillRect(-larg/2, -alt/2, larg, alt);
    ctx.restore();

    ctx.save();
        ctx.translate(x2, y2);
        ctx.rotate(angulo2);
        ctx.fillRect(-larg/2, -alt/2, larg, alt);
            

    ctx.restore();
    
    requestAnimationFrame(desenhar);
}

desenhar();

document.onkeyup = function(evt){
        teclas[evt.keyCode] = false;
}

document.onkeydown = function(evt){
    teclas[evt.keyCode] = true;
}


function processaTeclas(){
    if(teclas[39]){
        x +=5;
    }
    if(teclas[37]){
        x -=5;
    }
    if(teclas[38]){
        y -=5;
    }
    if(teclas[40]){
        y +=5;
    }
    if(teclas[90]){
        angulo += Math.PI / 45;
    }
    if(teclas[88]){
        angulo -= Math.PI / 45;
    }
    
}



