import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Padre from '../models/padre';
import Persona from '../models/persona';
import Role from "../models/role";
import Usuario from "../models/usuario";
import Tipodocumento from "../models/tipodocumento";
import Alumno from "../models/alumno";
import { handleHttpError } from "../utils/handleError";

export const getPadres = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Padre.findAll({
            where: { estado: true }
        })).length;
        const padres = await Padre.findAll({
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
            padres,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getPadresTodos = async (req: Request, res: Response) => {
    try {
        const padres = await Padre.findAll({
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
            padres
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getPadre = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const padre: any = await Padre.findByPk(id, {
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

        if (!padre || padre.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un padre con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            padre
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postPadre = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();
        let maxValor: any = await Usuario.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const padre = Padre.build({
            personaId: body.personaId,
        });
        await padre.save();
        if (body.vive) {
            await Usuario.create({
                nombre: arr[0],
                numero: numeroUsuario,
                email: arr[0] + '' + numeroUsuario + '@demo.com',
                password: bcrypt.hashSync(body.dniusuario, salt),
                roleId: roles[2].id,
                personaId: body.personaId
            });
        }
        res.json({
            ok: true,
            msg: 'Padre creado exitosamente.',
            padre
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putPadre = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const padre: any = await Padre.findByPk(id);
        if (!padre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un padre con el id: ${id}`
            });
        }
        await padre?.update(body);
        res.json({
            ok: true,
            msg: 'Padre actualizado exitosamente',
            padre
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deletePadre = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const padre: any = await Padre.findByPk(id);
        if (!padre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un padre con el id: ${id}`
            });
        }
        const lista = await Alumno.findAll({
            where: {
                padreId: id,
                estado: true
            },
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el padre.`
            });
        }

        await padre?.update({ estado: false });

        const usuario = await Usuario.findOne({
            where: {
                personaId: padre.personaId,
                estado: true
            }
        });
        if (usuario) {
            await usuario?.update({ estado: false });
        }
        res.json({
            ok: true,
            msg: 'Padre eliminado exitosamente',
            padre
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaPadres = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Padre.findAll({
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

        const padre = await Padre.findOne({
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

        if (padre) {
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

export const padrePorPersona = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const padre = await Padre.findOne({
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
        if (padre) {
            return res.json({
                ok: true,
                padre
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

export const getPadreDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;

    try {
        const padre = await Padre.findOne({
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
            padre
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

