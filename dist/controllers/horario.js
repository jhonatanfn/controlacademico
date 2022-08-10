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
exports.horariosPeriodoDocente = exports.horariosPeriodoAula = exports.horarioduplicado = exports.horarioregistrado = exports.existeHorario = exports.busquedaHorarios = exports.deleteHorario = exports.putHorario = exports.postHorario = exports.getHorario = exports.getHorarios = exports.getTodo = void 0;
const horario_1 = __importDefault(require("../models/horario"));
const sequelize_1 = require("sequelize");
const programacion_1 = __importDefault(require("../models/programacion"));
const aula_1 = __importDefault(require("../models/aula"));
const nivel_1 = __importDefault(require("../models/nivel"));
const grado_1 = __importDefault(require("../models/grado"));
const seccion_1 = __importDefault(require("../models/seccion"));
const docente_1 = __importDefault(require("../models/docente"));
const persona_1 = __importDefault(require("../models/persona"));
const periodo_1 = __importDefault(require("../models/periodo"));
const subarea_1 = __importDefault(require("../models/subarea"));
const area_1 = __importDefault(require("../models/area"));
const hora_1 = __importDefault(require("../models/hora"));
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const horarios = yield horario_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            horarios
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
exports.getTodo = getTodo;
const getHorarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield horario_1.default.findAll({
            where: { estado: true }
        })).length;
        const horarios = yield horario_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: hora_1.default,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
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
                },
            ]
        });
        res.json({
            ok: true,
            horarios,
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
exports.getHorarios = getHorarios;
const getHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const horario = yield horario_1.default.findByPk(id, {
            include: [
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'subareaId', 'docenteId'],
                    include: [
                        {
                            model: subarea_1.default,
                            as: 'subarea',
                            attributes: ['id'],
                        }
                    ]
                }
            ]
        });
        if (!horario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un horario con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            horario
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
exports.getHorario = getHorario;
const postHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const horario = horario_1.default.build(body);
        yield horario.save();
        res.json({
            ok: true,
            msg: 'Horario creado exitosamente',
            horario
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
exports.postHorario = postHorario;
const putHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const horario = yield horario_1.default.findByPk(id);
        if (!horario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un horario con el id: ${id}`
            });
        }
        yield (horario === null || horario === void 0 ? void 0 : horario.update(body));
        res.json({
            ok: true,
            msg: 'Horario actualizado exitosamente',
            horario
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
exports.putHorario = putHorario;
const deleteHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const horario = yield horario_1.default.findByPk(id);
        if (!horario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un horario con el id: ${id}`
            });
        }
        yield (horario === null || horario === void 0 ? void 0 : horario.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Horario eliminado exitosamente',
            horario
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
exports.deleteHorario = deleteHorario;
const busquedaHorarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield horario_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$programacion.aula.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$programacion.subarea.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$hora.inicio$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$hora.fin$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        dia: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    }
                ],
                estado: true
            },
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: hora_1.default,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
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
                },
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
exports.busquedaHorarios = busquedaHorarios;
const existeHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, diaNombre, horaId } = req.params;
    try {
        const horario = yield horario_1.default.findOne({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                dia: diaNombre,
                horaId: horaId,
                estado: true
            },
            include: [
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id', 'nombre', 'fechainicial', 'fechafinal'],
                        }
                    ]
                },
            ]
        });
        if (horario) {
            return res.json({
                ok: true,
                msg: 'Ya existe un horario registrado.'
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
exports.existeHorario = existeHorario;
const horarioregistrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const horarios = yield horario_1.default.findAll({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                estado: true
            },
            include: [
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'aulaId', 'periodoId'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id'],
                        },
                        {
                            model: periodo_1.default,
                            as: 'periodo',
                            attributes: ['id']
                        }
                    ]
                },
            ]
        });
        if (horarios) {
            return res.json({
                ok: true,
                horarios,
                msg: 'Ya existe un horario registrado.'
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
exports.horarioregistrado = horarioregistrado;
const horarioduplicado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId, subareaId, dia, horaId } = req.params;
    try {
        const programacion = yield programacion_1.default.findOne({
            where: {
                estado: true,
                periodoId: periodoId,
                aulaId: aulaId,
                subareaId: subareaId
            },
            include: [
                {
                    model: docente_1.default,
                    as: 'docente',
                    attributes: ['id']
                }
            ]
        });
        if (programacion) {
            const horario = yield horario_1.default.findOne({
                where: {
                    '$programacion.subarea.id$': subareaId,
                    '$programacion.docente.id$': programacion.docenteId,
                    dia: dia,
                    horaId: horaId,
                    estado: true
                },
                include: [
                    {
                        model: programacion_1.default,
                        as: 'programacion',
                        attributes: ['id', 'subareaId', 'docenteId'],
                        include: [
                            {
                                model: subarea_1.default,
                                as: 'subarea',
                                attributes: ['id'],
                            },
                            {
                                model: docente_1.default,
                                as: 'docente',
                                attributes: ['id']
                            }
                        ]
                    },
                ]
            });
            if (horario) {
                return res.json({
                    ok: true,
                    horario,
                    msg: 'Ya existe un horario registrado.'
                });
            }
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
exports.horarioduplicado = horarioduplicado;
const horariosPeriodoAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, aulaId } = req.params;
    try {
        const horarios = yield horario_1.default.findAll({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.aula.id$': aulaId,
                estado: true
            },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: hora_1.default,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
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
                },
            ]
        });
        res.json({
            ok: true,
            horarios
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
exports.horariosPeriodoAula = horariosPeriodoAula;
const horariosPeriodoDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, docenteId } = req.params;
    try {
        const horarios = yield horario_1.default.findAll({
            where: {
                '$programacion.periodo.id$': periodoId,
                '$programacion.docente.id$': docenteId,
                estado: true
            },
            order: [
                [
                    'id', 'ASC'
                ]
            ],
            attributes: ['id', 'dia', 'programacionId', 'horaId', 'estado'],
            include: [
                {
                    model: hora_1.default,
                    as: 'hora',
                    attributes: ['id', 'nombre', 'inicio', 'fin', 'tipo']
                },
                {
                    model: programacion_1.default,
                    as: 'programacion',
                    attributes: ['id', 'numeromat', 'numeromaxmat', 'aulaId', 'docenteId', 'subareaId', 'periodoId'],
                    include: [
                        {
                            model: aula_1.default,
                            as: 'aula',
                            attributes: ['id', 'nombre', 'nivelId', 'gradoId', 'seccionId'],
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
                            include: [
                                {
                                    model: persona_1.default,
                                    as: 'persona',
                                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img'],
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
                },
            ]
        });
        res.json({
            ok: true,
            horarios
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
exports.horariosPeriodoDocente = horariosPeriodoDocente;
//# sourceMappingURL=horario.js.map