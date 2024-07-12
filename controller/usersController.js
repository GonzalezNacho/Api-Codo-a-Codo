const db = require('../utils/db');
const bcrypt = require('bcryptjs');

/* Obtener todos los usuarios */
const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

/* Obtener uno especifico por id*/
const getUserById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql,[id], (err,result) => {
        if(err) throw err;        
        res.status(200).json(result);
    });
};

/* Agregar un elemento */

const addUser = (req, res) => {
    const {name, lastname, email, password, profile} = { ...req.body }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'INSERT INTO users (name,lastname,email, password, profile) VALUES (?,?,?,?,?)';
    db.query(sql,[name, lastname, email, hashedPassword, profile], (err,result) => {
        if(err?.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }
        if(err) throw err;
        res.status(201).json({ message: 'Usuario agregado' });
    });
};

/* Borrar un elemento */

const deleteUser = (req, res) => {
    const id = req.params.id;  
    const sql  = 'DELETE FROM users WHERE id= ?';
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
    const sql = 'UPDATE users SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql,[name,lastname,email,password,id], (err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Usuario editado' });
    });
};

module.exports = { getAllUsers, getUserById, addUser, deleteUser, editUser };