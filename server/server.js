const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const util = require('util');
const morgan = require('morgan');
const { fork } = require('child_process');

const workerFile = path.join(path.dirname(require.main.filename), '/worker.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ping', async (req, res) => {
    res.sendStatus(200);
});

app.get('/long', async (req, res) => {
    const compute = fork(workerFile);
    compute.send('longComputation');
    compute.on('message', sum => {
        compute.kill();
        res.end(`Sum is ${sum}`);
    });
});
 
app.listen(4001, function () {
    console.log('Server is running.. on Port 4001');
});

setTimeout(() => {
    const a = b.error();
}, 10000);
