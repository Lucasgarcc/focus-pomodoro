/* ========== Estrutura de DOM ========== */


/* ------ Função pega os valores do elemento DOM ------ */

const tag = (element) => {
    const tagElement = document.querySelector(element);
   return  tagElement;
}


/* ------ Variavel dos bottões cria uma nodeList ------ */

const buttons = document.querySelectorAll('.app__card-button');


/* ------ Variavel pega as imagens ------ */

const banner = tag('.app__image');


/* ------ Variavel pega o titulo ------ */

const title = tag('.app__title');
title.setAttribute('aria-label', 'Titulo da página');

/* ------ Variavel Objeto que armazena os textos ------ */

const texts = {
    'foco': `Otimize sua produtividade,<br>
    <strong class="app__title-strong">Mergulhe no que importa.</strong>`,
    'descanso-curto': ` Que tal dar uma respirada?,<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`,
    'descanso-longo': `Hora de voltar à superfície ,<br>
    <strong class="app__title-strong">Faça uma pausa Longa!</strong>`
}


/* ------ Função que controla o evento 
e iterage com os elementos ------ */

function handleClick (target, tag, data, image) {
    target.addEventListener('click', () => {
        tag.setAttribute('data-contexto', data);
        banner.setAttribute('src', image);

        // passando valores como objetos usando [data]

        title.innerHTML = texts[data] || title.innerHTML;

        buttons.forEach((item) => {
            if (item === target) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }           
        });      
    });
}


/* ------ Variaveis dos elementos do body ------ */

const html = tag('html');
const foco = tag('.app__card-button--foco');
const curt = tag('.app__card-button--curto');
const long = tag('.app__card-button--longo')


/* ------ Chamada da função que controla o evento e 
iterage com os elementos ------ */

handleClick(foco, html, 'foco','/assets/imagens/foco.png');

handleClick(curt, html, 'descanso-curto','/assets/imagens/descanso-curto.png');

handleClick(long, html, 'descanso-longo','/assets/imagens/descanso-longo.png');

/* ========== Estrutura de controle de Musica do POMODORO ========== */


const audio = new Audio('/assets/sons/luna-rise-part-one.mp3');

const music = tag('#alternar-musica');

audio.preload = 'auto';
audio.load();


/* ------ Função que controla o evento de Musica ------ */

function handleMusic(audio, music) {
  music.loop = true;
  audio.volume = 0.4;

  music.addEventListener('change', () => {

    // verifica se a condição é verdadeira 

    // se elemento check tiver ativo ele toca a musica

    // se não ele para a musica

    music.checked ? audio.play() : audio.pause();

  });
}

handleMusic(audio, music);


/* ========== Estrutura de controle do Tempo do POMODORO ========== */

let time = {
    foco : 26 * 60, // 25 mint
    curt : 6 * 60, // 5 mint
    long : 16 * 60 // 15 mint
};

let interval = null;
let currentType = null; // o tipo de temporizador (foco, curto, longo)
let isInit = false; // para controlar se o temporizador está inicializando

const start = tag('#start-pause');
const button = tag('.app__card-primary-button');
const listAppCard = document.querySelector('.app__card-timer');
start.setAttribute('aria-label', 'Botão inicar o temporizador');
button.setAttribute('aria-label', '');

const textButton = {
    'start': `<img class="app__card-primary-butto-icon" src="/assets/imagens/play_arrow.png" alt="">
    <span>Começar</span>`,
    'pause': `<img class="app__card-primary-butto-icon" src="/assets/imagens/pause.png" alt="">
    <span>Pausar</span>`
}

// Sons para os eventos de iniciar e pausar

const startMusic = new Audio('/assets/sons/play.wav');
const pausaMusic = new Audio('/assets/sons/pause.mp3');
const warningMusic = new Audio('/assets/sons/beep.mp3');


// Função de temporizador


function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return ` 
    <p class="timer" aria-label="Temprizador">
    ${min.toString().padStart(2, '0')}:
    ${sec.toString().padStart(2, '0')}
    </p>
    `;
}


const timer = (typeTime) => {
    if ( time[typeTime] <= 0 ) {
        if (!findPopup) {  // Verifica se o popup já foi exibido 
            alert('Temprizador finalizado')
        }

        return;
    }

    if ( time[typeTime] === 10 ) warningMusic.play();
            // Atualiza o conteúdo com o tempo formatado (substitui o conteúdo existente)
            listAppCard.innerHTML = formatTime(time[currentType]);
    time[typeTime] -= 1;
}

// Função que inicia a contagem em base do tipo de tempo (foco, curto, longo)

function initTimer(typeTime) {

   interval = setInterval(() => {
        timer(typeTime)
    }, 1000)
  
}

// Pausa o temporizador

function pauseTimer() {
    clearInterval(interval);
    interval = null;
    isInit = false;
    button.innerHTML = textButton['start'];
    pausaMusic.play()
}

// Função que associa os botões ao controle de tempo

function tagTime(target, data) {
    target.addEventListener('click', () => {
        currentType = data;
        if (!isInit) { // Só permite a troca do tipo de tempo se o temporizador não estiver 
            currentType = data; // Atualiza o tipo de tempo atual com o valor do botão
            console.log(`Tipo de tempo selecionado: ${currentType}`);
            alert(`Modo trocado para ${currentType} !`);
        } else {
            alert('Pause o temporizador antes de trocar o modo!');
        }
    });
}

tagTime(foco, 'foco');
tagTime(curt, 'curt');
tagTime(long, 'long');


// Inica o temporizador quando o botão é clicado

start.addEventListener('click', () => {
    if(!currentType){
        currentType = 'foco';
    }
    !isInit ? ( startMusic.play(), initTimer(currentType),   
   button.innerHTML = textButton['pause'], isInit = true ) : pauseTimer();
}) 
    
