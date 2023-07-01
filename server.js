require('dotenv').config();
const express = require('express');
const app = express();
const FruitRouter = require('./controllers/fruit');
const UserRouter = require('./controllers/user');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');


// MIDDLEWARE
app.use(express.static("public")); 
app.use(express.urlencoded({extended: true})); //allows the req.body to be read from the form
// 
app.use(methodOverride('_method'));
// teh setup below is how we add the ability to track if the user 
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true, 
    resave: false,
}));
app.use('/fruit', FruitRouter);
app.use('/user', UserRouter);


app.get('/', (req, res) => {
    res.render('index.ejs')
});

const PORT = process.env.PORT;


app.listen(PORT, () => 
    console.log(`app listening on port ${PORT}`))