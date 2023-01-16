import { Request, Response } from "express";
import Situacion from "../models/situacion";
import { Op } from 'sequelize';
import { handleHttpError } from "../utils/handleError";

export const getTodo=  async (req:Request,res:Response)=>{

    try {
        const situaciones= await Situacion.findAll({
            where:{estado:true}
        });
        res.json({
            ok:true,
            situaciones
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getSituaciones= async (req:Request,res:Response)=>{
    const desde= Number(req.query.desde) || 0;
    try {
        const total=  (await Situacion.findAll({
            where:{estado:true}
        })).length;
        const situaciones= await Situacion.findAll({
            where:{estado:true},
            order: [
                [ 
                    'nombre', 'ASC'
                ]
            ],
            limit:5,
            offset:desde,
        });
        res.json({
            ok:true,
            situaciones,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getSituacion= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const situacion= await Situacion.findByPk(id);
        
        if(!situacion){
            return res.status(400).json({
                ok:false,
                msg: `No existe la situacion con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            situacion
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postSituacion= async (req:Request,res:Response)=>{
        
    const { body }= req;
    try {
        const situacion= Situacion.build(body);
        await situacion.save();
        res.json({
            ok:true,
            msg:'Situacion creada exitosamente',
            situacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putSituacion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;

    try {
        const situacion:any = await Situacion.findByPk(id);
        if(!situacion){
           return  res.status(400).json({
                ok:false,
                msg: `No existe la situacion con el id: ${id}`
            });
        }
        await situacion?.update(body);
        res.json({
            ok:true,
            msg:'Situacion actualizado exitosamente',
            situacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteSituacion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const situacion:any = await Situacion.findByPk(id);
        if(!situacion){
            return res.status(400).json({
                ok:false,
                msg: `No existe una situacion con el id: ${id}`
            });
        }
        await situacion?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Situacion eliminada exitosamente',
            situacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const busquedaSituaciones= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Situacion.findAll({
            where:{
                nombre:{
                    [Op.like]:`%${valor}%`
                },
                estado: true
            }
        });
        res.json({
            ok:true,
            total:data.length,
            busquedas:data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}