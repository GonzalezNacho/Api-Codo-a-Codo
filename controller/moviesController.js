const db = require('../utils/db');

/* Obtener todos los usuarios */
const getAllMovies = (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

/* Obtener uno especifico por id*/
const getMovieById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM movies WHERE id = ?';
    db.query(sql,[id], (err,result) => {
        if(err) throw err;        
        res.status(200).json(result);
    });
};

/* Agregar un elemento */

const addMovie = (req, res) => {
    const {title, directorId, year, rating, genres} = { ...req.body }
    const sql = 'INSERT INTO movies (title, director_id, year, rating, genres) VALUES (?,?,?,?,?)';
    db.query(sql,[title, directorId, year, rating, genres], (err,result) => {
        if(err) throw err;
        res.status(201).json({ message: 'Pelicula agregada' });
    });
};

/* Borrar un elemento */

const deleteMovie = (req, res) => {
    const id = req.params.id;  
    const sql  = 'DELETE FROM movies WHERE id= ?';
    db.query(sql,[id],(err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Pelicula eliminada' });
    });
};

/* Modificar un elemento */
const editMovie = (req, res) => {
    const id = req.params.id;
    const {title, directorId, year, rating, genres} = { ...req.body }
    console.table({title, directorId, year, rating, genres, id})
    const sql = 'UPDATE movies SET title = ?, directorId = ?, year = ?, rating = ?, genres = ? WHERE id = ?';
    db.query(sql,[title, directorId, year, rating, genres,id], (err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Pelicula editada' });
    });
};

module.exports = { getAllMovies, getMovieById, addMovie, deleteMovie, editMovie };