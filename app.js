const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

const url = 'mongodb+srv://doug:blah@cluster0.gp78l.mongodb.net/mern-jwt?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => {
    console.log('successfully connected to DB');
});

const userRouter = require('./routes/User');
app.use('/user', userRouter);

// mongoose.connect('mongodb://localhost27017/mernauth', {useNewUrlParser : true, useUnifiedTopology : true}, ()=> {
// });



app.listen(5000, ()=> {
    console.log('express server started');
});