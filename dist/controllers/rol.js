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
exports.deleteRol = exports.putRol = exports.postRol = exports.getRoles = void 0;
const area_1 = __importDefault(require("../models/area"));
const rol_1 = __importDefault(require("../models/rol"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield area_1.default.findAll({
        include: {
            model: usuario_1.default,
            as: 'usuario',
            attributes: ['id', 'nombre', 'email']
        },
        attributes: ['id', 'nombre']
    });
    res.json({
        ok: true,
        msg: 'Lista de Roles',
        roles
    });
});
exports.getRoles = getRoles;
const postRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const rol = rol_1.default.build(body);
        yield rol.save();
        res.json({
            ok: true,
            msg: 'Rol creado exitosamente',
            rol
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
exports.postRol = postRol;
const putRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const rol = yield rol_1.default.findByPk(id);
        if (!rol) {
            res.status(400).json({
                ok: false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        yield (rol === null || rol === void 0 ? void 0 : rol.update(body));
        res.json({
            ok: true,
            msg: 'Rol actualizado exitosamente',
            rol
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
exports.putRol = putRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rol = yield rol_1.default.findByPk(id);
        if (!rol) {
            res.status(400).json({
                ok: false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        yield (rol === null || rol === void 0 ? void 0 : rol.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Rol eliminado exitosamente',
            rol
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
exports.deleteRol = deleteRol;
//# sourceMappingURL=rol.js.map