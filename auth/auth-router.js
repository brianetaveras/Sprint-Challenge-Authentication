const router = require("express").Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // implement registration
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required!"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db("users").insert({
      username: username,
      password: hashedPassword
    });

    res.json({
      message: "success"
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body;
    const user = await db("users").where("username", username).first();
    const passwordMatches = await bcrypt.compare(password, user.password)
    if(!user || !passwordMatches){
      return res.status(401).json({
        message: "Invalid credentials!"
      })
    }

    const token = jwt.sign({id: user.id}, 'shhhhhhhh');
    res.json({
      token: token
    })

  } catch (err) {
    next(err);
  }
});

module.exports = router;
