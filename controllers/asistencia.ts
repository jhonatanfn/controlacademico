import { Request, Response } from "express";
import Alumno from "../models/alumno";
import { Op } from 'sequelize';
import Area from "../models/area";
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
import Subarea from "../models/subarea";
import Apoderado from "../models/apoderado";
import Ciclo from "../models/ciclo";

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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAsistencias = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Asistencia.findAll({
            where: { estado: true }
        })).length;

        const asistencias = await Asistencia.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [{
                model: Matricula,
                as: 'matricula',
                include: [
                    {
                        model: Alumno,
                        as: 'alumno',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    },
                    {
                        model: Programacion,
                        as: 'programacion',
                        include: [
                            {
                                model: Periodo,
                                as: 'periodo'
                            },
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
                                model: Subarea,
                                as: 'subarea',
                                include: [
                                    {
                                        model: Area,
                                        as: 'area'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAsistencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const asistencia: any = await Asistencia.findByPk(id, {
            include: [{
                model: Matricula,
                as: 'matricula',
                include: [
                    {
                        model: Alumno,
                        as: 'alumno',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    },
                    {
                        model: Programacion,
                        as: 'programacion',
                        include: [
                            {
                                model: Periodo,
                                as: 'periodo'
                            },
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
                                model: Subarea,
                                as: 'subarea',
                                include: [
                                    {
                                        model: Area,
                                        as: 'area'
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
            }
            ],
        });

        if (!asistencia || asistencia.estado == false) {
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area'
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area'
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
export const getAsistenciasRango = async (req: Request, res: Response) => {

    const { periodoId, aulaId, subareaId, fechainicial, fechafinal } = req.params;
    try {

        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.id$': subareaId,
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: Apoderado,
                                    as: 'apoderado',
                                    attributes: ['id']
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
                                {
                                    model: Apoderado,
                                    as: 'apoderado',
                                    attributes: ['id']
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
                                {
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
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
export const getAsistenciasPeriodo = async (req: Request, res: Response) => {
    const { periodoId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAsistenciasPeriodoAula = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
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
                                    attributes: ['id', 'nombre'],
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAsistenciasPeriodoAulaArea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
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
                                    attributes: ['id', 'nombre'],
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
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAsistenciasPeriodoAulaAreaSubarea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, subareaId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAsistenciasPeriodoAulaAreaSubareaCicloAlumno = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, subareaId, alumnoId } = req.params;
    try {
        const asistencias = await Asistencia.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
                matriculaId: alumnoId,
            },
            attributes: ['id', 'fecha', 'hora'],
            include: [
                {
                    model: Situacion,
                    as: 'situacion',
                    attributes: ['id', 'nombre', 'abreviatura', 'color']
                },
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'personaId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        },
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
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
                                    model: Subarea,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: Area,
                                            as: 'area',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
