const joi = require("joi");

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const { validateRegister, validateLogin } = require("../validations/user.validation");


router.post("/signup", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

module.exports = router;