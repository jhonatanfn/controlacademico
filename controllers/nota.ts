import { Request, Response } from "express";
import Alumno from '../models/alumno';
import Persona from '../models/persona';
import { Op } from 'sequelize';
import Tipodocumento from '../models/tipodocumento';
import Nota from "../models/nota";
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
import Evaluacion from "../models/evaluacion";
import Ciclo from "../models/ciclo";

export const busquedaNotas = async (req: Request, res: Response) => {

    const { valor } = req.params;

    try {

        const data = await Nota.findAll({
            where: {
                '$matricula.alumno.persona.nombres$': {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    required: true,
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
                                            required: true,
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
                    model: Evaluacion,
                    as: 'evaluacion'
                },
                {
                    model: Ciclo,
                    as: 'ciclo'
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
export const getNotas = async (req: Request, res: Response) => {

    const desde = Number(req.query.desde) || 0;

    try {

        const total = (await Nota.findAll({
            where: { estado: true }
        })).length;

        const notas = await Nota.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            required: false,
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
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
                },
                {
                    model: Evaluacion,
                    as: 'evaluacion'
                },
                {
                    model: Ciclo,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            notas,
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
export const getNota = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const nota: any = await Nota.findByPk(id, {
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            required: false,
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
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
                },
                {
                    model: Evaluacion,
                    as: 'evaluacion'
                },
                {
                    model: Ciclo,
                    as: 'ciclo'
                }
            ]
        });

        if (!nota || nota.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la nota con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            nota
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const postNota = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const nota = Nota.build(body);
        await nota.save();
        res.json({
            ok: true,
            msg: 'Nota creada exitosamente',
            nota
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const putNota = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const nota: any = await Nota.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        await nota?.update(body);
        res.json({
            ok: true,
            msg: 'Nota actualizada exitosamente',
            nota
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteNota = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const nota: any = await Nota.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        await nota?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Nota eliminado exitosamente',
            nota
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasProgramacionFechaEvaluacionCiclo = async (req: Request, res: Response) => {

    const { programacionId, fecha, evaluacionId, cicloId } = req.params;
    try {

        const notas = await Nota.findAll({
            where: {
                estado: true,
                evaluacionId: evaluacionId,
                cicloId: cicloId,
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
                    model: Evaluacion,
                    as: 'evaluacion'
                },
                {
                    model: Ciclo,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            total: notas.length,
            notas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasMatricula = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const notas = await Nota.findAll({
            where: {
                estado: true,
                matriculaId: id
            },
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
        });
        res.json({
            ok: true,
            notas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}
export const getNotasMatriculaCicloEvaluacion = async (req: Request, res: Response) => {

    const { matriculaId, cicloId, evaluacionId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                matriculaId: matriculaId,
                cicloId: cicloId,
                evaluacionId: evaluacionId
            },
            include: [
                {
                    model: Matricula,
                    as: 'matricula'
                },
                {
                    model: Evaluacion,
                    as: 'evaluacion'
                },
                {
                    model: Ciclo,
                    as: 'ciclo'
                }
            ]
        });

        res.json({
            ok: true,
            notas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const getNotasArea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, cicloId, alumnoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                cicloId: cicloId,
                '$matricula.alumno.id$': alumnoId,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
            },
            attributes: ['id', 'valor', 'fecha'],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: Alumno,
                            as: 'alumno',
                            attributes: ['id', 'personaId', 'apoderadoId'],
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
                            attributes: ['id', 'aulaId', 'docenteId', 'periodoId', 'subareaId'],
                            include: [
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nivelId', 'gradoId', 'seccionId'],
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
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
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
                    model: Evaluacion,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                }
            ]
        });

        res.json({
            ok: true,
            notas
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}


export const getNotasPeriodo = async (req: Request, res: Response) => {
    const { periodoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'valor'],
            include: [
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
                            ]
                        }
                    ]
                }
            ]
        });

        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasPeriodoAula = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'valor'],
            include: [
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
            notas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasPeriodoAulaArea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
            },
            attributes: ['id', 'valor'],
            include: [
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
            notas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasPeriodoAulaAreaSubarea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, subareaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
            },
            attributes: ['id', 'valor'],
            include: [
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
            notas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasPeriodoAulaAreaSubareaCiclo = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, subareaId, cicloId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
                cicloId: cicloId,

            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
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
            notas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getNotasPeriodoAulaAreaSubareaCicloAlumno = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, subareaId, cicloId, alumnoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
                '$matricula.programacion.subarea.id$': subareaId,
                cicloId: cicloId,
                matriculaId: alumnoId,

            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
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
            notas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}