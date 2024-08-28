require('dotenv').config();
const express = require('express');
require("express-async-errors");
const initializeRoutes = require('./startup/routes');

const app = express();
const port = process.env.PORT || 4000;

initializeRoutes(app);

process.on("uncaughtException", (err) => console.log(err.message));

process.on("unhandledRejection", (err) => console.log(err.message));

app.listen(port, () => {
  console.log(`Servidor ejecutado en el puerto ${port}`);
});