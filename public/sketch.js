let A, B, C, D, E, F, G, H
let nodos
let desde_A

function setup() {
    createCanvas(800, 800)

    A = new Nodo("A", 100, 100)
    B = new Nodo("B", 150, 50)
    C = new Nodo("C", 150, 150)
    D = new Nodo("D", 200, 100)
    E = new Nodo("E", 300, 100)
    F = new Nodo("F", 250, 150)
    G = new Nodo("G", 250, 50)
    H = new Nodo("H", 350, 100)

    A.conecta(B, 3)
    A.conecta(C, 1)

    B.conecta(D, 1)
    B.conecta(G, 5)

    C.conecta(D, 2)
    C.conecta(F, 5)

    D.conecta(E, 4)
    D.conecta(F, 2)

    E.conecta(G, 2)
    E.conecta(H, 1)

    F.conecta(H, 3)

    nodos = [A, B, C, D, E, F, G, H]

    desde_A = new Dijkstra(nodos, A, H)

    //console.log(desde_A.caminoHacia(H))
    textAlign(CENTER, CENTER)
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

    desde_A.caminoHacia(F)
    stroke(0)

    nodos.forEach(n => {
        circle(n.x(), n.y(), 20)
        text(n.nombre(), n.x(), n.y())
    })

    

}