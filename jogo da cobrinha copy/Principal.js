// Variáveis-------------------------------------------------------------------------------------------------------
const palco = document.getElementsByClassName("palco")[0]
const cobra_el = document.getElementById("cobra")
let radios = new Array()
let btnComeçar = document.getElementById("cobra") // provisorio
let menu_ele = document.getElementById("cobra") // provisorio
let dificuldade = 1
let inter = null
let bola_p = null
let comida = null
let score_el = null
// Classes-------------------------------------------------------------------------------------------------------
class bola {
	constructor() {
		this.el = document.createElement("div")
		this.com = document.createElement("div")
		this.velFrente = 20
		this.dificuldade = this.nivel()
		this.posX = parseInt(Math.random() * 200)
		this.posY = parseInt(Math.random() * 400)
		this.CposX = parseInt(Math.random() * 400)
		this.CposY = parseInt(Math.random() * 400)
		this.divisivel()
		this.dirX = 1
		this.dirY = 1
		this.keypress = "d"
		this.andarFrente = true
		this.atraso = 1
		this.desenhar()
		this.movimentação()
		this.comida()
		this.bolinhasComidas = [0, 0]
		this.ultimaPosição = []
		this.corpoCobra = []
		this.criarCbra = true
	}
	nivel() {
		switch (dificuldade) {
			case 1:
				return 140
				break
			case 2:
				return 120
				break
			case 3:
				return 100
				break
			case 4:
				return 70
				break
			case 5:
				return 40
				break
			default:
				break
		}
	}
	divisivel() {
		while (!(this.posX % 20 == 0)) {
			this.posX++
		}
		while (!(this.posY % 20 == 0)) {
			this.posY++
		}
		while (!(this.CposY % 20 == 0)) {
			this.CposY++
		}
		while (!(this.CposX % 20 == 0)) {
			this.CposX++
		}
	}
	desenhar() {
		this.el.setAttribute(
			"style",
			`width: 18px;height: 18px;background-color: rgb(10, 238, 10) ;position:relative;left:${this.posX}px;top:${this.posY}px;border-radius:20px;border:2px solid black;`
		)
		palco.appendChild(this.el)
	}
	movimentação() {
		let intervalo = setInterval(() => {
			this.direção()
			this.comeu()
			this.colisão()
			this.restoCobra()
			if (this.andarFrente) {
				this.posX = this.posX + this.velFrente * this.dirX
				this.el.style.left = this.posX + "px"
			}
			if (!this.andarFrente) {
				this.posY = this.posY - this.velFrente * this.dirY
				this.el.style.top = this.posY + "px"
			}
		}, this.dificuldade + this.atraso)
		inter = intervalo
	}
	colisão() {
		if (
			this.posX == 500 ||
			this.posX == -20 ||
			(this.posY == 500) | (this.posY == -20)
		) {
			clearInterval(inter)
			bola_p.remove()
			comida.remove()
			document.body.appendChild(menu_ele)
		}
	}
	direção() {
		if (this.keypress == "d" || this.keypress == "ArrowRight") {
			this.dirX = 1
			this.andarFrente = true
		}
		if (this.keypress == "a" || this.keypress == "ArrowLeft") {
			this.dirX = -1
			this.andarFrente = true
		}
		if (this.keypress == "w" || this.keypress == "ArrowUp") {
			this.dirY = 1
			this.andarFrente = false
		}
		if (this.keypress == "s" || this.keypress == "ArrowDown") {
			this.dirY = -1
			this.andarFrente = false
		}
	}
	comida() {
		this.com.setAttribute(
			"style",
			`width:20px; height:20px; background-Color:black; position:absolute; top:${this.CposY}px;left:${this.CposX}px`
		)
		palco.appendChild(this.com)
		comida = this.com
	}
	comeu() {
		if (this.posX == this.CposX && this.posY == this.CposY) {
			this.bolinhasComidas[0] += 1
			this.CposX = parseInt(Math.random() * 400)
			this.CposY = parseInt(Math.random() * 400)
			while (!(this.CposX % 20 == 0)) {
				this.CposX++
			}
			while (!(this.CposY % 20 == 0)) {
				this.CposY++
			}
			this.com.setAttribute(
				"style",
				`width:20px; height:20px; background-Color:black; position:absolute; top:${this.CposY}px;left:${this.CposX}px`
			)
		}
	}
	restoCobra() {
		let obj = {
			posX: this.posX,
			posY: this.posY,
		}
		this.ultimaPosição.push(obj)

		if (this.bolinhasComidas[0] > this.bolinhasComidas[1]) {
			this.bolinhasComidas[1]++
			let nagia = document.createElement("div")
			nagia.setAttribute(
				"style",
				`width:20px; height:20px; background-color: rgb(10, 238, 10) ;position:absolute; top:${
					this.ultimaPosição[this.ultimaPosição.length - 2].posY
				}px;left:${
					this.ultimaPosição[this.ultimaPosição.length - 2].posX
				}px;border-radius:50%;`
			)
			palco.appendChild(nagia)
			this.corpoCobra.push(nagia)
			score_el = this.corpoCobra.length
		}
		if (this.corpoCobra.length > 0) {
			this.corpoCobra.map((v, p) => {
				v.style.top = `${
					this.ultimaPosição[this.ultimaPosição.length - (1 + p)].posY
				}px`
				v.style.left = `${
					this.ultimaPosição[this.ultimaPosição.length - (1 + p)].posX
				}px`
			})
		}
	}
}
//funções-------------------------------------------------------------------------------------------------------
const menu = () => {
	const menu_el = document.createElement("div")
	menu_el.classList.add("mnu")

	const h1_el = document.createElement("h1")
	h1_el.innerHTML = "Jogo da cobrinha"
	h1_el.classList.add("h1mnu")

	const p_el = document.createElement("p")
	p_el.innerHTML = "Escolha o nível:"
	p_el.classList.add("pmnu")

	document.body.appendChild(menu_el)
	menu_el.appendChild(h1_el)
	menu_el.appendChild(p_el)

	for (let c = 0; c < 5; c++) {
		const div_js = document.createElement("div")

		const span_js = document.createElement("span")
		span_js.classList.add("spnmnu")
		span_js.innerHTML = c + 1

		const label_js = document.createElement("input")
		label_js.setAttribute("type", "radio")
		label_js.setAttribute("name", "radio")
		label_js.classList.add("radiomnu")
		if (c == 0) {
			label_js.checked = true
		}

		div_js.appendChild(span_js)
		div_js.appendChild(label_js)
		menu_el.appendChild(div_js)
	}

	const btn_el = document.createElement("button")
	btn_el.innerHTML = "Começar"
	btn_el.classList.add("btnmnu")
	menu_el.appendChild(btn_el)

	radios = [...document.getElementsByName("radio")]
	btnComeçar = btn_el
	menu_ele = menu_el
	radios.map((v, p) => {
		v.addEventListener("click", (evt) => {
			dificuldade = p + 1
		})
	})
}
const btnVoltar = () => {
	let botao = document.createElement("button")
	botao.classList.add("btnmnu")
	botao.setAttribute("style", "position:absolute; top:-85px; left:200px;")
	botao.innerHTML = "Desistir"
	palco.appendChild(botao)
	botao.addEventListener("click", () => {
		clearInterval(inter)
		bola_p.remove()
		comida.remove()
		document.body.appendChild(menu_ele)
	})
}
const score = (sc, scM) => {
	let div = document.createElement("div")
	div.setAttribute("style", `position:absolute; top:-50px;`)

	let score = document.createElement("p")
	score.innerHTML = "Score: " + sc

	let scoreMAX = document.createElement("p")
	scoreMAX.innerHTML = scM

	score_el = div

	div.appendChild(score)
	div.appendChild(scoreMAX)
	palco.appendChild(div)
}
menu()
btnComeçar.addEventListener("click", () => {
	menu_ele.remove()
	btnVoltar()

	score(1, 0)
	let bola_principal = new bola()
	bola_p = bola_principal.el
	window.addEventListener("keydown", (evt) => {
		let k = evt.key
		if (
			k == "d" ||
			k == "w" ||
			k == "a" ||
			k == "s" ||
			k == "ArrowLeft" ||
			k == "ArrowDown" ||
			k == "ArrowRight" ||
			k == "ArrowUp"
		) {
			bola_principal.keypress = k
		}
	})
})
