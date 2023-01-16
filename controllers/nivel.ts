import { Request, Response } from "express";
import Nivel from "../models/nivel";
import Aula from "../models/aula";
import { Op } from 'sequelize';
import { handleHttpError } from "../utils/handleError";

export const getTodo=  async (req:Request,res:Response)=>{

    try {
        const niveles= await Nivel.findAll({
            where:{estado:true}
        });
        res.json({
            ok:true,
            niveles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getNiveles= async (req:Request,res:Response)=>{
    const desde= Number(req.query.desde) || 0;
    try {
        const total=  (await Nivel.findAll({
            where:{estado:true}
        })).length;
        const niveles= await Nivel.findAll({
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
            niveles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getNivel= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const nivel= await Nivel.findByPk(id);
        
        if(!nivel){
            return res.status(400).json({
                ok:false,
                msg: `No existe un nivel con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            nivel
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postNivel= async (req:Request,res:Response)=>{
        
    const { body }= req;
    try {
        const nivel= Nivel.build(body);
        await nivel.save();
        res.json({
            ok:true,
            msg:'Nivel creado exitosamente',
            nivel
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putNivel= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;

    try {
        const nivel:any = await Nivel.findByPk(id);
        if(!nivel){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un nivel con el id: ${id}`
            });
        }
        await nivel?.update(body);
        res.json({
            ok:true,
            msg:'Nivel actualizado exitosamente',
            nivel
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteNivel= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const nivel:any = await Nivel.findByPk(id);
        if(!nivel){
            return res.status(400).json({
                ok:false,
                msg: `No existe un nivel con el id: ${id}`
            });
        }
        await nivel?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Nivel eliminado exitosamente',
            nivel
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const busquedaNiveles= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Nivel.findAll({
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

export const tieneAulas = async (req:Request,res:Response)=>{

    const { nivelId } = req.params;
    try {
        
        const aulas = await Aula.findAll({
            where:{
                estado: true,
                nivelId:nivelId
            }
        });
        if(aulas.length>0){
            return res.json({
                ok: true,
                msg: "No se puede eliminar el nivel."
            })
        }
        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const nombreRepetido = async (req: Request, res: Response) => {
    const { nivelNombre } = req.params;
    try {
        const nivel = await Nivel.findOne({
            where: {
                estado: true,
                nombre: {
                    [Op.like]: `%${nivelNombre}%`
                }
            },
            attributes: ['id']
        });
        if(nivel){
            return res.json({
                ok: true
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const nombreRepetidoEditar = async (req: Request, res: Response) => {
    const { nivelId,nivelNombre } = req.params;
    try {
        const nivel = await Nivel.findOne({
            where: {
                estado: true,
                nombre: {
                    [Op.like]: `%${nivelNombre}%`
                },
                id:{
                    [Op.ne]: nivelId
                }
            },
            attributes: ['id']
        });
        if(nivel){
            return res.json({
                ok: true
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}