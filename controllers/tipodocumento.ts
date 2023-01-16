import { Request, Response } from "express";
import Tipodocumento from "../models/tipodocumento";
import { handleHttpError } from "../utils/handleError";

export const getTipodocumentos= async (req:Request,res:Response)=>{

    try {
        const tipodocumentos= await Tipodocumento.findAll({
            attributes:['id','nombre'],
            where:{estado:true}
        });
        res.json({
            ok:true,
            tipodocumentos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getTipodocumento= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const tipodocumento= await Tipodocumento.findByPk(id);
        
        if(!tipodocumento){
            return res.status(400).json({
                ok:false,
                msg: `No existe un tipodocumento con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            tipodocumento
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postTipodocumentos= async (req:Request,res:Response)=>{
        
    const { body } = req;
    try {
        const tipodocumento= Tipodocumento.build(body);
        await tipodocumento.save();
        res.json({
            ok:true,
            msg:'Tipodocumento creado exitosamente',
            tipodocumento
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putTipodocumentos= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;

    try {
        const tipodocumento:any = await Tipodocumento.findByPk(id);
        if(!tipodocumento){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un tipodocumento con el id: ${id}`
            });
        }
        await tipodocumento?.update(body);
        res.json({
            ok:true,
            msg:'Tipodocumento actualizado exitosamente',
            tipodocumento
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
    
}
export const deleteTipodocumentos= async (req:Request,res:Response)=>{
    
    const { id } = req.params;
    try {
        const tipodocumento:any = await Tipodocumento.findByPk(id);
        if(!tipodocumento){
            return res.status(400).json({
                ok:false,
                msg: `No existe un tipodocumento con el id: ${id}`
            });
        }
        await tipodocumento?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Tipodocumento eliminado exitosamente',
            tipodocumento
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}