import { Request, Response } from "express";
import { Op } from 'sequelize';
import Aula from "../models/aula";
import Grado from "../models/grado";
import Nivel from "../models/nivel";
import Programacion from "../models/programacion";
import Seccion from "../models/seccion";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req:Request,res:Response)=>{
    try {
        const aulas= await Aula.findAll({
            where:{estado:true},
            attributes:['id','nombre','tipovalor'],
            include:[
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes:['id','nombre'],
                },
                {
                    model:Grado,
                    as: 'grado',
                    attributes:['id','nombre'],
                },
                {
                    model: Seccion,
                    as: 'seccion',
                    attributes:['id','nombre'],
                }
            ]
        });
        res.json({
            ok:true,
            aulas
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


export const getAulas= async (req:Request,res:Response)=>{

    const desde= Number(req.query.desde) || 0;

    try {
        const total=  (await Aula.findAll({
            where:{estado:true}
        })).length;

        const aulas= await Aula.findAll({
            where:{estado:true},
            order: [
                [ 
                    'id', 'ASC'
                ]
            ],
            limit:5,
            offset:desde,
            attributes:['id','nombre','tipovalor'],
            include:[
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes:['id','nombre'],
                    required: false
                },
                {
                    model:Grado,
                    as: 'grado',
                    attributes:['id','nombre'],
                    required: false
                },
                {
                    model: Seccion,
                    as: 'seccion',
                    attributes:['id','nombre'],
                    required:false
                }
            ]
        });
        res.json({
            ok:true,
            aulas,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getAulaPorNivelGradoSeccion= async (req:Request,res:Response)=>{
    const { nivel,grado,seccion }= req.params;

    try {
        
        const aula:any= await Aula.findOne({
            where:{
                estado:true,
                nivelId:nivel,
                gradoId:grado,
                seccionId:seccion
            },
            include:[
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes:['id','nombre','tipovalor'],
                    required: false
                },
                {
                    model:Grado,
                    as: 'grado',
                    attributes:['id','nombre'],
                    required: false
                },
                {
                    model: Seccion,
                    as: 'seccion',
                    attributes:['id','nombre'],
                    required:false
                }
            ]

        });
        
        if(!aula){
            return res.status(400).json({
                ok:false,
                msg: `No existe una aula con esos parametros`
            });
        }
        res.json({
            ok:true,
            aula
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


export const getAula= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const aula:any= await Aula.findByPk(id,{
            attributes:['id','nombre','tipovalor'],
            include:[
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes:['id','nombre'],
                    required: false
                },
                {
                    model:Grado,
                    as: 'grado',
                    attributes:['id','nombre'],
                    required: false
                },
                {
                    model: Seccion,
                    as: 'seccion',
                    attributes:['id','nombre'],
                    required:false
                }
            ]

        });
        
        if(!aula || aula.estado==false){
            return res.status(400).json({
                ok:false,
                msg: `No existe una aula con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            aula
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postAula= async (req:Request,res:Response)=>{
    const { body } = req;

    try {
        const aula= Aula.build(body);
        await aula.save();
        res.json({
            ok:true,
            msg:'Aula creada exitosamente',
            aula
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putAula= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;
    
    try {

        const aula:any = await Aula.findByPk(id);
        if(!aula){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un aula con el id: ${id}`
            });
        }
        await aula?.update(body);
        res.json({
            ok:true,
            msg:'Aula actualizada exitosamente',
            aula
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteAula= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const aula:any = await Aula.findByPk(id);
        if(!aula){
            return res.status(400).json({
                ok:false,
                msg: `No existe un aula con el id: ${id}`
            });
        }
        await aula?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Aula eliminada exitosamente',
            aula
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const busquedaAulas= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Aula.findAll({
            where:{
                nombre:{
                    [Op.like]:`%${valor}%`
                },
                estado: true
            },
            include:[
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes:['id','nombre'],
                },
                {
                    model:Grado,
                    as: 'grado',
                    attributes:['id','nombre'],
                },
                {
                    model: Seccion,
                    as: 'seccion',
                    attributes:['id','nombre'],
                }
            ]
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
export const tieneProgramaciones = async (req:Request,res:Response)=>{

    const { aulaId } = req.params;
    try {
        
        const programaciones = await Programacion.findAll({
            where:{
                estado: true,
                aulaId:aulaId
            }
        });
        if(programaciones.length>0){
            return res.json({
                ok: true,
                msg: "No se puede eliminar el aula."
            })
        }
        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}

export const busquedaAulasTotal= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Aula.findAll({
            where:{
                [Op.or]: [
                    {
                        '$nivel.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$grado.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$seccion.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        nombre:{
                            [Op.like]:`%${valor}%`
                        },
                    }
                ],
                estado: true
            },
            include:[
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes:['id','nombre'],
                },
                {
                    model:Grado,
                    as: 'grado',
                    attributes:['id','nombre'],
                },
                {
                    model: Seccion,
                    as: 'seccion',
                    attributes:['id','nombre'],
                }
            ]
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

export const existeAula= async (req:Request,res:Response)=>{
    try {
        const aula= await Aula.findOne({
            where:{
                nivelId: req.params.nivelId,
                gradoId: req.params.gradoId,
                seccionId: req.params.seccionId,
            },
            attributes:['id'],
        });
        if(aula){
            return res.json({
                ok:true,
                msg: `Ya existe el aula`
            });
        }
        res.json({
            ok:false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const existeAulaEditar= async (req:Request,res:Response)=>{
    try {
        const aula= await Aula.findOne({
            where:{
                nivelId: req.params.nivelId,
                gradoId: req.params.gradoId,
                seccionId: req.params.seccionId,
                id:{
                    [Op.ne]: req.params.idAula
                }
            },
            attributes:['id'],
        });
        if(aula){
            return res.json({
                ok:true,
                msg: `Ya existe el aula`
            });
        }
        res.json({
            ok:false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}