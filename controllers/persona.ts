import { Request, Response } from "express";
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento";
import { handleHttpError } from "../utils/handleError";

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        const persona: any = Persona.build({
            dni: body.dni,
            nombres: body.nombres,
            apellidopaterno: body.apellidopaterno,
            apellidomaterno: body.apellidomaterno,
            domicilio: body.domicilio,
            telefono: body.telefono,
            nacionalidad: body.nacionalidad,
            distrito: body.distrito,
            fechanacimiento: body.fechanacimiento,
            sexo: body.sexo,
            correo: body.correo,
            tipodocumentoId:body.tipodocumentoId
        });
        await persona.save();
        res.json({
            ok: true,
            msg: "Persona creada exitosamente",
            persona
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getPersonaDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const persona = await Persona.findOne({
            where: {
                estado: true,
                dni: dni
            },
            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
            include: {
                model: Tipodocumento,
                as: 'tipodocumento',
                attributes: ['id', 'nombre']
            },
        });
        res.json({
            ok: true,
            persona
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}