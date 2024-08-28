const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const app = express();
const port = 3000;

const db = require('./config/db/index');

// Connect to DB
db.connect();

const route = require('./routes');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

// Register Handlebars helper
Handlebars.registerHelper('getProp', function (obj, prop) {
  return obj[prop];
});

// Handlebars setup
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route initialization
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
