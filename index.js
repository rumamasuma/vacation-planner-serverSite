const express = require('express');

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// testing on server
app.get('/', (req, res) =>{
    res.send('Welcome to my VACATION  server');
})

// server running check
app.listen(port , ()=>{
    console.log('Running Vacation Server on port', port);
})