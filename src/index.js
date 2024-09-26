import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import methodOverride from "method-override";
import morgan from "morgan";
import db from "./config/db/index.js"; // Thêm .js vào cuối
import route from "./routes/index.js"; // Thêm .js vào cuối

const app = express();
const port = 3000;

// Kết nối đến DB
db.connect();

// Middleware
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));

// Thiết lập Handlebars với helpers
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(process.cwd(), "resources", "views", "layouts"),
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

app.use(methodOverride('_method'));

app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "resources", "views"));

// Khởi tạo route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
