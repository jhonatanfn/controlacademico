import { Request, Response } from "express";
import { Op } from 'sequelize';
import Area from '../models/area';
import Competencia from "../models/competencia";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {

    try {
        const areas = await Area.findAll({
            where: {
                estado: true
            },
            attributes: ['id', 'nombre', 'estado']
        });
        res.json({
            ok: true,
            areas
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getTodoCompetencias = async (req: Request, res: Response) => {

    try {
        const areas = await Area.findAll({
            where: {
                estado: true
            },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                }
            ]
        });
        res.json({
            ok: true,
            areas
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getAreas = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Area.findAll({
            where: { estado: true },
            attributes: ['id', 'nombre', 'estado']
        })).length;

        const areas = await Area.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'nombre', 'estado'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                }
            ],
        });
        res.json({
            ok: true,
            areas,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getArea = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const area: any = await Area.findByPk(id, {
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                }
            ],
        });
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            area
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postArea = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const area = Area.build(body);
        await area.save();
        res.json({
            ok: true,
            msg: 'Area creada exitosamente',
            area
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putArea = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const area: any = await Area.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        await area?.update(body);
        res.json({
            ok: true,
            msg: 'Area actualizada exitosamente',
            area
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteArea = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const area: any = await Area.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        await area?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Area eliminada exitosamente',
            area
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaAreas = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Area.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            }
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
export const getCompetenciasArea = async (req: Request, res: Response) => {
    const { areaId } = req.params;
    try {
        const competencias = await Competencia.findAll({
            where: {
                estado: true,
                areaId: areaId
            },
            attributes: ['id']
        });
        if (competencias.length > 0) {
            return res.json({
                ok: true,
                msg: 'No se puede eliminar el area.'
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const nombreRepetido = async (req: Request, res: Response) => {
    const { areaNombre } = req.params;
    try {
        const area = await Area.findOne({
            where: {
                estado: true,
                nombre: {
                    [Op.like]: `%${areaNombre}%`
                }
            },
            attributes: ['id']
        });
        if (area) {
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
    const { areaId, areaNombre } = req.params;
    try {
        const area = await Area.findOne({
            where: {
                estado: true,
                nombre: {
                    [Op.like]: `%${areaNombre}%`
                },
                id: {
                    [Op.ne]: areaId
                }
            },
            attributes: ['id']
        });
        if (area) {
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