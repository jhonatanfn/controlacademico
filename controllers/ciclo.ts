import { Request, Response } from "express";
import Ciclo from '../models/ciclo';
import { handleHttpError } from "../utils/handleError";

export const getCiclos=  async (req:Request, res:Response)=>{

    try {
        const ciclos= await Ciclo.findAll({
            where:{ estado: true}
        });
        res.json({
            ok:true,
            ciclos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}