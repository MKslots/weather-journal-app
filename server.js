// Setup empty JS object to act as endpoint for all routes

projectData = [];

// Require Express to run server and routes

const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
}

// GET route

app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);    
};

// Post route

app.post('/add', callBack)


function callBack(req, res) {
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };

    projectData.unshift(newEntry);
};

