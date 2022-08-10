import { Request, Response } from "express";
import { Op, Sequelize } from 'sequelize';
import Alumno from '../models/alumno';
import Persona from '../models/persona';
import Tipodocumento from '../models/tipodocumento';
import Matricula from "../models/matricula";
import Programacion from "../models/programacion";
import Aula from "../models/aula";
import Nivel from "../models/nivel";
import Grado from "../models/grado";
import Seccion from "../models/seccion";
import Docente from "../models/docente";
import Periodo from "../models/periodo";
import Subarea from "../models/subarea";
import Area from "../models/area";
import Evaluacion from '../models/evaluacion';
import Ciclo from '../models/ciclo';
import Nota from "../models/nota";
import Asistencia from "../models/asistencia";
import Apoderado from "../models/apoderado";

export const getMatriculasProgramacion = async (req: Request, res: Response) => {
    const { programacion } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                programacionId: programacion
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,

                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },

                    ],

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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
                },
                {
                    model: Asistencia,
                    as: 'asistencia'
                }
            ]
        });

        if (matriculas.length > 0) {
            return res.json({
                ok: true,
                matriculas,
                total: matriculas.length
            });
        } else {
            res.json({
                ok: false,
                msg: "No hay registros"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculas = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matricula.findAll({
            where: { estado: true }
        })).length;

        const matriculas = await Matricula.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                            required: false,
                            include: [
                                {
                                    model: Tipodocumento,
                                    as: 'tipodocumento'
                                }
                            ]
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
        });
        res.json({
            ok: true,
            matriculas,
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
export const getMatriculasSubarea = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;
    const { subareaId } = req.params;
    try {
        const total = (await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.subarea.id$': subareaId,
            },
            include: [
                {
                    model: Programacion,
                    as: 'programacion',
                    include: [
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
        })).length;

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.subarea.id$': subareaId,
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                            required: false,
                            include: [
                                {
                                    model: Tipodocumento,
                                    as: 'tipodocumento'
                                }
                            ]
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
        });
        res.json({
            ok: true,
            matriculas,
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
export const getMatricula = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const matricula: any = await Matricula.findByPk(id, {

            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                            required: false,
                            include: [
                                {
                                    model: Tipodocumento,
                                    as: 'tipodocumento'
                                }
                            ]
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
        });

        if (!matricula || matricula.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matricula con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            matricula
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const postMatricula = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const matricula = Matricula.build(body);
        await matricula.save();

        const programacion: any = await Programacion.findOne({
            where: {
                id: body.programacionId
            }
        });
        programacion.numeromat = programacion.numeromat + 1;
        programacion.save();

        res.json({
            ok: true,
            msg: 'Matricula guardada exitosamente',
            matricula
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const putMatricula = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const matricula: any = await Matricula.findByPk(id);
        if (!matricula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matricula con el id: ${id}`
            });
        }
        await matricula?.update(body);
        res.json({
            ok: true,
            msg: 'Matricula actualizada exitosamente',
            matricula
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteMatricula = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const matricula: any = await Matricula.findByPk(id);
        if (!matricula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una matricula con el id: ${id}`
            });
        }
        await matricula?.update({ estado: false });

        const programacion: any = await Programacion.findOne({
            where: {
                id: matricula.programacionId
            }
        });
        programacion.numeromat += 1;
        programacion.save();

        res.json({
            ok: true,
            msg: 'Matricula eliminada exitosamente',
            matricula
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaMatriculas = async (req: Request, res: Response) => {

    const { valor } = req.params;
    try {

        let data = await Matricula.findAll({

            where: {
                '$alumno.persona.nombres$': {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: true,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            required: true
                        }
                    ]
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
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
export const existeMatricula = async (req: Request, res: Response) => {

    const { periodo, aula, alumno } = req.params;
    try {

        const matricula = await Matricula.findOne({
            where: {
                alumnoId: alumno,
                estado: true
            },
            include: [
                {
                    model: Programacion,
                    as: 'programacion',
                    where: {
                        periodoId: periodo,
                        aulaId: aula
                    }
                }
            ]
        });

        if (matricula) {
            return res.json({
                ok: true,
                msg: 'El alumno ya esta matriculado'
            });
        }

        res.json({
            ok: false
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}
export const matriculasAlumno = async (req: Request, res: Response) => {

    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matricula.findAll({
            where: { estado: true, alumnoId: id },
        })).length;

        const matriculas = await Matricula.findAll({
            where: { estado: true, alumnoId: id },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
        });
        res.json({
            ok: true,
            matriculas,
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
export const perteneceMatriculaAlumno = async (req: Request, res: Response) => {

    const { matriculaId, alumnoId } = req.params;
    try {
        const matricula = await Matricula.findOne({
            where: {
                estado: true,
                id: matriculaId,
                alumnoId: alumnoId
            }
        });
        if (matricula) {
            return res.json({
                ok: true
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}
export const perteneceProgramacionAlumno = async (req: Request, res: Response) => {

    const { programacionId, alumnoId } = req.params;
    try {
        const matricula = await Matricula.findOne({
            where: {
                estado: true,
                alumnoId: alumnoId,
                programacionId: programacionId
            }
        });
        if (matricula) {
            return res.json({
                ok: true
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const matriculasProgramacionCiclo = async (req: Request, res: Response) => {

    const { programacionId, cicloId } = req.params;
    try {

        const matriculas = await Matricula.findAll({

            where: {
                programacionId: programacionId,
                '$nota.ciclo.id$': cicloId,
                estado: true,
            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    include: [
                        {
                            model: Evaluacion,
                            as: 'evaluacion'
                        },
                        {
                            model: Ciclo,
                            as: 'ciclo'
                        }
                    ]
                }
            ]

        });

        res.json({
            ok: true,
            total: matriculas.length,
            matriculas
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const getMatriculasProgramacionRangoFechas = async (req: Request, res: Response) => {
    const { programacionId, fechainicial } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                programacionId: programacionId,
                '$asistencia.fecha$': fechainicial,
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,

                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },

                    ],

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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
                },
                {
                    model: Asistencia,
                    as: 'asistencia'
                }

            ]

        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const matriculasAlumnoPorApoderado = async (req: Request, res: Response) => {

    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': id,
            },
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },
                        {
                            model: Apoderado,
                            as: 'apoderado',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona'
                                }
                            ]
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
                                    as: 'persona'
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
                },
            ]
        })).length;

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': id,
            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },
                        {
                            model: Apoderado,
                            as: 'apoderado',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona'
                                }
                            ]
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
                                    as: 'persona'
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
                },
            ]
        });

        return res.json({
            ok: true,
            matriculas,
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
export const perteneceMatriculaApoderado = async (req: Request, res: Response) => {

    const { apoderadoId, matriculaId } = req.params;
    try {
        const matricula = await Matricula.findOne({

            where: {
                estado: true,
                id: matriculaId,
                '$alumno.apoderado.id$': apoderadoId
            },

            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Apoderado,
                            as: 'apoderado'
                        }
                    ]
                }
            ]
        });

        if (matricula) {
            return res.json({
                ok: true,
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
export const getMatriculasPeriodoAulaSubareaCiclo = async (req: Request, res: Response) => {
    const { periodoId, aulaId, subareaId, cicloId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: Ciclo,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                            where: {
                                id: cicloId
                            }
                        },
                        {
                            model: Evaluacion,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaMatriculasPorAlumnoApoderado = async (req: Request, res: Response) => {

    const { apoderadoId, valor } = req.params;
    try {
        let matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                [Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [

                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
            ]
        });

        res.json({
            ok: true,
            total: matriculas.length,
            busquedas: matriculas
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaMatriculasPorAlumno = async (req: Request, res: Response) => {

    const { alumnoId, valor } = req.params;
    try {
        let matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.id$': alumnoId,
                [Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: Programacion, as: 'programacion' },
                    { model: Subarea, as: 'subarea' },
                    'nombre', 'ASC'
                ]
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [

                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
            ]
        });

        res.json({
            ok: true,
            total: matriculas.length,
            busquedas: matriculas
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasAnual = async (req: Request, res: Response) => {
    const { periodoId, aulaId, subareaId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: Ciclo,
                            as: 'ciclo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Evaluacion,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaMatriculasSubarea = async (req: Request, res: Response) => {

    const { valor, subareaId } = req.params;
    try {

        let data = await Matricula.findAll({

            where: {
                '$alumno.persona.nombres$': {
                    [Op.like]: `%${valor}%`
                },
                estado: true,
                '$programacion.subarea.id$': subareaId,
            },
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: true,
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            required: true
                        }
                    ]
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
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
export const getMatriculasPeriodoAulaSubarea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, subareaId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },

                    ],

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
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                        },
                        {
                            model: Docente,
                            as: 'docente',
                            include:[
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes:['id','numero','nombres','apellidopaterno','apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculaCiclo = async (req: Request, res: Response) => {
    const { matriculaId, cicloId } = req.params;
    try {

        const matricula = await Matricula.findOne({
            where: {
                estado: true,
                id: matriculaId,
            },
            attributes: ['id', 'programacionId', 'alumnoId'],
            include: [

                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: Ciclo,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                            where: {
                                id: cicloId
                            }
                        },
                        {
                            model: Evaluacion,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matricula
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const matriculasApoderado = async (req: Request, res: Response) => {

    const { apoderadoId } = req.params;
    try {
        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],

            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },
                        {
                            model: Apoderado,
                            as: 'apoderado',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona'
                                }
                            ]
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
                                    as: 'persona'
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
                },
            ]
        });

        return res.json({
            ok: true,
            matriculas
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasPeriodoAulaSubareaCicloApoderado = async (req: Request, res: Response) => {
    const { periodoId, aulaId, subareaId, cicloId, apoderadoId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: Ciclo,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                            where: {
                                id: cicloId
                            }
                        },
                        {
                            model: Evaluacion,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasPeriodoAulaSubareaaApoderado = async (req: Request, res: Response) => {
    const { periodoId, aulaId, subareaId, apoderadoId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }

                    ],

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
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                        },
                        {
                            model: Docente,
                            as: 'docente',
                            include:[
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes:['id','numero','nombres','apellidopaterno','apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasAnualApoderado = async (req: Request, res: Response) => {
    const { periodoId, aulaId, subareaId, apoderadoId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.id$': subareaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }
                    ],
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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: Ciclo,
                            as: 'ciclo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Evaluacion,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const matriculasAlumnoPorApoderadoPeriodo = async (req: Request, res: Response) => {

    const { apoderadoId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
            },
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },
                        {
                            model: Apoderado,
                            as: 'apoderado',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona'
                                }
                            ]
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
                                    as: 'persona'
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
                },
            ]
        })).length;

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },
                        {
                            model: Apoderado,
                            as: 'apoderado',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona'
                                }
                            ]
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
                                    as: 'persona'
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
                },
            ]
        });

        return res.json({
            ok: true,
            matriculas,
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
export const busquedaMatriculasPorAlumnoApoderadoPeriodo = async (req: Request, res: Response) => {

    const { apoderadoId, periodoId, valor } = req.params;
    try {
        let matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
                [Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],

            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [

                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
            ]
        });

        res.json({
            ok: true,
            total: matriculas.length,
            busquedas: matriculas
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const matriculasAlumnoPeriodo = async (req: Request, res: Response) => {

    const { alumnoId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matricula.findAll({
            where: {
                estado: true,
                alumnoId: alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            include: [
                {
                    model: Programacion,
                    as: 'programacion',
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo'
                        },
                    ]
                }
            ]
        })).length;

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                alumnoId: alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
        });
        res.json({
            ok: true,
            matriculas,
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
export const busquedaMatriculasPorAlumnoPeriodo = async (req: Request, res: Response) => {

    const { alumnoId, periodoId, valor } = req.params;
    try {
        let matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
                [Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.docente.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: Programacion, as: 'programacion' },
                    { model: Subarea, as: 'subarea' },
                    'nombre', 'ASC'
                ]
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [

                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id', 'apoderadoId', 'personaId'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
            ]
        });

        res.json({
            ok: true,
            total: matriculas.length,
            busquedas: matriculas
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const matriculasAlumnoReporte = async (req: Request, res: Response) => {

    const { alumnoId } = req.params;
    try {
        const matriculas = await Matricula.findAll({
            where: { estado: true, alumnoId: alumnoId },
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                    required: false,
                                    include: [
                                        {
                                            model: Tipodocumento,
                                            as: 'tipodocumento'
                                        }
                                    ]
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
        });
        res.json({
            ok: true,
            matriculas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const getMatriculaAnual = async (req: Request, res: Response) => {
    const { matriculaId } = req.params;
    try {

        const matricula = await Matricula.findOne({
            where: {
                estado: true,
                id: matriculaId,
            },
            attributes: ['id', 'programacionId', 'alumnoId'],
            include: [

                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },

                    ],

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
                                    required: false
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                },
                {
                    model: Nota,
                    as: 'nota',
                    attributes: ['id', 'valor', 'fecha', 'evaluacionId', 'cicloId'],
                    include: [
                        {
                            model: Ciclo,
                            as: 'ciclo',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: Evaluacion,
                            as: 'evaluacion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matricula
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const matriculasApoderadoPeriodoAula = async (req: Request, res: Response) => {

    const { apoderadoId, periodoId, aulaId } = req.params;
    try {
        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$alumno.apoderado.id$': apoderadoId,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
            },
            order: [
                [
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],

            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    include: [
                        {
                            model: Persona,
                            as: 'persona'
                        },
                        {
                            model: Apoderado,
                            as: 'apoderado',
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona'
                                }
                            ]
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
                                    as: 'persona'
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
                },
            ]
        });

        return res.json({
            ok: true,
            matriculas
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasPeriodoAulaArea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.area.id$': areaId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId', 'apoderadoId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },

                    ],

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
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                        },
                        {
                            model: Docente,
                            as: 'docente',
                            include:[
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes:['id','numero','nombres','apellidopaterno','apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasPeriodoAulaAreaApoderado = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, apoderadoId } = req.params;
    try {

        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.subarea.area.id$': areaId,
                '$alumno.apoderado.id$': apoderadoId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id', 'alumnoId', 'programacionId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                                }
                            ]
                        }

                    ],

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
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
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
                        },
                        {
                            model: Docente,
                            as: 'docente',
                            include:[
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes:['id','numero','nombres','apellidopaterno','apellidomaterno']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getMatriculasPeriodoAula= async (req: Request, res: Response)=>{
    const { periodoId, aulaId } = req.params;
    try {
        const matriculas = await Matricula.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: [
                'id', 
                'alumnoId', 
                'programacionId',
            ],
            group: ['alumnoId'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id', 'alumnoId', 'personaId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                        },
                    ],
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'aulaId','periodoId'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre','fechainicial','fechafinal'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas,
            total: matriculas.length
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}