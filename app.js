require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')



const main = async () => {

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = leerDB()

    if (tareasDB) { //cargar tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        //imprimir el menu
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción:')
                tareas.crearTarea(desc)

                break

            case '2':
                tareas.listadoCompleto()
                break

            case '3': //listar completadas
                tareas.listarPendentesCompletadas(true)
                break

            case '4': //listar pendientes
                tareas.listarPendentesCompletadas(false)
                break

            case '5': //completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArray )
                tareas.toggleCompletadas( ids )
                break

            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArray)
                if (id !== '0') {

                    const ok = await confirmar('¿Está seguro?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada')
                    }
                }
                break
        }

        guardarDB(tareas.listadoArray)

        await pause()

    } while (opt !== '0')

}


main()