import { Request, Response } from "express";
import Grado from "../models/grado";
import { Op } from 'sequelize';
import Aula from "../models/aula";


export const busquedaGrados= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Grado.findAll({
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


export const getTodo= async (req:Request,res:Response)=>{

    try {
        const grados= await Grado.findAll({
            where:{estado:true}
        });
        res.json({
            ok:true,
            grados
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}


export const getGrados= async (req:Request,res:Response)=>{
    const desde= Number(req.query.desde) || 0;
    try {
        const total=  (await Grado.findAll({
            where:{estado:true}
        })).length;

        const grados= await Grado.findAll({
            where:{estado:true},
            order: [
                [ 
                    'id', 'ASC'
                ]
            ],
            limit:5,
            offset:desde,
        });
        res.json({
            ok:true,
            grados,
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

export const getGrado= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const grado= await Grado.findByPk(id);
        
        if(!grado){
            return res.status(400).json({
                ok:false,
                msg: `No existe un grado con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            grado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const postGrado= async (req:Request,res:Response)=>{
    const { body }= req;
    try {
        const grado= Grado.build(body);
        await grado.save();
        res.json({
            ok:true,
            msg:'Grado creado exitosamente',
            grado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const putGrado= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;

    try {
        const grado:any = await Grado.findByPk(id);
        if(!grado){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un grado con el id: ${id}`
            });
        }
        await grado?.update(body);
        res.json({
            ok:true,
            msg:'Grado actualizado exitosamente',
            grado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteGrado= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const grado:any = await Grado.findByPk(id);
        if(!grado){
            return res.status(400).json({
                ok:false,
                msg: `No existe un grado con el id: ${id}`
            });
        }
        await grado?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Grado eliminado exitosamente',
            grado
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

    const { gradoId } = req.params;
    try {
        
        const aulas = await Aula.findAll({
            where:{
                estado: true,
                gradoId:gradoId
            }
        });
        if(aulas.length>0){
            return res.json({
                ok: true,
                msg: "No se puede eliminar el grado."
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