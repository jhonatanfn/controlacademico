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
exports.getMadreDNI = exports.madrePorPersona = exports.searchDNI = exports.busquedaMadres = exports.deleteMadre = exports.putMadre = exports.postMadre = exports.getMadre = exports.getMadresTodos = exports.getMadres = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const madre_1 = __importDefault(require("../models/madre"));
const persona_1 = __importDefault(require("../models/persona"));
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const alumno_1 = __importDefault(require("../models/alumno"));
const handleError_1 = require("../utils/handleError");
const getMadres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield madre_1.default.findAll({
            where: { estado: true }
        })).length;
        const madres = yield madre_1.default.findAll({
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
            madres,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMadres = getMadres;
const getMadresTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const madres = yield madre_1.default.findAll({
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
            madres
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMadresTodos = getMadresTodos;
const getMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const madre = yield madre_1.default.findByPk(id, {
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
        if (!madre || madre.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una madre con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            madre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMadre = getMadre;
const postMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const madre = madre_1.default.build({
            personaId: body.personaId,
        });
        yield madre.save();
        if (body.vive) {
            yield usuario_1.default.create({
                nombre: arr[0],
                numero: numeroUsuario,
                email: arr[0] + '' + numeroUsuario + '@demo.com',
                password: bcryptjs_1.default.hashSync(body.dniusuario, salt),
                roleId: roles[3].id,
                personaId: body.personaId
            });
        }
        res.json({
            ok: true,
            msg: 'Madre creada exitosamente.',
            madre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postMadre = postMadre;
const putMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const madre = yield madre_1.default.findByPk(id);
        if (!madre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una madre con el id: ${id}`
            });
        }
        yield (madre === null || madre === void 0 ? void 0 : madre.update(body));
        res.json({
            ok: true,
            msg: 'Madre actualizado exitosamente',
            madre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putMadre = putMadre;
const deleteMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const madre = yield madre_1.default.findByPk(id);
        if (!madre) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un madre con el id: ${id}`
            });
        }
        const lista = yield alumno_1.default.findAll({
            where: {
                madreId: id,
                estado: true
            },
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar la madre.`
            });
        }
        yield (madre === null || madre === void 0 ? void 0 : madre.update({ estado: false }));
        const usuario = yield usuario_1.default.findOne({
            where: {
                personaId: madre.personaId,
                estado: true
            }
        });
        if (usuario) {
            yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        }
        res.json({
            ok: true,
            msg: 'Madre eliminada exitosamente',
            madre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteMadre = deleteMadre;
const busquedaMadres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield madre_1.default.findAll({
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
exports.busquedaMadres = busquedaMadres;
const searchDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const madre = yield madre_1.default.findOne({
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
        if (madre) {
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
const madrePorPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const madre = yield madre_1.default.findOne({
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
        if (madre) {
            return res.json({
                ok: true,
                madre
            });
        }
        res.json({
            ok: false,
            msg: 'No existe una madre con el persona id:' + id
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.madrePorPersona = madrePorPersona;
const getMadreDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const madre = yield madre_1.default.findOne({
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
            madre
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMadreDNI = getMadreDNI;
//# sourceMappingURL=madre.js.map