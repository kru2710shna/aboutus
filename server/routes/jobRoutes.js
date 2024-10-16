const express = require('express');
const router = express.Router()
var fetchUser = require('../middlewares/fetchUser')
const Jobs = require('../models/Jobs');
const Users = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();




// ROUTE -1 Get All the Jobs: GET "/api/jobs/fetchalljobs" Login required
router.get('/fetchalljobs', fetchUser, async (req, res) => {
    try {
        const users = await Jobs.find({ user: req.user.id })
        res.json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE -2 Add Jobs: POST "/api/jobs/addjob" Login required
router.post('/addjob', fetchUser, [
    [
        body('jobTitle', 'Job must have a title').isLength({ min: 5 }),
        body('jobDescription', 'Description must be at least 10 characters').isLength({ min: 10 }),
        body('jobSalary', 'Salary must be a Value').isInt(),
        body('jobType', 'Job Type must be a added').isLength({ min: 5 }),
        body('jobCompany', 'Company must be a displayed').isLength({ min: 5 })
    ]
], async (req, res) => {

    const { jobCompany, jobDescription, jobSalary, jobTitle, jobType } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const job = new Jobs({
            jobCompany, jobDescription, jobSalary, jobTitle, jobType, user: req.user.id
        })

        const savedjob = await job.save()
        res.json(savedjob)
    }
    // If Anything is WRONG Internally 
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})



module.exports = router