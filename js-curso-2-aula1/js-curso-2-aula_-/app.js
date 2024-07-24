
let listaNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAletorio();
let tentativas = 1;

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoTela('h1', 'jogo numero secreto');
    exibirTextoTela('p', 'escolha um numero entre 1 e 10' );
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';    
        let mensagemTentativas = `parabens, vc descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;

        exibirTextoTela(`p`, mensagemTentativas)
        document.getElementById('reiniciar'). removeAttribute('disabled');


    }else{
        if (chute > numeroSecreto) {
            exibirTextoTela('p', 'o numero secreto é menor');
        } else{
            exibirTextoTela ('p', 'numero secreto é maior');
        }

        tentativas = tentativas + 1
        limparCampo();
    }

    
}


function gerarNumeroAletorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementos = listaNumeroSorteado.length;

    if (quantidadeElementos == 3){
        listaNumeroSorteado = [];
    }

    if (listaNumeroSorteado.includes(numeroEscolhido)) {
        return gerarNumeroAletorio();
    }else {
        listaNumeroSorteado.push(numeroEscolhido);
        console.log (listaNumeroSorteado);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ' ';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAletorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar'). setAttribute('disabled', true);
}