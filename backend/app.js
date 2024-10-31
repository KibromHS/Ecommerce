const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const authRouter = require('./routes/auth');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB Connected!')).catch((e) => console.error('MongoDB Error:', e));

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    cookie: {secure: false, httpOnly: true, sameSite: 'lax'}
}));

app.use('/api/auth', authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
