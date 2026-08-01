
const UserModel = require("../models/user.model");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utils/bcrypt");

const registerUser = async(req, res, next) => {

    const {error, value} = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: "Invalid data", error: error.details});
    }
    
    try {
    const {name, email, password} = req.body;

    const existingUser = await UserModel.findOne({email: email});
    if (existingUser) {
        return res.status(400).json({message: "User already exists"});
    }   

    await hashPassword(password);

    const newUser = new UserModel({
        name: name,
        email: email,
        password: hash
    });

    await newUser.save();

    return res.status(201).json({message: "User registered successfully", data: newUser});
    
    } catch (error) {
       next(error);
    }
};

const loginUser = async(req, res, next) => {
    
    const {error, value} = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: "Invalid data", error: error.details});
    } 
    try {const {email, password} = req.body;
    const user = await UserModel.findOne({email: email})

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

    const resUser = {
        id: user._id,
        name: user.name,
        email: user.email
    }

    return res.status(200).json({message: "Login successful", user: resUser, token: token});
}
catch (error) {
    next(error);
}
};

module.exports = {registerUser, loginUser};
    
