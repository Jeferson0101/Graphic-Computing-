"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");


var x = 200, y = 100, larg = 300, alt = 150;
var anguloInicio = 0, anguloFim = 2;
var radius = 25, velocity = 1;

function desenharFormas(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.fillStyle = "rgb(255, 128, 0)";
    //ctx.fillRect(x, y, larg, alt); // desenha o retangulo


    // se a circunferência chegar ao final do canvas ele retorna
    x += velocity;
      
    if(x+radius >= canvas.width){
        velocity *= -1;
    }

    if(x-radius <= 0){
        velocity *= -1; 
    }

    ctx.beginPath();
    ctx.arc(x, y,radius, anguloInicio * Math.PI, anguloFim * Math.PI * 1.75);
    // desenha um triângulo
    //ctx.moveTo(x,y);
    //ctx.lineTo(x+25, y+25);
    //ctx.lineTo(x+25, y-25);
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(desenharFormas);
}

function desenharTranslacao(){
    // var lado = 10;
    // ctx.clearRect(0,0, canvas.width, canvas.height);
    // ctx.save();
    // ctx.translate(50, 50);
    // ctx.fillStyle = "rgb(255, 128, 0)";
    // ctx.fillRect(-lado/2, -lado/2, lado, lado);
    // ctx.translate(100, 0);
    // ctx.fillStyle = "rgb(255, 0, 0)";
    // ctx.fillRect(-lado/2, -lado/2, lado, lado);
    // ctx.restore();
    // ctx.save();
    // ctx.translate(10, 10);
    // ctx.fillStyle = "rgb(0, 0, 200)";
    // ctx.fillRect(-lado/2, -lado/2, lado, lado);
    // ctx.restore();
    requestAnimationFrame(desenharTranslacao);
}  

desenharTranslacao();

// function translacao(){
    
//     ctx.fillRect(0,0,300,300);
//     for (var i=0;i<3;i++) {
//       for (var j=0;j<3;j++) {
//         ctx.save();
//         ctx.strokeStyle = "#9CFF00";
//         ctx.translate(50+j*100,50+i*100); // move o ponto de origem 0,\0
//         drawSpirograph(ctx,20*(j+2)/(j+1),-8*(i+3)/(i+1),10);
//         ctx.restore(); // restaura ao ponto inicial eixo 0,0
//       }
//     }
//   }
//   function drawSpirograph(ctx,R,r,O){
//     var x1 = R-O; 
//     var y1 = 0;
//     var i  = 1;
//     ctx.beginPath();
//     ctx.moveTo(x1,y1);
//     do {
//       if (i>20000) break;
//       var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72))
//       var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72))
//       ctx.lineTo(x2,y2);
//       x1 = x2;
//       y1 = y2;
//       i++;
//     } while (x2 != R-O && y2 != 0 );
//     ctx.stroke();
// }



//indica ao navegador o que executar quando estiver pronto 
// para realizar uma nova renderização
//translacao();
//requestAnimationFrame(desenharFormas);


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