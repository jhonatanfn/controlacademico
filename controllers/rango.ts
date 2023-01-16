import { Request, Response } from "express";
import Rango from "../models/rango";
import { Op } from 'sequelize';
import { handleHttpError } from "../utils/handleError";

export const getTodo=  async (req:Request,res:Response)=>{
    try {
        const rangos= await Rango.findAll({
            where:{estado:true},
            attributes: ['id','letra','inicio','fin','color','alias','situacion']
        });
        res.json({
            ok:true,
            rangos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getRangos= async (req:Request,res:Response)=>{
    const desde= Number(req.query.desde) || 0;
    try {
        const total=  (await Rango.findAll({
            where:{estado:true}
        })).length;
        const rangos= await Rango.findAll({
            where:{estado:true},
            order: [
                [ 
                    'letra', 'ASC'
                ]
            ],
            limit:5,
            offset:desde,
            attributes: ['id','letra','inicio','fin','color','alias','situacion']
        });
        res.json({
            ok:true,
            rangos,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getRango= async (req:Request,res:Response)=>{
    const { id }= req.params;
    try {
        const rango= await Rango.findByPk(id);
        if(!rango){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rango con el id: ${id}`
            });
        }
        res.json({
            ok:true,
            rango
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postRango= async (req:Request,res:Response)=>{
        
    const { body }= req;
    try {
        const rango= Rango.build(body);
        await rango.save();
        res.json({
            ok:true,
            msg:'Rango creado exitosamente',
            rango
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putRango= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;
    try {
        const rango:any = await Rango.findByPk(id);
        if(!rango){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un rango con el id: ${id}`
            });
        }
        await rango?.update(body);
        res.json({
            ok:true,
            msg:'Rango actualizado exitosamente',
            rango
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteRango= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const rango:any = await Rango.findByPk(id);
        if(!rango){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rango con el id: ${id}`
            });
        }
        await rango?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Rango eliminado exitosamente',
            rango
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaRangos= async (req:Request,res:Response)=>{
    const { valor }= req.params;
    try {
        const data= await Rango.findAll({
            where:{
                letra:{
                    [Op.like]:`%${valor}%`
                },
                estado: true
            },
            attributes: ['id','letra','inicio','fin','color','alias','situacion']
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
