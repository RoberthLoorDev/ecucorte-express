const express = require("express");
const pdfRoutes = require("./pdfRoutes");

const router = express.Router();

// Rutas
router.use(pdfRoutes);

// Ruta raíz
router.get("/", (req, res) => res.send("Server ready!"));

module.exports = router;
