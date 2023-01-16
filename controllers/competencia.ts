import { Request, Response } from "express";
import { Op } from 'sequelize';
import Area from "../models/area";
import Competencia from "../models/competencia";
import Nota from "../models/nota";
import { handleHttpError } from "../utils/handleError";

export const busquedaCompetencias = async (req: Request, res: Response) => {
    const { valor } = req.params;
    try {
        const data = await Competencia.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        descripcion: {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre'],
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
export const getTodo = async (req: Request, res: Response) => {
    try {
        const competencias = await Competencia.findAll({
            where: { estado: true },
            include: [
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            competencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getCompetencias = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Competencia.findAll({
            where: { estado: true }
        })).length;
        const competencias = await Competencia.findAll({
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
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            competencias,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getCompetencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const competencia = await Competencia.findByPk(id, {
            include: [
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                },
            ]
        });
        if (!competencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una competencia con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            competencia
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postCompetencia = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const competencia = Competencia.build(body);
        await competencia.save();
        res.json({
            ok: true,
            msg: 'Competencia creada exitosamente',
            competencia
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putCompetencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const competencia: any = await Competencia.findByPk(id);
        if (!competencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una competencia con el id: ${id}`
            });
        }
        await competencia?.update(body);
        res.json({
            ok: true,
            msg: 'Competencia actualizada exitosamente',
            competencia
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteCompetencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const competencia: any = await Competencia.findByPk(id);
        if (!competencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una competencia con el id: ${id}`
            });
        }
        await competencia?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Competencia eliminada exitosamente',
            competencia
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getCompetenciasPorArea = async (req: Request, res: Response) => {
    try {
        const competencias = await Competencia.findAll({
            where: {
                estado: true,
                areaId: req.params.areaId
            },
            attributes: ['id', 'descripcion'],
            include: [
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            competencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getExistenNotas = async (req: Request, res: Response) => {
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                competenciaId: req.params.competenciaId
            },
            attributes: ['id']
        });
        if (notas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la competencia"
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
