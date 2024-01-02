const adminDB = require('../db/index')
const jwt = require("jsonwebtoken")
const SECRET = require("../config")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    // words = [Bearer, "dfjweop4fje9"]
    const words = token.split(" ");
    const jwToken = words[1];
    const decoded = jwt.verify(jwToken, SECRET.JWT_SECRET);
    if(decoded.username){
        next();
    }else{
        res.json({
            msg: "Auth failed"
        })
    }

}

module.exports = adminMiddleware;