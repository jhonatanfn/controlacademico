import { Request, Response } from "express";
import Hora from "../models/hora";
import { Op } from 'sequelize';
import Horario from "../models/horario";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const horas = await Hora.findAll({
            where: { estado: true },
            attributes: ['id','nombre','inicio','fin','tipo','estado']
        });
        res.json({
            ok: true,
            horas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getHoras = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Hora.findAll({
            where: { estado: true }
        })).length;
        const horas = await Hora.findAll({
            where: { estado: true },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id','nombre','inicio','fin','tipo','estado']
        });
        res.json({
            ok: true,
            horas,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getHora = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hora = await Hora.findByPk(id);
        if (!hora) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una hora con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            hora
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postHora = async (req: Request, res: Response) => {

    const { body } = req;
    try {
        const hora = Hora.build(body);
        await hora.save();
        res.json({
            ok: true,
            msg: 'Hora creada exitosamente',
            hora
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putHora = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const hora: any = await Hora.findByPk(id);
        if (!hora) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una hora con el id: ${id}`
            });
        }
        await hora?.update(body);
        res.json({
            ok: true,
            msg: 'Hora actualizada exitosamente',
            hora
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteHora = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hora: any = await Hora.findByPk(id);
        if (!hora) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una hora con el id: ${id}`
            });
        }
        await hora?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Hora eliminada exitosamente',
            hora
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaHoras = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Hora.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            },
            attributes: ['id','nombre','inicio','fin','tipo','estado']
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
export const tieneHorarios = async (req: Request, res: Response) => {

    const { horaId } = req.params;
    try {
        const horarios = await Horario.findAll({
            where: {
                estado: true,
                horaId: horaId
            }
        });
        if (horarios.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la hora."
            })
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}