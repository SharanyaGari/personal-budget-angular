const express = require('express');
const app = express();
const port = 80;

app.use('/', express.static('public')); 

app.get('/hello', (req, res) => {
    res.send('Hi World');
});

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});