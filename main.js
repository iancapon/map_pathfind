const { Nodo, Arista } = require("./Mapa")
const { findPath } = require("./Dijkstra")

const A = new Nodo("A")
const B = new Nodo("B")
const C = new Nodo("C")
const D = new Nodo("D")
const E = new Nodo("E")
const F = new Nodo("F")
const G = new Nodo("G")
const H = new Nodo("H")

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


const arr = [A, B, C, D, E, F, G, H]

const desde_A = new findPath(arr, A)

console.log(" ----- SALTOS DESDE A -----")

desde_A.distancias()

console.log(" -----RECORRIDO MAS CORTO HACIA H -----")


console.log(desde_A.caminoHacia(H))
