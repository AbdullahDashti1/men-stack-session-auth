const express = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});


router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    };

    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
    };

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPassword;

    const newUser = await User.create(req.body);
    res.send(newUser);
});

module.exports = router;
