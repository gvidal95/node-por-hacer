const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    type: 'boolean',
    desc: 'Marca como completado o pendiente una tarea'
}

const completadas = {
    alias: 'c',
    default: false,
    type: 'boolean',
    desc: 'Tareas completadas'
}
const noCompletados = {
    alias: 'nc',
    default: true,
    type: 'boolean',
    desc: 'Tareas no completadas'
}
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('borrar', 'Borra un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Lista de todas la tareas', {
        completadas,
        noCompletados
    })
    .help()
    .argv;

module.exports = {
    argv
}