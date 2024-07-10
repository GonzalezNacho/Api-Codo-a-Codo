const middleware = require('../utils/middleware');
const db = require('../utils/db');

/* Obtener todo los comentarios */
const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

/* Obtener uno especifico */
const getUserById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(sql,[id], (err,result) => {
        if(err) throw err;        
        res.status(200).json(result);
    });
};

/* Agregar un elemento */

const addUser = (req, res) => {
    const {name, lastname, email, password} = { ...req.body }
    const sql = 'INSERT INTO usuarios (name,lastname,email, password) VALUES (?,?,?,?)';
    db.query(sql,[name, lastname, email, password], (err,result) => {
        if(err) throw err;
        res.status(201).json({ message: 'Usuario eliminado' });
    });
};

/* Borrar un elemento */

const deleteUser = (req, res) => {
    const id = req.params.id;  
    const sql  = 'DELETE FROM usuarios WHERE id= ?';
    db.query(sql,[id],(err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Usuario eliminado' });
    });
};

/* Modificar un elemento */
const editUser = (req, res) => {
    const id = req.params.id;
    const {name, lastname, email, password} = { ...req.body }
    console.table({name, lastname, email, password, id})
    const sql = 'UPDATE usuarios SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql,[name,lastname,email,password,id], (err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Usuario editado' });
    });
};

module.exports = { getAllUsers, getUserById, addUser, deleteUser, editUser };