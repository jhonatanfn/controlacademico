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
exports.renewToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const jwt_1 = require("../helpers/jwt");
const role_1 = __importDefault(require("../models/role"));
const menu_frontend_1 = require("../helpers/menu-frontend");
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const handleError_1 = require("../utils/handleError");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({
            include: {
                model: role_1.default,
                as: 'role',
                attributes: ['id', 'nombre']
            },
            where: {
                email: email,
                estado: true,
                habilitado: true
            },
        });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario y contraseña no son correctos'
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario y contraseña no son correctos'
            });
        }
        const token = yield (0, jwt_1.generarJWT)(email);
        res.json({
            ok: true,
            msg: 'Bienvenido',
            token,
            menu: (0, menu_frontend_1.getMenu)(usuario.role.nombre)
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        const token = yield (0, jwt_1.generarJWT)(email);
        const usuario = yield usuario_1.default.findOne({
            include: [{
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id', 'nombre']
                }, {
                    model: persona_1.default,
                    as: 'persona',
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento'
                        }
                    ]
                }],
            where: {
                email: email,
                estado: true,
                habilitado: true
            },
        });
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map