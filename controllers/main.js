const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// controllers
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const id = new Date().getDate();
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  return res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res, next) => {
  console.log(req.user);
  const { username } = req.user;
  const luckNumber = Math.floor(Math.random() * 100);
  return res.status(200).json({
    msg: `Hello ${username}`,
    secret: `Here is your authorized data and your lucky number ${luckNumber}`,
  });
};

module.exports = { login, dashboard };
