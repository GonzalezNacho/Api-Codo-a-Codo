const db = require('../utils/db');

const getAllComments = (req, res) => {
    const sql = 'SELECT * FROM comments';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
};

const getCommentById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM comments WHERE id = ?';
    db.query(sql,[id], (err,result) => {
        if(err) throw err;        
        res.status(200).json(result);
    });
};

const addComment = (req, res) => {
    const {comment, rating, movie_id, user_id} = { ...req.body }
    const sql = 'INSERT INTO comments (comment, rating, movie_id, user_id) VALUES (?,?,?,?)';
    db.query(sql,[comment, rating, movie_id, user_id], (err,result) => {
        if(err) throw err;
        res.status(201).json({ message: 'Comentario agregado' });
    });
};

const editComment = (req, res) => {
    const id = req.params.id;
    const {comment} = { ...req.body }
    const sql = 'UPDATE comments SET comment = ? WHERE id = ?';
    db.query(sql,[comment, id], (err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Comentario editado' });
    });
};

const deleteComment = (req, res) => {
    const id = req.params.id;  
    const sql  = 'DELETE FROM comments WHERE id= ?';
    db.query(sql,[id],(err,result) => {
        if(err) throw err;
        res.status(202).json({ message: 'Comentario eliminado' });
    });
};

module.exports = {getAllComments, getCommentById, addComment, editComment, deleteComment}