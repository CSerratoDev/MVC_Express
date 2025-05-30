const express = require('express');
const user = express.Router();
const db = require('../config/database');

user.get('/signin', (req, res) => {
  res.send('Login route into user is working');
});
//comprobado
user.post('/signin', async (req, res, next) => {
  const {name, lastName, phoneNumber, email, address} = req.body;
  if (name && lastName && phoneNumber && email && address) {
    try {
      const query = `
        INSERT INTO user (name, lastName, phoneNumber, email, address)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [name, lastName, phoneNumber, email, address]);

      if (result.affectedRows === 1) {
        return res.status(201).json({code: 201, message: "Successfully registered user"});
      }

      return res.status(500).json({code: 500, message: "An error occurred"});
    } catch (err) {
      return res.status(500).json({code: 500, message: "Database Error"});
    }
  }
  return res.status(400).json({code: 400, message: "Incomplete fields"});
});
//comprobado
user.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    return res.status(200).json({ code: 200, message: rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ code: 500, message: "Internal server Error" });
  }
});
//comprobado
user.get('/:name', async (req, res, next) => {
  const { name } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM user WHERE name = ?", [name]);

    if (rows.length > 0) {
      return res.status(200).json({ code: 200, message: rows });
    }

    return res.status(404).json({ code: 404, message: "User not found" });
  } catch (err) {
    console.error("Error querying user by name:", err);
    return res.status(500).json({ code: 500, message: "Internal server Error" });
  }
});
//comprobado
user.patch('/:userId', async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const allowedFields = ['name', 'lastName', 'phoneNumber', 'email', 'address'];
  const fieldsToUpdate = [];

  if (isNaN(userId)) {
    return res.status(400).json({ code: 400, message: "Invalid user ID" });
  }

  for (const key of allowedFields) {
    if (req.body[key]) {
      fieldsToUpdate.push({ key, value: req.body[key] });
    }
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ code: 400, message: "No valid fields to update" });
  }

  const setClause = fieldsToUpdate.map(f => `${f.key} = ?`).join(', ');
  const values = fieldsToUpdate.map(f => f.value);

  try {
    const query = `UPDATE user SET ${setClause} WHERE userId = ?`;
    values.push(userId);

    const [result] = await db.query(query, values);

    if (result.affectedRows === 1) {
      return res.status(200).json({ code: 200, message: "User updated successfully" });
    } else {
      return res.status(404).json({ code: 404, message: "User not found" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
});
//comprobado
user.delete('/:userId', async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ code: 400, message: "Invalid user ID" });
  }

  try {
    const [result] = await db.query("DELETE FROM user WHERE userId = ?", [userId]);

    if (result.affectedRows === 1) {
      return res.status(200).json({ code: 200, message: "User Successfully Deleted" });
    }

    return res.status(404).json({ code: 404, message: "User not found" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ code: 500, message: "Internal server Error" });
  }
});

module.exports = user;