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
exports.busquedaApoderadoPorNombres = exports.busquedaApoderadoPorDocumento = exports.tieneAlumnos = exports.busquedaApoderadoPorApellido = exports.apoderadoPorPersona = exports.busquedaApoderados = exports.deleteApoderado = exports.putApoderado = exports.postApoderado = exports.getApoderadoNumero = exports.getApoderado = exports.getApoderados = exports.getApoderadosTodo = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const alumno_1 = __importDefault(require("../models/alumno"));
const apoderado_1 = __importDefault(require("../models/apoderado"));
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getApoderadosTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apoderados = yield apoderado_1.default.findAll({
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
                    required: false,
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
            apoderados
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.getApoderadosTodo = getApoderadosTodo;
const getApoderados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield apoderado_1.default.findAll({
            where: { estado: true }
        })).length;
        const apoderados = yield apoderado_1.default.findAll({
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
                    required: false,
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
            apoderados,
            desde,
            total
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
exports.getApoderados = getApoderados;
const getApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apoderado = yield apoderado_1.default.findByPk(id, {
            include: [{
                    model: persona_1.default,
                    as: 'persona',
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                }]
        });
        if (!apoderado || apoderado.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un apoderado con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            apoderado
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
exports.getApoderado = getApoderado;
const getApoderadoNumero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero } = req.params;
    try {
        const apoderado = yield apoderado_1.default.findOne({
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    where: {
                        numero: numero
                    }
                }
            ]
        });
        if (!apoderado || apoderado.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un apoderado con el numero: ${numero}`
            });
        }
        res.json({
            ok: true,
            apoderado
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
exports.getApoderadoNumero = getApoderadoNumero;
const postApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const apoderado = apoderado_1.default.build(body);
        yield apoderado.save();
        yield usuario_1.default.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email: arr[0] + '' + numeroUsuario + '@gutemberg.com',
            password: bcryptjs_1.default.hashSync('123456', salt),
            roleId: roles[2].id,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: 'Apoderado guardado exitosamente',
            apoderado
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
exports.postApoderado = postApoderado;
const putApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const apoderado = yield apoderado_1.default.findByPk(id);
        if (!apoderado) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un apoderado con el id: ${id}`
            });
        }
        yield (apoderado === null || apoderado === void 0 ? void 0 : apoderado.update(body));
        res.json({
            ok: true,
            msg: 'Apoderado actualizado exitosamente',
            apoderado
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
exports.putApoderado = putApoderado;
const deleteApoderado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apoderado = yield apoderado_1.default.findByPk(id);
        if (!apoderado) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un docente con el id: ${id}`
            });
        }
        yield (apoderado === null || apoderado === void 0 ? void 0 : apoderado.update({ estado: false }));
        const usuario = yield usuario_1.default.findOne({
            where: {
                personaId: apoderado.personaId,
                estado: true
            }
        });
        if (usuario) {
            yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        }
        res.json({
            ok: true,
            msg: 'Apoderado borrado exitosamente',
            apoderado
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
exports.deleteApoderado = deleteApoderado;
const busquedaApoderados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield apoderado_1.default.findAll({
            where: {
                estado: true
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    where: {
                        nombres: {
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaApoderados = busquedaApoderados;
const apoderadoPorPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apoderado = yield apoderado_1.default.findOne({
            where: {
                estado: true,
                personaId: id
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    include: [{
                            model: tipodocumento_1.default,
                            as: 'tipodocumento'
                        }]
                }
            ]
        });
        if (apoderado) {
            return res.json({
                ok: true,
                apoderado
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un apoderado con el persona id: ' + id
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
exports.apoderadoPorPersona = apoderadoPorPersona;
const busquedaApoderadoPorApellido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield apoderado_1.default.findAll({
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaApoderadoPorApellido = busquedaApoderadoPorApellido;
const tieneAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apoderadoId } = req.params;
    try {
        const alumnos = yield alumno_1.default.findAll({
            where: {
                estado: true,
                apoderadoId: apoderadoId
            }
        });
        if (alumnos.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el apoderado."
            });
        }
        res.json({
            ok: false
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.tieneAlumnos = tieneAlumnos;
const busquedaApoderadoPorDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield apoderado_1.default.findAll({
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaApoderadoPorDocumento = busquedaApoderadoPorDocumento;
const busquedaApoderadoPorNombres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield apoderado_1.default.findAll({
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaApoderadoPorNombres = busquedaApoderadoPorNombres;
//# sourceMappingURL=apoderado.js.map