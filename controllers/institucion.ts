import { Request, Response } from "express";
import Institucion from "../models/institucion";
import { handleHttpError } from "../utils/handleError";

export const getInstituciones= (req:Request,res:Response)=>{
    
}

export const getInstitucion= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const institucion= await Institucion.findByPk(id,{
            attributes:['id','nombre','direccion','telefono','email','img','departamento','provincia','distrito','centropoblado','dre','ugel','tipogestion','generoalumno','formaatencion','paginaweb','turnoatencion']
        });
        
        if(!institucion){
            return res.status(400).json({
                ok:false,
                msg: `No existe la institucion con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            institucion
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postInstitucion= async (req:Request,res:Response)=>{
        
    const { body }= req;
    try {
        const institucion= Institucion.build(body);
        await institucion.save();
        res.json({
            ok:true,
            msg:'Institucion creada exitosamente',
            institucion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }


}
export const putInstitucion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;
    try {
        const institucion:any = await Institucion.findByPk(id);
        if(!institucion){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un institucion con el id: ${id}`
            });
        }
        await institucion?.update(body);
        res.json({
            ok:true,
            msg:'Institucion actualizada exitosamente',
            institucion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteInstitucion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const institucion:any = await Institucion.findByPk(id);
        if(!institucion){
            return res.status(400).json({
                ok:false,
                msg: `No existe una institucion con el id: ${id}`
            });
        }
        await institucion?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Institucion eliminada exitosamente',
            institucion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}