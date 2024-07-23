const Menu = document.getElementById('Menu')
const P_Menu = [...document.getElementsByClassName('animation')]
const linhas = [...document.getElementsByClassName('line')]
const ani = [...document.getElementsByClassName('ani')]
const Btn_Menu = document.getElementsByClassName('BotãoMenu')[0]
const barreto_boneco = document.getElementById('barreto')
let travado = false
let consultor = ''
var trocar = true

P_Menu.map((v, p) => {
    
    v.addEventListener('mouseenter', () => {
        adicionar(ani[p])
    })
    
    v.addEventListener('mouseout', () => {
        if (travado && consultor==ani[p]) {
        } else {
            remover(ani[p])
        }
        
    })
    
    v.addEventListener('click', () => {
        if (travado && consultor != ani[p]) {
            remover(consultor)
            travar(ani[p])
            consultor=ani[p]
        }
        
        
    })
    
    const remover = (el) => {
        el.setAttribute('style', `width:0px;height:2px;background-Color:black;position:absolute;`)
    }
    const adicionar = (el) => {
        el.setAttribute('style' , `width:0px;height:2px;background-Color:black;position:absolute;`)
        el.setAttribute('style' , `width:${P_Menu[p].offsetWidth}px;height:2px;background-Color:black;position:absolute;`)
    }
    const travar = (el) =>{
        el.setAttribute('style' , `width:${P_Menu[p].offsetWidth}px;height:2px;background-Color:black;position:absolute;`)
    }
    const incio = () => {
        consultor = ani[0]
        ani[0].setAttribute('style' , `width:0px;height:2px;background-Color:black;position:absolute;`)
        ani[0].setAttribute('style' , `width:${P_Menu[0].offsetWidth}px;height:2px;background-Color:black;position:absolute;`)
    }
    if (!travado) {
        incio()
        travado = true
    }
})

Btn_Menu.addEventListener('click', () => {
    if (trocar) {
        Menu.setAttribute('style' , `left: 0px ; opacity:100%;`)
        trocar = false
    } else if (!trocar) {
        Menu.setAttribute('style' , `left: 100% ; opacity:20%;`)
        trocar = true
    }
    
})