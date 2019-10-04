"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");


var x = 200, y = 100, larg = 10, alt = 10;
var angulo = 0;

function desenhar(){
    angulo += Math.PI / 45;
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
        ctx.fillRect(-larg/2, -alt/2, larg, atl);
    ctx.restore();
    
    requestAnimationFrame(desenhar);
}

desenhar();

document.onkeydown = function(evt){
    
    switch (evt.keyCode) {
        case 38:  /*seta para cima */        
                y -= 5;    
            break;
        case 40:  /*set para baixo*/        
                y += 5;  
            break;
        case 37:  /*set para esquerda*/ 
                x -= 5; 
            break;
        case 39:  /*seta para direita*/  
                x += 5;
            break;
    }

}