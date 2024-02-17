// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');

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

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create users table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)');
});

// Create properties table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS properties (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, address TEXT, rent INTEGER, FOREIGN KEY(userId) REFERENCES users(id))');
});

// Routes

// User registration
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      res.status(400).send('Registration failed. Email may already be in use.');
    } else {
      res.status(200).send('Registration successful.');
    }
  });
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err || !row) {
      res.status(401).send('Invalid email or password.');
    } else {
      res.status(200).send('Login successful.');
    }
  });
});

// Property listing
app.get('/properties', (req, res) => {
  db.all('SELECT * FROM properties', (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching properties.');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Upload utility bill
app.post('/upload-bill', upload.single('bill'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
  } else {
    res.status(200).send('File uploaded successfully.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
