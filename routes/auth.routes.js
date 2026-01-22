const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");


const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (payload) =>
  jwt.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "6h",
  });


router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  
  User.findOne({ email })
    .then((foundUser) => {
      
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

     
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
     
      const { email, name, _id } = createdUser;

     
      const user = { email, name, _id };

      
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); 
});


router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

 
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
       
        res.status(401).json({ message: "User not found." });
        return;
      }

      
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        
        const { _id, email, name, role } = foundUser;

       
        const payload = { _id, email, name, role };

        const authToken = signToken(payload);

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); 
});


router.get("/verify", isAuthenticated, (req, res, next) => {
  
  console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
});

// Google OAuth login/signup
router.post("/google", async (req, res, next) => {
  const { credential } = req.body;

  if (!credential) {
    res.status(400).json({ message: "Google credential is required" });
    return;
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    res.status(500).json({ message: "Missing GOOGLE_CLIENT_ID" });
    return;
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || email;

    if (!email) {
      res.status(400).json({ message: "Google account email not available" });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(credential + process.env.TOKEN_SECRET, salt);

      user = await User.create({
        email,
        name,
        password: hashedPassword,
      });
    }

    const tokenPayload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const authToken = signToken(tokenPayload);

    res.status(200).json({ authToken });
  } catch (err) {
    next(err);
  }
});

// Admin endpoints
const { isAdmin } = require("../middleware/admin.middleware");

// GET all users (admin only)
router.get("/admin/users", isAdmin, (req, res, next) => {
  User.find({}, "-password")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log("Error getting users", err);
      res.status(500).json({ error: "Error getting users" });
    });
});

// DELETE user (admin only)
router.delete("/admin/users/:userId", isAdmin, (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      res.json({ message: "User deleted", user: deletedUser });
    })
    .catch((err) => {
      console.log("Error deleting user", err);
      res.status(500).json({ error: "Error deleting user" });
    });
});

// UPDATE user (admin only)
router.put("/admin/users/:userId", isAdmin, (req, res, next) => {
  const { userId } = req.params;
  const { name, email, role } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (role) updateData.role = role;

  User.findByIdAndUpdate(userId, updateData, { new: true }, "-password")
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log("Error updating user", err);
      res.status(500).json({ error: "Error updating user" });
    });
});

module.exports = router;
