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
exports.getExistenNotas = exports.getCompetenciasPorArea = exports.deleteCompetencia = exports.putCompetencia = exports.postCompetencia = exports.getCompetencia = exports.getCompetencias = exports.getTodo = exports.busquedaCompetencias = void 0;
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("../models/area"));
const competencia_1 = __importDefault(require("../models/competencia"));
const nota_1 = __importDefault(require("../models/nota"));
const handleError_1 = require("../utils/handleError");
const busquedaCompetencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield competencia_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        descripcion: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre'],
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
exports.busquedaCompetencias = busquedaCompetencias;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const competencias = yield competencia_1.default.findAll({
            where: { estado: true },
            include: [
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            competencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getCompetencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield competencia_1.default.findAll({
            where: { estado: true }
        })).length;
        const competencias = yield competencia_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            competencias,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getCompetencias = getCompetencias;
const getCompetencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const competencia = yield competencia_1.default.findByPk(id, {
            include: [
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                },
            ]
        });
        if (!competencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una competencia con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            competencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getCompetencia = getCompetencia;
const postCompetencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const competencia = competencia_1.default.build(body);
        yield competencia.save();
        res.json({
            ok: true,
            msg: 'Competencia creada exitosamente',
            competencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postCompetencia = postCompetencia;
const putCompetencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const competencia = yield competencia_1.default.findByPk(id);
        if (!competencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una competencia con el id: ${id}`
            });
        }
        yield (competencia === null || competencia === void 0 ? void 0 : competencia.update(body));
        res.json({
            ok: true,
            msg: 'Competencia actualizada exitosamente',
            competencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putCompetencia = putCompetencia;
const deleteCompetencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const competencia = yield competencia_1.default.findByPk(id);
        if (!competencia) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una competencia con el id: ${id}`
            });
        }
        yield (competencia === null || competencia === void 0 ? void 0 : competencia.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Competencia eliminada exitosamente',
            competencia
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteCompetencia = deleteCompetencia;
const getCompetenciasPorArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const competencias = yield competencia_1.default.findAll({
            where: {
                estado: true,
                areaId: req.params.areaId
            },
            attributes: ['id', 'descripcion'],
            include: [
                {
                    model: area_1.default,
                    as: 'area',
                    attributes: ['id', 'nombre'],
                }
            ]
        });
        res.json({
            ok: true,
            competencias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getCompetenciasPorArea = getCompetenciasPorArea;
const getExistenNotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notas = yield nota_1.default.findAll({
            where: {
                estado: true,
                competenciaId: req.params.competenciaId
            },
            attributes: ['id']
        });
        if (notas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la competencia"
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
exports.getExistenNotas = getExistenNotas;
//# sourceMappingURL=competencia.js.map