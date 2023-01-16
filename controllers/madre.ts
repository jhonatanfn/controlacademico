import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Madre from '../models/madre';
import Persona from '../models/persona';
import Role from "../models/role";
import Usuario from "../models/usuario";
import Tipodocumento from "../models/tipodocumento";
import Alumno from "../models/alumno";
import { handleHttpError } from "../utils/handleError";

export const getMadres = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Madre.findAll({
            where: { estado: true }
        })).length;
        const madres = await Madre.findAll({
            where: { estado: true },
            order: [
                ['id', 'DESC']
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include:[
                        {
                         model: Tipodocumento,
                         as: 'tipodocumento',
                         attributes: ['id', 'nombre']
                        }
                     ]
                }
            ]
        });
        res.json({
            ok: true,
            madres,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMadresTodos = async (req: Request, res: Response) => {
    try {
        const madres = await Madre.findAll({
            where: { estado: true },
            order: [
                [
                    { model: Persona, as: 'persona' },
                    'nombres', 'ASC'
                ]
            ],
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include:[
                        {
                         model: Tipodocumento,
                         as: 'tipodocumento',
                         attributes: ['id', 'nombre']
                        }
                     ]
                }
            ]
        });
        res.json({
            ok: true,
            madres
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getMadre = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const madre: any = await Madre.findByPk(id, {
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include:[
                        {
                         model: Tipodocumento,
                         as: 'tipodocumento',
                         attributes: ['id', 'nombre']
                        }
                     ]
                }
            ]
        });

        if (!madre || madre.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una madre con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            madre
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postMadre = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();
        let maxValor: any = await Usuario.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const madre = Madre.build({
            personaId: body.personaId,
        });
        await madre.save();
        if(body.vive){
            await Usuario.create({
                nombre: arr[0],
                numero: numeroUsuario,
                email: arr[0] + '' + numeroUsuario + '@demo.com',
                password: bcrypt.hashSync(body.dniusuario, salt),
                roleId: roles[3].id,
                personaId: body.personaId
            });
        }
        res.json({
            ok: true,
            msg: 'Madre creada exitosamente.',
            madre
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putMadre = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const madre: any = await Madre.findByPk(id);
        if (!madre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una madre con el id: ${id}`
            });
        }
        await madre?.update(body);
        res.json({
            ok: true,
            msg: 'Madre actualizado exitosamente',
            madre
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteMadre = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const madre: any = await Madre.findByPk(id);
        if (!madre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un madre con el id: ${id}`
            });
        }
        const lista = await Alumno.findAll({
            where: {
                madreId: id,
                estado: true
            },
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar la madre.`
            });
        }

        await madre?.update({ estado: false });

        const usuario = await Usuario.findOne({
            where: {
                personaId: madre.personaId,
                estado: true
            }
        });
        if (usuario) {
            await usuario?.update({ estado: false });
        }
        res.json({
            ok: true,
            msg: 'Madre eliminada exitosamente',
            madre
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMadres = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Madre.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        '$persona.dni$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include:[
                        {
                         model: Tipodocumento,
                         as: 'tipodocumento',
                         attributes: ['id', 'nombre']
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

export const searchDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {

        const madre = await Madre.findOne({
            where: {
                estado: true,
                '$persona.dni$': dni,
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni'],
                }
            ]
        });

        if (madre) {
            return res.json({
                ok: true,
                msg: "El DNI ya se encuentra registrado"
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const madrePorPersona = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const madre = await Madre.findOne({
            where: {
                estado: true,
                personaId: id
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [{
                        model: Tipodocumento,
                        as: 'tipodocumento',
                        attributes:['id','nombre']
                    }]
                }
            ]
        });
        if (madre) {
            return res.json({
                ok: true,
                madre
            });
        }
        res.json({
            ok: false,
            msg: 'No existe una madre con el persona id:' + id
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getMadreDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;

    try {
        const madre = await Madre.findOne({
            where: {
                estado: true,
                '$persona.dni$': dni
            },
            attributes: ['id', 'vive'],
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [{
                        model: Tipodocumento,
                        as: 'tipodocumento',
                        attributes: ['id', 'nombre']
                    }]
                }
            ]
        });
        res.json({
            ok: true,
            madre
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


