const joi = require("joi");

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const { validateRegister, validateLogin } = require("../validations/user.validation");
const upload = require("../middleware/upload.js");

router.post("/signup", upload.single("Image"), (req, res, next) => {
    const fileUrl = req.file.path,
    fileName = req.file.filename;

    console.log("File URL:", fileUrl);              
    });
    
router.post("/signup", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

module.exports = router;