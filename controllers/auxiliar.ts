import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento";
import Usuario from "../models/usuario";
import Role from "../models/role";
import Auxiliar from "../models/auxiliar";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {

    try {
        const auxiliares = await Auxiliar.findAll({
            where: { estado: true },
            include: [{
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
            }]
        });
        res.json({
            ok: true,
            auxiliares
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAuxiliares = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Auxiliar.findAll({
            where: { estado: true }
        })).length;
        const auxiliares = await Auxiliar.findAll({
            where: { estado: true },
            order: [
                /*
                [ 
                    { model: Persona, as: 'persona'}, 
                    'nombres', 'ASC'
                ]
                */
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
            auxiliares,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAuxiliar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const auxiliar: any = await Auxiliar.findByPk(id, {

            include: [{
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

            }]
        });

        if (!auxiliar || auxiliar.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un auxiliar con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Auxiliar encontrado',
            auxiliar
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAuxiliarPersona = async (req: Request, res: Response) => {
    const { persona } = req.params;
    try {
        const auxiliar = await Auxiliar.findOne({
            where: {
                estado: true,
                personaId: persona
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
        if (auxiliar) {
            return res.json({
                ok: true,
                auxiliar
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un auxiliar con el id:' + persona
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postAuxiliar = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();
        let maxValor: any = await Usuario.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const auxiliar = Auxiliar.build({
            personaId: body.personaId
        });
        await auxiliar.save();
        await Usuario.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email: arr[0] + '' + numeroUsuario + '@demo.com',
            password: bcrypt.hashSync(body.dniusuario, salt),
            roleId: roles[4].id,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: 'Auxiliar guardado exitosamente',
            auxiliar
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putAuxiliar = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {

        const auxiliar: any = await Auxiliar.findByPk(id);
        if (!auxiliar || auxiliar.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un auxiliar con el id: ${id}`
            });
        }

        await auxiliar?.update(body);
        res.json({
            ok: true,
            msg: 'Auxiliar actualizado exitosamente',
            auxiliar
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteAuxiliar = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const auxiliar: any = await Auxiliar.findByPk(id);
        if (!auxiliar || auxiliar.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un auxiliar con el id: ${id}`
            });
        }
        await auxiliar?.update({ estado: false });
        const usuario = await Usuario.findOne({
            where: {
                personaId: auxiliar.personaId,
                estado: true
            }
        });
        if (usuario) {
            await usuario?.update({ estado: false });
        }

        res.json({
            ok: true,
            msg: 'Auxiliar borrado exitosamente',
            auxiliar
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaAuxiliares = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Auxiliar.findAll({
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

        const auxiliar = await Auxiliar.findOne({
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

        if (auxiliar) {
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


export const maxAuxiliarNumero = async (req: Request, res: Response) => {
    try {
        const max_valor = await Auxiliar.max('numero');
        if (!max_valor) {
            res.json({
                ok: true,
                valor: 0
            });
        } else {
            res.json({
                ok: true,
                valor: max_valor
            });
        }

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

