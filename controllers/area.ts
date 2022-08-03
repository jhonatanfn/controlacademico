import { Request, Response } from "express";
import { Op } from 'sequelize';
import Area from '../models/area';
import Subarea from "../models/subarea";

export const getTodo=async (req:Request,res:Response)=>{

    try {
        const areas= await Area.findAll({
            where:{estado:true}
        });
        res.json({
            ok:true,
            areas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}


export const getAreas= async (req:Request, res:Response)=>{

    const desde= Number(req.query.desde) || 0;

    try {
        const total=  (await Area.findAll({
            where:{estado:true}
        })).length;

        const areas= await Area.findAll({
            where:{estado:true},
            order: [
                [ 
                    'nombre', 'ASC'
                ]
            ],
            limit:5,
            offset:desde,
            include:[{
                model: Subarea,
                as:'subareas'
            }],
        });
        res.json({
            ok: true,
            areas,
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

export const getArea= async(req:Request, res:Response)=>{

    const { id } = req.params;
    try {
        const area:any = await Area.findByPk(id,{
            include:[{
                model: Subarea,
                as:'subareas',
                attributes:['id','nombre']
            }],
        });
        if(!area){
            return res.status(400).json({
                ok:false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            area
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}


export const postArea= async (req:Request, res:Response)=>{

    const { body } = req;

    try {
        const area= Area.build(body);
        await area.save();
        res.json({
            ok:true,
            msg:'Area creada exitosamente',
            area
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const putArea= async (req:Request, res:Response)=>{
    
    const { id } = req.params;
    const { body }= req;
    
    try {

        const area:any = await Area.findByPk(id);
        if(!area){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        await area?.update(body);
        res.json({
            ok:true,
            msg:'Area actualizada exitosamente',
            area
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}


export const deleteArea= async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
        const area:any = await Area.findByPk(id);
        if(!area){
            return res.status(400).json({
                ok:false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        await area?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Area eliminada exitosamente',
            area
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const busquedaAreas= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Area.findAll({
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
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}

export const tieneSubareas = async (req:Request,res:Response)=>{

    const { areaId }= req.params;
    try {

        const subareas= await Subarea.findAll({
            where:{
                estado: true,
                areaId: areaId
            }
        });

        if(subareas.length>0){
            return res.json({
                ok: true,
                msg: "No se puede eliminar el area"
            });
        }
        res.json({
            ok: false
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
