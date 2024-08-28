const express = require('express');
const cors = require('cors');
const userRoutes = require("../routes/user.routes");
const lugarRoutes = require("../routes/lugar.routes");
const cometarioRoutes = require("../routes/comentario.routes");
const { error } = require("../middleware/err");

module.exports = function (app) {
  // Middlewares
  const allowedOrigins = ['http://localhost:8100'];
  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
  app.use(express.json());
  // Routes
  app.use("/api/usuario", userRoutes);
  app.use("/api/lugar", lugarRoutes);
  app.use("/api/comentario", cometarioRoutes);
  // Middleware de errores
  app.use(error);
}