import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import {
  get_users_by_email,
  get_users_by_email_password,
  insert_user,
  get_properties,
  get_property_by_id,
} from "./dbQueries.js";

// Initialize Express app
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json("Internal Server Error");
};

// Routes

// User registration
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  // Check if email and password are provided
  if (!name || !email || !password) {
    return res.status(400).json("Name, Email and password are required.");
  }
  // Check if user already exists
  get_users_by_email(email).then((results) => {
    if (results.length > 0) {
      return res.status(409).json("User already exists.");
    }
    // Insert new user into the database
    insert_user(name, email, password)
      .then(() => {
        res.status(201).json("User registered successfully.");
      })
      .catch((err) => {
        console.error("Error registering user:", err);
        res.status(500).json("Internal Server Error");
      });
  });
});

// User login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json("Email and password are required.");
  }
  // Check if user exists and credentials match
  get_users_by_email_password(email, password).then((results) => {
    if (results.length === 0) {
      return res.status(401).json("Invalid email or password.");
    }
    // User authenticated, generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Return JWT in response
    res.status(200).json({ token });
  });
});

// Property listings
app.get("/api/properties", (req, res) => {
  get_properties()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error("Error getting properties:", err);
      res.status(500).json("Internal Server Error");
    });
});

// Property details
app.get("/api/properties/:id", (req, res) => {
  get_property_by_id(req.params.id)
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json("Property not found.");
      }
      res.status(200).json(results[0]);
    })
    .catch((err) => {
      console.error("Error getting property:", err);
      res.status(500).json("Internal Server Error");
    });
});

// Upload utility bill
app.post("/api/upload-bill", upload.single("bill"), (req, res) => {
  if (!req.file) {
    res.status(400).json("No file uploaded.");
  } else {
    res.status(200).json("File uploaded successfully.");
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
