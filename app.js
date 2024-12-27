require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const route = require('./server/routes/index');
const dashboard = require('./server/routes/dashboard');
const connectDB = require('./server/config/database');
const passport = require('passport');
const methodOverride = require('method-override');
const passportauth = require('./server/routes/auth');
const cacheControl = require('./server/middleware/cacheControl');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT;

//connect to database 
connectDB();

// Session handling middleware
app.use(session({
    secret: 'deer',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: { maxAge: 604800000 } // 7 days in milliseconds = 7*24*60*60*1000 = 604800000
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//google authentication 
app.use(passportauth);

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Static Files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//cache control 
app.use(cacheControl);

//method override
app.use(methodOverride('_method'));

//routes
app.use('/', route);
app.use('/dashboard', dashboard);
app.get('*', (req, res) =>
    {
        res.status(404).render('404');
    });

app.listen(port, ()=> {
    console.log(`the website is running under the ${port}`);
});
 

