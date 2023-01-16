import { Request, Response } from "express";
import { Op } from 'sequelize';
import Responsable from '../models/responsable';
import Persona from '../models/persona';
import Tipodocumento from "../models/tipodocumento";
import Alumno from "../models/alumno";
import bcrypt from 'bcryptjs';
import Role from "../models/role";
import Usuario from "../models/usuario";
import { handleHttpError } from "../utils/handleError";

export const getResponsables = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Responsable.findAll({
            where: { estado: true }
        })).length;
        const responsables = await Responsable.findAll({
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
                    include: [
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
            responsables,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getResponsablesTodos = async (req: Request, res: Response) => {
    try {
        const responsables = await Responsable.findAll({
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
                    include: [
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
            responsables
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getResponsable = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const responsable: any = await Responsable.findByPk(id, {
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: Tipodocumento,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                }
            ]
        });
        if (!responsable || responsable.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un responsable con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            responsable
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postResponsable = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();
        let maxValor: any = await Usuario.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;

        const responsable = Responsable.build({
            personaId: body.personaId
        });
        await responsable.save();
        if (!body.padrevive && !body.medrevive) {
            await Usuario.create({
                nombre: arr[0],
                numero: numeroUsuario,
                email: arr[0] + '' + numeroUsuario + '@demo.com',
                password: bcrypt.hashSync(body.dniusuario, salt),
                roleId: roles[5].id,
                personaId: body.personaId
            });
        }
        res.json({
            ok: true,
            msg: 'Responsable creado exitosamente.',
            responsable
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putResponsable = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const responsable: any = await Responsable.findByPk(id);
        if (!responsable) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un responsable con el id: ${id}`
            });
        }
        await responsable?.update(body);
        res.json({
            ok: true,
            msg: 'Responsable actualizado exitosamente',
            responsable
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteResponsable = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const responsable: any = await Responsable.findByPk(id);
        if (!responsable) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un responsable con el id: ${id}`
            });
        }
        const lista = await Alumno.findAll({
            where: {
                responsableId: id,
                estado: true
            },
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el responsable.`
            });
        }
        await responsable?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Responsable eliminado exitosamente',
            responsable
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaResponsables = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Responsable.findAll({
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
                    include: [
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
        const responsable = await Responsable.findOne({
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

        if (responsable) {
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

export const responsablePorPersona = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const responsable = await Responsable.findOne({
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
                        attributes: ['id', 'nombre']
                    }]
                }
            ]
        });
        if (responsable) {
            return res.json({
                ok: true,
                responsable
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un padre con el persona id:' + id
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getResponsableDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;

    try {
        const responsable = await Responsable.findOne({
            where: {
                estado: true,
                '$persona.dni$': dni
            },
            attributes: ['id'],
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
            responsable
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

