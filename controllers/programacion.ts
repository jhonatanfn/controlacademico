import { Request, Response } from "express";
import { Op } from 'sequelize';
import Area from "../models/area";
import Aula from "../models/aula";
import Docente from "../models/docente";
import Grado from "../models/grado";
import Nivel from "../models/nivel";
import Periodo from "../models/periodo";
import Persona from "../models/persona";
import Programacion from "../models/programacion";
import Seccion from "../models/seccion";
import { handleHttpError } from "../utils/handleError";

export const getProgramacionesDocente = async (req: Request, res: Response) => {
    const { docente } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente
            },
        })).length;
        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones,
            desde,
            total
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}

export const getProgramacionesDocenteTodo = async (req: Request, res: Response) => {
    const { docente } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente
            },
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}

export const getProgramacionesDocentePeriodo = async (req: Request, res: Response) => {
    const { docente, periodo } = req.params;
    try {
        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },

                {
                    model: Docente,
                    as: 'docente',
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getProgramaciones = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Programacion.findAll({
            where: { estado: true }
        })).length;
        const programaciones = await Programacion.findAll({
            where: { estado: true },
            order: [
                ['id', 'DESC']
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: Docente,
                    as: 'docente',
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getProgramacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const programacion: any = await Programacion.findByPk(id, {
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: Docente,
                    as: 'docente',
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });

        if (!programacion || programacion.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asignación con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            programacion
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getProgramacionesPeriodoAula = async (req: Request, res: Response) => {
    const { periodoid, aulaid } = req.params;
    try {

        const periodo = await Periodo.findByPk(periodoid);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${periodoid}`
            });
        }
        const aula = await Aula.findByPk(aulaid);
        if (!aula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un aula con el id: ${aulaid}`
            });
        }
        const programaciones = await Programacion.findAll({
            where:{
                estado: true,
                periodoId: periodoid,
                aulaId: aulaid
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes:['id','nombre']
                },
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre']
                        }
                    ]

                },
                {
                    model: Docente,
                    as: 'docente',
                    attributes:['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]

        });

        res.json({
            ok: true,
            programaciones
        });


    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const postProgramacion = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const programacion = Programacion.build(body);
        await programacion.save();
        res.json({
            ok: true,
            msg: 'Asignación creada exitosamente',
            programacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putProgramacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const programacion: any = await Programacion.findByPk(id);
        if (!programacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asignación con el id: ${id}`
            });
        }
        await programacion?.update(body);
        res.json({
            ok: true,
            msg: 'Asignación actualizada exitosamente',
            programacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteProgramacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const programacion: any = await Programacion.findByPk(id);
        if (!programacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asignación con el id: ${id}`
            });
        }
        await programacion?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Asignación eliminada exitosamente',
            programacion
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaProgramaciones = async (req: Request, res: Response) => {
    const { valor } = req.params;
    try {
        const data = await Programacion.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        '$aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },

                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
export const existeProgramacion = async (req: Request, res: Response) => {
    const { periodo, aula, area } = req.params;
    try {
        const programacion = await Programacion.findOne({
            where: {
                periodoId: periodo,
                aulaId: aula,
                areaId: area,
                estado: true
            }
        });
        if (programacion) {
            return res.json({
                ok: true,
                msg: 'La asignación ya esta registrada.'
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const existeProgramacionEditar = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, programacionId } = req.params;
    try {
        const programacion = await Programacion.findOne({
            where: {
                periodoId: periodoId,
                aulaId: aulaId,
                areaId: areaId,
                estado: true,
                id:{
                    [Op.ne]: programacionId,
                }
            }
        });
        if (programacion) {
            return res.json({
                ok: true,
                msg: 'La asignación ya está registrada.'
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaProgramacionesSubareaPorDocentePeriodo = async (req: Request, res: Response) => {
    const { valor, docenteId, periodoId } = req.params;
    try {
        const data = await Programacion.findAll({
            where: {
                [Op.or]: [
                    {
                        '$area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nivel.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.grado.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.seccion.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                '$docente.id$': docenteId,
                periodoId: periodoId,
                estado: true
            },
            attributes:['id','numeromat','numeromaxmat'],
            include: [
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id','nombre']
                },
                {
                    model: Aula,
                    as: 'aula',
                    attributes: ['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    attributes:['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id','nombre']
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
export const busquedaProgramacionesSubareaPorDocente = async (req: Request, res: Response) => {
    const { valor, docenteId } = req.params;
    try {
        const data = await Programacion.findAll({
            where: {
                [Op.or]: [
                    {
                        '$area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nivel.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.grado.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.seccion.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                '$docente.id$': docenteId,
                estado: true
            },
            attributes:['id','numeromat','numeromaxmat'],
            include: [
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id','nombre']
                },
                {
                    model: Aula,
                    as: 'aula',
                    attributes: ['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    attributes:['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id','nombre']
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
export const getProgramacionesDocentePeriodoPaginado = async (req: Request, res: Response) => {
    const { docente, periodo } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
        })).length;

        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones,
            desde,
            total
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getProgramacionesDocentePeriodoPaginadoTodo = async (req: Request, res: Response) => {
    const { docente, periodo } = req.params;
    
    try {
        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const perteneceProgramacionDocente = async (req: Request, res: Response) => {

    const { programacionId, docenteId } = req.params;
    try {

        const programacion = await Programacion.findOne({
            where: {
                estado: true,
                id: programacionId,
                docenteId: docenteId
            }
        });
        if (programacion) {
            return res.json({
                ok: true
            });
        }
        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const perteneceAulaDocente = async (req: Request, res: Response) => {
    const { aulaId, docenteId } = req.params;
    try {
        const programacion = await Programacion.findOne({
            where: {
                estado: true,
                aulaId: aulaId,
                docenteId: docenteId
            }
        });
        if (programacion) {
            return res.json({
                ok: true
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}







export const programacionPeriodo = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                periodoId: id
            },
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },

                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaProgramacionesSubarea = async (req: Request, res: Response) => {
    const { valor } = req.params;
    try {
        const data = await Programacion.findAll({
            where: {
                '$subarea.nombre$': {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },

                {
                    model: Aula,
                    as: 'aula',
                    required: true,
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
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
export const programacionPeriodoPaginado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const programaciones = await Programacion.findAll({
            where: {
                estado: true,
                periodoId: id
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Periodo,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },

                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: Area,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones,
            desde,
            total: programaciones.length
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const busquedaProgramacionesPorDocente = async (req: Request, res: Response) => {
    const { valor } = req.params;

    try {

        const data = await Programacion.findAll({
            where: {

                [Op.or]: [
                    {
                        '$docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },

                {
                    model: Aula,
                    as: 'aula',
                    required: true,
                    attributes:['id','nombre','tipovalor'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
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

export const getProgramacionesAdministradorPeriodo = async (req: Request, res: Response) => {
    const { periodoId, valor } = req.params;

    try {
        const data = await Programacion.findAll({
            where: {

                [Op.or]: [
                    {
                        '$docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                periodoId: periodoId,
                estado: true
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },

                {
                    model: Aula,
                    as: 'aula',
                    required: true,
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
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
export const getProgramacionesAdministrador = async (req: Request, res: Response) => {
    const { valor } = req.params;

    try {
        const data = await Programacion.findAll({
            where: {

                [Op.or]: [
                    {
                        '$docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },
                {
                    model: Aula,
                    as: 'aula',
                    required: true,
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: Nivel,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Grado,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: Seccion,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Docente,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
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

export const isProgramacionesCompletas = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const areas: any = await Area.findAll({
            where: {
                estado: true
            },
            attributes:['id']
        });
        if(areas.length>0){
            const data = await Programacion.findAll({
                where: {
                    periodoId: periodoId,
                    aulaId: aulaId,
                    estado: true
                },
                attributes: ['id']
            });
            if(data.length!==areas.length){
                return res.json({
                    ok: false,
                    msg: "Programar todas las asignaciones para el periodo y aula seleccionado."
                });
            }
        }else{
            return res.json({
                ok: false,
                msg: "No hay areas registradas"
            });
        }
        res.json({
            ok: true,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}