const jwt = require("jsonwebtoken");

const reqAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Unauthorized"});
    } 

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(payload.id);
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
};


module.exports = reqAuth;