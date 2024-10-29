const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const session = require('express-session');
const User = require('./models/user');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB Connected!')).catch((e) => console.error('MongoDB Error:', e));

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    cookie: {secure: false, httpOnly: true, sameSite: 'lax'}
}));

app.post('/api/register', async (req, res) => {
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

app.post('/api/login', async (req, res) => {
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

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({message: 'Logout Failed'});
        res.clearCookie('connect.sid');
        res.json({message: 'Logout Successful'});
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));