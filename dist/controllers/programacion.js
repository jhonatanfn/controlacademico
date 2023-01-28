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
exports.isProgramacionesCompletas = exports.getProgramacionesAdministrador = exports.getProgramacionesAdministradorPeriodo = exports.busquedaProgramacionesPorDocente = exports.programacionPeriodoPaginado = exports.busquedaProgramacionesSubarea = exports.programacionPeriodo = exports.perteneceAulaDocente = exports.perteneceProgramacionDocente = exports.getProgramacionesDocentePeriodoPaginadoTodo = exports.getProgramacionesDocentePeriodoPaginado = exports.busquedaProgramacionesSubareaPorDocente = exports.busquedaProgramacionesSubareaPorDocentePeriodo = exports.existeProgramacionEditar = exports.existeProgramacion = exports.busquedaProgramaciones = exports.deleteProgramacion = exports.putProgramacion = exports.postProgramacion = exports.getProgramacionesPeriodoAula = exports.getProgramacion = exports.getProgramaciones = exports.getProgramacionesDocentePeriodo = exports.getProgramacionesDocenteTodo = exports.getProgramacionesDocente = void 0;
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
const handleError_1 = require("../utils/handleError");
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
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getProgramacionesDocente = getProgramacionesDocente;
const getProgramacionesDocenteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { docente } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docente
            },
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getProgramacionesDocenteTodo = getProgramacionesDocenteTodo;
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
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                    attributes: ['id', 'nombre', 'tipovalor'],
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                },
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        if (!programacion || programacion.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una asignación con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            programacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
            where: {
                estado: true,
                periodoId: periodoid,
                aulaId: aulaid
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
            msg: 'Asignación creada exitosamente',
            programacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                msg: `No existe una asignación con el id: ${id}`
            });
        }
        yield (programacion === null || programacion === void 0 ? void 0 : programacion.update(body));
        res.json({
            ok: true,
            msg: 'Asignación actualizada exitosamente',
            programacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                msg: `No existe una asignación con el id: ${id}`
            });
        }
        yield (programacion === null || programacion === void 0 ? void 0 : programacion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Asignación eliminada exitosamente',
            programacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteProgramacion = deleteProgramacion;
const busquedaProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$docente.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo'
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaProgramaciones = busquedaProgramaciones;
const existeProgramacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodo, aula, area } = req.params;
    try {
        const programacion = yield programacion_1.default.findOne({
            where: {
                periodoId: periodo,
                aulaId: aula,
                areaId: area,
                estado: true
            }
        });
        if (programacion) {
            return res.json({
                ok: true,
                msg: 'La asignación ya esta registrada.'
            });
        }
        res.json({
            ok: false
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.existeProgramacion = existeProgramacion;
const existeProgramacionEditar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, areaId, programacionId } = req.params;
    try {
        const programacion = yield programacion_1.default.findOne({
            where: {
                periodoId: periodoId,
                aulaId: aulaId,
                areaId: areaId,
                estado: true,
                id: {
                    [sequelize_1.Op.ne]: programacionId,
                }
            }
        });
        if (programacion) {
            return res.json({
                ok: true,
                msg: 'La asignación ya está registrada.'
            });
        }
        res.json({
            ok: false
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.existeProgramacionEditar = existeProgramacionEditar;
const busquedaProgramacionesSubareaPorDocentePeriodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, docenteId, periodoId } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nivel.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.grado.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.seccion.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                '$docente.id$': docenteId,
                periodoId: periodoId,
                estado: true
            },
            attributes: ['id', 'numeromat', 'numeromaxmat'],
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre', 'tipovalor'],
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaProgramacionesSubareaPorDocentePeriodo = busquedaProgramacionesSubareaPorDocentePeriodo;
const busquedaProgramacionesSubareaPorDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, docenteId } = req.params;
    try {
        const data = yield programacion_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.nivel.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.grado.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$aula.seccion.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                '$docente.id$': docenteId,
                estado: true
            },
            attributes: ['id', 'numeromat', 'numeromaxmat'],
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre', 'tipovalor'],
                    include: [
                        {
                            model: nivel_1.default,
                            as: 'nivel',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: grado_1.default,
                            as: 'grado',
                            attributes: ['id', 'nombre'],
                        },
                        {
                            model: seccion_1.default,
                            as: 'seccion',
                            attributes: ['id', 'nombre'],
                        }
                    ]
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaProgramacionesSubareaPorDocente = busquedaProgramacionesSubareaPorDocente;
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
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getProgramacionesDocentePeriodoPaginado = getProgramacionesDocentePeriodoPaginado;
const getProgramacionesDocentePeriodoPaginadoTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
                }
            ]
        });
        res.json({
            ok: true,
            programaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getProgramacionesDocentePeriodoPaginadoTodo = getProgramacionesDocentePeriodoPaginadoTodo;
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.perteneceProgramacionDocente = perteneceProgramacionDocente;
const perteneceAulaDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { aulaId, docenteId } = req.params;
    try {
        const programacion = yield programacion_1.default.findOne({
            where: {
                estado: true,
                aulaId: aulaId,
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.perteneceAulaDocente = perteneceAulaDocente;
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaProgramacionesSubarea = busquedaProgramacionesSubarea;
const programacionPeriodoPaginado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const desde = Number(req.query.desde) || 0;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                periodoId: id
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: aula_1.default,
                    as: 'aula',
                    attributes: ['id', 'nombre', 'tipovalor'],
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
                    attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                },
                {
                    model: docente_1.default,
                    as: 'docente',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                        }
                    ]
                },
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                    model: aula_1.default,
                    as: 'aula',
                    required: true,
                    attributes: ['id', 'nombre', 'tipovalor'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.busquedaProgramacionesPorDocente = busquedaProgramacionesPorDocente;
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getProgramacionesAdministrador = getProgramacionesAdministrador;
const isProgramacionesCompletas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const areas = yield area_1.default.findAll({
            where: {
                estado: true
            },
            attributes: ['id']
        });
        if (areas.length > 0) {
            const data = yield programacion_1.default.findAll({
                where: {
                    periodoId: periodoId,
                    aulaId: aulaId,
                    estado: true
                },
                attributes: ['id']
            });
            if (data.length !== areas.length) {
                return res.json({
                    ok: false,
                    msg: "Programar todas las asignaciones para el periodo y aula seleccionado."
                });
            }
        }
        else {
            return res.json({
                ok: false,
                msg: "No hay areas registradas"
            });
        }
        res.json({
            ok: true,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.isProgramacionesCompletas = isProgramacionesCompletas;
//# sourceMappingURL=programacion.js.map