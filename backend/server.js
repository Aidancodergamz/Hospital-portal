require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Create MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospital_portal",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token format incorrect." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

// Route to check if a user is at least 14 years old
app.get("/check-age", verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT dob FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const dob = new Date(results[0].dob);
    const today = new Date();

    // Calculate the age correctly
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // If the user's birthday hasn't occurred yet this year, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    console.log(`User DOB: ${dob.toISOString()}, Age Calculated: ${age}`);

    res.json({ allowed: age >= 14 });
  });
});


// API Route to Handle Registration
app.post("/register", async (req, res) => {
  const { username, firstname, surname, email, department, password, dob } = req.body;

  if (!username || !firstname || !surname || !email || !department || !password || !dob) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO users (username, first_name, surname, email, department, password, dob) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [username, firstname, surname, email, department, hashedPassword, dob], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error inserting user into database" });
      }
      res.json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// API Route to Handle Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  });
});

// Fetch Logged-in User Data
app.get("/userdata", verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT first_name, department FROM users WHERE id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
