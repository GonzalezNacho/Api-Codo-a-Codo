const middleware = require('../utils/middleware');
const db = require('../utils/db');

const router = require("express").Router();

/* Obtener todo los comentarios */
router.get("/", async (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  })
});

/* Obtener uno especifico */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(sql,[id], (err,result) =>
  {
      if(err) throw err;        
      res.status(200).json(result);
  });
});

/* Agregar un elemento */

router.post("/", async (req, res) => {
  const {name, lastname, email, password} = { ...req.body }
  const sql = 'INSERT INTO usuarios (name,lastname,email, password) VALUES (?,?,?,?)';
  db.query(sql,[name, lastname, email, password], (err,result) =>
  {
      if(err) throw err;
      res.status(201).json({ message: 'Usuario eliminado' });
  });  
});

/* Borrar un elemento */

router.delete("/:id",  async (req, res) => {
  const id = req.params.id;  
  const sql  = 'DELETE FROM usuarios WHERE id= ?';
  db.query(sql,[id],(err,result) =>
  {
      if(err) throw err;
      res.status(202).json({ message: 'Usuario eliminado' });
  });
});

/* Modificar un elemento */
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {name, lastname, email, password} = { ...req.body }
  console.table({name, lastname, email, password, id})
  const sql = 'UPDATE usuarios SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?';
  db.query(sql,[name,lastname,email,password,id], (err,result) =>
  {
      if(err) throw err;
      res.status(202).json({ message: 'Usuario editado' });
  });
});

module.exports = router;