const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');
const authenticate = require('./routes/authentication')(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err){
        console.log('Something went wrong', err);
    }
    else {
        console.log('Connected to database: ' + config.db);
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend/dist/'));
app.use('/authentication', authenticate);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/dist/index.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});