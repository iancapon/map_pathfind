let nodos = []
let aristas = []
let DIJKSTRA
let ciudad

function preload() {
    ciudad = loadJSON("./city.json")
}


function setup() {
    createCanvas(800, 800)
    cargarNodos()
    cargarAristas()

    DIJKSTRA = new Dijkstra(nodos, nodos.find(n => n.nombre() == "D"), nodos.find(n => n.nombre() == "E"))

    textAlign(CENTER, CENTER)
    noLoop()
}



function draw() {
    background(220)
    scale(2)

    nodos.forEach(n => {
        n.entradas.forEach(a => {
            line(a.origen.x(), a.origen.y(), a.target.x(), a.target.y())
        })
        n.salidas.forEach(a => {
            line(a.origen.x(), a.origen.y(), a.target.x(), a.target.y())
        })
    })

    DIJKSTRA.caminoHacia(nodos.find(n => n.nombre() == "B"))
    stroke(0)

    nodos.forEach(n => {
        circle(n.x(), n.y(), 10)
        textSize(5)
        strokeWeight(0.5)
        text(n.nombre(), n.x(), n.y())
    })
}



function cargarAristas() {
    aristas.forEach(calle => {
        let inicio = nodos.find(nodo => nodo.nombre() == calle.inicio)
        let fin = nodos.find(nodo => nodo.nombre() == calle.fin)
        if (inicio != undefined && fin != undefined) {
            if (calle.sentido == "doble") {
                inicio.conecta(fin, 1)
            }
            if (calle.sentido == "simple") {
                inicio.apunta(fin, 1)
            }
        }
    })
}



function cargarNodos() {
    ciudad.calles.forEach(calle => {
        aristas.push(calle)
        let i = nodos.indexOf(nodo => calle.inicio == nodos.nombre())
        if (i >= 0) {
            let pos = calle.geometria[0]
            nodos[i].x = pos.x
            nodos[i].y = pos.y
        } else {
            nodos.push(new Nodo(calle.inicio, calle.geometria[0].x, calle.geometria[0].y))
        }

        i = nodos.indexOf(nodo => calle.fin == nodos.nombre())
        if (i >= 0) {
            let pos = calle.geometria[1]
            nodos[i].x = pos.x
            nodos[i].y = pos.y
        } else {
            nodos.push(new Nodo(calle.fin, calle.geometria[1].x, calle.geometria[1].y))
        }

    })
}
