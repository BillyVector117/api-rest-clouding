import app from "./app"; // Server config
import "./database";
import path from "path";
import handlebars from "handlebars";
import express from "express";
import exphbs from "express-handlebars";
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
// Settings (Template engines)
app.set("views", path.join(__dirname, "views")); // Set 'views' path
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", ".hbs"); // Set handlebars as template engine

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Run server
app.listen(app.get("port"));
console.log("Server running on port", app.get("port"));
