
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const db = require('../utils/db');
const bcrypt = require('bcryptjs');
require('dotenv').config()


router.post('/', (req,res)=>{
  const {body} = req
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql,[body.email], (err,result) => {
    if (err) throw err;
    if(result.length > 0 && bcrypt.compareSync(body.password,result[0].password)){
      const tokenData = {
        username: result[0].name,
        id: result[0].id,
        profile: result[0].profile
      }
      const token = jwt.sign(tokenData,process.env.JWTSECRET,{ expiresIn: '1h' })
      res.status(200).send({token, name: result[0].name, profile: result[0].profile})
    }else{
      return res.status(401).json({error:'credenciales incorrecto'})
    }
  })
})


module.exports = router