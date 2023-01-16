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
exports.getPadreDNI = exports.padrePorPersona = exports.searchDNI = exports.busquedaPadres = exports.deletePadre = exports.putPadre = exports.postPadre = exports.getPadre = exports.getPadresTodos = exports.getPadres = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const padre_1 = __importDefault(require("../models/padre"));
const persona_1 = __importDefault(require("../models/persona"));
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const alumno_1 = __importDefault(require("../models/alumno"));
const handleError_1 = require("../utils/handleError");
const getPadres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield padre_1.default.findAll({
            where: { estado: true }
        })).length;
        const padres = yield padre_1.default.findAll({
            where: { estado: true },
            order: [
                ['id', 'DESC']
            ],
            limit: 5,
            offset: desde,
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            padres,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPadres = getPadres;
const getPadresTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const padres = yield padre_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    { model: persona_1.default, as: 'persona' },
                    'nombres', 'ASC'
                ]
            ],
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            padres
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPadresTodos = getPadresTodos;
const getPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const padre = yield padre_1.default.findByPk(id, {
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                }
            ]
        });
        if (!padre || padre.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un padre con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            padre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPadre = getPadre;
const postPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const padre = padre_1.default.build({
            personaId: body.personaId,
        });
        yield padre.save();
        if (body.vive) {
            yield usuario_1.default.create({
                nombre: arr[0],
                numero: numeroUsuario,
                email: arr[0] + '' + numeroUsuario + '@demo.com',
                password: bcryptjs_1.default.hashSync(body.dniusuario, salt),
                roleId: roles[2].id,
                personaId: body.personaId
            });
        }
        res.json({
            ok: true,
            msg: 'Padre creado exitosamente.',
            padre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postPadre = postPadre;
const putPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const padre = yield padre_1.default.findByPk(id);
        if (!padre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un padre con el id: ${id}`
            });
        }
        yield (padre === null || padre === void 0 ? void 0 : padre.update(body));
        res.json({
            ok: true,
            msg: 'Padre actualizado exitosamente',
            padre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putPadre = putPadre;
const deletePadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const padre = yield padre_1.default.findByPk(id);
        if (!padre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un padre con el id: ${id}`
            });
        }
        const lista = yield alumno_1.default.findAll({
            where: {
                padreId: id,
                estado: true
            },
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el padre.`
            });
        }
        yield (padre === null || padre === void 0 ? void 0 : padre.update({ estado: false }));
        const usuario = yield usuario_1.default.findOne({
            where: {
                personaId: padre.personaId,
                estado: true
            }
        });
        if (usuario) {
            yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        }
        res.json({
            ok: true,
            msg: 'Padre eliminado exitosamente',
            padre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deletePadre = deletePadre;
const busquedaPadres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield padre_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        '$persona.dni$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.apellidopaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.apellidomaterno$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
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
exports.busquedaPadres = busquedaPadres;
const searchDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const padre = yield padre_1.default.findOne({
            where: {
                estado: true,
                '$persona.dni$': dni,
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni'],
                }
            ]
        });
        if (padre) {
            return res.json({
                ok: true,
                msg: "El DNI ya se encuentra registrado"
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
exports.searchDNI = searchDNI;
const padrePorPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const padre = yield padre_1.default.findOne({
            where: {
                estado: true,
                personaId: id
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [{
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }]
                }
            ]
        });
        if (padre) {
            return res.json({
                ok: true,
                padre
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un padre con el persona id:' + id
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.padrePorPersona = padrePorPersona;
const getPadreDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const padre = yield padre_1.default.findOne({
            where: {
                estado: true,
                '$persona.dni$': dni
            },
            attributes: ['id', 'vive'],
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [{
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }]
                }
            ]
        });
        res.json({
            ok: true,
            padre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPadreDNI = getPadreDNI;
//# sourceMappingURL=padre.js.map