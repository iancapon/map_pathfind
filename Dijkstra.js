const Dijkstra = function (dataset, start, stop) {
    this.data = dataset
    this.start = typeof this.start == "number" ? start : this.data.indexOf(start)//INDEX
    this.stop = typeof this.stop == "number" ? stop : this.data.indexOf(stop)//INDEX

    this.etiquetas = this.data.map(nodo => {
        return {
            nombre: nodo.nombre(),
            acumulado: 0,//peso acumulado hacia aqui
            anterior: undefined,//nodo anterior
            marcado: false,

            iteracion: 0,

        }
    })

    this.llamadas = 0
    this.encuentra = false

    const MAX_LEN = 1000

    this.algoritmo = function (actual, acumulado, iteracion) {
        if (acumulado < MAX_LEN && !this.encuentra) {
            this.llamadas += 1
            const aristas = this.data[actual].aristasSalientes().sort((a, b) => a.peso - b.peso)

            //seteo y reseteo distancias
            aristas.forEach(arista => {
                let index = this.data.indexOf(arista.target)
                if (this.etiquetas[index].marcado == false)
                    if (acumulado + arista.peso < this.etiquetas[index].acumulado || this.etiquetas[index].anterior == undefined) {
                        this.etiquetas[index].acumulado = acumulado + arista.peso
                        this.etiquetas[index].anterior = actual
                        this.etiquetas[index].iteracion = iteracion + 1
                    }
            })

            this.etiquetas[actual].marcado = true

            if (actual == this.stop) {
                this.encuentra = true
            }

            aristas.forEach(arista => {
                let index = this.data.indexOf(arista.target)
                if (this.etiquetas[index].marcado == false)
                    this.algoritmo(index, this.etiquetas[index].acumulado, iteracion + 1)
            })

        }
    }


    this.algoritmo(this.start, 0, 0)

    console.log("LLAMADAS: " + this.llamadas)


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
        if (this.encuentra) {
            let destino = typeof _destino == "number" ? _destino : this.data.indexOf(_destino)//INDEX
            let respuesta = this.etiquetas[destino].nombre
            if (this.etiquetas[destino].anterior != undefined) {
                respuesta = this.caminoHacia(this.etiquetas[destino].anterior) + "--->" + this.etiquetas[destino].nombre
            }
            return respuesta
        }
        return "No lo encontró."
    }


}

module.exports = {
    findPath: Dijkstra,
}