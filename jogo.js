const sprites = new Image();
sprites.src = './sprites.png';

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';
const caiu_HIT = new Audio();
caiu_HIT.src = './efeitos/caiu.wav';
const pulo_HIT = new Audio();
pulo_HIT.src = './efeitos/pulo.wav';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let melhorScore = 100;

let passouPorCano = 0;

const flappybird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,//0.25
    velocidade: 0,
    velocidadeMax: 10,
    velocidadeMin: -6,
    moveAsa: 0,
    contadorTime: 0,

    pula() {
        flappybird.velocidade -= 4.6;
        pulo_HIT.play();
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


        //velocidade maxima e minima de queda e voo 
        if (flappybird.velocidade > flappybird.velocidadeMax) {
            flappybird.velocidade = flappybird.velocidadeMax;
        }
        if (flappybird.velocidade < flappybird.velocidadeMin) {
            flappybird.velocidade = flappybird.velocidadeMin;
        }

        //colisão com canos chaoy 0 ate -225 
        if (//logica canos bate cara ok
            flappybird.x >= canos.ceux - flappybird.largura + 1
        ) {

            //bate no cano de cima
            if (flappybird.y <= flappybird.altura + canos.chaoy + canos.altura - canos.distanciay * 1.165 ||
                flappybird.y >= -flappybird.altura + canos.ceuy + canos.distanciay
            ) {



                flappybird.velocidade = 0;
                chao.velocidade = 0;
                planoDeFundo.velocidade = 0;
                canos.velocidade = 0;
                flappybird.gravidade = 0;


                som_HIT.play();
                caiu_HIT.play();

                setTimeout(() => {
                    flappybird.y = 50;
                    flappybird.gravidade = 0.25;
                    mudaDeTela(Telas.GAMEOVER)


                }, 500);


            }
        }
        //queda do passaro
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
            caiu_HIT.play();

            setTimeout(() => {
                mudaDeTela(Telas.GAMEOVER)
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
    ceuy: -112.5 + 150 * 1.25,
    chaox: canvas.width,
    chaoy: -112.5,

    //canos2 largura do cano e 1.5 distancia da tela
    ceux2: 50 + canvas.width * 1.5,
    ceuy2: -112.5 + 150 * 1.25,
    chaox2: 50 + canvas.width * 1.5,
    chaoy2: -112.5,

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
            //reaparece
            canos.chaox = canvas.width + canos.largura;
            canos.ceux = canvas.width + canos.largura;

            //onde
            canos.chaoy = Math.random() * (-225);//-225 é o minimo de cima maximo é 0
            canos.ceuy = canos.chaoy + canos.distanciay * 1.25;
            passouPorCano += 1;
        }

        //reaparece cano2
        if (canos.chaox2 < -canos.largura) {
            //reaparece
            canos.chaox2 = canvas.width + canos.largura;
            canos.ceux2 = canvas.width + canos.largura;
            //onde
            canos.chaoy2 = Math.random() * (-225);//-225 é o minimo de cima maximo é 0
            canos.ceuy2 = canos.chaoy2 + canos.distanciay * 1.25;
            passouPorCano += 1;

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
        //pontuação
        contexto.font = "30px bold Verdana";
        contexto.strokeText(passouPorCano, canvas.width - 45, 30);
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


const mensagemGAMEOVER = {
    spriteX: 134,
    spriteY: 153,
    largura: 225,
    altura: 200,
    x: (canvas.width / 2) - 225 / 2,
    y: 50,
    pontos: 0,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGAMEOVER.spriteX, mensagemGAMEOVER.spriteY,//onde começa a cortar
            mensagemGAMEOVER.largura, mensagemGAMEOVER.altura,// tamanho do corte
            mensagemGAMEOVER.x, mensagemGAMEOVER.y,//onde começa a printar
            mensagemGAMEOVER.largura, mensagemGAMEOVER.altura, // Tamanho do desenho
        );


        if (mensagemGAMEOVER.pontos == 0) {
            mensagemGAMEOVER.pontos = passouPorCano;
        }
        if (passouPorCano >= melhorScore) {
            melhorScore = passouPorCano;
        }
        //medalha de bronze
        if (mensagemGAMEOVER.pontos <= 10) {
            contexto.drawImage(
                sprites,
                48, 124,
                44, 44,
                mensagemGAMEOVER.x + 25, mensagemGAMEOVER.y + 85,
                44, 44,
            );
        }

        //medalha de prata
        if (mensagemGAMEOVER.pontos > 10 && mensagemGAMEOVER.pontos <= 49) {
            contexto.drawImage(
                sprites,
                48, 78,
                44, 44,
                mensagemGAMEOVER.x + 25, mensagemGAMEOVER.y + 85,
                44, 44,
            );
        }

        //medalha de ouro
        if (mensagemGAMEOVER.pontos > 49 && mensagemGAMEOVER.pontos <= 99) {
            contexto.drawImage(
                sprites,
                0, 124,
                44, 44,
                mensagemGAMEOVER.x + 25, mensagemGAMEOVER.y + 85,
                44, 44,
            );
        }


        //medalha de diamante
        if (mensagemGAMEOVER.pontos >= 100) {
            contexto.drawImage(
                sprites,
                0, 78,
                44, 44,
                mensagemGAMEOVER.x + 25, mensagemGAMEOVER.y + 85,
                44, 44,
            );
        }
        contexto.strokeText(melhorScore, mensagemGAMEOVER.x + 160, mensagemGAMEOVER.y + 140.5);
        contexto.strokeText(passouPorCano, mensagemGAMEOVER.x + 160, mensagemGAMEOVER.y + 97.5);
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
            mensagemGetReady.desenha();
            //canos1 e 2 voltam para o fim da tela 50 é a largura do cano
            canos.ceux = canvas.width;
            canos.chaox = canvas.width;
            canos.ceux2 = 50 + canvas.width * 1.5;
            canos.chaox2 = 50 + canvas.width * 1.5;
            mensagemGAMEOVER.pontos = 0;
            passouPorCano = 0;

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

Telas.GAMEOVER = {
    desenha() {
        planoDeFundo.desenha();
        canos.desenha();
        chao.desenha();
        flappybird.desenha();
        mensagemGAMEOVER.desenha();
    },
    click() {
        mudaDeTela(Telas.INICIO)
    },
    atualiza() {
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