const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');


app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

app.use('/' , require('./routes'));

app.listen(Port , (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`The server is running on PORT ${Port}`);
})
