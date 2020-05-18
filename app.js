#!/usr/bin/env node

const {
    yargs_argv
} = require('./config/yargs');

const {
    createDBRecord,
    createTempRecord,
    loadDB,
    readDB,
    updateRecord,
    removeRecord
} = require('./to-do/to-do');

const system_argv = process.argv;

const color = require('colors');

let command = yargs_argv._[0];

switch (command) {
    case 'crear':
        let createdObject = createTempRecord(yargs_argv.descripcion);
        createDBRecord((error, resolve) => {
            if (error) {
                console.log(`Ha ocurrido un error: ${error}`.red);
                return null;
            } else {
                console.log(resolve);
            }
        });

        break;
    case 'actualizar':
        updateRecord(yargs_argv.descripcion, yargs_argv.completado);
        break;
    case 'listar':
        let DBRecords = readDB();
        if (DBRecords != undefined) {
            DBRecords.forEach((element) => {
                if (element != null) {
                    console.log(`========================================`.green);
                    console.log(`Descripción: ${element.description}     `.white);
                    let elementCompleted = '';
                    if(!element.completed || element.completed == "false"){
                        elementCompleted = 'No'.red;
                    }else{
                        elementCompleted = 'Sí'.green;
                    }
                    console.log(`Completada: ${elementCompleted}        `.white);
                    console.log(`========================================`.green);
                }
            });
        }
        break;
    case 'borrar':
        removeRecord(yargs_argv.descripcion, (error, resolve) => {
            if (error) {
                console.log(`Ha ocurrido un error:  ${error}`.red);
                return null;
            } else {
                console.log(resolve);
            }
        });
        break;
    default:
        console.log("El comando escrito es incorrecto");
        break;
}