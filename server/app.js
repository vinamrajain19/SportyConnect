// require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const errorHandlerMiddleware = require('./middleware/error-handler')
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const authRouter = require('./routes/auth')
const players = require('./routes/routes')

app.use('/auth', authRouter)
app.use('', players)
app.use(errorHandlerMiddleware)



app.all('*', function (req, res) {
    res.send("not found");
})

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

mongoose.connect("mongodb+srv://mayank:mayank@cluster0.fy2cjib.mongodb.net/BTP?retryWrites=true&w=majority").then(() => {
    console.log('App connected to database');
    app.listen(5000, function () {
        console.log("server started");
    });
})
    .catch((error) => {
        console.log(error);
    });
