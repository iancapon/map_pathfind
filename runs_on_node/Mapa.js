const Nodo = function (nombre) {
    this.nombre = () => nombre
    this.entradas = []
    this.salidas = []

    this.verEntradas = function () {
        let result = ""
        this.entradas.forEach(arista => result += arista.datos() + "\n")
        return result
    }

    this.verSalidas = function () {
        let result = ""
        this.salidas.forEach(arista => result += arista.datos() + "\n")
        return result
    }

    this.apunta = function (target, peso) {
        this.salidas.push(new Arista(this, target, peso))
    }

    this.conecta = function (target, peso) {
        this.salidas.push(new Arista(this, target, peso))
        target.salidas.push(new Arista(target, this, peso))
    }

    this.nuevaEntrada = function (arista) {
        this.entradas.push(arista)
    }

    this.aristasSalientes = function() {
        return this.salidas
    }

}

const Arista = function (origen, target, peso) {
    this.origen = origen
    this.target = target
    this.peso = peso

    this.target.nuevaEntrada(this)

    this.datos = function () {
        return this.origen.nombre() + " apunta a " + this.target.nombre() + " con peso de " + String(this.peso)
    }
}






module.exports = {
    Nodo: Nodo,
    Arista: Arista,
}