const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    const exsistingUser = await User.findOne({ email });

    if (exsistingUser) {
        return res.status(400).json({message: 'Account found with the same email'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({fullName, email, password: hashedPassword});
    await newUser.save();

    req.session.userId = newUser._id;
    res.status(201).json({user: newUser});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({message: 'Invalid username or password'});
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({message: 'Invalid username or password'});
    }

    req.session.userId = user._id;
    res.status(200).json({user});
});

router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({message: 'Invalid username or password'});
    if (admin.password != password) return res.status(400).json({ message: 'Invalid username or password' });
    res.status(200);
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({message: 'Logout Failed'});
        res.clearCookie('connect.sid');
        res.status(200).json({message: 'Logout Successful'});
    });
});

module.exports = router;