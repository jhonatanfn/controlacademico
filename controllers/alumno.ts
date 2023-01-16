import { Request, Response } from "express";
import { Op } from 'sequelize';
import Alumno from '../models/alumno';
import Persona from '../models/persona';
import Tipodocumento from '../models/tipodocumento';
import Matricula from "../models/matricula";
import Usuario from "../models/usuario";
import Padre from "../models/padre";
import Madre from "../models/madre";
import Responsable from "../models/responsable";
import Role from "../models/role";
import bcrypt from 'bcryptjs';
import { handleHttpError } from "../utils/handleError";

export const getAlumnos = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Alumno.findAll({
            where: { estado: true }
        })).length;
        const alumnos = await Alumno.findAll({
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
                },
                {
                    model: Padre,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Madre,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Responsable,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            alumnos,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAlumnosTodos = async (req: Request, res: Response) => {

    try {
        const alumnos = await Alumno.findAll({
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
                },
                {
                    model: Padre,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Madre,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Responsable,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            alumnos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAlumnosPadre = async (req: Request, res: Response) => {
    try {
        const alumnos = await Alumno.findAll({
            where: {
                estado: true,
                padreId: req.params.padreId
            },
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
                },
                {
                    model: Padre,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Madre,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Responsable,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            alumnos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAlumnosMadre = async (req: Request, res: Response) => {
    try {
        const alumnos = await Alumno.findAll({
            where: {
                estado: true,
                madreId: req.params.madreId
            },
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
                },
                {
                    model: Padre,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Madre,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Responsable,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            alumnos
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAlumnoDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const alumno = await Alumno.findOne({
            where: { estado: true },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    where: {
                        dni: dni
                    },
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
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el dni: ${dni}`
            });
        }
        res.json({
            ok: true,
            alumno
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAlumno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const alumno: any = await Alumno.findByPk(id, {
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
                },
                {
                    model: Padre,
                    as: 'padre',
                    attributes: ['id', 'vive'],
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
                },
                {
                    model: Madre,
                    as: 'madre',
                    attributes: ['id', 'vive'],
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
                },
                {
                    model: Responsable,
                    as: 'responsable',
                    attributes: ['id'],
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
                }
            ]
        });

        if (!alumno || alumno.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            alumno
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postAlumno = async (req: Request, res: Response) => {
    const { body } = req;
    try {

        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();

        /** registro padre */
        if (!body.padreId) {
            let personaIdUsuario1;
            const persona1: any = await Persona.findOne({
                where: {
                    estado: true,
                    dni: body.padredni
                },
                attributes: ['id']
            });
            if (persona1) {
                const padre1: any = Padre.build({
                    personaId: persona1.id,
                    vivo: body.padrevive
                });
                await padre1.save();
                body.padreId = padre1.id;
                personaIdUsuario1 = persona1.id
            } else {
                const persona2: any = Persona.build({
                    dni: body.padredni,
                    nombres: body.padrenombres,
                    apellidopaterno: body.padreapellidopaterno,
                    apellidomaterno: body.padreapellidomaterno,
                    sexo: body.padresexo,
                    fechanacimiento: body.padrefechanacimiento,
                    tipodocumentoId: body.padretipodocumentoId
                });
                await persona2.save();
                const padre2: any = Padre.build({
                    personaId: persona2.id,
                    vive: body.padrevive
                });
                await padre2.save();
                body.padreId = padre2.id;
                personaIdUsuario1 = persona2.id
            }
            if (body.padrevive && body.padredni != "00000000") {
                let maxValorpadre: any = await Usuario.max('numero', { where: { estado: true } });
                let arrpadre = body.padrenombreusuario.split(' ');
                let numeroUsuariopadre = maxValorpadre + 1;
                await Usuario.create({
                    nombre: arrpadre[0],
                    numero: numeroUsuariopadre,
                    email: arrpadre[0] + '' + numeroUsuariopadre + '@demo.com',
                    password: bcrypt.hashSync(body.padredniusuario, salt),
                    roleId: roles[2].id,
                    personaId: personaIdUsuario1
                });
            }
        }
        /** registro madre */
        if (!body.madreId) {
            let personaIdUsuario2;
            const persona3: any = await Persona.findOne({
                where: {
                    estado: true,
                    dni: body.madredni
                },
                attributes: ['id']
            });
            if (persona3) {
                const madre1: any = Madre.build({
                    personaId: persona3.id,
                    vivo: body.madrevive
                });
                await madre1.save();
                body.madreId = madre1.id;
                personaIdUsuario2 = persona3.id
            } else {
                const persona4: any = Persona.build({
                    dni: body.madredni,
                    nombres: body.madrenombres,
                    apellidopaterno: body.madreapellidopaterno,
                    apellidomaterno: body.madreapellidomaterno,
                    sexo: body.madresexo,
                    fechanacimiento: body.madrefechanacimiento,
                    tipodocumentoId: body.madretipodocumentoId
                });
                await persona4.save();
                const madre2: any = Madre.build({
                    personaId: persona4.id,
                    vive: body.madrevive
                });
                await madre2.save();
                body.madreId = madre2.id;
                personaIdUsuario2 = persona4.id
            }
            if (body.madrevive && body.padredni != "00000000") {
                let maxValormadre: any = await Usuario.max('numero', { where: { estado: true } });
                let arrmadre = body.madrenombreusuario.split(' ');
                let numeroUsuariomadre = maxValormadre + 1;
                await Usuario.create({
                    nombre: arrmadre[0],
                    numero: numeroUsuariomadre,
                    email: arrmadre[0] + '' + numeroUsuariomadre + '@demo.com',
                    password: bcrypt.hashSync(body.madredniusuario, salt),
                    roleId: roles[3].id,
                    personaId: personaIdUsuario2
                });
            }
        }

        if (body.padreId && body.madreId && body.responsableId) {
            const alumno = Alumno.build({
                personaId: body.personaId,
                padreId: body.padreId,
                madreId: body.madreId,
                responsableId: body.responsableId,
                vivecon: body.vivecon,
                tienediscapacidad: body.tienediscapacidad,
                cualdiscapacidad: body.cualdiscapacidad,
                certificadiscapacidad: body.certificadiscapacidad,
                observacion: body.observacion,
                inicialprocede: body.inicialprocede,
                colegioprocede: body.colegioprocede
            });
            await alumno.save();
            return res.json({
                ok: true,
                msg: 'Alumno creado exitosamente.',
                alumno
            });
        }
        res.json({
            ok: false,
            msg: "No se pudo crear el alumno."
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putAlumno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {

        const roles: any = await Role.findAll({ where: { estado: true } });
        const salt = bcrypt.genSaltSync();

        /** registro padre */
        if (!body.padreId) {
            let personaIdUsuario1;
            const persona1: any = await Persona.findOne({
                where: {
                    estado: true,
                    dni: body.padredni
                },
                attributes: ['id']
            });
            if (persona1) {
                const padre1: any = Padre.build({
                    personaId: persona1.id,
                    vivo: body.padrevive
                });
                await padre1.save();
                body.padreId = padre1.id;
                personaIdUsuario1 = persona1.id
            } else {
                const persona2: any = Persona.build({
                    dni: body.padredni,
                    nombres: body.padrenombres,
                    apellidopaterno: body.padreapellidopaterno,
                    apellidomaterno: body.padreapellidomaterno,
                    sexo: body.padresexo,
                    fechanacimiento: body.padrefechanacimiento,
                    tipodocumentoId: body.padretipodocumentoId
                });
                await persona2.save();
                const padre2: any = Padre.build({
                    personaId: persona2.id,
                    vive: body.padrevive
                });
                await padre2.save();
                body.padreId = padre2.id;
                personaIdUsuario1 = persona2.id
            }
            if (body.padrevive && body.padredni != "00000000") {
                let maxValorpadre: any = await Usuario.max('numero', { where: { estado: true } });
                let arrpadre = body.padrenombreusuario.split(' ');
                let numeroUsuariopadre = maxValorpadre + 1;
                await Usuario.create({
                    nombre: arrpadre[0],
                    numero: numeroUsuariopadre,
                    email: arrpadre[0] + '' + numeroUsuariopadre + '@mail.com',
                    password: bcrypt.hashSync(body.padredniusuario, salt),
                    roleId: roles[2].id,
                    personaId: personaIdUsuario1
                });
            }
        }
        /** registro madre */
        if (!body.madreId) {
            let personaIdUsuario2;
            const persona3: any = await Persona.findOne({
                where: {
                    estado: true,
                    dni: body.madredni
                },
                attributes: ['id']
            });
            if (persona3) {
                const madre1: any = Madre.build({
                    personaId: persona3.id,
                    vivo: body.madrevive
                });
                await madre1.save();
                body.madreId = madre1.id;
                personaIdUsuario2 = persona3.id
            } else {
                const persona4: any = Persona.build({
                    dni: body.madredni,
                    nombres: body.madrenombres,
                    apellidopaterno: body.madreapellidopaterno,
                    apellidomaterno: body.madreapellidomaterno,
                    sexo: body.madresexo,
                    fechanacimiento: body.madrefechanacimiento,
                    tipodocumentoId: body.madretipodocumentoId
                });
                await persona4.save();
                const madre2: any = Madre.build({
                    personaId: persona4.id,
                    vive: body.madrevive
                });
                await madre2.save();
                body.madreId = madre2.id;
                personaIdUsuario2 = persona4.id
            }
            if (body.madrevive && body.padredni != "00000000") {
                let maxValormadre: any = await Usuario.max('numero', { where: { estado: true } });
                let arrmadre = body.madrenombreusuario.split(' ');
                let numeroUsuariomadre = maxValormadre + 1;
                await Usuario.create({
                    nombre: arrmadre[0],
                    numero: numeroUsuariomadre,
                    email: arrmadre[0] + '' + numeroUsuariomadre + '@mail.com',
                    password: bcrypt.hashSync(body.madredniusuario, salt),
                    roleId: roles[3].id,
                    personaId: personaIdUsuario2
                });
            }
        }

        const alumno: any = await Alumno.findByPk(id);
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        if (body.padreId && body.madreId && body.responsableId) {
            await alumno?.update(body);
            return res.json({
                ok: true,
                msg: 'Alumno actualizado exitosamente',
                alumno
            });
        }
        res.json({
            ok: false,
            msg: "No se pudo actualizar el alumno"
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteAlumno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const alumno: any = await Alumno.findByPk(id);
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        const lista = await Matricula.findAll({
            where: {
                '$alumno.id$': id,
                estado: true
            },
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    attributes: ['id']
                }
            ]
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el alumno.`
            });
        }

        await alumno?.update({ estado: false });

        const usuario = await Usuario.findOne({
            where: {
                personaId: alumno.personaId,
                estado: true
            }
        });
        if (usuario) {
            await usuario?.update({ estado: false });
        }
        res.json({
            ok: true,
            msg: 'Alumno eliminado exitosamente',
            alumno
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaAlumnos = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Alumno.findAll({
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
                    },
                    {
                        '$padre.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$madre.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                    include: [
                        {
                            model: Tipodocumento,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: Padre,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Madre,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: Responsable,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
        const alumno = await Alumno.findOne({
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

        if (alumno) {
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
export const alumnoPorPersona = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {

        const alumno = await Alumno.findOne({
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
                        as: 'tipodocumento'
                    }]
                }
            ]
        });
        if (alumno) {
            return res.json({
                ok: true,
                alumno
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un alumno con el persona id:' + id
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaAlumnosApellido = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Alumno.findAll({
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
export const tieneMatricula = async (req: Request, res: Response) => {
    const { alumnoId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                alumnoId: alumnoId
            }
        });

        if (matriculas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el alumno."
            });
        }

        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaAlumnosDocumento = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Alumno.findAll({
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
export const busquedaAlumnosNombres = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Alumno.findAll({
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

