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
exports.busquedaDocentePorNombres = exports.busquedaDocentePorDocumento = exports.tieneProgramaciones = exports.busquedaDocentePorApellido = exports.maxDocenteNumero = exports.searchDNI = exports.busquedaDocentes = exports.deleteDocente = exports.putDocente = exports.postDocente = exports.getDocentePersona = exports.getDocente = exports.getDocentes = exports.getTodo = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const persona_1 = __importDefault(require("../models/persona"));
const docente_1 = __importDefault(require("../models/docente"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const programacion_1 = __importDefault(require("../models/programacion"));
const usuario_1 = __importDefault(require("../models/usuario"));
const role_1 = __importDefault(require("../models/role"));
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docentes = yield docente_1.default.findAll({
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
            docentes
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getDocentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield docente_1.default.findAll({
            where: { estado: true }
        })).length;
        const docentes = yield docente_1.default.findAll({
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
            docentes,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getDocentes = getDocentes;
const getDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const docente = yield docente_1.default.findByPk(id, {
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
        if (!docente || docente.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Docente encontrado',
            docente
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getDocente = getDocente;
const getDocentePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { persona } = req.params;
    try {
        const docente = yield docente_1.default.findOne({
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
        if (docente) {
            return res.json({
                ok: true,
                docente
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un docente con el id:' + persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getDocentePersona = getDocentePersona;
const postDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const docente = docente_1.default.build({
            personaId: body.personaId
        });
        yield docente.save();
        yield usuario_1.default.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email: arr[0] + '' + numeroUsuario + '@demo.com',
            password: bcryptjs_1.default.hashSync(body.dniusuario, salt),
            roleId: roles[1].id,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: 'Docente guardado exitosamente',
            docente
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postDocente = postDocente;
const putDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const docente = yield docente_1.default.findByPk(id);
        if (!docente || docente.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }
        yield (docente === null || docente === void 0 ? void 0 : docente.update(body));
        res.json({
            ok: true,
            msg: 'Docente actualizado exitosamente',
            docente
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putDocente = putDocente;
const deleteDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const docente = yield docente_1.default.findByPk(id);
        if (!docente || docente.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }
        const lista = yield programacion_1.default.findAll({
            where: {
                '$docente.id$': id,
                estado: true
            },
            include: [
                {
                    model: docente_1.default,
                    as: 'docente'
                }
            ]
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el docente`
            });
        }
        yield (docente === null || docente === void 0 ? void 0 : docente.update({ estado: false }));
        const usuario = yield usuario_1.default.findOne({
            where: {
                personaId: docente.personaId,
                estado: true
            }
        });
        if (usuario) {
            yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        }
        res.json({
            ok: true,
            msg: 'Docente borrado exitosamente',
            docente
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteDocente = deleteDocente;
const busquedaDocentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield docente_1.default.findAll({
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
exports.busquedaDocentes = busquedaDocentes;
const searchDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const docente = yield docente_1.default.findOne({
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
        if (docente) {
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
const maxDocenteNumero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const max_valor = yield docente_1.default.max('numero');
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
exports.maxDocenteNumero = maxDocenteNumero;
const busquedaDocentePorApellido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield docente_1.default.findAll({
            where: {
                estado: true
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    where: {
                        apellidopaterno: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
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
exports.busquedaDocentePorApellido = busquedaDocentePorApellido;
const tieneProgramaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { docenteId } = req.params;
    try {
        const programaciones = yield programacion_1.default.findAll({
            where: {
                estado: true,
                docenteId: docenteId
            }
        });
        if (programaciones.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el docente."
            });
        }
        res.json({
            ok: false
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.tieneProgramaciones = tieneProgramaciones;
const busquedaDocentePorDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield docente_1.default.findAll({
            where: {
                estado: true
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    where: {
                        numero: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
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
exports.busquedaDocentePorDocumento = busquedaDocentePorDocumento;
const busquedaDocentePorNombres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield docente_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        '$persona.numero$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        },
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
                ],
                estado: true
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
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
exports.busquedaDocentePorNombres = busquedaDocentePorNombres;
//# sourceMappingURL=docente.js.map