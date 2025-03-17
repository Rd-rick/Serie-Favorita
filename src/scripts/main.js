document.addEventListener('DOMContentLoaded', () => {
    const buttonsNews = document.querySelectorAll('[data-tab-news]')
    const dataDeLancamento = new Date('2025-04-12 23:59:59')

    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log(hamburgerIcon)

    hamburgerIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('header__nav__item--mobile--open');
    });
    
    document.getElementById("scrollButton").addEventListener("click", function () {
        document.querySelector("#contador").scrollIntoView({ behavior: "smooth" })
    });

    const intervalo = setInterval(() => atualizaContador(dataDeLancamento, intervalo), 60000);

    atualizaContador(dataDeLancamento)

    for(let i = 0; i < buttonsNews.length; i++) {
        buttonsNews[i].addEventListener('click', function(botao) {
            const abaAlvo = botao.target.dataset.tabNews
            const aba = document.querySelector(`[data-nav-news-id="${abaAlvo}"]`)

            escondeTodasAbas()
            removeBotaoAtivo()
            if (abaAlvo == 'elenco') {
                aba.classList.add('news__cast--is-open')
            } else {
                aba.classList.add('news__release--is-open')
            }
            botao.target.classList.add('news__nav__item--is-active')
        })
    }
})

function atualizaContador(dataDeLancamento, intervalo) {
    const dataDeAgora = new Date()

    if (dataDeAgora >= dataDeLancamento) {
        document.getElementById("contador").innerHTML = "🚀 O evento já chegou!"
        clearInterval(intervalo)
        return
    }

    let anos = dataDeLancamento.getFullYear() - dataDeAgora.getFullYear();
    let meses = dataDeLancamento.getMonth() - dataDeAgora.getMonth()
    let dias = dataDeLancamento.getDate() - dataDeAgora.getDate()
    let horas = dataDeLancamento.getHours() - dataDeAgora.getHours()
    let minutos = dataDeLancamento.getMinutes() - dataDeAgora.getMinutes()

    if (minutos < 0) {
        minutos += 60
        horas--;
    }

    if (horas < 0) {
        horas += 24
        dias--
    }

    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(dataDeLancamento.getFullYear(), dataDeLancamento.getMonth(), 0).getDate()
        dias += ultimoDiaMesAnterior
        meses--
    }

    if (meses < 0) {
        meses += 12
        anos--
    }

    let contadorString = "Faltam</span> "
    if (meses > 0) contadorString += `${meses} ${meses === 1 ? "mês" : "meses"} `
    if (dias > 0) contadorString += `<span>${dias} dias</span> `;
    contadorString += `${horas} horas e ${minutos} minutos`;

    document.getElementById("contador").innerHTML = `<p>${contadorString}</p>`;
}

function escondeTodasAbas() {
    const abas = document.querySelectorAll('[data-nav-news-id]')

    for (let i = 0; i < abas.length; i++) {
        abas[i].classList.remove('news__cast--is-open')
        abas[i].classList.remove('news__release--is-open')
    }
}

function removeBotaoAtivo() {
    const bottonNavNews = document.querySelectorAll('[data-tab-news]')

    for (let i = 0; i < bottonNavNews.length; i++) {
        bottonNavNews[i].classList.remove('news__nav__item--is-active')
    }
}