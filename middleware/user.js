const userDB = require("../db/index")

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    // words = [Bearer, "dfjweop4fje9"]
    const words = token.split(" ");
    const jwToken = words[1];
    const decoded = jwt.verify(jwToken, SECRET);
    if(decoded.username){
        next();
    }else{
        res.json({
            msg: "Auth failed"
        })
    }
}

module.exports = userMiddleware;