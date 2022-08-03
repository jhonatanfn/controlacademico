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
import Subarea from "../models/subarea";

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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            programaciones,
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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            programaciones,
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
export const getProgramacion = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const programacion: any = await Programacion.findByPk(id, {
            include: [
                {
                    model: Aula,
                    as: 'aula',
                    attributes: ['id', 'nombre'],
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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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

        if (!programacion || programacion.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una programacion con el id: ${id}`
            });
        }

        res.json({
            ok: true,
            programacion
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
            include: [
                {
                    model: Periodo,
                    as: 'periodo',
                    where: {
                        id: periodoid
                    }
                },
                {
                    model: Aula,
                    as: 'aula',
                    where: {
                        id: aulaid
                    },
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
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }

}
export const postProgramacion = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const programacion = Programacion.build(body);
        await programacion.save();
        res.json({
            ok: true,
            msg: 'Programacion creada exitosamente',
            programacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                msg: `No existe una programacion con el id: ${id}`
            });
        }
        await programacion?.update(body);
        res.json({
            ok: true,
            msg: 'Programacion actualizado exitosamente',
            programacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteProgramacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const programacion: any = await Programacion.findByPk(id);
        if (!programacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una programacion con el id: ${id}`
            });
        }
        await programacion?.update({ estado: false });
        res.json({
            ok: true,
            msg: 'Programacion eliminada exitosamente',
            programacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaProgramaciones = async (req: Request, res: Response) => {
    const { valor } = req.params;

    try {

        const data = await Programacion.findAll({
            where: {
                '$aula.nombre$': {
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
                    model: Subarea,
                    as: 'subarea'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}
export const existeProgramacion = async (req: Request, res: Response) => {

    const { periodo, aula, subarea } = req.params;

    try {

        const programacion = await Programacion.findOne({
            where: {
                periodoId: periodo,
                aulaId: aula,
                subareaId: subarea,
                estado: true
            }
        });
        if (programacion) {
            return res.json({
                ok: true,
                msg: 'Ya existe una programación con esos parametros'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                    model: Subarea,
                    as: 'subarea'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}
export const busquedaProgramacionesSubareaPorDocente = async (req: Request, res: Response) => {
    const { valor, docenteId } = req.params;
    try {
        const data = await Programacion.findAll({
            where: {
                [Op.or]: [
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
                '$docente.id$': docenteId,
                estado: true
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },
                {
                    model: Subarea,
                    as: 'subarea'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
            limit: 5,
            offset: desde,
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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            programaciones,
            desde,
            total: programaciones.length
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre']

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
                    attributes: ['id', 'nombre']
                },
                {
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            programaciones,
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
export const busquedaProgramacionesSubareaPorDocentePeriodo = async (req: Request, res: Response) => {
    const { valor, docenteId, periodoId } = req.params;
    try {
        const data = await Programacion.findAll({
            where: {
                [Op.or]: [
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
                '$docente.id$': docenteId,
                periodoId: periodoId,
                estado: true
            },
            include: [
                {
                    model: Periodo,
                    as: 'periodo'
                },
                {
                    model: Subarea,
                    as: 'subarea'
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre']

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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}

export const getProgramacionesAdministrador = async (req: Request, res: Response) => {
    const {  valor } = req.params;

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
                    model: Subarea,
                    as: 'subarea',
                    attributes: ['id', 'nombre']

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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }


}