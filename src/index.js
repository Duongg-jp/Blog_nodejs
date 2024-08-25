const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const db = require('./config/db/index');

// connect to db
db.connect();

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Handlebars setup
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        defaultLayout: 'main',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route initialization
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
