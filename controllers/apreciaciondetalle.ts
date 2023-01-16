import { Request, Response } from "express";
import Apreciaciondetalle from "../models/apreciaciondetalle";
import { Op } from 'sequelize';
import Apreciacion from "../models/apreciacion";
import Periodo from "../models/periodo";
import Alumno from "../models/alumno";
import Persona from "../models/persona";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const apreciaciondetalles = await Apreciaciondetalle.findAll({
            where: { estado: true },
            include: [
                {
                    model: Apreciacion,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciondetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getApreciaciondetalles = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Apreciaciondetalle.findAll({
            where: { estado: true }
        })).length;
        const niveles = await Apreciaciondetalle.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Apreciacion,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            niveles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getApreciaciondetalle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const apreciaciondetalle = await Apreciaciondetalle.findByPk(id);

        if (!apreciaciondetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciaciondetalle con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            apreciaciondetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postApreciaciondetalle = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const apreciaciondetalle = Apreciaciondetalle.build(body);
        await apreciaciondetalle.save();
        res.json({
            ok: true,
            msg: 'Apreciaciondetalle creada exitosamente',
            apreciaciondetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putApreciaciondetalle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const apreciaciondetalle: any = await Apreciaciondetalle.findByPk(id);
        if (!apreciaciondetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciaciondetalle con el id: ${id}`
            });
        }
        await apreciaciondetalle?.update(body);
        res.json({
            ok: true,
            msg: 'Apreciaciondetalle actualizado exitosamente',
            apreciaciondetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteApreciaciondetalle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const apreciaciondetalle: any = await Apreciaciondetalle.findByPk(id);
        if (!apreciaciondetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciaciondetalle con el id: ${id}`
            });
        }
        await apreciaciondetalle?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Apreciaciondetalle eliminada exitosamente',
            apreciaciondetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const busquedaApreciaciondetalles = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Apreciaciondetalle.findAll({
            where: {
                [Op.or]: [
                    {
                        '$apreciacion.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$apreciacion.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$apreciacion.alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: Apreciacion,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
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

export const getApreciaciondetallesPeriodoAlumno = async (req: Request, res: Response) => {
    try {
        const apreciaciondetalles = await Apreciaciondetalle.findAll({
            where: {
                estado: true,
                '$apreciacion.periodo.id$': req.params.periodoId,
                '$apreciacion.alumno.id$': req.params.alumnoId,
                '$apreciacion.estado$': true
            },
            order: [
                ['nombre', 'ASC']
            ],
            include: [
                {
                    model: Apreciacion,
                    as: 'apreciacion',
                    attributes: ['id', 'estado'],
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciondetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getApreciaciondetallesApreciacion = async (req: Request, res: Response) => {
    try {
        const apreciaciondetalles = await Apreciaciondetalle.findAll({
            where: {
                estado: true,
                apreciacionId: req.params.apreciacionId
            },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            attributes: ['id', 'nombre', 'descripcion', 'responsabilidad', 'firma'],
            include: [
                {
                    model: Apreciacion,
                    as: 'apreciacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciondetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
