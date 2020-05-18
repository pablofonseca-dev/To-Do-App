const fileSystem = require('fs');
const color = require('colors');
const DB_URL = './DB/database.json';

let toDoArray = [];

const createDBRecord = (callback) => {

    let parsedJSONData = JSON.stringify(toDoArray);

    fileSystem.writeFile(DB_URL, parsedJSONData, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null, 'La información ha sido guardada en la base de datos.'.green);
        }
    });

};

const createTempRecord = (description) => {

    loadDB();

    let toDoObject = {
        description: description,
        completed: false
    }

    toDoArray.push(toDoObject);

    return toDoObject;
}

const loadDB = () => {
    try {
        toDoArray = require('../DB/database.json');
    } catch (err) {
        toDoArray = [];
    }
}

const readDB = () => {
    try {
        let DBRecords = require('../DB/database.json');

        return DBRecords;

    } catch (err) {
        console.log('No ha registrado ninguna tarea por hacer.'.red);
    }
}

const updateRecord = (recordDescription, completed = true) => {
    loadDB();

    let DBRecords = readDB();

    let elementIndex = toDoArray.findIndex((element) => element.description.toLowerCase() === recordDescription.toLowerCase());

    if (elementIndex == -1) {
        console.log('El elemento indicado no ha sido encontrado');
        return;
    }
    toDoArray[elementIndex].completed = completed;

    createDBRecord((error, resolve) => {
        if (error) {
            console.log(`Ha ocurrido un error: ${error}`.red);
            return null;
        }
        console.log(resolve);
    });
}

const removeRecord = (recordDescription, callback) => {
    loadDB();
    let recordIndex = toDoArray.findIndex((element) => element.description.toLowerCase() === recordDescription.toLowerCase());
    if (recordIndex != -1) {
        let newArr = toDoArray.filter((element) => element.description.toLowerCase() !== recordDescription.toLowerCase());
        toDoArray = newArr; 
        let removeResult = createDBRecord((error, resolve) => {
            if (error) {
                console.log(`Ha ocurrido un error: ${error}`.red);
            } else {
                console.log(`Tarea Eliminada`.green);
            }
        });
    } else {
        callback('La tarea indicada no ha sido encontrada');
    }
}


module.exports = {
    createTempRecord,
    createDBRecord,
    loadDB,
    readDB,
    updateRecord,
    removeRecord
}