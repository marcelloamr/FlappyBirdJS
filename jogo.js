const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappybird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    desenha() {
        contexto.drawImage(
            sprites,
            flappybird.spriteX, flappybird.spriteY,//onde começa a cortar
            flappybird.largura, flappybird.altura,// tamanho do corte
            flappybird.x, flappybird.y,//onde começa a printar
            flappybird.largura, flappybird.altura, // Tamanho do desenho
        );
    },
    atualiza() {
        flappybird.velocidade += flappybird.gravidade;
        flappybird.y += flappybird.velocidade;
    },

};

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,//onde começa a cortar
            chao.largura, chao.altura,// tamanho do corte
            chao.x, chao.y,//onde começa a printar
            chao.largura, chao.altura, // Tamanho do desenho
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,//onde começa a cortar
            chao.largura, chao.altura,// tamanho do corte
            (chao.x + chao.largura), chao.y,//onde começa a printar
            chao.largura, chao.altura, // Tamanho do desenho
        );
    },
};

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,//onde começa a cortar
            planoDeFundo.largura, planoDeFundo.altura,// tamanho do corte
            planoDeFundo.x, planoDeFundo.y,//onde começa a printar
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do desenho
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,//onde começa a cortar
            planoDeFundo.largura, planoDeFundo.altura,// tamanho do corte
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,//onde começa a printar
            planoDeFundo.largura, planoDeFundo.altura, // Tamanho do desenho
        );
    },
};

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,//onde começa a cortar
            mensagemGetReady.largura, mensagemGetReady.altura,// tamanho do corte
            mensagemGetReady.x, mensagemGetReady.y,//onde começa a printar
            mensagemGetReady.largura, mensagemGetReady.altura, // Tamanho do desenho
        );
    },
};

//TELAS
let TelaAtiva = {};
function mudaDeTela(novaTela) {
    TelaAtiva = novaTela;
};

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappybird.desenha();
            mensagemGetReady.desenha()

        },
        click() {
            mudaDeTela(Telas.JOGO)
        },
        atualiza() {

        },
    },
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappybird.desenha();
    },
    atualiza() {
        flappybird.atualiza();
    },
};

function loop() {

    TelaAtiva.desenha();
    TelaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (TelaAtiva.click) {
        TelaAtiva.click();
    }
});

mudaDeTela(Telas.INICIO)
loop();