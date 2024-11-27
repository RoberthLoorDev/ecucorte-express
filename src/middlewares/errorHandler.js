module.exports = (err, req, res, next) => {
     console.error("Error:", err.message || err);
     res.status(500).send(`
         <h1>Error en el servidor</h1>
         <p>${err.message || "Ocurrió un error inesperado."}</p>
         <a href="/upload">Intentar nuevamente</a>
    `);
};
