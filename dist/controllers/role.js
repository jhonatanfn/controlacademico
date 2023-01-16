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
exports.deleteRole = exports.putRole = exports.postRole = exports.getRole = exports.getRoles = void 0;
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const handleError_1 = require("../utils/handleError");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.default.findAll({
            include: {
                model: usuario_1.default,
                as: 'usuario',
                attributes: ['id', 'nombre', 'email']
            },
            attributes: ['id', 'nombre', 'bgcolor']
        });
        res.json({
            ok: true,
            msg: 'Lista de Roles',
            roles
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getRoles = getRoles;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const role = yield role_1.default.findByPk(id);
        if (!role) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            role
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getRole = getRole;
const postRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const role = role_1.default.build(body);
        yield role.save();
        res.json({
            ok: true,
            msg: 'Rol creado exitosamente',
            role
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postRole = postRole;
const putRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const role = yield role_1.default.findByPk(id);
        if (!role) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        yield (role === null || role === void 0 ? void 0 : role.update(body));
        res.json({
            ok: true,
            msg: 'Rol actualizado exitosamente',
            role
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putRole = putRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const role = yield role_1.default.findByPk(id);
        if (!role) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        yield (role === null || role === void 0 ? void 0 : role.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Rol eliminado exitosamente',
            role
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteRole = deleteRole;
//# sourceMappingURL=role.js.map