const express = require('express')
const app = express()

require('dotenv').config()

const connect = require ('./config/db');
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/blog', require('./routes/postRoute'))

app.listen(process.env.PORT, (err) =>
    err ?
        console.log(err)
        : console.log(`server is running on localhost ${process.env.PORT}`)
)
