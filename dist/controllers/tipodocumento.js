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
exports.deleteTipodocumentos = exports.putTipodocumentos = exports.postTipodocumentos = exports.getTipodocumento = exports.getTipodocumentos = void 0;
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const getTipodocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipodocumentos = yield tipodocumento_1.default.findAll({
            attributes: ['id', 'nombre'],
            where: { estado: true }
        });
        res.json({
            ok: true,
            tipodocumentos
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
exports.getTipodocumentos = getTipodocumentos;
const getTipodocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipodocumento = yield tipodocumento_1.default.findByPk(id);
        if (!tipodocumento) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un tipodocumento con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            tipodocumento
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
exports.getTipodocumento = getTipodocumento;
const postTipodocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const tipodocumento = tipodocumento_1.default.build(body);
        yield tipodocumento.save();
        res.json({
            ok: true,
            msg: 'Tipodocumento creado exitosamente',
            tipodocumento
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
exports.postTipodocumentos = postTipodocumentos;
const putTipodocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const tipodocumento = yield tipodocumento_1.default.findByPk(id);
        if (!tipodocumento) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un tipodocumento con el id: ${id}`
            });
        }
        yield (tipodocumento === null || tipodocumento === void 0 ? void 0 : tipodocumento.update(body));
        res.json({
            ok: true,
            msg: 'Tipodocumento actualizado exitosamente',
            tipodocumento
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
exports.putTipodocumentos = putTipodocumentos;
const deleteTipodocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipodocumento = yield tipodocumento_1.default.findByPk(id);
        if (!tipodocumento) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un tipodocumento con el id: ${id}`
            });
        }
        yield (tipodocumento === null || tipodocumento === void 0 ? void 0 : tipodocumento.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Tipodocumento eliminado exitosamente',
            tipodocumento
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
exports.deleteTipodocumentos = deleteTipodocumentos;
//# sourceMappingURL=tipodocumento.js.map