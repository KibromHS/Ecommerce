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

app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB Connected!')).catch((e) => console.error('MongoDB Error:', e));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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
        pass: process.env.PWD
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
            return res.status(500).json({message: 'Failed to send email'});
        }
        console.log('Email sent:', info.response);
        res.status(200).json({message: 'Email sent successfully'});
    });
});

app.post('/create-payment-session', async (req, res) => {
    const { amount, email, firstName, lastName, phone } = req.body;
    const tx_ref = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CHAPA_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "amount": amount,
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "currency": "ETB", 
                "phone_number": phone,  
                "tx_ref": tx_ref,  
                "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",  
                "return_url": "http://localhost:3000",  
                "customization[title]": "Payment for my favourite merchant",  
                "customization[description]": "I love online payments",  
                "meta[hide_receipt]": "true"
            })
        });

        const data = await response.json();

        if (data.status == 'success') {
            res.json({ success: true, paymentUrl: data.data.checkout_url });
        } else {
            console.log('Error there', data);
            res.status(500).json({ success: false, message: 'Failed to create payment session' });
        }
    } catch (error) {
        console.error("Error creating payment session:", error);
        res.status(500).json({ success: false, message: 'Error creating payment session' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
