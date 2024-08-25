const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const User = require("./db/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// registration [POST]
app.post("/registration", async (req, res) => {
  try {
    const { username, password, fullName, email } = req.body;
    console.log("Registration attempt:", {
      username,
      password,
      fullName,
      email,
    });

    // Additional validation can be added here

    const userData = new User({ username, password, fullName, email });
    await userData.save();
    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed." });
  }
});

// login [POST]
app.post("/login", async (req, res) => {
  console.log("env", process.env.SECRETE_ACCESS_TOKEN);
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });

    const userData = await User.findOne({ username });

    // Check if the user exists and if the password matches
    if (!userData || userData.password !== password) {
      return res.status(401).json({
        error: "Login failed, please validate your username and password...",
      });
    }

    console.log("userData ->", userData);
    const token = jwt.sign(
      { id: userData._id, username: userData.username },
      process.env.SECRETE_ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    console.log(token);
    if (token) {
      return res.status(201).json({ message: "Login successful.", token });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed",
    });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRETE_ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected Route for user specific data (fullName, email, username) [GET]
app.get("/user", authenticateToken, async (req, res) => {
  const userData = (await User.find()).map((data) => {
    return {
      fullName: data.fullName,
      email: data.email,
      username: data.username,
    };
  });

  res.json({
    message: "This is a protected route.",
    user: req.user,
    data: userData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
