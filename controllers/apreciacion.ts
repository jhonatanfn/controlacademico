import { Request, Response } from "express";
import { Op } from 'sequelize';
import Alumno from "../models/alumno";
import Apreciacion from "../models/apreciacion";
import Periodo from "../models/periodo";
import Persona from "../models/persona";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const apreciaciones = await Apreciacion.findAll({
            where: {
                estado: true
            },
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
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciones
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getApreciaciones = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Apreciacion.findAll({
            where: { estado: true },
            attributes: ['id']
        })).length;

        const apreciaciones = await Apreciacion.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ],
        });
        res.json({
            ok: true,
            apreciaciones,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getApreciacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const apreciacion: any = await Apreciacion.findByPk(id, {
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
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ],
        });
        if (!apreciacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciacion con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            apreciacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postApreciacion = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const apreciacion = Apreciacion.build(body);
        await apreciacion.save();
        res.json({
            ok: true,
            msg: 'Apreciacion creada exitosamente',
            apreciacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putApreciacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const apreciacion: any = await Apreciacion.findByPk(id);
        if (!apreciacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciacion con el id: ${id}`
            });
        }
        await apreciacion?.update(body);
        res.json({
            ok: true,
            msg: 'Apreciacion actualizada exitosamente',
            apreciacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteApreciacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const apreciacion: any = await Apreciacion.findByPk(id);
        if (!apreciacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciacion con el id: ${id}`
            });
        }
        await apreciacion?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Apreciacion eliminada exitosamente',
            apreciacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaApreciaciones = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Apreciacion.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
            },
            include: [
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

export const getApreciacionesPeriodoAlumno = async (req: Request, res: Response) => {
    const { periodoId, alumnoId } = req.params;
    try {
        const apreciaciones = await Apreciacion.findAll({
            where: {
                estado: true,
                periodoId: periodoId,
                alumnoId: alumnoId
            },
            attributes: ['id'],
        });
        res.json({
            ok: true,
            apreciaciones
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}