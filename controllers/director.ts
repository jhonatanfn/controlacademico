import { Request, Response } from "express";
import { Op } from 'sequelize';;
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento";
import Director from "../models/director";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const directores = await Director.findAll({
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
            directores
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getDirectores = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Director.findAll({
            where: { estado: true }
        })).length;
        const directores = await Director.findAll({
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
            directores,
            desde,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const director: any = await Director.findByPk(id, {
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
        if (!director || director.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un director con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Director encontrado',
            director
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getDirectorPersona = async (req: Request, res: Response) => {
    const { persona } = req.params;
    try {
        const director = await Director.findOne({
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
        if (director) {
            return res.json({
                ok: true,
                director
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un director con el persona id:' + persona
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const postDirector = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const director = Director.build({
            personaId: body.personaId,
            observacion: body.observacion
        });
        await director.save();
        res.json({
            ok: true,
            msg: 'Director guardado exitosamente',
            director
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const putDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const director: any = await Director.findByPk(id);
        if (!director || director.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un director con el id: ${id}`
            });
        }
        await director?.update(body);
        res.json({
            ok: true,
            msg: 'Director actualizado exitosamente',
            director
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteDirector = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const director: any = await Director.findByPk(id);
        if (!director || director.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un director con el id: ${id}`
            });
        }
        await director?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Director eliminado exitosamente',
            director
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaDirectores = async (req: Request, res: Response) => {
    const { valor } = req.params;
    try {
        const data = await Director.findAll({
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}

export const searchDNI = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const director = await Director.findOne({
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
        if (director) {
            return res.json({
                ok: true,
                msg: "El DNI ya se encuentra registrado"
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const maxDirectorNumero = async (req: Request, res: Response) => {
    try {
        const max_valor = await Director.max('numero');
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}

