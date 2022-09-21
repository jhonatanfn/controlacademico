import { Request, Response } from "express";
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento";

export const getPersonas = async (req: Request, res: Response) => {

    try {
        const personas = await Persona.findAll({
            where: {
                estado: true
            },
            include: {
                model: Tipodocumento,
                as: 'tipodocumento',
                attributes: ['id', 'nombre']
            },
        });
        res.json({
            ok: true,
            personas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}

export const getPersona = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const persona: any = await Persona.findByPk(id, {
            include: {
                model: Tipodocumento,
                as: 'tipodocumento',
                attributes: ['id', 'nombre']
            },
        });
        if (!persona || persona.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Persona encontrada',
            persona
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}

export const postPersona = async (req: Request, res: Response) => {

    const { body } = req;
    try {

        const dni = await Persona.findOne({
            where: {
                dni: body.dni
            }
        });
        if (dni) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe una persona con el dni: ${body.dni}`
            });
        }
        const persona: any = Persona.build(body);
        await persona.save();
        res.json({
            ok: true,
            msg: "Persona creada exitosamente",
            persona
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const putPersona = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const persona: any = await Persona.findByPk(id, {
            include: {
                model: Tipodocumento,
                as: 'tipodocumento'
            }
        });
        if (!persona || persona.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }

        if (persona.dni === body.dni) {
            delete body.numero;
        } else {
            const dni = await Persona.findOne({
                where: {
                    dni: body.dni
                }
            });
            if (dni) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe una persona con el dni: ${body.dni}`
                });
            }
        }
        await persona?.update(body);
        res.json({
            ok: true,
            msg: "Persona actualizada exitosamente",
            persona
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deletePersona = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const persona: any = await Persona.findByPk(id);
        if (!persona || persona.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }
        await persona?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Persona eliminada exitosamente',
            persona
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}