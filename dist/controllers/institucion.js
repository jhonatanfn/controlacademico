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
exports.deleteInstitucion = exports.putInstitucion = exports.postInstitucion = exports.getInstitucion = exports.getInstituciones = void 0;
const institucion_1 = __importDefault(require("../models/institucion"));
const handleError_1 = require("../utils/handleError");
const getInstituciones = (req, res) => {
};
exports.getInstituciones = getInstituciones;
const getInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const institucion = yield institucion_1.default.findByPk(id, {
            attributes: ['id', 'nombre', 'direccion', 'telefono', 'email', 'img', 'departamento', 'provincia', 'distrito', 'centropoblado', 'dre', 'ugel', 'tipogestion', 'generoalumno', 'formaatencion', 'paginaweb', 'turnoatencion']
        });
        if (!institucion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe la institucion con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            institucion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getInstitucion = getInstitucion;
const postInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const institucion = institucion_1.default.build(body);
        yield institucion.save();
        res.json({
            ok: true,
            msg: 'Institucion creada exitosamente',
            institucion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postInstitucion = postInstitucion;
const putInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const institucion = yield institucion_1.default.findByPk(id);
        if (!institucion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un institucion con el id: ${id}`
            });
        }
        yield (institucion === null || institucion === void 0 ? void 0 : institucion.update(body));
        res.json({
            ok: true,
            msg: 'Institucion actualizada exitosamente',
            institucion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putInstitucion = putInstitucion;
const deleteInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const institucion = yield institucion_1.default.findByPk(id);
        if (!institucion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una institucion con el id: ${id}`
            });
        }
        yield (institucion === null || institucion === void 0 ? void 0 : institucion.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Institucion eliminada exitosamente',
            institucion
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteInstitucion = deleteInstitucion;
//# sourceMappingURL=institucion.js.map