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
exports.tieneSubareas = exports.busquedaAreas = exports.deleteArea = exports.putArea = exports.postArea = exports.getArea = exports.getAreas = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("../models/area"));
const subarea_1 = __importDefault(require("../models/subarea"));
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield area_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            areas
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
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield area_1.default.findAll({
            where: { estado: true }
        })).length;
        const areas = yield area_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: [{
                    model: subarea_1.default,
                    as: 'subareas'
                }],
        });
        res.json({
            ok: true,
            areas,
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
exports.getAreas = getAreas;
const getArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findByPk(id, {
            include: [{
                    model: subarea_1.default,
                    as: 'subareas',
                    attributes: ['id', 'nombre']
                }],
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaAreas = busquedaAreas;
const tieneSubareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { areaId } = req.params;
    try {
        const subareas = yield subarea_1.default.findAll({
            where: {
                estado: true,
                areaId: areaId
            }
        });
        if (subareas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el area"
            });
        }
        res.json({
            ok: false
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.tieneSubareas = tieneSubareas;
//# sourceMappingURL=area.js.map