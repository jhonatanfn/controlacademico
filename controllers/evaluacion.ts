import { Request, Response } from "express";
import Evaluacion from '../models/evaluacion';


export const getEvaluaciones=  async (req:Request, res:Response)=>{

    const desde= Number(req.query.desde) || 0;
    try {

        const total=  (await Evaluacion.findAll({
            where:{estado:true}
        })).length;

        const evaluaciones= await Evaluacion.findAll({
            where:{estado:true},
            limit:5,
            offset:desde,
        });
        res.json({
            ok:true,
            evaluaciones,
            desde,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const getTodo = async (req:Request, res:Response)=>{

    try {

        const evaluaciones= await Evaluacion.findAll({
            where:{ estado: true}
        });
        res.json({
            ok:true,
            evaluaciones
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}