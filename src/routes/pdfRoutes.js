const express = require("express");
const multer = require("multer");
const { processPDF, processTXT, procesarTexto, parseTextToJson } = require("../utils/pdfProcessor");

const router = express.Router();

// Configuración de Multer
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para mostrar formulario
router.get("/upload", (req, res) => {
     res.send(`
          <form action="/upload" method="POST" enctype="multipart/form-data">
               <h1>Subir un archivo PDF</h1>
               <input type="file" name="pdf" accept=".pdf" required />
               <button type="submit">Subir y Procesar</button>
          </form>
     `);
});

// Ruta para procesar PDF
router.post("/upload", upload.single("pdf"), async (req, res, next) => {
     try {
          if (!req.file) {
               throw new Error("No se recibió un archivo válido. Asegúrate de subir un archivo PDF.");
          }

          const pdfText = await processPDF(req.file.buffer);

          //
          const txt = await processTXT(); //
          const textInJson = parseTextToJson(txt);
          console.log(textInJson);
          //

          res.status(200).send(`
               <a href="/upload">Subir otro PDF</a>
               <h1>PDF procesado</h1>

               <p>Texto extraído del PDF:</p>
               <pre>${txt}</pre>

          `);
     } catch (error) {
          next(error);
     }
});

module.exports = router;
