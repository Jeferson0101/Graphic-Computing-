"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");


var x = 50, y = 70, larg = 30, alt = 60;
var x2, y2, larg2 =5, alt2 = 5;
var x3, y3, larg3 = 5, alt3 = 5;

var angulo = 0, angulo2= Math.PI/2;


// inicia um vetor de 256 teclas
var teclas = [];
for(var i =0; i< 256; i++){
    teclas[i] =false;
}
function desenhar(){
    processaTeclas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.strokeStyle = "rgb(255, 128, 0)";
    ctx.lineWidth = 2;
    ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo);
        
        ctx.fillRect(-larg/2, -alt/2, larg, alt);
        ctx.fillStyle = "rgb(255, 255, 0)";
        ctx.fillRect(-larg2/2+13, -alt2/2+30, larg2, alt2);
        ctx.fillRect(-larg2/2-13, -alt2/2+30, larg2, alt2);
    ctx.restore();

        

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
        angulo += Math.PI / 45;
    }
    if(teclas[37]){
        angulo -= Math.PI / 45;
    }
    if(teclas[38]){
        x += 10*Math.cos(Math.PI/2 + angulo);
        y += 10*Math.sin(Math.PI/2 + angulo);
        x2 += 10*Math.cos(Math.PI + angulo);
        y2 += 10*Math.sin(Math.PI + angulo);
    }
    if(teclas[40]){
        x -= 10*Math.cos(Math.PI/2 + angulo);
        y -= 10*Math.sin(Math.PI/2 + angulo);
        x2 -= 10*Math.cos(Math.PI + angulo);
        y2 -= 10*Math.sin(Math.PI + angulo);
    }
   
    
}



