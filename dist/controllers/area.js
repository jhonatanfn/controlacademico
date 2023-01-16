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
exports.nombreRepetidoEditar = exports.nombreRepetido = exports.getCompetenciasArea = exports.busquedaAreas = exports.deleteArea = exports.putArea = exports.postArea = exports.getArea = exports.getAreas = exports.getTodoCompetencias = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("../models/area"));
const competencia_1 = __importDefault(require("../models/competencia"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield area_1.default.findAll({
            where: {
                estado: true
            },
            attributes: ['id', 'nombre', 'estado']
        });
        res.json({
            ok: true,
            areas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getTodoCompetencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield area_1.default.findAll({
            where: {
                estado: true
            },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                }
            ]
        });
        res.json({
            ok: true,
            areas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodoCompetencias = getTodoCompetencias;
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield area_1.default.findAll({
            where: { estado: true },
            attributes: ['id', 'nombre', 'estado']
        })).length;
        const areas = yield area_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
            attributes: ['id', 'nombre', 'estado'],
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                }
            ],
        });
        res.json({
            ok: true,
            areas,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAreas = getAreas;
const getArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findByPk(id, {
            include: [
                {
                    model: competencia_1.default,
                    as: 'competencia',
                    attributes: ['id', 'descripcion']
                }
            ],
        });
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            area
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getArea = getArea;
const postArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const area = area_1.default.build(body);
        yield area.save();
        res.json({
            ok: true,
            msg: 'Area creada exitosamente',
            area
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postArea = postArea;
const putArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const area = yield area_1.default.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        yield (area === null || area === void 0 ? void 0 : area.update(body));
        res.json({
            ok: true,
            msg: 'Area actualizada exitosamente',
            area
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putArea = putArea;
const deleteArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        yield (area === null || area === void 0 ? void 0 : area.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Area eliminada exitosamente',
            area
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteArea = deleteArea;
const busquedaAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield area_1.default.findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            }
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
exports.busquedaAreas = busquedaAreas;
const getCompetenciasArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaId } = req.params;
    try {
        const competencias = yield competencia_1.default.findAll({
            where: {
                estado: true,
                areaId: areaId
            },
            attributes: ['id']
        });
        if (competencias.length > 0) {
            return res.json({
                ok: true,
                msg: 'No se puede eliminar el area.'
            });
        }
        res.json({
            ok: false,
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getCompetenciasArea = getCompetenciasArea;
const nombreRepetido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaNombre } = req.params;
    try {
        const area = yield area_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${areaNombre}%`
                }
            },
            attributes: ['id']
        });
        if (area) {
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
exports.nombreRepetido = nombreRepetido;
const nombreRepetidoEditar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaId, areaNombre } = req.params;
    try {
        const area = yield area_1.default.findOne({
            where: {
                estado: true,
                nombre: {
                    [sequelize_1.Op.like]: `%${areaNombre}%`
                },
                id: {
                    [sequelize_1.Op.ne]: areaId
                }
            },
            attributes: ['id']
        });
        if (area) {
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
exports.nombreRepetidoEditar = nombreRepetidoEditar;
//# sourceMappingURL=area.js.map