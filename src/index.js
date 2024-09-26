const { engine } = require("express-handlebars");
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const app = express();
const port = 3000;

const db = require("./config/db/index");

// Connect to DB
db.connect();

const route = require("./routes");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));

// Handlebars setup with helpers
// Đăng ký helper
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "resources", "views", "layouts"),
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      getProp: function (obj, prop) {
        return obj ? obj[prop] : "";
      },
      json: function (obj) {
        return JSON.stringify(obj, null, 2); // In đối tượng dưới dạng JSON
      },
    },
  })
);

app.use(methodOverride('_method'))

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route initialization
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
