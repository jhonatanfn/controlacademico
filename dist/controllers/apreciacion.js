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
exports.getApreciacionesPeriodoAlumno = exports.busquedaApreciaciones = exports.deleteApreciacion = exports.putApreciacion = exports.postApreciacion = exports.getApreciacion = exports.getApreciaciones = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const alumno_1 = __importDefault(require("../models/alumno"));
const apreciacion_1 = __importDefault(require("../models/apreciacion"));
const periodo_1 = __importDefault(require("../models/periodo"));
const persona_1 = __importDefault(require("../models/persona"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apreciaciones = yield apreciacion_1.default.findAll({
            where: {
                estado: true
            },
            attributes: ['id'],
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            apreciaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getApreciaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield apreciacion_1.default.findAll({
            where: { estado: true },
            attributes: ['id']
        })).length;
        const apreciaciones = yield apreciacion_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id'],
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ],
        });
        res.json({
            ok: true,
            apreciaciones,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getApreciaciones = getApreciaciones;
const getApreciacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apreciacion = yield apreciacion_1.default.findByPk(id, {
            include: [
                {
                    model: periodo_1.default,
                    as: 'periodo',
                    attributes: ['id', 'nombre']
                },
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                }
            ],
        });
        if (!apreciacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciacion con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            apreciacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getApreciacion = getApreciacion;
const postApreciacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const apreciacion = apreciacion_1.default.build(body);
        yield apreciacion.save();
        res.json({
            ok: true,
            msg: 'Apreciacion creada exitosamente',
            apreciacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postApreciacion = postApreciacion;
const putApreciacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const apreciacion = yield apreciacion_1.default.findByPk(id);
        if (!apreciacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciacion con el id: ${id}`
            });
        }
        yield (apreciacion === null || apreciacion === void 0 ? void 0 : apreciacion.update(body));
        res.json({
            ok: true,
            msg: 'Apreciacion actualizada exitosamente',
            apreciacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putApreciacion = putApreciacion;
const deleteApreciacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apreciacion = yield apreciacion_1.default.findByPk(id);
        if (!apreciacion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una apreciacion con el id: ${id}`
            });
        }
        yield (apreciacion === null || apreciacion === void 0 ? void 0 : apreciacion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Apreciacion eliminada exitosamente',
            apreciacion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteApreciacion = deleteApreciacion;
const busquedaApreciaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield apreciacion_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        '$alumno.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$alumno.persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
            },
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'img'],
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
exports.busquedaApreciaciones = busquedaApreciaciones;
const getApreciacionesPeriodoAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodoId, alumnoId } = req.params;
    try {
        const apreciaciones = yield apreciacion_1.default.findAll({
            where: {
                estado: true,
                periodoId: periodoId,
                alumnoId: alumnoId
            },
            attributes: ['id'],
        });
        res.json({
            ok: true,
            apreciaciones
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getApreciacionesPeriodoAlumno = getApreciacionesPeriodoAlumno;
//# sourceMappingURL=apreciacion.js.map