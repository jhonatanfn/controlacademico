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
exports.getNotasPeriodoAulaAreaSubareaCicloAlumno = exports.getNotasPeriodoAulaAreaSubareaCiclo = exports.getNotasPeriodoAulaAreaSubarea = exports.getNotasPeriodoAulaArea = exports.getNotasPeriodoAula = exports.getNotasPeriodo = exports.getNotasArea = exports.getNotasMatriculaCicloEvaluacion = exports.getNotasMatricula = exports.getNotasProgramacionFechaEvaluacionCiclo = exports.deleteNota = exports.putNota = exports.postNota = exports.getNota = exports.getNotas = exports.busquedaNotas = void 0;
const alumno_1 = __importDefault(require("../models/alumno"));
const persona_1 = __importDefault(require("../models/persona"));
const sequelize_1 = require("sequelize");
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const nota_1 = __importDefault(require("../models/nota"));
const matricula_1 = __importDefault(require("../models/matricula"));
const programacion_1 = __importDefault(require("../models/programacion"));
const aula_1 = __importDefault(require("../models/aula"));
const nivel_1 = __importDefault(require("../models/nivel"));
const grado_1 = __importDefault(require("../models/grado"));
const seccion_1 = __importDefault(require("../models/seccion"));
const docente_1 = __importDefault(require("../models/docente"));
const periodo_1 = __importDefault(require("../models/periodo"));
const subarea_1 = __importDefault(require("../models/subarea"));
const area_1 = __importDefault(require("../models/area"));
const evaluacion_1 = __importDefault(require("../models/evaluacion"));
const ciclo_1 = __importDefault(require("../models/ciclo"));
const busquedaNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield nota_1.default.findAll({
            where: {
                '$matricula.alumno.persona.nombres$': {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            },
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: true,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            required: true,
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    required: true
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel'
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado'
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion'
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                            required: true,
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo'
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
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
exports.busquedaNotas = busquedaNotas;
const getNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield nota_1.default.findAll({
            where: { estado: true }
        })).length;
        const notas = yield nota_1.default.findAll({
            where: { estado: true },
            limit: 5,
            offset: desde,
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            required: false,
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    include: [
                                        {
                                            model: tipodocumento_1.default,
                                            as: 'tipodocumento'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel'
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado'
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion'
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                            required: false,
                                            include: [
                                                {
                                                    model: tipodocumento_1.default,
                                                    as: 'tipodocumento'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo'
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotas = getNotas;
const getNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nota = yield nota_1.default.findByPk(id, {
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            required: false,
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    include: [
                                        {
                                            model: tipodocumento_1.default,
                                            as: 'tipodocumento'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel'
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado'
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion'
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno'],
                                            required: false,
                                            include: [
                                                {
                                                    model: tipodocumento_1.default,
                                                    as: 'tipodocumento'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo'
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNota = getNota;
const postNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const nota = nota_1.default.build(body);
        yield nota.save();
        res.json({
            ok: true,
            msg: 'Nota creada exitosamente',
            nota
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
exports.postNota = postNota;
const putNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const nota = yield nota_1.default.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        yield (nota === null || nota === void 0 ? void 0 : nota.update(body));
        res.json({
            ok: true,
            msg: 'Nota actualizada exitosamente',
            nota
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
exports.putNota = putNota;
const deleteNota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nota = yield nota_1.default.findByPk(id);
        if (!nota) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un Nota con el id: ${id}`
            });
        }
        yield (nota === null || nota === void 0 ? void 0 : nota.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Nota eliminado exitosamente',
            nota
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
exports.deleteNota = deleteNota;
const getNotasProgramacionFechaEvaluacionCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { programacionId, fecha, evaluacionId, cicloId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                evaluacionId: evaluacionId,
                cicloId: cicloId,
                '$matricula.programacion.id$': programacionId,
                fecha: fecha
            },
            order: [
                [
                    { model: matricula_1.default, as: 'matricula' },
                    { model: alumno_1.default, as: 'alumno' },
                    { model: persona_1.default, as: 'persona' },
                    'apellidopaterno', 'ASC'
                ]
            ],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    required: false,
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel'
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado'
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion'
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                        }
                                    ]
                                },
                                {
                                    model: periodo_1.default,
                                    as: 'periodo'
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    include: [
                                        {
                                            model: area_1.default,
                                            as: 'area'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            total: notas.length,
            notas
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
exports.getNotasProgramacionFechaEvaluacionCiclo = getNotasProgramacionFechaEvaluacionCiclo;
const getNotasMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                matriculaId: id
            },
            include: [
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            notas
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
exports.getNotasMatricula = getNotasMatricula;
const getNotasMatriculaCicloEvaluacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matriculaId, cicloId, evaluacionId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                matriculaId: matriculaId,
                cicloId: cicloId,
                evaluacionId: evaluacionId
            },
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula'
                },
                {
                    model: evaluacion_1.default,
                    as: 'evaluacion'
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo'
                }
            ]
        });
        res.json({
            ok: true,
            notas
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
exports.getNotasMatriculaCicloEvaluacion = getNotasMatriculaCicloEvaluacion;
const getNotasArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, cicloId, alumnoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
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
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'alumnoId', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'personaId', 'apoderadoId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'aulaId', 'docenteId', 'periodoId', 'subareaId'],
                            include: [
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nivelId', 'gradoId', 'seccionId'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: docente_1.default,
                                    as: 'docente',
                                    attributes: ['id', 'personaId'],
                                    include: [
                                        {
                                            model: persona_1.default,
                                            as: 'persona',
                                            attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
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
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
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
                    model: evaluacion_1.default,
                    as: 'evaluacion',
                    attributes: ['id', 'nombre', 'abreviatura']
                },
                {
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            notas
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
exports.getNotasArea = getNotasArea;
const getNotasPeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotasPeriodo = getNotasPeriodo;
const getNotasPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotasPeriodoAula = getNotasPeriodoAula;
const getNotasPeriodoAulaArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                '$matricula.programacion.periodo.id$': periodoId,
                '$matricula.programacion.aula.id$': aulaId,
                '$matricula.programacion.subarea.area.id$': areaId,
            },
            attributes: ['id', 'valor'],
            include: [
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotasPeriodoAulaArea = getNotasPeriodoAulaArea;
const getNotasPeriodoAulaAreaSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, subareaId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
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
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotasPeriodoAulaAreaSubarea = getNotasPeriodoAulaAreaSubarea;
const getNotasPeriodoAulaAreaSubareaCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, subareaId, cicloId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
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
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotasPeriodoAulaAreaSubareaCiclo = getNotasPeriodoAulaAreaSubareaCiclo;
const getNotasPeriodoAulaAreaSubareaCicloAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, subareaId, cicloId, alumnoId } = req.params;
    try {
        const notas = yield nota_1.default.findAll({
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
                    model: ciclo_1.default,
                    as: 'ciclo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: matricula_1.default,
                    as: 'matricula',
                    attributes: ['id', 'programacionId'],
                    include: [
                        {
                            model: alumno_1.default,
                            as: 'alumno',
                            attributes: ['id', 'personaId'],
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno']
                                }
                            ]
                        },
                        {
                            model: programacion_1.default,
                            as: 'programacion',
                            attributes: ['id', 'periodoId'],
                            include: [
                                {
                                    model: periodo_1.default,
                                    as: 'periodo',
                                    attributes: ['id', 'nombre']
                                },
                                {
                                    model: aula_1.default,
                                    as: 'aula',
                                    attributes: ['id', 'nombre'],
                                    include: [
                                        {
                                            model: nivel_1.default,
                                            as: 'nivel',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: grado_1.default,
                                            as: 'grado',
                                            attributes: ['id', 'nombre']
                                        },
                                        {
                                            model: seccion_1.default,
                                            as: 'seccion',
                                            attributes: ['id', 'nombre']
                                        }
                                    ]
                                },
                                {
                                    model: subarea_1.default,
                                    as: 'subarea',
                                    attributes: ['id', 'nombre', 'areaId'],
                                    include: [
                                        {
                                            model: area_1.default,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getNotasPeriodoAulaAreaSubareaCicloAlumno = getNotasPeriodoAulaAreaSubareaCicloAlumno;
//# sourceMappingURL=nota.js.map