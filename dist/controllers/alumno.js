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
exports.busquedaAlumnosNombres = exports.busquedaAlumnosDocumento = exports.tieneMatricula = exports.busquedaAlumnosApellido = exports.alumnoPorPersona = exports.busquedaAlumnos = exports.deleteAlumno = exports.putAlumno = exports.postAlumno = exports.getAlumno = exports.getAlumnoNumero = exports.getAlumnosTodos = exports.getAlumnos = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const alumno_1 = __importDefault(require("../models/alumno"));
const persona_1 = __importDefault(require("../models/persona"));
const apoderado_1 = __importDefault(require("../models/apoderado"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const matricula_1 = __importDefault(require("../models/matricula"));
const role_1 = __importDefault(require("../models/role"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield alumno_1.default.findAll({
            where: { estado: true }
        })).length;
        const alumnos = yield alumno_1.default.findAll({
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
                    required: false,
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado',
                    attributes: ['personaId'],
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            required: false,
                            include: [
                                {
                                    model: tipodocumento_1.default,
                                    as: 'tipodocumento',
                                    attributes: ['id', 'nombre'],
                                    required: false
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            alumnos,
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
exports.getAlumnos = getAlumnos;
const getAlumnosTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alumnos = yield alumno_1.default.findAll({
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
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado',
                    attributes: ['personaId'],
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            required: false,
                            include: [
                                {
                                    model: tipodocumento_1.default,
                                    as: 'tipodocumento',
                                    attributes: ['id', 'nombre'],
                                    required: false
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true,
            alumnos
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
exports.getAlumnosTodos = getAlumnosTodos;
const getAlumnoNumero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero } = req.params;
    try {
        const alumno = yield alumno_1.default.findOne({
            where: { estado: true },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    where: {
                        numero: numero
                    }
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado'
                }
            ]
        });
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el numero: ${numero}`
            });
        }
        res.json({
            ok: true,
            alumno
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
exports.getAlumnoNumero = getAlumnoNumero;
const getAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alumno = yield alumno_1.default.findByPk(id, {
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    required: false,
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado',
                    required: false,
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            required: false,
                            include: [
                                {
                                    model: tipodocumento_1.default,
                                    as: 'tipodocumento',
                                    attributes: ['id', 'nombre'],
                                    required: false
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        if (!alumno || alumno.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            alumno
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
exports.getAlumno = getAlumno;
const postAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        let maxValor = yield usuario_1.default.max('numero', { where: { estado: true } });
        let arr = body.nombreusuario.split(' ');
        let numeroUsuario = maxValor + 1;
        const alumno = alumno_1.default.build({
            personaId: body.personaId,
            apoderadoId: body.apoderadoId
        });
        yield alumno.save();
        yield usuario_1.default.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email: arr[0] + '' + numeroUsuario + '@gutemberg.com',
            password: bcryptjs_1.default.hashSync('123456', salt),
            roleId: roles[3].id,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: 'Alumno creado exitosamente',
            alumno
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
exports.postAlumno = postAlumno;
const putAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const alumno = yield alumno_1.default.findByPk(id);
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        yield (alumno === null || alumno === void 0 ? void 0 : alumno.update(body));
        res.json({
            ok: true,
            msg: 'Alumno actualizado exitosamente',
            alumno
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
exports.putAlumno = putAlumno;
const deleteAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alumno = yield alumno_1.default.findByPk(id);
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        const lista = yield matricula_1.default.findAll({
            where: {
                '$alumno.id$': id,
                estado: true
            },
            include: [
                {
                    model: alumno_1.default,
                    as: 'alumno'
                }
            ]
        });
        if (lista.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: `No puede eliminar el alumno.`
            });
        }
        yield (alumno === null || alumno === void 0 ? void 0 : alumno.update({ estado: false }));
        const usuario = yield usuario_1.default.findOne({
            where: {
                personaId: alumno.personaId,
                estado: true
            }
        });
        if (usuario) {
            yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        }
        res.json({
            ok: true,
            msg: 'Alumno eliminado exitosamente',
            alumno
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
exports.deleteAlumno = deleteAlumno;
const busquedaAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield alumno_1.default.findAll({
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaAlumnos = busquedaAlumnos;
const alumnoPorPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alumno = yield alumno_1.default.findOne({
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
        if (alumno) {
            return res.json({
                ok: true,
                alumno
            });
        }
        res.json({
            ok: false,
            msg: 'No existe un alumno con el persona id:' + id
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
exports.alumnoPorPersona = alumnoPorPersona;
const busquedaAlumnosApellido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield alumno_1.default.findAll({
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
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaAlumnosApellido = busquedaAlumnosApellido;
const tieneMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alumnoId } = req.params;
    try {
        const matriculas = yield matricula_1.default.findAll({
            where: {
                estado: true,
                alumnoId: alumnoId
            }
        });
        if (matriculas.length > 0) {
            return res.json({
                ok: true,
                msg: "No se puede eliminar el alumno."
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
exports.tieneMatricula = tieneMatricula;
const busquedaAlumnosDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield alumno_1.default.findAll({
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
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaAlumnosDocumento = busquedaAlumnosDocumento;
const busquedaAlumnosNombres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield alumno_1.default.findAll({
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
                },
                {
                    model: apoderado_1.default,
                    as: 'apoderado',
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona'
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
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador'
        });
    }
});
exports.busquedaAlumnosNombres = busquedaAlumnosNombres;
//# sourceMappingURL=alumno.js.map