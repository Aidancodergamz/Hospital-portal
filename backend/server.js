require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON data in requests

// Create MySQL Connection
const db = mysql.createConnection({
  host: "localhost", // Change to your MySQL server
  user: "root", // Change to your MySQL username
  password: "", // Change to your MySQL password
  database: "hospital_portal", // Change to your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// API Route to Handle Registration (WITH PASSWORD HASHING)
app.post("/register", async (req, res) => {
  const { username, firstname, surname, email, department, password, dob } = req.body;

  if (!username || !firstname || !surname || !email || !department || !password || !dob) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database with hashed password
    const sql = "INSERT INTO users (username, first_name, surname, email, department, password, dob) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [username, firstname, surname, email, department, hashedPassword, dob], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error inserting user into database" });
      }
      res.json({ message: "User registered successfully!" });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});