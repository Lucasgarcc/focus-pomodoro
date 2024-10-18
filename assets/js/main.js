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

