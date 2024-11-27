const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

const app = express();

// Middlewares globales
app.use(express.json());

// Rutas
app.use("/", routes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
