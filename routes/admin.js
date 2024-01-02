const express = require("express");
const adminMiddleware = require("../middleware/admin");
const router = express.Router();
const db = require('../db/index');
const SECRET = require("../config")
const jwt = require("jsonwebtoken")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    try {
        await db.Admin.create({
           username: username,
           password: password
        })
        res.json({
            msg: "Admin signed-up in sucessfully!"
        })
    }catch(err){
        res.status(403).json({
            msg: "Sign up failed."
        })
    }
});

router.post('/signin', async(req, res)=> {
    const username = req.body.username;
    const password = req.body.password;

    //Authenticate
    const user = await db.Admin.find({
        username: username,
        password: password
    })
    if(user){
        //token signing
    const token = jwt.sign({
        username: username
    }, SECRET.JWT_SECRET)
    res.json({
        token
    })
}else{
    res.status(403).json({
        msg:"User not found."
    })
}
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink
    const price = req.body.price

    try{

    const new_course = await db.Course.create({
        title: title,
        description: description,
        imageLink: imageLink,
        price: price
    })
    res.json({
        msg: "Course created sucessfully", courseID: new_course._id
    })
}catch(err){
    res.status(403).json({
        msg: "Request not completed."
    })
}
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try{
    const response = await db.Course.find({})
    res.json({
        courses: response
    })
}catch(err){
    res.json({
        msg: "Failed."
    })
}
});

module.exports = router;