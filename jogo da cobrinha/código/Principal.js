// Variáveis-------------------------------------------------------------------------------------------------------
const palco = document.getElementsByClassName("palco")[0]
const cobra_el = document.getElementById("cobra")
let radios = new Array()
let btnComeçar = document.getElementById("cobra") // provisorio
let menu_ele = document.getElementById("cobra") // provisorio
let dificuldade = 1 //i
let inter = null //i
let bola_p = null //i
let comida = null //i
let botaoVoltar_let = null //i
//Classe

class bola {
	constructor() {
		this.el = document.createElement("div")
		this.com = document.createElement("div")
		this.placar = document.createElement("p")
		this.velFrente = 20
		this.dificuldade = this.nivel()
		this.posX = parseInt(Math.random() * 200)
		this.posY = parseInt(Math.random() * 400)
		this.CposX = parseInt(Math.random() * 450)
		this.CposY = parseInt(Math.random() * 450)
		this.divisivel()
		this.dirX = 1
		this.dirY = 1
		this.keypress = "d"
		this.andarFrente = true
		this.desenhar()
		this.movimentação()
		this.comida()
		this.bolinhasComidas = [0, 0]
		this.ultimaPosição = []
		this.corpoCobra = []
		this.placar_function()
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
			`width: 20px;height: 20px;background-color: rgb(255,255, 255) ;position:relative;left:${this.posX}px;top:${this.posY}px;`
		)
		palco.appendChild(this.el)
	}
	movimentação() {
		let intervalo = setInterval(() => {
			// Intervalo
			this.direção() // Muda de direção
			this.comeu() // Verifica se comeu a comida e muda de lugar
			this.colisão() // Verifica se passou das paredes
			this.restoCobra() // Verifica quantas bolinhas comeu e adiciona ao resto da cobra

			if (this.andarFrente) {
				// Faz a cobra andar
				this.posX = this.posX + this.velFrente * this.dirX
				this.el.style.left = this.posX + "px"
			}
			if (!this.andarFrente) {
				this.posY = this.posY - this.velFrente * this.dirY
				this.el.style.top = this.posY + "px"
			}
		}, this.dificuldade) // Tempo

		inter = intervalo // Adiciona a let inter o intervalo para ser cancelado por fora
	}
	colisão() {
		if (
			this.posX == 500 ||
			this.posX == -20 ||
			(this.posY == 500) | (this.posY == -20)
		) {
			this.perdeu()
		}
		if (this.corpoCobra.length > 0) {
			this.corpoCobra.map((v, p) => {
				if (
					this.ultimaPosição[this.ultimaPosição.length - (p + 2)].posX ==
						this.posX &&
					this.ultimaPosição[this.ultimaPosição.length - (p + 2)].posY ==
						this.posY
				) {
					this.perdeu()
				}
			})
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
			this.placar.innerHTML = `Score: ${this.bolinhasComidas[0] + 1}`
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
			console.log(this.corpoCobra)
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
				}px;left:${this.ultimaPosição[this.ultimaPosição.length - 2].posX}px;`
			)
			palco.appendChild(nagia)
			this.corpoCobra.push(nagia)
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
	perdeu() {
		clearInterval(inter)
		this.el.remove()
		this.com.remove()
		document.body.appendChild(menu_ele)
		this.corpoCobra.map((val, posi) => {
			val.remove()
		})
		this.ultimaPosição = []
		this.bolinhasComidas = [0, 0]
		botaoVoltar_let.remove()
		this.placar.remove()
	}
	placar_function() {
		this.placar.innerHTML = "Score: " + 1
		palco.appendChild(this.placar)
	}
}

//----------------------------------------------------------------
//Menu
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
menu()
//----------------------------------------------------------------

btnComeçar.addEventListener("click", () => {
	let bola_principal = new bola()
	let botaoVoltar = document.createElement("div")
	botaoVoltar.classList.add("btnmnu")
	botaoVoltar.innerHTML = "Voltar"
	botaoVoltar_let = botaoVoltar
	botaoVoltar.setAttribute(
		"style",
		"display:flex; justify-content:center;align-items: center; top:-50px; left:200px; position:absolute;"
	)
	palco.appendChild(botaoVoltar)
	botaoVoltar.addEventListener("click", () => {
		bola_principal.perdeu()
	})

	menu_ele.remove()

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
