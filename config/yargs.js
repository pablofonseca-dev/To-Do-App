const createArgs = {
    descripcion: {
        demand: true, 
        alias: 'd', 
        desc: 'Descripción de la tarea por hacer'
    }
};


const updateArgs = {
    descripcion: createArgs['descripcion'], 
    completado: {
        demand: true, 
        alias: 'c', 
        default: true, 
        desc: 'Indica si la tarea indicada fue completada. El valor por defecto es true, en caso de que no haya sido completada escriba false'
    }
}

const deleteArgs = {
    descripcion: createArgs['descripcion']
}


const yargs_argv = require('yargs')
    .usage('Usage: node $0 <command> [options]')
    .help('h')
    .alias('h', 'help')
    .command('crear', 'Ejecuta una petición para crear una tarea.', createArgs)
    .example('node $0 crear --descripcion="Alimentar a mi gato"')
    .command('listar', 'Ejecuta una petición para listar todas las tareas registradas')
    .example('node $0 listar')
    .command('actualizar', 'Ejecuta una petición para actualizar una tarea en particular', updateArgs)
    .example('node actualizar --descripcion=\"Alimentar a mi gato\" --completado=true')
    .command('borrar', 'Ejecuta una petición para borrar una tarea en particular', deleteArgs)
    .example('node $0 borrar --descripcion="Alimentar a mi gato"')
    .argv

module.exports = {
    yargs_argv
}