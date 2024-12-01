const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const cantons = require("../data/cantons.json");

async function processPDF(pdfBuffer) {
     const pdfData = await pdfParse(pdfBuffer);
     return pdfData.text;
}

//read txt
async function processTXT() {
     // Ruta al archivo de texto
     const filePath = path.join(__dirname, "..", "data", "data.txt");

     // Verifica si el archivo existe
     if (fs.existsSync(filePath)) {
          try {
               const txt = fs.readFileSync(filePath, "utf8");
               return txt;
          } catch (error) {
               console.error(`Error al leer el archivo: ${error}`);
          }
     } else {
          console.error(`El archivo no existe en la ruta: ${filePath}`);
     }
}

function parseTextToJson(txt) {
     // Extraer la fecha exacta del texto
     // Expresión regular para extraer la fecha

     // Mapeo de los meses en español a su número correspondiente
     const meses = {
          ENERO: "01",
          FEBRERO: "02",
          MARZO: "03",
          ABRIL: "04",
          MAYO: "05",
          JUNIO: "06",
          JULIO: "07",
          AGOSTO: "08",
          SEPTIEMBRE: "09",
          OCTUBRE: "10",
          NOVIEMBRE: "11",
          DICIEMBRE: "12",
     };

     const province = txt.split("\n")[1].toLowerCase().trim();

     // Extraer días de inicio y fin
     const rangoDias = txt.split("\n")[2].match(/DESDE EL \w+ (\d+) AL \w+ (\d+)/);
     const dates = [];

     if (!rangoDias) {
          console.error("Formato de texto inválido");
     } else {
          const [diaInicio, diaFin] = rangoDias.slice(1, 3).map(Number);
          const mes = txt.split("\n")[3].split(" ")[1];
          const anio = txt.split("\n")[3].split(" ")[2];

          for (let dia = diaInicio; dia <= diaFin; dia++) {
               const fecha = `${anio.trim()}-${meses[mes.toUpperCase()]}-${String(dia).padStart(2, "0")}`;
               dates.push(fecha);
          }
     }
     //----------------------------------

     // ----------------Extraer cantones
     const cantones = cantons;

     const sectors = cantones.reduce((acc, canton) => {
          const regex = new RegExp(`${canton}\\s+(.*?)(?=(\\n\\n|\\n${cantones.join("|")}|$))`, "gs");
          const match = regex.exec(txt);
          if (match) {
               const sectores = match[1]
                    .split(",") // Divide por comas
                    .map((s) => s.trim()) // Limpia espacios
                    .filter(
                         (s) =>
                              s && // Elimina elementos vacíos
                              !/^\d{2}:\d{2}/.test(s) && // Filtra horarios (ej: "09:00 a 13:00")
                              !/Desde el|de diciembre|UNIDAD DE NEGOCIO|CANTÓN SECTORES/i.test(s) // Elimina texto no deseado
                    );
               acc[canton] = sectores;
          }
          return acc;
     }, {});

     return {
          region: province,
          dates: dates,
          data: { sectors },
     };
}

module.exports = { processPDF, processTXT, parseTextToJson };
