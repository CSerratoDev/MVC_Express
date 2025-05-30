const express = require('express');
const jwt = require('jsonwebtoken');
const admin = express.Router();
const db = require('../config/database');

admin.get('/login', (req, res) => {
  res.send('Login route into admin is working');
});
//comprobado
admin.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    console.log("Email recibido:", email);
    console.log("Password recibido:", password);

    const query = `SELECT * FROM admin WHERE email = ? AND password = ?`;
    const [rows] = await db.query(query, [email, password]);

    console.log("¿rows es un array?", Array.isArray(rows));
    console.log("Contenido de rows:", rows);

    if (email && password) {
        if (rows.length === 1) {
            const token = jwt.sign({
                userId: rows[0].userId,
                email: rows[0].email
        }, "debugkey");
        return res.status(200).json({ code: 200, message: token });
    } 
    else {
      return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }
  }
  return res.status(400).json({ code: 400, message: "Campos incompletos" });
});


module.exports = admin;