const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    const data = redditData;
    res.render('home', { ...data });
})


app.listen(3000, () => {
    console.log('LISTENING PORT ON 3000');
})