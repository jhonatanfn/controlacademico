import { Request, Response } from "express";
import Evaluacion from '../models/evaluacion';
import { handleHttpError } from "../utils/handleError";

export const getEvaluaciones=  async (req:Request, res:Response)=>{

    const desde= Number(req.query.desde) || 0;
    try {
        const total=  (await Evaluacion.findAll({
            where:{estado:true}
        })).length;
        const evaluaciones= await Evaluacion.findAll({
            where:{estado:true},
            attributes: ['id', 'nombre','abreviatura', 'estado'],
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getTodo = async (req:Request, res:Response)=>{
    try {
        const evaluaciones= await Evaluacion.findAll({
            where:{ estado: true},
            attributes: ['id', 'nombre','abreviatura', 'estado'],
        });
        res.json({
            ok:true,
            evaluaciones
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getEvaluacion= async (req:Request,res:Response)=>{
    const { id }= req.params;
    try {
        const evaluacion= await Evaluacion.findByPk(id);
        if(!evaluacion){
            return res.status(400).json({
                ok:false,
                msg: `No existe una evaluacion con el id: ${id}`
            });
        }
        res.json({
            ok:true,
            evaluacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postEvaluacion= async (req:Request,res:Response)=>{
        
    const { body }= req;
    try {
        const evaluacion= Evaluacion.build(body);
        await evaluacion.save();
        res.json({
            ok:true,
            msg:'Evaluacion creada exitosamente',
            evaluacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putEvaluacion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;

    try {
        const evaluacion:any = await Evaluacion.findByPk(id);
        if(!evaluacion){
           return  res.status(400).json({
                ok:false,
                msg: `No existe una evaluacion con el id: ${id}`
            });
        }
        await evaluacion?.update(body);
        res.json({
            ok:true,
            msg:'Evaluacion actualizada exitosamente',
            evaluacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteEvaluacion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const evaluacion:any = await Evaluacion.findByPk(id);
        if(!evaluacion){
            return res.status(400).json({
                ok:false,
                msg: `No existe un evaluacion con el id: ${id}`
            });
        }
        await evaluacion?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Evaluacion eliminada exitosamente',
            evaluacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}