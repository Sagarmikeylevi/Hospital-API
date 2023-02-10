const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT;
const db = require('./config/mongoose');

app.use('/' , require('./routes'));

app.listen(Port , (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`The server is running on PORT ${Port}`);
})
