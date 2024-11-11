const Dijkstra = function (dataset, start) {
    this.data = dataset
    this.start = typeof this.start == "number" ? start : this.data.indexOf(start)//INDEX

    this.etiquetas = this.data.map(nodo => {
        return {
            nombre: nodo.nombre(),
            acumulado: 0,//peso acumulado hacia aqui
            anterior: undefined,//nodo anterior
            iteracion: 0,
            set : false
        }
    })


    this.algoritmo = function (actual, anterior, acumulado, iteracion) {
        const MAX_ITER = 10
        if (iteracion < MAX_ITER ) {
            const aristas = this.data[actual].aristasSalientes().sort((a, b) => a.peso - b.peso)

            if (acumulado < this.etiquetas[actual].acumulado || this.etiquetas[actual].acumulado == 0 ) {
                this.etiquetas[actual].acumulado = acumulado
                this.etiquetas[actual].anterior = anterior
                this.etiquetas[actual].iteracion = iteracion
            }


            aristas.forEach(arista => {
                const nuevoAcumulado = arista.peso + acumulado
                const siguiente = this.data.indexOf(arista.target)
                if (siguiente != anterior && siguiente != this.start ) {/// feo horrible
                    this.algoritmo(siguiente, actual, nuevoAcumulado, iteracion + 1)
                }
            })

            this.etiquetas[actual].set = true///// ? no hace nada realmente.

        }
    }
    this.algoritmo(this.start, undefined, 0, 0)


    this.distancias = function () {
        this.etiquetas.forEach(etiqueta => {
            let prev = "-"
            if (etiqueta.anterior != undefined) {
                prev = this.etiquetas[etiqueta.anterior].nombre
            }
            console.log(etiqueta.nombre + ": [" + etiqueta.acumulado + "," + prev + "](" + etiqueta.iteracion + ")")
        })
    }

    this.caminoHacia = function (_destino) {
        let destino = typeof _destino == "number" ? _destino : this.data.indexOf(_destino)//INDEX
        let respuesta = this.etiquetas[destino].nombre
        if (this.etiquetas[destino].anterior != undefined) {
            respuesta = this.caminoHacia(this.etiquetas[destino].anterior) + "--->" + this.etiquetas[destino].nombre
        }
        return respuesta
    }


}

module.exports = {
    findPath: Dijkstra,
}