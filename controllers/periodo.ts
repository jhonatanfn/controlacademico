import { Request, Response } from "express";
import Periodo from "../models/periodo";
import { Op } from 'sequelize';
import Programacion from "../models/programacion";

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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
