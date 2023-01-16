import { Request, Response } from "express";
import Periodo from "../models/periodo";
import { Op } from 'sequelize';
import Programacion from "../models/programacion";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {

    try {
        const periodos = await Periodo.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            periodos
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


export const getPeriodos = async (req: Request, res: Response) => {

    try {
        const periodos = await Periodo.findAll({
            attributes: ['id', 'nombre','fechainicial','fechafinal'],
            where: { estado: true }
        });
        res.json({
            ok: true,
            periodos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getPeriodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const periodo = await Periodo.findByPk(id);

        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            periodo
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getPeriodoNombre = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    try {
        const periodo = await Periodo.findOne({
           where:{
            estado: true,
            nombre: nombre
           },
           attributes:['id','nombre','fechainicial','fechafinal']
        });

        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el nombre: ${nombre}`
            });
        }

        res.json({
            ok: true,
            periodo
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const postPeriodo = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const periodo = Periodo.build(body);
        await periodo.save();
        res.json({
            ok: true,
            msg: 'Periodo creado exitosamente',
            periodo
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putPeriodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const periodo: any = await Periodo.findByPk(id);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${id}`
            });
        }
        await periodo?.update(body);
        res.json({
            ok: true,
            msg: 'Periodo actualizado exitosamente',
            periodo
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deletePeriodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const periodo: any = await Periodo.findByPk(id);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${id}`
            });
        }
        await periodo?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Periodo eliminado exitosamente',
            periodo
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const busquedaPeriodos = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Periodo.findAll({
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

export const tieneProgramaciones = async (req: Request, res: Response) => {
    const { periodoId } = req.params;
    try {
        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                periodoId: periodoId
            }
        });
        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el periodo."
            })
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
