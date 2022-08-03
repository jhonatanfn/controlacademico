import { Request, Response } from "express";
import Seccion from "../models/seccion";
import { Op } from 'sequelize';
import Aula from "../models/aula";


export const busquedaSecciones= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Seccion.findAll({
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


export const getTodo = async (req:Request,res:Response)=>{
    try {
        const secciones= await Seccion.findAll({
            where:{estado:true},
        });
        res.json({
            ok:true,
            secciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}


export const getSecciones= async (req:Request,res:Response)=>{

    const desde= Number(req.query.desde) || 0;

    try {
        const total=  (await Seccion.findAll({
            where:{estado:true}
        })).length;

        const secciones= await Seccion.findAll({
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
            secciones,
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

export const getSeccion= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const seccion= await Seccion.findByPk(id);
        
        if(!seccion){
            return res.status(400).json({
                ok:false,
                msg: `No existe una seccion con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            seccion
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const postSeccion= async (req:Request,res:Response)=>{
    const { body }= req;
    try {
        const seccion= Seccion.build(body);
        await seccion.save();
        res.json({
            ok:true,
            msg:'Seccion creado exitosamente',
            seccion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const putSeccion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;

    try {
        const seccion:any = await Seccion.findByPk(id);
        if(!seccion){
           return  res.status(400).json({
                ok:false,
                msg: `No existe una seccion con el id: ${id}`
            });
        }
        await seccion?.update(body);
        res.json({
            ok:true,
            msg:'Seccion actualizada exitosamente',
            seccion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteSeccion= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const seccion:any = await Seccion.findByPk(id);
        if(!seccion){
            return res.status(400).json({
                ok:false,
                msg: `No existe una seccion con el id: ${id}`
            });
        }
        await seccion?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Seccion eliminada exitosamente',
            seccion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const tieneAulas = async (req:Request,res:Response)=>{

    const { seccionId } = req.params;
    try {
        
        const aulas = await Aula.findAll({
            where:{
                estado: true,
                seccionId:seccionId
            }
        });
        if(aulas.length>0){
            return res.json({
                ok: true,
                msg: "No se puede eliminar la sección."
            })
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