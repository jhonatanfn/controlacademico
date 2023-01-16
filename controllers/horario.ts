import { Request, Response } from "express";
import Horario from "../models/horario";
import { Op } from 'sequelize';
import Programacion from "../models/programacion";
import Aula from "../models/aula";
import Nivel from "../models/nivel";
import Grado from "../models/grado";
import Seccion from "../models/seccion";
import Docente from "../models/docente";
import Persona from "../models/persona";
import Periodo from "../models/periodo";
import Area from "../models/area";
import Hora from "../models/hora";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const horarios = await Horario.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            horarios
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getHorarios = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Horario.findAll({
            where: { estado: true }
        })).length;
        const horarios = await Horario.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: Hora,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },

                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'areaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
                            model: Area,
                            as: 'area',
                            attributes: ['id','nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            horarios,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getHorario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const horario = await Horario.findByPk(id, {
            include: [
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'subareaId', 'docenteId'],

                }
            ]
        });
        if (!horario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un horario con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            horario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postHorario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const horario = Horario.build(body);
        await horario.save();
        res.json({
            ok: true,
            msg: 'Horario creado exitosamente',
            horario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putHorario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const horario: any = await Horario.findByPk(id);
        if (!horario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un horario con el id: ${id}`
            });
        }
        await horario?.update(body);
        res.json({
            ok: true,
            msg: 'Horario actualizado exitosamente',
            horario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteHorario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const horario: any = await Horario.findByPk(id);
        if (!horario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un horario con el id: ${id}`
            });
        }
        await horario?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Horario eliminado exitosamente',
            horario
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaHorarios = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Horario.findAll({
            where: {
                [Op.or]: [
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.docente.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.docente.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$hora.inicio$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$hora.fin$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        dia: {
                            [Op.like]: `%${valor}%`
                        },
                    }
                ],
                estado: true
            },
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: Hora,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'areaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
                            model: Area,
                            as: 'area',
                            attributes: ['id','nombre']
                        }
                    ]
                },
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

export const busquedaHorariosPorDia = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {
        const data = await Horario.findAll({
            where: {
                [Op.or]: [
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.docente.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.docente.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$hora.inicio$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$hora.fin$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        dia: {
                            [Op.like]: `%${valor}%`
                        },
                    }
                ],
                dia: req.params.diaNombre,
                estado: true
            },
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: Hora,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'areaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
                            model: Area,
                            as: 'area',
                            attributes: ['id','nombre']
                        }
                    ]
                },
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



export const existeHorario = async (req: Request, res: Response) => {

    const { periodoId, aulaId, diaNombre, horaId } = req.params;

    try {
        const horario = await Horario.findOne({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                dia: diaNombre,
                horaId: horaId,
                estado: true
            },
            include: [
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        }
                    ]
                },
            ]
        });
        if (horario) {
            return res.json({
                ok: true,
                msg: 'Ya existe un horario registrado.'
            });
        }
        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const horarioregistrado = async (req: Request, res: Response) => {

    const { periodoId, aulaId } = req.params;

    try {
        const horarios = await Horario.findAll({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                estado: true
            },
            include: [
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'aulaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id']
                        }
                    ]
                },
            ]
        });
        if (horarios) {
            return res.json({
                ok: true,
                horarios,
                msg: 'Ya existe un horario registrado.'
            });
        }
        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const horarioduplicado = async (req: Request, res: Response) => {

    const { periodoId, aulaId, areaId, dia, horaId } = req.params;

    try {

        const programacion: any = await Programacion.findOne({
            where: {
                estado: true,
                periodoId: periodoId,
                aulaId: aulaId,
                areaId: areaId
            },
            include: [
                {
                    model: Docente,
                    as: 'docente',
                    attributes: ['id']
                }
            ]
        });

        if (programacion) {
            const horario = await Horario.findOne({
                where: {
                    '$programacion.area.id$': areaId,
                    '$programacion.docente.id$': programacion.docenteId,
                    dia: dia,
                    horaId: horaId,
                    estado: true
                },
                include: [
                    {
                        model: Programacion,
                        as: 'programacion',
                        attributes: ['id', 'areaId', 'docenteId'],
                        include: [
                            {
                                model: Docente,
                                as: 'docente',
                                attributes: ['id']
                            },
                            {
                                model: Area,
                                as: 'area',
                                attributes: ['id']
                            }
                        ]
                    },
                ]
            });
            if (horario) {
                return res.json({
                    ok: true,
                    horario,
                    msg: 'Ya existe un horario registrado.'
                });
            }
        }


        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const horariosPeriodoAula = async (req: Request, res: Response) => {

    const { periodoId, aulaId } = req.params;
    try {
        const horarios = await Horario.findAll({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                estado: true
            },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: Hora,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },

                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'areaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
                            model: Area,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }

                    ]
                },
            ]
        });
        res.json({
            ok: true,
            horarios
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const horariosPeriodoDocente = async (req: Request, res: Response) => {

    const { periodoId, docenteId } = req.params;
    try {
        const horarios = await Horario.findAll({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.docente.id$': docenteId,
                estado: true
            },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: Hora,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'areaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId', 'tipovalor'],
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
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
                            model: Area,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            horarios
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getHorariosPorDia = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Horario.findAll({
            where: { 
                estado: true,
                dia: req.params.diaNombre  
            }
        })).length;
        const horarios = await Horario.findAll({
            where: { 
                estado: true,
                dia: req.params.diaNombre 
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: Hora,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },

                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'areaId', 'periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
                            model: Area,
                            as: 'area',
                            attributes: ['id','nombre']
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            horarios,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}