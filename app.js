// lista que define valores ja sorteados como número secreto para não serem repetidos novamente até que todos tenham sido usados.
var listDeNumerosSorteados = []
// numero que vai multiplicar o math.radom para definir um intervalo de valores possíveis.
let numeroAleatorioLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}
mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Você acertou!');
        palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p','o numero secreto é menor' );
        } else {
            exibirTextoNaTela ('p','o numero secreto é maior' );
        }
        tentativas++;
        limparCampo();
    } 
}

function gerarNumeroAleatorio() {
    let numeroAleatorioEscolhido = parseInt(Math.random()* numeroAleatorioLimite + 1);
    let qunatidadeDeElementosNaLista = listDeNumerosSorteados.length;

    if(qunatidadeDeElementosNaLista == numeroAleatorioLimite){
        listDeNumerosSorteados = [];
    }

    if (listDeNumerosSorteados.includes(numeroAleatorioEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listDeNumerosSorteados.push(numeroAleatorioEscolhido);
        console.log(listDeNumerosSorteados);
        return numeroAleatorioEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}