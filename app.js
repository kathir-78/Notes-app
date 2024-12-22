require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const route = require('./server/routes/index');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static Files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', route);
app.get('*', (req, res) =>
    {
        res.status(404).render('404');
    });

app.listen(port, ()=> {
    console.log(`the website is lisitinging ${port}`);
});
 

