const ButtonNumero = [...document.getElementsByClassName('number')] // números
const ButtonOperações = [...document.getElementsByClassName('operacoes')]
const ButtonRes = document.getElementById('resultado')
const ButtonApagar = document.getElementById('apagar')
const ButtonCopiar = document.getElementsByClassName('copiarP')[0]
let Res = document.getElementsByTagName('p')[0] // Resultado
let sinal = true
let decimal = true
let ParenteseAberto = false

ButtonNumero.map((v,p) => {   // Adiciona evento de click a todos os numeros
    v.addEventListener('click', (evt) => {
        if (Res.innerHTML == '0') {
            Res.innerHTML=v.innerHTML
        } else {
            Res.innerHTML += v.innerHTML
            sinal = true
        }
    })
})



ButtonOperações.map((v,p)=> { //Evento de clique as operações
    v.addEventListener('click', () => {
        if (sinal && v.innerHTML!='C' && v.innerHTML!='()' ) {
            if (Res.innerHTML == '0') {
                if (v.innerHTML == '+' || v.innerHTML == '-') {
                    Res.innerHTML = v.innerHTML
                    sinal = false
                }
            } else {
                Res.innerHTML += v.innerHTML
                sinal = false
            }
        }
        else if (v.innerHTML == 'C') { // Apagar tudo
            Res.innerHTML = '0'
            sinal = true
            ParenteseAberto = false
        }
//------------------Parêntese-------------------------------
        if (v.innerHTML == '()') {
            if (ParenteseAberto) {
                Res.innerHTML +=')'
                ParenteseAberto = false
            }else if (Res.innerHTML == '0') {
                Res.innerHTML = '('
                ParenteseAberto = true
            }else if (Res.innerHTML == '-' || Res.innerHTML== '+'){
                Res.innerHTML += '('
                ParenteseAberto = true
            } else {
                Res.innerHTML += '('
                ParenteseAberto = true
            }

        }
    })
})

ButtonRes.addEventListener('click', () => { // Botao do resultado
    Res.innerHTML = eval(Res.innerHTML)
})


ButtonApagar.addEventListener('click', () => { // Botao de apagar
    if (Res.innerHTML != '0') {
        let apagado = ''
        for (let c = 0; c < Res.innerHTML.length - 1; c++){
            apagado+=Res.innerHTML[c]
        }
        if (!sinal) {
            sinal=true
        }
        if (!ParenteseAberto) {
            ParenteseAberto = true
        }
        Res.innerHTML=apagado
    }
})

ButtonCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(Res.innerHTML)
})