const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost27017/mernauth', {useNewUrlParser : true, useUnifiedTopology : true}, ()=> {
    console.log('successfully connected to DB');
});

const User = require('./models/User');

const userInput = {
    username: 'noobcoder1234',
    password: '123',
    role: 'admin'
}

const user = new User(userInput);
user.save((err, document) => {
    if(err)
        console.log;
    console.log(document);
});

app.listen(5000, ()=> {
    console.log('express server started');
});