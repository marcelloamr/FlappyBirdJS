const sprites = new Image();
sprites.src = './sprites.png';

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

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
    velocidadeMax: 10,
    velocidadeMin: -6,
    moveAsa: 0,
    contadorTime: 0,

    pula() {
        flappybird.velocidade -= 4.6;
    },

    movimentos: [
        { spriteX: 0, spriteY: 0, },//cima 0
        { spriteX: 0, spriteY: 26, },//meio 1
        { spriteX: 0, spriteY: 52, },//fim 2
    ],

    desenha() {
        //tempo da Asa
        const { spriteX
            , spriteY
        } = flappybird.movimentos[flappybird.moveAsa];

        contexto.drawImage(
            sprites,
            spriteX, spriteY,//onde começa a cortar
            flappybird.largura, flappybird.altura,// tamanho do corte
            flappybird.x, flappybird.y,//onde começa a printar
            flappybird.largura, flappybird.altura, // Tamanho do desenho
        );
    },

    atualiza() {


        //teste de tempo deu 60fms
        //setTimeout(() => {
        //    console.log(flappybird.contadorTime);
        //
        //}, 2000);
        flappybird.contadorTime += 1;
        if (flappybird.contadorTime == 20) {
            flappybird.moveAsa = 1;
        }
        if (flappybird.contadorTime == 40) {
            flappybird.moveAsa = 2;
        }
        if (flappybird.contadorTime == 60) {
            flappybird.moveAsa = 0;
            flappybird.contadorTime = 0;
        }



        if (flappybird.velocidade > flappybird.velocidadeMax) {
            flappybird.velocidade = flappybird.velocidadeMax;
        }
        if (flappybird.velocidade < flappybird.velocidadeMin) {
            flappybird.velocidade = flappybird.velocidadeMin;
        }
        //console.log(flappybird.velocidade);
        if (flappybird.y >= chao.y - flappybird.altura) {
            //AGONIA QUANDO ELE PASSA DO CHAO
            flappybird.y = chao.y - flappybird.altura;

            //quando ele cai a velocidade de tudo é ZERO
            flappybird.velocidade = 0;
            chao.velocidade = 0;
            planoDeFundo.velocidade = 0;
            canos.velocidade = 0;


            som_HIT.play();

            setTimeout(() => {
                mudaDeTela(Telas.INICIO)
                flappybird.y = 50;

            }, 500);
        }
        else {
            flappybird.velocidade += flappybird.gravidade;
            flappybird.y += flappybird.velocidade;
        }

    },

};

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    velocidade: 0.01,
    atualiza() {
        if (chao.velocidade < 2.3) {
            chao.velocidade += 0.03;
        }
        chao.x -= chao.velocidade;
        if (chao.x < -chao.largura / 2) {
            chao.x = 0;
        }
    },
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
    velocidade: 0.01,
    atualiza() {
        if (planoDeFundo.velocidade < 1.15) {
            planoDeFundo.velocidade += 0.015;
        }
        planoDeFundo.x -= planoDeFundo.velocidade;
        if (planoDeFundo.x < -planoDeFundo.largura / 2) {
            planoDeFundo.x = 0;
        }
    },

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

const canos = {
    ceuSpritex: 0,
    ceuSpritey: 169,
    chaoSpritex: 52,
    chaoSpritey: 169,
    largura: 50,
    altura: 400,

    //canos1
    ceux: canvas.width,
    ceuy: 200,
    chaox: canvas.width,
    chaoy: 0,
    //canos2 largura do cano e 1.5 distancia da tela
    ceux2: 50 + canvas.width * 1.5,
    ceuy2: 200,
    chaox2: 50 + canvas.width * 1.5,
    chaoy2: 0,

    distanciax: canvas.width / 2,
    distanciay: 150,

    velocidade: 0.01,
    atualiza() {
        //console.log(canvas.width);
        if (canos.velocidade > -2.3) {
            canos.velocidade -= 0.03;
        }

        canos.ceux += canos.velocidade;
        canos.chaox += canos.velocidade;

        canos.ceux2 += canos.velocidade;
        canos.chaox2 += canos.velocidade;

        //reaparece cano1
        if (canos.chaox < -canos.largura) {
            canos.chaox = canvas.width + canos.largura;
        }
        if (canos.ceux < -canos.largura) {
            canos.ceux = canvas.width + canos.largura;
        }

        //reaparece cano2
        if (canos.chaox2 < -canos.largura) {
            canos.chaox2 = canvas.width + canos.largura;
        }
        if (canos.ceux2 < -canos.largura) {
            canos.ceux2 = canvas.width + canos.largura;
        }




    },
    desenha() {
        //ceu1
        contexto.drawImage(
            sprites,
            canos.ceuSpritex, canos.ceuSpritey,//onde começa a cortar
            canos.largura, canos.altura,// tamanho do corte
            canos.ceux, canos.ceuy + canos.distanciay,//onde começa a printar
            canos.largura, canos.altura, // Tamanho do desenho
        );
        //chao1
        contexto.drawImage(
            sprites,
            canos.chaoSpritex, canos.chaoSpritey,//onde começa a cortar
            canos.largura, canos.altura,// tamanho do corte
            canos.chaox, canos.chaoy - canos.distanciay,//onde começa a printar
            canos.largura, canos.altura, // Tamanho do desenho
        );
        //ceu2
        contexto.drawImage(
            sprites,
            canos.ceuSpritex, canos.ceuSpritey,//onde começa a cortar
            canos.largura, canos.altura,// tamanho do corte
            canos.ceux2, canos.ceuy2 + canos.distanciay,//onde começa a printar
            canos.largura, canos.altura, // Tamanho do desenho
        );
        //chao2
        contexto.drawImage(
            sprites,
            canos.chaoSpritex, canos.chaoSpritey,//onde começa a cortar
            canos.largura, canos.altura,// tamanho do corte
            canos.chaox2, canos.chaoy2 - canos.distanciay,//onde começa a printar
            canos.largura, canos.altura, // Tamanho do desenho
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
        canos.desenha()
        chao.desenha();
        flappybird.desenha();
    },
    click() {
        flappybird.pula()
    },
    atualiza() {
        planoDeFundo.atualiza();
        canos.atualiza()
        chao.atualiza();
        flappybird.atualiza();
    },
};

function loop() {

    TelaAtiva.desenha();
    TelaAtiva.atualiza();

    requestAnimationFrame(loop);
}
//click na tela
window.addEventListener('click', function () {
    if (TelaAtiva.click) {
        TelaAtiva.click();
    }
});
//teclado
window.addEventListener('keypress', function () {
    if (TelaAtiva.click) {
        TelaAtiva.click();
    }
});

mudaDeTela(Telas.INICIO)
loop();