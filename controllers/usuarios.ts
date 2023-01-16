import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Usuario from "../models/usuario";
import Role from "../models/role";
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento";
import { handleHttpError } from "../utils/handleError";

export const getUsuariosTodos = async (req: any, res: Response) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'email'],
            where: { estado: true },
            include:[
                {
                    model: Persona,
                    as: 'persona',
                    attributes:['id','dni','nombres','apellidopaterno','apellidomaterno','img']
                }
            ]
        });
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getUsuariosLimitado = async (req: any, res: Response) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'email'],
            where: { 
                estado: true,
                [Op.or]: [
                    { '$role.nombre$': 'ADMINISTRADOR' }, 
                    { '$role.nombre$': 'DOCENTE' },
                    { '$role.nombre$': 'AUXILIAR' },
                ],    
            },
            include:[
                {
                    model: Persona,
                    as: 'persona',
                    attributes:['id','dni','nombres','apellidopaterno','apellidomaterno','img']
                },
                {
                    model: Role,
                    as: 'role',
                    attributes:['id','nombre']
                }
            ]
        });
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getUsuariosPorRol = async (req: any, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    const { rolId } = req.params;
    try {

        const total = (await Usuario.findAll({
            where: {
                estado: true,
                id: {
                    [Op.ne]: req.usuarioauth
                },
                '$role.id$': rolId,
            },
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id'],
                }
            ]
        })).length;

        const usuarios = await Usuario.findAll({
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'nombre','bgcolor'],
                required: false,
            }, {
                model: Persona,
                as: 'persona',
                include: [
                    {
                        model: Tipodocumento,
                        as: 'tipodocumento',
                        attributes:['id','nombre']
                    }
                ]
            }],

            attributes: { exclude: ['password'] },
            where: {
                estado: true,
                id: {
                    [Op.ne]: req.usuarioauth
                },
                '$role.id$': rolId,
            },
            limit: 5,
            offset: desde,
            order: [
                [
                    'id', 'DESC'
                ]
            ],
        });

        res.json({
            ok: true,
            usuarios,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


export const getUsuarios = async (req: any, res: Response) => {

    const desde = Number(req.query.desde) || 0;

    try {

        const total = (await Usuario.findAll({
            where: {
                estado: true,
                id: {
                    [Op.ne]: req.usuarioauth
                }
            }
        })).length;

        const usuarios = await Usuario.findAll({
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'nombre','bgcolor'],
                required: false,
            }, {
                model: Persona,
                as: 'persona',
                include: [
                    {
                        model: Tipodocumento,
                        as: 'tipodocumento',
                        attributes:['id','nombre']
                    }
                ]
            }],

            attributes: { exclude: ['password'] },
            where: {
                estado: true,
                id: {
                    [Op.ne]: req.usuarioauth
                }
            },
            limit: 5,
            offset: desde,
            order: [
                [
                    'id', 'DESC'
                ]
            ],
        });

        res.json({
            ok: true,
            usuarios,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario: any = await Usuario.findByPk(id, {

            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'nombre','bgcolor'],
                required: false,
            }, {
                model: Persona,
                as: 'persona',
                attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                include: [
                    {
                        model: Tipodocumento,
                        as: 'tipodocumento',
                        attributes: ['id','nombre']
                    }
                ]
            }],
            attributes: { exclude: ['password'] }
        });
        if (!usuario || usuario.estado == false) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getUsuarioAreas = (req: Request, res: Response) => {

    const { id } = req.params;
    Usuario.findByPk(id).then((usuario: any) => {
        usuario.getAreas().then((areas: any) => {
            res.json({
                areas
            });
        });
    });

}
export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.json({
                ok: false,
                msg: `Ya existe un usuario con el email: ${body.email}`
            });
        }
        const salt = bcrypt.genSaltSync();
        const usuario: any = await Usuario.create({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, salt),
            roleId: body.roleId,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: "Usuario guardado exitosamente",
            usuario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario: any = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        if (usuario.email === body.email) {
            delete body.email;
        } else {
            const existeEmail = await Usuario.findOne({
                where: {
                    email: body.email
                }
            });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe un usuario con el email: ${body.email}`
                });
            }
        }
        delete body.password;
        await usuario?.update(body);
        res.json({
            ok: true,
            msg: "Usuario actualizado exitosamente",
            usuario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const actualizarPassword = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {

        const usuario: any = await Usuario.findByPk(id, {

        });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(body.password, salt);
        usuario.save();
        res.json({
            ok: true,
            msg: "El password ha sido cambiado exitosamente"
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }


}
export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        await usuario?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Usuario borrado exitosamente',
            usuario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaUsuarios = async (req: any, res: Response) => {
    const valor = req.params.valor;

    try {

        const data = await Usuario.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        nombre: {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${valor}%`
                        }
                    },
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
                ],
                id: {
                    [Op.ne]: req.usuarioauth
                }
            },
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'nombre','bgcolor']
                },
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                }
            ],
            attributes: { exclude: ['password'] },
        });
        res.json({
            ok: true,
            busquedas: data
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const emailRepetido = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.json({
                ok: true,
                msg: `Ya existe un usuario con el email: ${body.email}`
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }


}
export const habilitarDesabilitarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }

        await usuario?.update({ habilitado: body.accion });
        res.json({
            ok: true,
            msg: 'Usuario actualizado con exito',
            usuario
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaUsuariosPorRol = async (req: any, res: Response) => {
    const valor = req.params.valor;
    const { rolId } = req.params;
    try {

        const data = await Usuario.findAll({
            where: {
                estado: true,

                [Op.or]: [
                    {
                        nombre: {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${valor}%`
                        }
                    },
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
                ],
                '$role.id$': rolId,
                id: {
                    [Op.ne]: req.usuarioauth
                }
            },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'nombre','bgcolor']
            }, {
                model: Persona,
                as: 'persona',
                attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
            }],
            attributes: { exclude: ['password'] },
        });
        res.json({
            ok: true,
            busquedas: data
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const obtenerUsuarioEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const usuario: any = await Usuario.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'email'],
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'nombre','bgcolor']
                }, {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                }
            ]
        });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el email: ${email}`
            });
        }
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}