import { Request, Response } from "express";
import Ciclo from '../models/ciclo';


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
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}