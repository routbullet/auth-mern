const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/dbConnection");
const User = require("./db/user");
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
    return res.status(201).json({ message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Login failed",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
