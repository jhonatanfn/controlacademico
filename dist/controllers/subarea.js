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
exports.tieneProgramaciones = exports.busquedaSubareas = exports.deleteSubarea = exports.putSubarea = exports.postSubarea = exports.getSubareasArea = exports.getSubarea = exports.getSubareas = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("../models/area"));
const programacion_1 = __importDefault(require("../models/programacion"));
const subarea_1 = __importDefault(require("../models/subarea"));
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subareas = yield subarea_1.default.findAll({
            where: { estado: true },
            include: [
                {
                    model: area_1.default,
                    as: 'area'
                }
            ]
        });
        res.json({
            ok: true,
            subareas
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
const getSubareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield subarea_1.default.findAll({
            where: { estado: true }
        })).length;
        const subareas = yield subarea_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'nombre', 'ASC'
                ]
            ],
            limit: 5,
            offset: desde,
            include: {
                model: area_1.default,
                as: 'area',
                attributes: ['id', 'nombre']
            },
            attributes: ['id', 'nombre']
        });
        res.json({
            ok: true,
            subareas,
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
exports.getSubareas = getSubareas;
const getSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subarea = yield subarea_1.default.findByPk(id);
        if (!subarea) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un subarea con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Subarea encontrada exitosamente',
            subarea
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
exports.getSubarea = getSubarea;
const getSubareasArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        const subareas = yield subarea_1.default.findAll({
            where: {
                estado: true,
                areaId: id
            },
            include: [
                {
                    model: area_1.default,
                    as: 'area'
                }
            ]
        });
        res.json({
            ok: true,
            subareas
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
exports.getSubareasArea = getSubareasArea;
const postSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const subarea = subarea_1.default.build(body);
        yield subarea.save();
        res.json({
            ok: true,
            msg: 'Subarea creada exitosamente',
            subarea
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
exports.postSubarea = postSubarea;
const putSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const subarea = yield subarea_1.default.findByPk(id);
        if (!subarea) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un subarea con el id: ${id}`
            });
        }
        yield (subarea === null || subarea === void 0 ? void 0 : subarea.update(body));
        res.json({
            ok: true,
            msg: 'Subarea actualizada exitosamente',
            subarea
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
exports.putSubarea = putSubarea;
const deleteSubarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subarea = yield subarea_1.default.findByPk(id);
        if (!subarea) {
            res.status(400).json({
                ok: false,
                msg: `No existe un subarea con el id: ${id}`
            });
        }
        yield (subarea === null || subarea === void 0 ? void 0 : subarea.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Subarea eliminada exitosamente',
            subarea
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
exports.deleteSubarea = deleteSubarea;
const busquedaSubareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield subarea_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        nombre: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$area.nombre$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ],
                estado: true
            },
            include: [
                {
                    model: area_1.default,
                    as: 'area',
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
exports.busquedaSubareas = busquedaSubareas;
const tieneProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subareaId } = req.params;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                subareaId: subareaId
            }
        });
        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar la subarea"
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
exports.tieneProgramaciones = tieneProgramaciones;
//# sourceMappingURL=subarea.js.map