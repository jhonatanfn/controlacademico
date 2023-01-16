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
exports.maxAuxiliarNumero = exports.searchDNI = exports.busquedaAuxiliares = exports.deleteAuxiliar = exports.putAuxiliar = exports.postAuxiliar = exports.getAuxiliarPersona = exports.getAuxiliar = exports.getAuxiliares = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const usuario_1 = __importDefault(require("../models/usuario"));
const role_1 = __importDefault(require("../models/role"));
const auxiliar_1 = __importDefault(require("../models/auxiliar"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auxiliares = yield auxiliar_1.default.findAll({
            where: { estado: true },
            include: [{
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
                }]
        });
        res.json({
            ok: true,
            auxiliares
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getAuxiliares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield auxiliar_1.default.findAll({
            where: { estado: true }
        })).length;
        const auxiliares = yield auxiliar_1.default.findAll({
            where: { estado: true },
            order: [
                /*
                [
                    { model: Persona, as: 'persona'},
                    'nombres', 'ASC'
                ]
                */
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
            auxiliares,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAuxiliares = getAuxiliares;
const getAuxiliar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const auxiliar = yield auxiliar_1.default.findByPk(id, {
            include: [{
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
                }]
        });
        if (!auxiliar || auxiliar.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un auxiliar con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Auxiliar encontrado',
            auxiliar
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAuxiliar = getAuxiliar;
const getAuxiliarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { persona } = req.params;
    try {
        const auxiliar = yield auxiliar_1.default.findOne({
            where: {
                estado: true,
                personaId: persona
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
        if (auxiliar) {
            return res.json({
                ok: true,
                auxiliar
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un auxiliar con el id:' + persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAuxiliarPersona = getAuxiliarPersona;
const postAuxiliar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const auxiliar = auxiliar_1.default.build({
            personaId: body.personaId
        });
        yield auxiliar.save();
        yield usuario_1.default.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email: arr[0] + '' + numeroUsuario + '@demo.com',
            password: bcryptjs_1.default.hashSync(body.dniusuario, salt),
            roleId: roles[4].id,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: 'Auxiliar guardado exitosamente',
            auxiliar
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postAuxiliar = postAuxiliar;
const putAuxiliar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const auxiliar = yield auxiliar_1.default.findByPk(id);
        if (!auxiliar || auxiliar.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un auxiliar con el id: ${id}`
            });
        }
        yield (auxiliar === null || auxiliar === void 0 ? void 0 : auxiliar.update(body));
        res.json({
            ok: true,
            msg: 'Auxiliar actualizado exitosamente',
            auxiliar
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putAuxiliar = putAuxiliar;
const deleteAuxiliar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const auxiliar = yield auxiliar_1.default.findByPk(id);
        if (!auxiliar || auxiliar.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un auxiliar con el id: ${id}`
            });
        }
        yield (auxiliar === null || auxiliar === void 0 ? void 0 : auxiliar.update({ estado: false }));
        const usuario = yield usuario_1.default.findOne({
            where: {
                personaId: auxiliar.personaId,
                estado: true
            }
        });
        if (usuario) {
            yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        }
        res.json({
            ok: true,
            msg: 'Auxiliar borrado exitosamente',
            auxiliar
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteAuxiliar = deleteAuxiliar;
const busquedaAuxiliares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield auxiliar_1.default.findAll({
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
exports.busquedaAuxiliares = busquedaAuxiliares;
const searchDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const auxiliar = yield auxiliar_1.default.findOne({
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
        if (auxiliar) {
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
const maxAuxiliarNumero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const max_valor = yield auxiliar_1.default.max('numero');
        if (!max_valor) {
            res.json({
                ok: true,
                valor: 0
            });
        }
        else {
            res.json({
                ok: true,
                valor: max_valor
            });
        }
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.maxAuxiliarNumero = maxAuxiliarNumero;
//# sourceMappingURL=auxiliar.js.map