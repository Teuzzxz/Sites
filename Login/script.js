let array_1 = ['Mateuz'] // Primeira array / usuario
let array_2 = [123] // Segunda array / senha
let num1 = 0 // add valores na array_1
let num2 = 0 // add valores na array_2
let num3 = 0 // verificar na array_1
let num4 = 0 // verificar na array_2
let PrimeiroUsuario = false
let SenhaCerta = false
let UsuarioCerto = false

//--------------------------------------------------------------------------

let name = document.getElementById('usuario') // Locar de colocar usuário
let senha = document.getElementById('senha') // Local de colocar a senha
let Sdireita = document.getElementById('seta1') // Seta direita
let Sesquerda = document.getElementById('seta2') // Seta esquerda
let peg1 = document.getElementById('peg1')
let peg2 = document.getElementById('peg2')
let botEntrar = document.getElementById('entrarbutton') // botao de entrar
let botCriar = document.getElementById('botaoo')
let mud = 0

//--------------------------------------------------------------------------


function verificacao() { // Ver se o entrar está funcionando
    if (botEntrar.value == 'Entrar'){
        if (name.value == array_1[0]){
            UsuarioCerto = true
            PrimeiroUsuario = true
        } else {
            while (EstacertoU()) {
                num3++
                console.log(num3)

            }
                if (num3<2000) {
                    UsuarioCerto = true
                } else {
                    alert('úsuário Não existe')
                    num3 = 0
                }
            
        }
        if (PrimeiroUsuario == true && senha.value == array_2[0]){
            alert(`Bem vindo(a) ${array_1[num3]}`)
            PrimeiroUsuario = false
            UsuarioCerto = false
            SenhaCerta = false
            num3 = 0
            document.location.href = 'https://teuzzxz.github.io/JavaScriptExercicios/nada%20para%20fazer/pagina2.html'
        } else if (PrimeiroUsuario == false && UsuarioCerto == true) {
            if (senha.value == array_2[0 + num3]) {
                alert(`Bem vindo(a) ${array_1[num3]}`)
                PrimeiroUsuario = false
                UsuarioCerto = false
                SenhaCerta = false
                num3 = 0
                document.location.href = 'https://teuzzxz.github.io/JavaScriptExercicios/nada%20para%20fazer/pagina2.html'
            } else {
                alert('Senha incorreta!')
                PrimeiroUsuario = false
                UsuarioCerto = false
                SenhaCerta = false
                num3 = 0
            }
        } else {
            alert('Senha ou Usuário incorretos!')
                PrimeiroUsuario = false
                UsuarioCerto = false
                SenhaCerta = false
                num3 = 0
        }
        
        



    } else if (botEntrar.value == 'Cadastrar'){
        if (name.value == 'NOVO USUÁRIO' || name.value == '' || senha.value == 'NOVA SENHA' || senha.value == ''){
            alert('Falta o email ou a senha')
        } else {
            array_1[0 + num1] = name.value
            num1++
            name.value = 'NOVO USUÁRIO'
            array_2[0 + num2] = senha.value
            senha.value = 'NOVA SENHA'
            num2++
            mud=1
            trocar()
        }
    }    
}

function EstacertoU() {
    if (name.value != array_1[0 + num3] && num3<2000){
        return true
    } else {
        return false
    }
}





//--------------------------------------------------------------------------

function trocar() {
    if (mud%2==0){
        name.value = 'NOVO USUÁRIO'
        senha.value = 'NOVA SENHA'
        peg1.innerHTML = 'FAÇA O CADRASTRO ABAIXO:'
        botEntrar.value = 'Cadastrar'
        peg2.innerHTML = '<u>Ja t</u>em cadastro?'
        botCriar.value = 'Fazer login'
        mud++
    } else {
        name.value = 'USUÁRIO'
        senha.value = 'SENHA'
        peg1.innerHTML = 'FAÇA LOGIN'
        botEntrar.value = 'Entrar'
        peg2.innerHTML = '<u>Nao t</u>em cadastro?'
        botCriar.value = 'Criar conta'
        mud++
    }
    
}

function animationSeta() { // Deixar animação rolando
    Sdireita.style.animationPlayState = 'running'
    Sesquerda.style.animationPlayState = 'running'
}

function animationSetaSair() { // pausar animação
    Sdireita.style.animationPlayState = 'paused'
    Sesquerda.style.animationPlayState = 'paused'
    Sdireita.style.anima
}

function sumirU() { // Na hora que apertar, sumir o que tava escrito
    name.value = ''
}

function sumirS() { // Na hora que apertar, sumir o que tava escrito
    if (botEntrar.value == 'Entrar'){
        senha.value = ''
        senha.type = 'password'
    } else {
        senha.value = ''
        senha.type = 'text'
    }
}