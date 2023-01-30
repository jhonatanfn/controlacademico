import { Request, Response } from "express";
import { Op } from 'sequelize';
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
import Area from "../models/area";
import Evaluacion from '../models/evaluacion';
import Ciclo from '../models/ciclo';
import Nota from "../models/nota";
import Asistencia from "../models/asistencia";
import Matriculadetalle from "../models/matriculadetalle";
import Padre from "../models/padre";
import Madre from "../models/madre";
import { handleHttpError } from "../utils/handleError";

export const getMatriculadetalles = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: { estado: true }
        })).length;
        const matriculadetalles = await Matriculadetalle.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            attributes: ['id', 'aprobado'],
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMatriculadetalle = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const matriculadetalle: any = await Matriculadetalle.findOne({
            where: {
                estado: true,
                id: id
            },
            attributes: ['id', 'aprobado'],
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Area,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }

                    ]
                }
            ]
        });

        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matriculadetalle con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            matriculadetalle
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postMatriculadetalle = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const matriculadetalle = Matriculadetalle.build(body);
        await matriculadetalle.save();

        const programacion: any = await Programacion.findOne({
            where: {
                id: body.programacionId
            },
            attributes:['id','numeromat','numeromaxmat']
        });
        await programacion?.update({
            numeromat: Number(programacion.numeromat) + 1
        });
        res.json({
            ok: true,
            msg: 'Matriculadetalle guardada exitosamente',
            matriculadetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const putMatriculadetalle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const matriculadetalle: any = await Matriculadetalle.findByPk(id);
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la matriculadetalle con el id: ${id}`
            });
        }
        await matriculadetalle?.update(body);
        res.json({
            ok: true,
            msg: 'Matriculadetalle actualizada exitosamente',
            matriculadetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const cambiarEstadoMatriculadetalle = async (req: Request, res: Response) =>{
    const { id, estado } = req.params;
    try {
        const matriculadetalle: any = await Matriculadetalle.findByPk(id);
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una matriculadetalle con el id: ${id}`
            });
        }
        await matriculadetalle?.update({ estado });
        res.json({
            ok: true,
            msg: 'Matriculadetalle actualizada exitosamente',
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const deleteMatriculadetalle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const matriculadetalle: any = await Matriculadetalle.findByPk(id);
        if (!matriculadetalle) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una matriculadetalle con el id: ${id}`
            });
        }
        await matriculadetalle?.update({ estado: false });

        const programacion: any = await Programacion.findOne({
            where: {
                id: matriculadetalle.programacionId
            }
        });
        programacion.numeromat = programacion.numeromat - 1;
        programacion.save();

        res.json({
            ok: true,
            msg: 'Matriculadetalle eliminada exitosamente',
            matriculadetalle
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMatriculadetalles = async (req: Request, res: Response) => {
    const { valor } = req.params;
    try {
        let data = await Matriculadetalle.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.aula.nombre$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                ],
            },
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const existeMatricula = async (req: Request, res: Response) => {
    const { periodo, aula, alumno } = req.params;
    try {
        const matriculadetalle = await Matriculadetalle.findOne({
            where: {
                '$programacion.periodo.id$': periodo,
                '$programacion.aula.id$': aula,
                '$matricula.alumno.id$': alumno,
                estado: true
            },
            include: [
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
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: Aula,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'tipovalor'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
                    ]
                }
            ]
        });

        if (matriculadetalle) {
            return res.json({
                ok: true,
                msg: 'El alumno ya esta matriculado'
            });
        }

        res.json({
            ok: false
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const aprobadoAlumno = async (req: Request, res: Response) => {
    const { alumnoId } = req.params;
    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                aprobado: true,
                '$matricula.alumno.id$': alumnoId,
            },
            include: [
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
        });
        if (matriculadetalles.length > 0){
            return res.json({
                ok: true,
                msg: "Alumno aprobado"
            });
        }
        res.json({
            ok: false,
            msg: "El alumno no está aprobado"
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const listarmatriculasanterior = async (req: Request, res: Response) => {
    const { alumnoId } = req.params;
    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
            },
            include: [
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
        });
        if (matriculadetalles.length > 0) {
            return res.json({
                ok: true,
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMatriculadetallesMatricula = async (req: Request, res: Response) => {
    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                matriculaId: req.params.matriculaId
            },
            attributes: ['id', 'aprobado','estado'],
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getMatriculadetallesMatriculaEstado = async (req: Request, res: Response) => {
    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                matriculaId: req.params.matriculaId
            },
            attributes: ['id', 'aprobado','estado'],
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}


export const getMatriculadetallesProgramacion = async (req: Request, res: Response) => {
    const { programacionId } = req.params;
    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                programacionId: programacionId
            },
            attributes: ['id', 'aprobado'],
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id'],
                            include: [
                                {
                                    model: Persona,
                                    as: 'persona',
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                                }
                            ]
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            total: matriculadetalles.length
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const getListadoAlumnos = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const areas: any[] = await Area.findAll({
            where: {
                estado: true
            }
        });
        if (areas.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: "Area no encontrada"
            });
        }

        const listado: any = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$programacion.aula.id$': aulaId,
                '$programacion.periodo.id$': periodoId,
            },
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
                            attributes: ['id'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id']
                        },
                        {
                            model: Area,
                            as: 'area',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });
        if(listado.length==0){
            return res.status(400).json({
                ok: false,
                msg: "No hay matriculas registradas para este periodo."
            });
        }
        const areaId = listado[0].programacion.area.id;
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$programacion.aula.id$': aulaId,
                '$programacion.periodo.id$': periodoId,
                '$programacion.area.id$': areaId,
            },
            attributes: ['id', 'aprobado'],
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
                            attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            total: matriculadetalles.length
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getListadoAlumnosProgramacion = async (req: Request, res: Response) => {
    const { programacionId, aulaId } = req.params;
    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$programacion.id$': programacionId,
            },
            attributes: ['id', 'aprobado'],
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
                    attributes: ['id']
                }
            ]
        });

        res.json({
            ok: true,
            matriculadetalles,
            total: matriculadetalles.length
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const matriculadetallesAlumno = async (req: Request, res: Response) => {

    const { alumnoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId
            },
            include: [
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
        })).length;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId
            },
            limit: 5,
            offset: desde,
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
                        },
                        {
                            model: Docente,
                            as: 'docente',
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
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}

export const matriculadetallesAlumnoPeriodo = async (req: Request, res: Response) => {

    const { alumnoId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            include: [
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
                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id'],
                    include: [
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        })).length;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
            },
            limit: 5,
            offset: desde,
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
                        },
                        {
                            model: Docente,
                            as: 'docente',
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
                            attributes: ['id', 'nombre']
                        },
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
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}

export const busquedaMatriculadetallesPorAlumno = async (req: Request, res: Response) => {

    const { alumnoId, valor } = req.params;
    try {
        let matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
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
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },

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
            busquedas: matriculadetalles,
            total: matriculadetalles.length,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMatriculadetallesPorAlumnoPeriodo = async (req: Request, res: Response) => {

    const { alumnoId, periodoId, valor } = req.params;
    try {
        let matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                '$programacion.periodo.id$': periodoId,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
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
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },

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
            busquedas: matriculadetalles,
            total: matriculadetalles.length,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const perteneceMatriculadetalleAlumno = async (req: Request, res: Response) => {

    const { matriculadetalleId, alumnoId } = req.params;
    try {
        const matriculadetalle = await Matriculadetalle.findOne({
            where: {
                estado: true,
                id: matriculadetalleId,
                '$matricula.alumno.id$': alumnoId
            },
            include: [
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
        });
        if (matriculadetalle) {
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

export const perteneceProgramacionAlumno = async (req: Request, res: Response) => {
    const { programacionId, alumnoId } = req.params;
    try {
        const matriculadetalle = await Matriculadetalle.findOne({
            where: {
                estado: true,
                '$matricula.alumno.id$': alumnoId,
                programacionId: programacionId
            },
            include: [
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
        });
        if (matriculadetalle) {
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

export const matriculasAlumnoPorPadre = async (req: Request, res: Response) => {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': id,
            },
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
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        })).length;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': id,
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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
        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const matriculasAlumnoPorMadre = async (req: Request, res: Response) => {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': id,
            },
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
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        })).length;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': id,
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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
        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const matriculasAlumnoPorPadrePeriodo = async (req: Request, res: Response) => {

    const { padreId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
            },
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
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id']
                        }
                    ]
                }
            ]
        })).length;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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

        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const matriculasAlumnoPorMadrePeriodo = async (req: Request, res: Response) => {

    const { madreId, periodoId } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
            },
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
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id']
                        }
                    ]
                }
            ]
        })).length;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
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
                                },
                                {
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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

        return res.json({
            ok: true,
            matriculadetalles,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMatriculadetallesPorAlumnoPadre = async (req: Request, res: Response) => {

    const { padreId, valor } = req.params;
    try {
        let matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
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
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMatriculadetallesPorAlumnoMadre = async (req: Request, res: Response) => {

    const { madreId, valor } = req.params;
    try {
        let matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
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
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ],
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMatriculadetallesPorAlumnoPadrePeriodo = async (req: Request, res: Response) => {

    const { padreId, periodoId, valor } = req.params;
    try {
        let matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
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
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ]
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMatriculadetallesPorAlumnoMadrePeriodo = async (req: Request, res: Response) => {

    const { madreId, periodoId, valor } = req.params;
    try {
        let matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
                [Op.or]: [
                    {
                        '$matricula.alumno.persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$matricula.alumno.persona.apellidomaterno$': {
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
                        '$programacion.area.nombre$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                ]
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
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
                                },
                                {
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre']
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
            total: matriculadetalles.length,
            busquedas: matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const perteneceMatriculaPadre = async (req: Request, res: Response) => {

    const { padreId, matriculadetalleId } = req.params;
    try {
        const matriculadetalle = await Matriculadetalle.findOne({
            where: {
                estado: true,
                id: matriculadetalleId,
                '$matricula.alumno.padre.id$': padreId
            },
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
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (matriculadetalle) {
            return res.json({
                ok: true,
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const perteneceMatriculaMadre = async (req: Request, res: Response) => {

    const { madreId, matriculadetalleId } = req.params;
    try {
        const matriculadetalle = await Matriculadetalle.findOne({
            where: {
                estado: true,
                id: matriculadetalleId,
                '$matricula.alumno.madre.id$': madreId
            },
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
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (matriculadetalle) {
            return res.json({
                ok: true,
            });
        }
        res.json({
            ok: false,
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const getMatriculadetallesPeriodoAula = async (req: Request, res: Response) => {
    const { periodoId, aulaId } = req.params;
    try {
        const areas: any[] = await Area.findAll({
            where: {
                estado: true
            }
        });
        if (areas.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: "Area no encontrada"
            });
        }
        const listado: any = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$programacion.aula.id$': aulaId,
                '$programacion.periodo.id$': periodoId,
            },
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
                            attributes: ['id'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id']
                        },
                        {
                            model: Area,
                            as: 'area',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });

        const areaId = listado[0].programacion.area.id;

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.area.id$': areaId
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC'
                ]
            ],
            attributes: ['id'],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId'],

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
                                },
                            ],
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
                            attributes: ['id', 'nombre', 'tipovalor']
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
                }
            ]
        });
        res.json({
            ok: true,
            matriculadetalles,
            total: matriculadetalles.length
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMatriculadetallesPeriodoAulaArea = async (req: Request, res: Response) => {
    const { periodoId, aulaId, areaId } = req.params;
    try {

        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                '$programacion.area.id$': areaId
            },
            order: [
                [
                    { model: Matricula, as: 'matricula' },
                    { model: Alumno, as: 'alumno' },
                    { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC'
                ]
            ],
            attributes: ['id'],
            include: [
                {
                    model: Matricula,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId'],

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
                                },
                            ],
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
                            attributes: ['id', 'nombre', 'tipovalor']
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
                }
            ]
        });
        res.json({
            ok: true,
            matriculadetalles,
            total: matriculadetalles.length
        });

    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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

                    ]
                },
            ]
        });

        return res.json({
            ok: true,
            matriculas
        });


    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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

                    ]
                }
            ]
        });
        res.json({
            ok: true,
            matriculas
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        },

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
        handleHttpError(res, "Se produjo un error.", 500, error);
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

                    ]
                },
            ]
        });

        return res.json({
            ok: true,
            matriculas
        });


    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                '$programacion.area.id$': areaId
            },
            order: [
                [{ model: Alumno, as: 'alumno' }, { model: Persona, as: 'persona' }, 'apellidopaterno', 'ASC']
            ],
            attributes: ['id'],
            include: [
                {
                    model: Alumno,
                    as: 'alumno',
                    required: false,
                    attributes: ['id'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        },

                    ],

                },
                {
                    model: Programacion,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat'],
                    include: [
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
                                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                                }
                            ]
                        },
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
            matriculas,
            total: matriculas.length
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
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
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
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
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const matriculasPadrePeriodo = async (req: Request, res: Response) => {

    const { padreId, periodoId } = req.params;

    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.padre.id$': padreId,
                '$programacion.periodo.id$': periodoId,
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
                                },
                                {
                                    model: Padre,
                                    as: 'padre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre', 'tipovalor'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const matriculasMadrePeriodo = async (req: Request, res: Response) => {

    const { madreId, periodoId } = req.params;

    try {
        const matriculadetalles = await Matriculadetalle.findAll({
            where: {
                estado: true,
                '$matricula.alumno.madre.id$': madreId,
                '$programacion.periodo.id$': periodoId,
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
                                },
                                {
                                    model: Madre,
                                    as: 'madre',
                                    attributes: ['id']
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
                            attributes: ['id', 'nombre', 'tipovalor'],
                        },
                        {
                            model: Periodo,
                            as: 'periodo',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
            ]
        });
        return res.json({
            ok: true,
            matriculadetalles
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
