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
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user.rows.length) return res.status(400).send('User not found');

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, req.user.id]);
  res.send('Password updated');
};
