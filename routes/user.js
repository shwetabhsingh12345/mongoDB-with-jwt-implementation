const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/user");
const db = require("../db/index")

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    try{
    const response = await db.User.create({
        username: username,
        password: password
    })
    res.json({
        msg:"User signed-up successfully."
    })
}catch(err){
    res.status(403).json({
        msg:"Failed"
    })
}
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await db.Course.find({})
    res.json({response})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const username = req.body.username
    const courseId = req.params.courseId
    try{
    await db.User.updateOne({
        username: username
        
    },{
        "$push":{
            purchasedCourses: courseId
        }
    })
    res.json({
        msg:"Purchased sucessfully"
    })
}catch(err){
    res.json({
        msg:"Failed"
    })
}
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
    const response = await db.User.findOne({
        username: req.headers.username
    })
    const courses = await db.Course.find({
        _id :{
            "$in": response.purchasedCourses
        }
    })
    res.json({
        course: courses
    })
}catch(err){
    res.json({
        msg: "Failed"
    })
}

});

module.exports = router