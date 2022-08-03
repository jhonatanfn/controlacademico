"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarPdf = void 0;
const pdf = require('html-pdf');
const generarPdf = (req, res) => {
    let nombres = ["Juan", "Luis", "Maria", "Julia"];
    const content = `
        <h1>Título en el PDF creado con el paquete html-pdf</h1>
        <p>Generando un PDF con un HTML sencillo</p>

    `;
    pdf.create(content).toFile('./html-pdf.pdf');
};
exports.generarPdf = generarPdf;
//# sourceMappingURL=pdf.js.map