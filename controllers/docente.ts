import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Persona from "../models/persona";
import Docente from "../models/docente";
import Tipodocumento from "../models/tipodocumento";
import Programacion from "../models/programacion";
import Usuario from "../models/usuario";
import Role from "../models/role";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {

    try {
        const docentes = await Docente.findAll({
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
            docentes
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getDocentes = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Docente.findAll({
            where: { estado: true }
        })).length;
        const docentes = await Docente.findAll({
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
            docentes,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getDocente = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const docente: any = await Docente.findByPk(id, {

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

        if (!docente || docente.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Docente encontrado',
            docente
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getDocentePersona = async (req: Request, res: Response) => {
    const { persona } = req.params;
    try {
        const docente = await Docente.findOne({
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
                        attributes: ['id','nombre']
                    }]
                }
            ]
        });
        if (docente) {
            return res.json({
                ok: true,
                docente
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un docente con el id:' + persona
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postDocente = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();
        let maxValor: any = await Usuario.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const docente = Docente.build({
            personaId: body.personaId
        });
        await docente.save();
        await Usuario.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email: arr[0] + '' + numeroUsuario + '@demo.com',
            password: bcrypt.hashSync(body.dniusuario, salt),
            roleId: roles[1].id,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: 'Docente guardado exitosamente',
            docente
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putDocente = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {

        const docente: any = await Docente.findByPk(id);
        if (!docente || docente.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }

        await docente?.update(body);
        res.json({
            ok: true,
            msg: 'Docente actualizado exitosamente',
            docente
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteDocente = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const docente: any = await Docente.findByPk(id);
        if (!docente || docente.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }

        const lista = await Programacion.findAll({
            where: {
                '$docente.id$': id,
                estado: true
            },
            include: [
                {
                    model: Docente,
                    as: 'docente'
                }
            ]
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el docente`
            });
        }
        await docente?.update({ estado: false });

        const usuario = await Usuario.findOne({
            where: {
                personaId: docente.personaId,
                estado: true
            }
        });
        if (usuario) {
            await usuario?.update({ estado: false });
        }

        res.json({
            ok: true,
            msg: 'Docente borrado exitosamente',
            docente
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaDocentes = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Docente.findAll({
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

        const docente = await Docente.findOne({
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

        if (docente) {
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


export const maxDocenteNumero = async (req: Request, res: Response) => {
    try {
        const max_valor = await Docente.max('numero');
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
export const busquedaDocentePorApellido = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Docente.findAll({
            where: {
                estado: true
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    where: {
                        apellidopaterno: {
                            [Op.like]: `%${valor}%`
                        }
                    }
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
export const tieneProgramaciones = async (req: Request, res: Response) => {

    const { docenteId } = req.params;
    try {

        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docenteId
            }
        });

        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el docente."
            });
        }
        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }


}
export const busquedaDocentePorDocumento = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Docente.findAll({
            where: {
                estado: true
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    where: {
                        numero: {
                            [Op.like]: `%${valor}%`
                        }
                    }
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
export const busquedaDocentePorNombres = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Docente.findAll({
            where: {
                [Op.or]: [
                    {
                        '$persona.numero$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        },
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

                ],
                estado: true
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
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
