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
exports.getResponsableDNI = exports.responsablePorPersona = exports.searchDNI = exports.busquedaResponsables = exports.deleteResponsable = exports.putResponsable = exports.postResponsable = exports.getResponsable = exports.getResponsablesTodos = exports.getResponsables = void 0;
const sequelize_1 = require("sequelize");
const responsable_1 = __importDefault(require("../models/responsable"));
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const alumno_1 = __importDefault(require("../models/alumno"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const handleError_1 = require("../utils/handleError");
const getResponsables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield responsable_1.default.findAll({
            where: { estado: true }
        })).length;
        const responsables = yield responsable_1.default.findAll({
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
            responsables,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getResponsables = getResponsables;
const getResponsablesTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responsables = yield responsable_1.default.findAll({
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
            responsables
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getResponsablesTodos = getResponsablesTodos;
const getResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const responsable = yield responsable_1.default.findByPk(id, {
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
        if (!responsable || responsable.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un responsable con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            responsable
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getResponsable = getResponsable;
const postResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const responsable = responsable_1.default.build({
            personaId: body.personaId
        });
        yield responsable.save();
        if (!body.padrevive && !body.medrevive) {
            yield usuario_1.default.create({
                nombre: arr[0],
                numero: numeroUsuario,
                email: arr[0] + '' + numeroUsuario + '@demo.com',
                password: bcryptjs_1.default.hashSync(body.dniusuario, salt),
                roleId: roles[5].id,
                personaId: body.personaId
            });
        }
        res.json({
            ok: true,
            msg: 'Responsable creado exitosamente.',
            responsable
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postResponsable = postResponsable;
const putResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const responsable = yield responsable_1.default.findByPk(id);
        if (!responsable) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un responsable con el id: ${id}`
            });
        }
        yield (responsable === null || responsable === void 0 ? void 0 : responsable.update(body));
        res.json({
            ok: true,
            msg: 'Responsable actualizado exitosamente',
            responsable
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putResponsable = putResponsable;
const deleteResponsable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const responsable = yield responsable_1.default.findByPk(id);
        if (!responsable) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un responsable con el id: ${id}`
            });
        }
        const lista = yield alumno_1.default.findAll({
            where: {
                responsableId: id,
                estado: true
            },
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el responsable.`
            });
        }
        yield (responsable === null || responsable === void 0 ? void 0 : responsable.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Responsable eliminado exitosamente',
            responsable
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteResponsable = deleteResponsable;
const busquedaResponsables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield responsable_1.default.findAll({
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
exports.busquedaResponsables = busquedaResponsables;
const searchDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const responsable = yield responsable_1.default.findOne({
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
        if (responsable) {
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
const responsablePorPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const responsable = yield responsable_1.default.findOne({
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
        if (responsable) {
            return res.json({
                ok: true,
                responsable
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
exports.responsablePorPersona = responsablePorPersona;
const getResponsableDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const responsable = yield responsable_1.default.findOne({
            where: {
                estado: true,
                '$persona.dni$': dni
            },
            attributes: ['id'],
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
            responsable
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getResponsableDNI = getResponsableDNI;
//# sourceMappingURL=responsable.js.map