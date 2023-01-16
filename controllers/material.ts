import { Request, Response } from "express";
import { Op } from 'sequelize';
import Area from "../models/area";
import Aula from "../models/aula";
import Docente from "../models/docente";
import Grado from "../models/grado";
import Material from "../models/material";
import Nivel from "../models/nivel";
import Periodo from "../models/periodo";
import Persona from "../models/persona";
import Programacion from "../models/programacion";
import Seccion from "../models/seccion";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {

    try {
        const materiales = await Material.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            materiales
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMateriales = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Material.findAll({
            where: { estado: true }
        })).length;

        const materiales = await Material.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [{
                model: Programacion,
                as: 'programacion',
                include: [
                    {
                        model: Periodo,
                        as: 'periodo'
                    },
                    
                    {
                        model: Aula,
                        as: 'aula',
                        include: [
                            {
                                model: Nivel,
                                as: 'nivel'
                            },
                            {
                                model: Grado,
                                as: 'grado'
                            },
                            {
                                model: Seccion,
                                as: 'seccion'
                            }
                        ]
                    },
                    {
                        model: Docente,
                        as: 'docente',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            }],
        });
        res.json({
            ok: true,
            materiales,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const material: any = await Material.findByPk(id, {
            include: [{
                model: Programacion,
                as: 'programacion',
                include: [
                    {
                        model: Periodo,
                        as: 'periodo'
                    },
                    
                    {
                        model: Aula,
                        as: 'aula',
                        include: [
                            {
                                model: Nivel,
                                as: 'nivel'
                            },
                            {
                                model: Grado,
                                as: 'grado'
                            },
                            {
                                model: Seccion,
                                as: 'seccion'
                            }
                        ]
                    },
                    {
                        model: Docente,
                        as: 'docente',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            }],
        });
        if (!material || material.estado== false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            material
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postMaterial = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const material = Material.build(body);
        await material.save();
        res.json({
            ok: true,
            msg: 'Material guardado exitosamente',
            material
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const material: any = await Material.findByPk(id);
        if (!material || material.estado==false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        if(!body.archivo){
            delete body.archivo;
        }
        await material?.update(body);
        res.json({
            ok: true,
            msg: 'Material actualizado exitosamente',
            material
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const material: any = await Material.findByPk(id);
        if (!material || material.estado== false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        await material?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Material eliminado exitosamente',
            material
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMaterialesProgramacion= async (req: Request, res: Response)=>{

    const { programacion} = req.params;
    const desde = Number(req.query.desde) || 0;
    try {

        const total=  (await Material.findAll({
            where:{estado:true,programacionId: programacion}
        })).length;

        const materiales = await Material.findAll({
            where: { 
                estado: true, 
                programacionId: programacion
            },
            limit: 6,
            offset: desde,
            include: [{
                model: Programacion,
                as: 'programacion',
                include: [
                    {
                        model: Periodo,
                        as: 'periodo'
                    },
                    
                    {
                        model: Aula,
                        as: 'aula',
                        include: [
                            {
                                model: Nivel,
                                as: 'nivel'
                            },
                            {
                                model: Grado,
                                as: 'grado'
                            },
                            {
                                model: Seccion,
                                as: 'seccion'
                            }
                        ]
                    },
                    {
                        model: Docente,
                        as: 'docente',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            }]
        });
        res.json({
            ok: true,
            materiales,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaMateriales = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Material.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [{
                model: Programacion,
                as: 'programacion',
                include: [
                    {
                        model: Periodo,
                        as: 'periodo'
                    },
                    
                    {
                        model: Aula,
                        as: 'aula',
                        include: [
                            {
                                model: Nivel,
                                as: 'nivel'
                            },
                            {
                                model: Grado,
                                as: 'grado'
                            },
                            {
                                model: Seccion,
                                as: 'seccion'
                            }
                        ]
                    },
                    {
                        model: Docente,
                        as: 'docente',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            }],
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const materialesProgramacion= async (req: Request, res: Response)=>{

    const { programacionId } = req.params;
    const desde = Number(req.query.desde) || 0;

    try {
        const total = (await Material.findAll({
            where: { estado: true, programacionId:programacionId},
        })).length;

        const materiales= await Material.findAll({
            where: { estado: true, programacionId:programacionId},
            limit: 5,
            offset: desde,
            include: [{
                model: Programacion,
                as: 'programacion',
                include: [
                    {
                        model: Periodo,
                        as: 'periodo'
                    },
                    
                    {
                        model: Aula,
                        as: 'aula',
                        include: [
                            {
                                model: Nivel,
                                as: 'nivel'
                            },
                            {
                                model: Grado,
                                as: 'grado'
                            },
                            {
                                model: Seccion,
                                as: 'seccion'
                            }
                        ]
                    },
                    {
                        model: Docente,
                        as: 'docente',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            }],
        });
        res.json({
            ok: true,
            materiales,
            desde,
            total
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaMaterialesProgramacion = async (req: Request, res: Response) => {

    const { valor, programacionId } = req.params;
    try {
        const data = await Material.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${valor}%`
                },
                estado: true,
                programacionId:programacionId
            },
            include: [{
                model: Programacion,
                as: 'programacion',
                include: [
                    {
                        model: Periodo,
                        as: 'periodo'
                    },
                   
                    {
                        model: Aula,
                        as: 'aula',
                        include: [
                            {
                                model: Nivel,
                                as: 'nivel'
                            },
                            {
                                model: Grado,
                                as: 'grado'
                            },
                            {
                                model: Seccion,
                                as: 'seccion'
                            }
                        ]
                    },
                    {
                        model: Docente,
                        as: 'docente',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            }],
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}