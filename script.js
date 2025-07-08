const html = document.querySelector("html")
const btnFoco = document.querySelector(".app__card-button--foco")
const btnCurto = document.querySelector(".app__card-button--curto")
const btnLongo = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const btnStartPause = document.getElementById("start-pause")
const btnIniciarOuPausar = document.querySelector("#start-pause span")
const tempoNaTela = document.querySelector("#timer")

const musicaFocoInput = document.getElementById("alternar-musica")
const musica = new Audio("/sons/luna-rise-part-one.mp3")
const somPause = new Audio("/sons/pause.mp3")
const somPlay = new Audio("/sons/play.wav")
const somFinal = new Audio("/sons/beep.mp3")

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true
somPlay.volume = 0.3
somPause.volume = 0.3
somFinal.volume = 0.3

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

btnFoco.addEventListener("click", () => {
    zerar()
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    btnFoco.classList.add("active")
})

btnCurto.addEventListener("click", () => {
    zerar()
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    btnCurto.classList.add("active")
})

btnLongo.addEventListener("click", () => {
    zerar()
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    btnLongo.classList.add("active")
})

function alterarContexto(contexto) {
    exibeTempoNaTela()
    botoes.forEach(function(botao){
        botao.classList.remove("active")
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somFinal.play()
        zerar()
        alert("Tempo finalizado!")
        return
    }
    tempoDecorridoEmSegundos -= 1
    exibeTempoNaTela()
}

btnStartPause.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        somPause.play()
        zerar()
        return
    }
    somPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    btnIniciarOuPausar.textContent = "Pausar"
    document.querySelector(".app__card-primary-butto-icon").setAttribute("src", "/imagens/pause.png")
}

function zerar() {
    clearInterval(intervaloId)
    btnIniciarOuPausar.textContent = "Começar"
    document.querySelector(".app__card-primary-butto-icon").setAttribute("src", "/imagens/play_arrow.png")
    intervaloId = null
}

function exibeTempoNaTela() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

exibeTempoNaTela()