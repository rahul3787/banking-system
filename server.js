const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const { check, validationResult } = require('express-validator');


const jwt = require('jsonwebtoken');

const morgon = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToDatabase = require('./config/connectToDatabase');
app.use(cors())
connectToDatabase();




app.use(express.json());

// app.get('/api',(req,res)=>{
//     res.send('hello')
//   }),

app.use('/',require('./ROUTES/api'));

app.listen(PORT , console.log(`server is running on ${PORT}`))