import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}).promise();

// GET Queries
export async function get_users() {
  const [results] = await pool.query(`SELECT * FROM users`);
  return results;
}

export async function get_properties() {
  const [results] = await pool.query(`SELECT * FROM properties`);
  return results;
}

export async function get_property_by_id(id) {
  const [results] = await pool.query(`SELECT * FROM properties where id = ?`, [id]);
  return results;
}

export async function get_users_by_email(email) {
  const [results] = await pool.query(`SELECT * FROM users where email = ?`, [email]);
  return results;
}

export async function get_users_by_email_password(email, password) {
  const [results] = await pool.query(`SELECT * FROM users where email = ? AND password = ?`, [email, password]);
  return results;
}

// INSERT Queries
export async function insert_user(name, email, password) {
  const [results] = await pool.query(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);
  return results;
}

export async function insert_property(street, zip, city, state, country, rent, user_name) {
  const [results] = await pool.query(`INSERT INTO properties (street, zip, city, state, country, rent, user_name) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  return results;
}
