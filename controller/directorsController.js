const db = require('../utils/db');

/* Obtener todos los usuarios */
const getAllDirectors = (req, res) => {
    const sql = 'SELECT * FROM directors';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

/* Obtener uno especifico por id*/
const getDirectorById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM directors WHERE id = ?';
    db.query(sql,[id], (err,result) => {
        if(err) throw err;        
        res.status(200).json(result);
    });
};

/* Agregar un elemento */

const addDirector = (req, res) => {
    const {name, lastname} = { ...req.body }
    const sql = 'INSERT INTO directors (name, lastname) VALUES (?,?)';
    db.query(sql,[name, lastname], (err,result) => {
        if(err) throw err;
        res.status(201).json({ message: 'Director agregado' });
    });
};

/* Borrar un elemento */

const deleteDirector = (req, res) => {
    const id = req.params.id;  
    const sql  = 'DELETE FROM directors WHERE id= ?';
    db.query(sql,[id],(err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Director eliminado' });
    });
};

/* Modificar un elemento */
const editDirector = (req, res) => {
    const id = req.params.id;
    const {name, lastname} = { ...req.body }
    console.table({name, lastname, id})
    const sql = 'UPDATE Directors SET name = ?, lastname = ? WHERE id = ?';
    db.query(sql,[name, lastname, id], (err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Director editado' });
    });
};

module.exports = { getAllDirectors, getDirectorById, addDirector, deleteDirector, editDirector };