// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure body parser middleware
app.use(bodyParser.json());

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

// Initialize MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'mydb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

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
    const decoded = jwt.verify(token, 'your_secret_key');
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
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }
  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length > 0) {
      return res.status(400).send('Email is already registered.');
    }
    // Insert new user into the database
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).send('User registered successfully.');
    });
  });
});


// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }
  // Check if user exists and credentials match
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
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
app.get('/properties', authenticateUser, (req, res) => {
  // Perform property listing logic here (e.g., fetch properties from database)
});

// Upload utility bill
app.post('/upload-bill', authenticateUser, upload.single('bill'), (req, res) => {
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
