const pdfParse = require("pdf-parse");

async function processPDF(pdfBuffer) {
     const pdfData = await pdfParse(pdfBuffer);
     return pdfData.text;
}

module.exports = { processPDF };
