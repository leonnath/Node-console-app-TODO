const Tarea = require('../models/tarea')
/**
 * _listado: 
 * { 'uuid-123712-123123-2: { id:12,desc: asd, completadoEn:92231 } }
 */

class Tareas {

    _listado = {}

    //Es sincrono
    get listadoArray() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })


        return listado
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {

        console.log()
        this.listadoArray.forEach((tarea, i) => {

            const idx = `${i + 1}`.cyan
            const { desc, completadoEn } = tarea
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            console.log(`${idx} ${desc} :: ${estado}`)

        })

    }

    listarPendentesCompletadas(completadas = true) {

        console.log()
        let count = 0
        this.listadoArray.forEach(tarea => {


            const { desc, completadoEn } = tarea
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            if (completadas) {
                //mostrar completadas
                if (completadoEn) {
                    count += 1
                    console.log(`${count.toString().cyan}. ${desc} :: ${completadoEn.green}`)
                }
            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    count += 1
                    console.log(`${count.toString().cyan} ${desc} :: ${estado}`)
                }
            }

        })

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.listadoArray.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }

        })

    }
}


module.exports = Tareas

