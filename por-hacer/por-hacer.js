const fs = require('fs');


let listadoPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`./db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB(listadoPorHacer);

    return porHacer;
}

const getListado = (completadas = false, noCompletadas = false) => {
    cargarDB();
    if (completadas || noCompletadas) {

        if (completadas) {
            const resultado = listadoPorHacer.filter(tarea => tarea.completado === true);
            return resultado;
        }
        if (noCompletadas) {
            const resultado = listadoPorHacer.filter(tarea => tarea.completado !== true);
            return resultado
        }

    } else {
        return listadoPorHacer;
    }

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    const resultado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (resultado.length === listadoPorHacer.length) {
        return false;
    }
    listadoPorHacer = resultado;
    try {
        guardarDB();
        return true;
    } catch {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}