import { Request, Response } from "express";
import { Op } from 'sequelize';
import Area from "../models/area";
import Programacion from "../models/programacion";
import Subarea from '../models/subarea';


export const getTodo = async (req: Request, res: Response) => {

    try {
        const subareas = await Subarea.findAll({
            where: { estado: true },
            include: [
                {
                    model: Area,
                    as: 'area'
                }
            ]
        });
        res.json({
            ok: true,
            subareas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}


export const getSubareas = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;

    try {
        const total = (await Subarea.findAll({
            where: { estado: true }
        })).length;

        const subareas = await Subarea.findAll({
            where: { estado: true },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: {
                model: Area,
                as: 'area',
                attributes: ['id', 'nombre']
            },
            attributes: ['id', 'nombre']
        });
        res.json({
            ok: true,
            subareas,
            desde,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}

export const getSubarea = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subarea: any = await Subarea.findByPk(id);
        if (!subarea) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un subarea con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Subarea encontrada exitosamente',
            subarea
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}


export const getSubareasArea = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {

        const area = await Area.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        const subareas = await Subarea.findAll({
            where: {
                estado: true,
                areaId: id
            },
            include: [
                {
                    model: Area,
                    as: 'area'
                }
            ]
        });
        res.json({
            ok: true,
            subareas
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}

export const postSubarea = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        const subarea = Subarea.build(body);
        await subarea.save();
        res.json({
            ok: true,
            msg: 'Subarea creada exitosamente',
            subarea
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}

export const putSubarea = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const subarea: any = await Subarea.findByPk(id);
        if (!subarea) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un subarea con el id: ${id}`
            });
        }
        await subarea?.update(body);
        res.json({
            ok: true,
            msg: 'Subarea actualizada exitosamente',
            subarea
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}


export const deleteSubarea = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subarea: any = await Subarea.findByPk(id);
        if (!subarea) {
            res.status(400).json({
                ok: false,
                msg: `No existe un subarea con el id: ${id}`
            });
        }
        await subarea?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Subarea eliminada exitosamente',
            subarea
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}

export const busquedaSubareas = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Subarea.findAll({
            where: {
                [Op.or]: [
                    {
                        nombre: {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: Area,
                    as: 'area',

                }
            ]
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}


export const tieneProgramaciones = async (req: Request, res: Response) => {

    const { subareaId } = req.params;

    try {

        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                subareaId: subareaId
            }
        });
        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la subarea"
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}