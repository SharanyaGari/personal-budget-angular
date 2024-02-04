const express = require('express');
const app = express();
const port = 80;

app.use('/', express.static('public')); 

app.get('/hello', (req, res) => {
    res.send('Hi World');
});

const budget = require('./pBudget.json')
//console.log(budget)




app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});