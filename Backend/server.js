// importing constants
require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db/db')
const User = require("./models/users.model")

// Middlewares
app.use(cors());
app.use(express.json())


// All Api's
// Home route 
app.get('/', (req, res) => {
    res.send("Hello app")
})


// Get all users 
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// post users
app.post('/users', async (req, res) => {
    console.log(req.body);
    const newUser = new User({

        username: req.body.username,
        useremail: req.body.useremail,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
    });

    try {
        await newUser.save();
        res.send("Success! User created .");
    } catch (err) {
        res.send("Error posting user : " + err);
    }
});
// get all rooms 
// app.get('/rooms', async (req, res) => {
//     try {

//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });




// connectDB function called - MongoDB connection 
connectDB().then(() => {
    // express app listening on port
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
})