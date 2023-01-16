import { Request, Response } from "express";
import Alumno from '../models/alumno';
import Persona from '../models/persona';
import { Op, where } from 'sequelize';
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
import Evaluacion from "../models/evaluacion";
import Ciclo from "../models/ciclo";
import Matriculadetalle from "../models/matriculadetalle";
import Competencia from "../models/competencia";
import Area from "../models/area";
import Apreciacion from "../models/apreciacion";
import { handleHttpError } from "../utils/handleError";

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postNota = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const nota = Nota.build(body);
        await nota.save();
        res.json({
            ok: true,
            msg: 'Nota creada exitosamente.',
            nota
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const cambiarEstadoNota = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        let msg = "";
        const nota: any = await Nota.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        if (body.estado) {
            await nota?.update({ estado: false });
            msg = "Registro eliminado con exito.";
        } else {
            await nota?.update({ estado: true });
            msg = "Registro recuperado con exito.";
        }
        res.json({
            ok: true,
            msg: msg,
            nota
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}



export const getNotasProgramacionFechaEvaluacionCicloCompetencia = async (req: Request, res: Response) => {
    const { programacionId, fecha, evaluacionId, cicloId, competenciaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                evaluacionId: evaluacionId,
                cicloId: cicloId,
                competenciaId: competenciaId,
                '$matriculadetalle.programacion.id$': programacionId,
                fecha: fecha,
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
            attributes: ['id', 'valor', 'fecha', 'hora', 'evaluacionId', 'cicloId', 'matriculadetalleId', 'competenciaId'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
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
                                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                        }
                                    ]
                                },
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
                                    attributes: ['id', 'tipovalor']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            notas,
            total: notas.length,
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasHoyLiteral = async (req: Request, res: Response) => {
    const { periodoId, fecha } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.tipovalor$': 1,
                fecha: fecha
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getNotasHoyVigesimal = async (req: Request, res: Response) => {
    const { periodoId, fecha } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.tipovalor$': 2,
                fecha: fecha
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    include: [
                        {
                            model: Programacion,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasMatriculaCicloEvaluacion = async (req: Request, res: Response) => {

    const { matriculadetalleId, cicloId, evaluacionId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                matriculadetalleId: matriculadetalleId,
                cicloId: cicloId,
                evaluacionId: evaluacionId
            },
            attributes: ['id', 'valor', 'fecha', 'hora'],
            include: [
                {
                    model: Evaluacion,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion'],
                    include: [
                        {
                            model: Area,
                            as: 'area',
                            attributes: ['id', 'nombre']
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasPeriodo = async (req: Request, res: Response) => {
    const { periodoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'valor'],
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
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasPeriodoAula = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'valor'],
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
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor']
                                }
                            ]
                        }
                    ]
                },
            ]
        });
        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasPeriodoAulaArea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.programacion.area.id$': areaId,
            },
            attributes: ['id', 'valor'],
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
                                    model: Periodo,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });

        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getNotasPeriodoAulaAreaCiclo = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, cicloId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.programacion.area.id$': areaId,
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
        });
        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasPeriodoAulaAreaCicloAlumno = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId, cicloId, alumnoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.programacion.area.id$': areaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                cicloId: cicloId,
            },
            attributes: ['id', 'valor', 'fecha'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Evaluacion,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
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
                                },
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
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });

        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasPeriodoAulaCicloAlumno = async (req: Request, res: Response) => {
    const { periodoId, aulaId, cicloId, alumnoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
                cicloId: cicloId,
            },
            attributes: ['id', 'valor', 'fecha', 'hora'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Evaluacion,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
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
                                },
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
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });

        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getNotasPeriodoAulaAlumno = async (req: Request, res: Response) => {
    const { periodoId, aulaId, alumnoId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                estado: true,
                '$matriculadetalle.programacion.periodo.id$': periodoId,
                '$matriculadetalle.programacion.aula.id$': aulaId,
                '$matriculadetalle.matricula.alumno.id$': alumnoId,
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
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
                                },
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
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: Aula,
                                    as: 'aula',
                                    attributes: ['id', 'nombre', 'tipovalor'],
                                },
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
        });

        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getNotasCicloMatriculadetalle = async (req: Request, res: Response) => {
    const { cicloId, matriculadetalleId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                '$matriculadetalle.id$': matriculadetalleId,
                '$ciclo.id$': cicloId
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: ['id', 'valor', 'fecha', 'hora', 'estado'],
            include: [
                {
                    model: Competencia,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                },
                {
                    model: Ciclo,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id']
                }
            ]
        });

        res.json({
            ok: true,
            notas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const existeNotasMatricula = async (req: Request, res: Response) => {
    const { matriculaId } = req.params;
    try {
        const notas = await Nota.findAll({
            where: {
                '$matriculadetalle.matricula.id$': matriculaId,
            },
            attributes: ['id'],
            include: [
                {
                    model: Matriculadetalle,
                    as: 'matriculadetalle',
                    attributes: ['id'],
                    include: [
                        {
                            model: Matricula,
                            as: 'matricula',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });
        if (notas.length > 0) {
            return res.json({
                ok: true,
                msg:"No se puede eliminar la matricula."
            });
        }
        res.json({
            ok: false
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}




