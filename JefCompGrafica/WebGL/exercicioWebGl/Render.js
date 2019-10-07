"use strict"

class Render {
    ang = 0;
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        try {
            this.gl = this.canvas.getContext("webgl");
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        } catch (e) {
            var msg = "Error WebGL" + e.toString();
            alert(msg);
            throw Error(msg);
        }

        if (!this.gl) {
            console.error("Erro ao iniciar o WebGL");
            return;
        }

        // obtemos os shaders como strings

        var vertexShaderSource =
            document.getElementById("meu-vertex-shader").text;

        var fragmentShaderSource =
            document.getElementById("meu-fragment-shader").text;

        // criamos os shaders GLSL: upload do GLSL fonte e compilamos
        var vertexShader = Render.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);

        var fragmentShader = Render.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        // ligamos os dois shaders em um programa
        this.programa = Render.createProgram(this.gl, vertexShader, fragmentShader);

        // Procuramos a posicao de memoria dos dados do vertice
        this.positionAttributeLocation =
            this.gl.getAttribLocation(this.programa, "posicao");
        // Criamos um buffer para inserir as coordenadas nele
        this.positionBuffer = this.gl.createBuffer();
        // Associamos o buffer criado a ARRAY_BUFFER
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        this.gl.useProgram(this.programa);
        //Recuperamos o local da variável Uniform chamada escala
        this.matrixLocation = this.gl.getUniformLocation(this.programa,
            "u_escala");

        this.rotationLocation = this.gl.getUniformLocation(this.programa, "u_rotaciona");

        //Criamos a matriz que será multiplicada pelos vértices
        if (this.canvas.height < this.canvas.width) {
            this.matriz = [this.canvas.height / this.canvas.width, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1];
        } else {

            this.matriz = [1, 0, 0, 0,
                0, this.canvas.width / this.canvas.height, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1];
        }
    }

    draw() {
        this.ang -= Math.PI / 90;
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // escolhe qual programa utilizar
        this.gl.useProgram(this.programa);
        // Realiza o upload da matiz de transformação
        this.gl.uniformMatrix4fv(this.matrixLocation, false, this.matriz);

        this.gl.uniformMatrix4fv(this.rotationLocation, false, this.matrizY(this.ang));

                        //x,y,z..x,y,z
        var positions = [-0.3, 0.2, 0, -0.3, -0.2, 0, 0.3, -0.2, 0,
                        -0.3, 0.2, 0, 0.3, -0.2, 0, 0.3, 0.2, 0];
        

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        // ativa o atributo
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);

        //Associa ao position buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        //explica como usar os dados do position buffer

        var size = 3;
        var type = this.gl.FLOAT;
        var normalize = 0;
        var stride = 0;
        var offset = 0;

        this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);

        // Desenhar!
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        this.gl.drawArrays(primitiveType, offset, count);
    }

    static createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        var sucess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

        if (sucess) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }



    static createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        var sucess = gl.getProgramParameter(program, gl.LINK_STATUS);

        if (sucess) {
            return program;
        }

        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);


    }

    matrizZ(ang) {
        return [Math.cos(ang), Math.sin(ang), 0, 0,
        -Math.sin(ang), Math.cos(ang), 0, 0,
            0, 0, 1, 0, 0, 0, 0, 1];

    }

    matrizY(ang) {
        return [Math.cos(ang), 0, -Math.sin(ang), 0,
         0, 1, 0, 0, 
         Math.sin(ang), 0, Math.cos(ang), 0,
          0, 0, 0, 1];
    }

    static rotacaoX(angulo) {

    }

}

