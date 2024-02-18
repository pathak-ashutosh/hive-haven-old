// Import necessary packages
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Initialize Express app
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( {policy: 'cross-origin'} ));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Create database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}).promise();


// Middleware for user authentication
const authenticateUser = (req, res, next) => {
  // Get token from request header
  const token = req.header('Authorization');
  // Check if token is provided
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user information to request object
    next(); // Call next middleware
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).send('Invalid token.');
  }
};

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
};

// Routes

// User registration
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  // Check if email and password are provided
  if (!name || !email || !password) {
    return res.status(400).send('Name, Email and password are required.');
  }
  // Check if user already exists
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length > 0) {
      return res.status(400).send('Email is already registered.');
    }
    // Insert new user into the database
    pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).send('User registered successfully.');
    });
  });
});


// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }
  // Check if user exists and credentials match
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 0) {
      return res.status(401).send('Invalid email or password.');
    }
    // User authenticated, generate JWT
    const user = results[0];
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Return JWT in response
    res.status(200).json({ token });
  });
});


// Property listing
app.get('/api/properties', authenticateUser, (req, res) => {
  pool.query('SELECT * FROM properties', (err, results) => {
    if (err) {
      console.error('Error fetching properties:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).json(results);
  });
});

// Upload utility bill
app.post('/api/upload-bill', authenticateUser, upload.single('bill'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
  } else {
    res.status(200).send('File uploaded successfully.');
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
