"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramacionesAdministrador = exports.getProgramacionesAdministradorPeriodo = exports.busquedaProgramacionesSubareaPorDocentePeriodo = exports.getProgramacionesDocentePeriodoPaginado = exports.busquedaProgramacionesPorDocente = exports.programacionPeriodoPaginado = exports.busquedaProgramacionesSubareaPorDocente = exports.busquedaProgramacionesSubarea = exports.programacionPeriodo = exports.perteneceProgramacionDocente = exports.existeProgramacion = exports.busquedaProgramaciones = exports.deleteProgramacion = exports.putProgramacion = exports.postProgramacion = exports.getProgramacionesPeriodoAula = exports.getProgramacion = exports.getProgramaciones = exports.getProgramacionesDocentePeriodo = exports.getProgramacionesDocente = void 0;
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("../models/area"));
const aula_1 = __importDefault(require("../models/aula"));
const docente_1 = __importDefault(require("../models/docente"));
const grado_1 = __importDefault(require("../models/grado"));
const nivel_1 = __importDefault(require("../models/nivel"));
const periodo_1 = __importDefault(require("../models/periodo"));
const persona_1 = __importDefault(require("../models/persona"));
const programacion_1 = __importDefault(require("../models/programacion"));
const seccion_1 = __importDefault(require("../models/seccion"));
const subarea_1 = __importDefault(require("../models/subarea"));
const getProgramacionesDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { docente } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docente
            },
        })).length;
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docente
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacionesDocente = getProgramacionesDocente;
const getProgramacionesDocentePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { docente, periodo } = req.params;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacionesDocentePeriodo = getProgramacionesDocentePeriodo;
const getProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield programacion_1.default.findAll({
            where: { estado: true }
        })).length;
        const programaciones = yield programacion_1.default.findAll({
            where: { estado: true },
            order: [
                ['id', 'DESC']
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramaciones = getProgramaciones;
const getProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const programacion = yield programacion_1.default.findByPk(id, {
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacion = getProgramacion;
const getProgramacionesPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoid, aulaid } = req.params;
    try {
        const periodo = yield periodo_1.default.findByPk(periodoid);
        if (!periodo) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un periodo con el id: ${periodoid}`
            });
        }
        const aula = yield aula_1.default.findByPk(aulaid);
        if (!aula) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un aula con el id: ${aulaid}`
            });
        }
        const programaciones = yield programacion_1.default.findAll({
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    where: {
                        id: periodoid
                    }
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    where: {
                        id: aulaid
                    },
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacionesPeriodoAula = getProgramacionesPeriodoAula;
const postProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const programacion = programacion_1.default.build(body);
        yield programacion.save();
        res.json({
            ok: true,
            msg: 'Programacion creada exitosamente',
            programacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.postProgramacion = postProgramacion;
const putProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const programacion = yield programacion_1.default.findByPk(id);
        if (!programacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una programacion con el id: ${id}`
            });
        }
        yield (programacion === null || programacion === void 0 ? void 0 : programacion.update(body));
        res.json({
            ok: true,
            msg: 'Programacion actualizado exitosamente',
            programacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.putProgramacion = putProgramacion;
const deleteProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const programacion = yield programacion_1.default.findByPk(id);
        if (!programacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una programacion con el id: ${id}`
            });
        }
        yield (programacion === null || programacion === void 0 ? void 0 : programacion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Programacion eliminada exitosamente',
            programacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.deleteProgramacion = deleteProgramacion;
const busquedaProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                '$aula.nombre$': {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea'
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaProgramaciones = busquedaProgramaciones;
const existeProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodo, aula, subarea } = req.params;
    try {
        const programacion = yield programacion_1.default.findOne({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.existeProgramacion = existeProgramacion;
const perteneceProgramacionDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, docenteId } = req.params;
    try {
        const programacion = yield programacion_1.default.findOne({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.perteneceProgramacionDocente = perteneceProgramacionDocente;
const programacionPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                periodoId: id
            },
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.programacionPeriodo = programacionPeriodo;
const busquedaProgramacionesSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                '$subarea.nombre$': {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea'
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaProgramacionesSubarea = busquedaProgramacionesSubarea;
const busquedaProgramacionesSubareaPorDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, docenteId } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                '$docente.id$': docenteId,
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea'
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaProgramacionesSubareaPorDocente = busquedaProgramacionesSubareaPorDocente;
const programacionPeriodoPaginado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                periodoId: id
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.programacionPeriodoPaginado = programacionPeriodoPaginado;
const busquedaProgramacionesPorDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre']
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaProgramacionesPorDocente = busquedaProgramacionesPorDocente;
const getProgramacionesDocentePeriodoPaginado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { docente, periodo } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
        })).length;
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docente,
                periodoId: periodo
            },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: false,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre'],
                    required: false,
                    include: [
                        {
                            model: area_1.default,
                            as: 'area',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacionesDocentePeriodoPaginado = getProgramacionesDocentePeriodoPaginado;
const busquedaProgramacionesSubareaPorDocentePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, docenteId, periodoId } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                '$docente.id$': docenteId,
                periodoId: periodoId,
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea'
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaProgramacionesSubareaPorDocentePeriodo = busquedaProgramacionesSubareaPorDocentePeriodo;
const getProgramacionesAdministradorPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, valor } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                periodoId: periodoId,
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre']
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacionesAdministradorPeriodo = getProgramacionesAdministradorPeriodo;
const getProgramacionesAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: subarea_1.default,
                    as: 'subarea',
                    attributes: ['id', 'nombre']
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                            required: false
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getProgramacionesAdministrador = getProgramacionesAdministrador;
//# sourceMappingURL=programacion.js.map