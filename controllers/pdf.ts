const pdf = require('html-pdf');
import { Request, Response } from "express";


export const generarPdf = (req:Request,res:Response)=>{
    let nombres=["Juan","Luis","Maria","Julia"];
    const content = `
        <h1>Título en el PDF creado con el paquete html-pdf</h1>
        <p>Generando un PDF con un HTML sencillo</p>

    `;
    pdf.create(content).toFile('./html-pdf.pdf');

}




