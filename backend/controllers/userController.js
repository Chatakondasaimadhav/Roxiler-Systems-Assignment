const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // Validation
    if (name.length < 20 || name.length > 60) {
      return res.status(400).send('Name must be between 20 and 60 characters');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, 'user']
    );

    const token = jwt.sign({ id: result.rows[0].id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Registration failed');
  }
};
