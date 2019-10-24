// Objeto cena que gerencia tudo que deve existir em cena

var cena = new THREE.Scene();
//Cãmera é uma conf. sobre como e de que posição iremos observar a cena

// primeiro parâmetro em graus
var camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight,
    0.1, 1000);


//renderizador que utilizará a cena e a câmera para exibir a imagem
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);

// O canvas será construído pelo renderizador
var canvas = render.domElement;

document.body.appendChild(canvas);

var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x808080, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );

cena.add(plane); // 

// configura a intensidade de luz no ambiente
var luzAmbiente = new THREE.AmbientLight(0x333333);
cena.add(luzAmbiente);

var luzPonto = new THREE.PointLight(0x888888);
luzPonto.position.set(2,2,4);
cena.add(luzPonto);
camera.position.z = 5;


function desenhar(){
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);

// variáveis para avaliar o deslocamento do mouse
var xi;
var yi;

canvas.addEventListener("mousedown", function (e) {
    xi = e.offsetX;
    yi = e.offsetY;
}, false);
//evento do movimento do mouse (se há botão pressionado)

canvas.addEventListener("mousemove", function(e){
    if(e.buttons > 0){
        camera.position.x = 8 * (xi - e.offsetX) / canvas.width;
        camera.position.y = 8 * (e.offsetY - yi) / canvas.height;        
    }
}, false);