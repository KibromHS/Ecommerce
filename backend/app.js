const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const nodemailer = require('nodemailer');

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
app.use('/api/products', productsRouter);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kibromhs81@gmail.com',
        pass: 'hailesilasse'
    }
});
  
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'kibromhs81@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send email');
        }
        console.log('Email sent:', info.response);
        res.status(200).json({message: 'Email sent successfully'});
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
