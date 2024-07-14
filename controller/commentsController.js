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
    const user_id = req.user.id
    const {comment, rating, movie_id} = { ...req.body }
    const sql = 'INSERT INTO comments (comment, rating, movie_id, user_id) VALUES (?,?,?,?)';
    db.query(sql,[comment, rating, movie_id, user_id], (err,result) => {
        if(err?.code === 'ER_NO_REFERENCED_ROW_2') return res.status(404).json({ message: 'Pelicula no encontrada' });
        if(err) throw err;
        res.status(201).json({ message: 'Comentario agregado' });
    });
};

const editComment = (req, res) => {
    const {comment, rating} = { ...req.body }
    const sql = req.user.profile === 'admin' 
        ? 'UPDATE comments SET comment = ?, rating = ? WHERE id = ?' 
        : 'UPDATE comments SET comment = ?, rating = ? WHERE id = ? AND user_id = ?';
    const params =  [comment, rating, req.params.id];     
    if (req.user.profile === 'user') params.push(req.user.id); 
    db.query(sql,params, (err,result) => {
        if(err) throw err;
        if(result.affectedRows === 0) {
            return res.status(401).json({ message: 'No tienes permisos para editar este comentario' });
        }
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