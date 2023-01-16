
import { Request, Response } from "express";
import Alumno from "../models/alumno";
import { Op } from 'sequelize';
import Asistencia from "../models/asistencia";
import Aula from "../models/aula";
import Docente from "../models/docente";
import Grado from "../models/grado";
import Matricula from "../models/matricula";
import Nivel from "../models/nivel";
import Periodo from "../models/periodo";
import Persona from "../models/persona";
import Programacion from "../models/programacion";
import Seccion from "../models/seccion";
import Situacion from "../models/situacion";
import Matriculadetalle from "../models/matriculadetalle";
import Area from "../models/area";
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {

    try {
        const asistencias = await Asistencia.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            asistencias
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistencias = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Asistencia.findAll({
            where: {
                estado: true
            }
        })).length;
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Alumno,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: Persona,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                }
            ],
        });
        res.json({
            ok: true,
            asistencias,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const asistencia: any = await Asistencia.findOne({
            where: {
                estado: true
            },
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Alumno,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: Persona,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                }
            ]
        });

        if (!asistencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asistencia con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            asistencia
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postAsistencia = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const asistencia = Asistencia.build(body);
        await asistencia.save();
        res.json({
            ok: true,
            msg: 'Asistencia guardada exitosamente',
            asistencia
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const putAsistencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const asistencia: any = await Asistencia.findByPk(id);
        if (!asistencia || asistencia.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un asistencia con el id: ${id}`
            });
        }
        await asistencia?.update(body);
        res.json({
            ok: true,
            msg: 'Asistencia actualizada exitosamente',
            asistencia
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteAsistencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const asistencia: any = await Asistencia.findByPk(id);
        if (!asistencia || asistencia.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asistencia con el id: ${id}`
            });
        }
        await asistencia?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Asistencia eliminada exitosamente',
            asistencia
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const existeAsistencia = async (req: Request, res: Response) => {
    const { periodoId, aulaId, fecha } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                fecha: fecha,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id']
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (asistencias.length > 0) {
            return res.json({
                ok: true,
                msg: 'Ya existe asistencia registrada para esta fecha'
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const listadoAsistencias = async (req: Request, res: Response) => {
    const { periodoId, aulaId, fecha } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                fecha: fecha,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'matriculadetalleId', 'situacionId', 'fecha', 'hora', 'observacion'],
            order: [
                [
                    { model: Matriculadetalle, as: 'matriculadetalle' },
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Alumno,
                                    as: 'alumno',
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: Persona,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id']
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistenciasHoy = async (req: Request, res: Response) => {
    const { periodoId, fecha } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                fecha: fecha
            },
            attributes: ['id', 'fecha'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal']
                                },
                            ]
                        }

                    ]
                },
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistenciasAlumno = async (req: Request, res: Response) => {

    const { periodoId, aulaId, alumnoId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                }
            },
            attributes: ['id', 'fecha', 'hora', 'observacion'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        },
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Alumno,
                                    as: 'alumno',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias,
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistenciasPeriodo = async (req: Request, res: Response) => {
    const { periodoId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistenciasPeriodoAula = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                },
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getAsistenciasPeriodoAulaRango = async (req: Request, res: Response) => {
    const { periodoId, aulaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                }
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre']
                                },
                            ]
                        }
                    ]
                }
            ]
        });

        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getAsistenciasPeriodoAulaRangoAlumno = async (req: Request, res: Response) => {
    const { periodoId, aulaId, fechainicial, fechafinal, alumnoId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                }
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Alumno,
                                    as: 'alumno',
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
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            asistencias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getAsistenciasRango = async (req: Request, res: Response) => {
    const { periodoId, aulaId, fechainicial, fechafinal } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                }
            },
            order: [
                [
                    { model: Matriculadetalle, as: 'matriculadetalle' },
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura','color']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id'],
                            include: [
                                {
                                    model: Alumno,
                                    as: 'alumno',
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
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat'],
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
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
                                    attributes: ['id'],
                                    include: [
                                        {
                                            model: Persona,
                                            as: 'persona',
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}











export const getAsistenciasProgramacionFecha = async (req: Request, res: Response) => {

    const { programacionId, fecha } = req.params;
    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.id$': programacionId,
                fecha: fecha
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    include: [
                                        {
                                            model: Nivel,
                                            as: 'nivel'
                                        },
                                        {
                                            model: Grado,
                                            as: 'grado'
                                        },
                                        {
                                            model: Seccion,
                                            as: 'seccion'
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
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo'
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                }

            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const asistenciasPorMatricula = async (req: Request, res: Response) => {

    const { id, fechainicial } = req.params;

    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                matriculaId: id,
                fecha: fechainicial
            },
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    include: [
                                        {
                                            model: Nivel,
                                            as: 'nivel'
                                        },
                                        {
                                            model: Grado,
                                            as: 'grado'
                                        },
                                        {
                                            model: Seccion,
                                            as: 'seccion'
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
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo'
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                }

            ]
        });

        res.json({
            ok: true,
            asistencias
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const existeAsistenciaProgramacionFecha = async (req: Request, res: Response) => {

    const { programacionId, fecha } = req.params;

    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                fecha: fecha,
                '$matricula.programacion.id$': programacionId
            },
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion'
                        }
                    ]
                }
            ]
        });

        if (asistencias.length > 0) {
            return res.json({
                ok: true,
                msg: 'Ya existe asistencia registrada para esta fecha'
            });
        }
        res.json({
            ok: false,
            msg: ''
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}
export const getAsistenciasPeriodoAulaSubareaFecha = async (req: Request, res: Response) => {

    const { periodoId, aulaId, subareaId, fecha } = req.params;
    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                fecha: fecha
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }

            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const asistenciasPorMatriculaRango = async (req: Request, res: Response) => {

    const { matriculaId, fechainicial, fechafinal } = req.params;

    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                matriculaId: matriculaId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                }
            },
            order: [
                ['fecha', 'ASC']
            ],
            attributes: ['id', 'fecha', 'hora', 'matriculaId', 'situacionId'],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }

            ]
        });

        res.json({
            ok: true,
            asistencias
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}

export const getAsistenciasRangoMatricula = async (req: Request, res: Response) => {

    const { periodoId, aulaId, subareaId, matriculaId, fechainicial, fechafinal } = req.params;
    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                '$matricula.id$': matriculaId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                }
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }

            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const getAsistenciasPeriodoAulaSubareaFechaApoderado = async (req: Request, res: Response) => {

    const { periodoId, aulaId, subareaId, fecha, apoderadoId } = req.params;
    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                fecha: fecha,
                '$matricula.alumno.apoderado.id$': apoderadoId,
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                },

                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }

            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const getAsistenciasRangoApoderado = async (req: Request, res: Response) => {

    const { periodoId, aulaId, subareaId, fechainicial, fechafinal, apoderadoId } = req.params;
    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
                fecha: {
                    [Op.between]: [fechainicial, fechafinal]
                },
                '$matricula.alumno.apoderado.id$': apoderadoId,
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                },

                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
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
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
                                        }
                                    ]
                                },
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },

                            ]
                        }

                    ]
                },
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                }

            ]
        });
        res.json({
            ok: true,
            total: asistencias.length,
            asistencias
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}



