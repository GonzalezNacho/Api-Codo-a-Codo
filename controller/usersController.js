const db = require('../utils/db');
const bcrypt = require('bcryptjs');

/* Obtener todos los usuarios */
const getAllUsers = (req, res) => {
    const sql = req.user.profile === 'admin' 
        ? 'SELECT * FROM users' 
        : 'SELECT id, name, lastname, email FROM users WHERE profile = "user"';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

/* Obtener uno especifico por id*/
const getUserById = (req, res) => {
    const id = req.params.id === 'me' ? req.user.id : req.params.id;
    const sql = req.user.profile === 'admin' ? 'SELECT * FROM users WHERE id = ?' : 'SELECT * FROM users WHERE id = ? AND profile = "user"';
    db.query(sql,[id], (err,result) => {
        if(err) throw err;
        res.status(200).json(result);
    });
};

const addUser = (req, res) => {
    const {name, lastname, email, password, profile} = { ...req.body }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'INSERT INTO users (name,lastname,email, password, profile) VALUES (?,?,?,?,?)';
    db.query(sql,[name, lastname, email, hashedPassword, profile], (err,result) => {
        if(err?.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'El usuario ya existe' });
        if(err) throw err;
        res.status(201).json({ message: 'Usuario agregado' });
    });
};

const addAdmin = (req, res) => {
    req.body.profile = 'admin';
    addUser(req, res);
}

const addStandardUser = (req, res) => {
    req.body.profile = 'user';
    addUser(req, res);
}

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
    const id = req.params.id ?? req.user.id;
    const {name, lastname, email, password} = { ...req.body }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'UPDATE users SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql,[name,lastname,email,hashedPassword,id], (err,result) => {
        if(err?.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'El correo esta repetido o ya existe' });
        if(err) throw err;
        res.status(202).json({ message: 'Usuario editado' });
    });
};

module.exports = { getAllUsers, getUserById, addStandardUser, addAdmin, deleteUser, editUser };