const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.DB_PASSWORD, // Use environment variable for password
  });
  

app.use(express.json());

app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, age, phone, location, created_at FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});