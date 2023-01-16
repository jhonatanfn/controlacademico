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
exports.busquedaAlumnosNombres = exports.busquedaAlumnosDocumento = exports.tieneMatricula = exports.busquedaAlumnosApellido = exports.alumnoPorPersona = exports.searchDNI = exports.busquedaAlumnos = exports.deleteAlumno = exports.putAlumno = exports.postAlumno = exports.getAlumno = exports.getAlumnoDNI = exports.getAlumnosMadre = exports.getAlumnosPadre = exports.getAlumnosTodos = exports.getAlumnos = void 0;
const sequelize_1 = require("sequelize");
const alumno_1 = __importDefault(require("../models/alumno"));
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const matricula_1 = __importDefault(require("../models/matricula"));
const usuario_1 = __importDefault(require("../models/usuario"));
const padre_1 = __importDefault(require("../models/padre"));
const madre_1 = __importDefault(require("../models/madre"));
const responsable_1 = __importDefault(require("../models/responsable"));
const role_1 = __importDefault(require("../models/role"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const handleError_1 = require("../utils/handleError");
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
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: padre_1.default,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: madre_1.default,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: responsable_1.default,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: padre_1.default,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: madre_1.default,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: responsable_1.default,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAlumnosTodos = getAlumnosTodos;
const getAlumnosPadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alumnos = yield alumno_1.default.findAll({
            where: {
                estado: true,
                padreId: req.params.padreId
            },
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
                },
                {
                    model: padre_1.default,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: madre_1.default,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: responsable_1.default,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAlumnosPadre = getAlumnosPadre;
const getAlumnosMadre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alumnos = yield alumno_1.default.findAll({
            where: {
                estado: true,
                madreId: req.params.madreId
            },
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
                },
                {
                    model: padre_1.default,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: madre_1.default,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: responsable_1.default,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAlumnosMadre = getAlumnosMadre;
const getAlumnoDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const alumno = yield alumno_1.default.findOne({
            where: { estado: true },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                    where: {
                        dni: dni
                    },
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
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el dni: ${dni}`
            });
        }
        res.json({
            ok: true,
            alumno
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAlumnoDNI = getAlumnoDNI;
const getAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const alumno = yield alumno_1.default.findByPk(id, {
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
                },
                {
                    model: padre_1.default,
                    as: 'padre',
                    attributes: ['id', 'vive'],
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
                },
                {
                    model: madre_1.default,
                    as: 'madre',
                    attributes: ['id', 'vive'],
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
                },
                {
                    model: responsable_1.default,
                    as: 'responsable',
                    attributes: ['id'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getAlumno = getAlumno;
const postAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        /** registro padre */
        if (!body.padreId) {
            let personaIdUsuario1;
            const persona1 = yield persona_1.default.findOne({
                where: {
                    estado: true,
                    dni: body.padredni
                },
                attributes: ['id']
            });
            if (persona1) {
                const padre1 = padre_1.default.build({
                    personaId: persona1.id,
                    vivo: body.padrevive
                });
                yield padre1.save();
                body.padreId = padre1.id;
                personaIdUsuario1 = persona1.id;
            }
            else {
                const persona2 = persona_1.default.build({
                    dni: body.padredni,
                    nombres: body.padrenombres,
                    apellidopaterno: body.padreapellidopaterno,
                    apellidomaterno: body.padreapellidomaterno,
                    sexo: body.padresexo,
                    fechanacimiento: body.padrefechanacimiento,
                    tipodocumentoId: body.padretipodocumentoId
                });
                yield persona2.save();
                const padre2 = padre_1.default.build({
                    personaId: persona2.id,
                    vive: body.padrevive
                });
                yield padre2.save();
                body.padreId = padre2.id;
                personaIdUsuario1 = persona2.id;
            }
            if (body.padrevive && body.padredni != "00000000") {
                let maxValorpadre = yield usuario_1.default.max('numero', { where: { estado: true } });
                let arrpadre = body.padrenombreusuario.split(' ');
                let numeroUsuariopadre = maxValorpadre + 1;
                yield usuario_1.default.create({
                    nombre: arrpadre[0],
                    numero: numeroUsuariopadre,
                    email: arrpadre[0] + '' + numeroUsuariopadre + '@demo.com',
                    password: bcryptjs_1.default.hashSync(body.padredniusuario, salt),
                    roleId: roles[2].id,
                    personaId: personaIdUsuario1
                });
            }
        }
        /** registro madre */
        if (!body.madreId) {
            let personaIdUsuario2;
            const persona3 = yield persona_1.default.findOne({
                where: {
                    estado: true,
                    dni: body.madredni
                },
                attributes: ['id']
            });
            if (persona3) {
                const madre1 = madre_1.default.build({
                    personaId: persona3.id,
                    vivo: body.madrevive
                });
                yield madre1.save();
                body.madreId = madre1.id;
                personaIdUsuario2 = persona3.id;
            }
            else {
                const persona4 = persona_1.default.build({
                    dni: body.madredni,
                    nombres: body.madrenombres,
                    apellidopaterno: body.madreapellidopaterno,
                    apellidomaterno: body.madreapellidomaterno,
                    sexo: body.madresexo,
                    fechanacimiento: body.madrefechanacimiento,
                    tipodocumentoId: body.madretipodocumentoId
                });
                yield persona4.save();
                const madre2 = madre_1.default.build({
                    personaId: persona4.id,
                    vive: body.madrevive
                });
                yield madre2.save();
                body.madreId = madre2.id;
                personaIdUsuario2 = persona4.id;
            }
            if (body.madrevive && body.padredni != "00000000") {
                let maxValormadre = yield usuario_1.default.max('numero', { where: { estado: true } });
                let arrmadre = body.madrenombreusuario.split(' ');
                let numeroUsuariomadre = maxValormadre + 1;
                yield usuario_1.default.create({
                    nombre: arrmadre[0],
                    numero: numeroUsuariomadre,
                    email: arrmadre[0] + '' + numeroUsuariomadre + '@demo.com',
                    password: bcryptjs_1.default.hashSync(body.madredniusuario, salt),
                    roleId: roles[3].id,
                    personaId: personaIdUsuario2
                });
            }
        }
        if (body.padreId && body.madreId && body.responsableId) {
            const alumno = alumno_1.default.build({
                personaId: body.personaId,
                padreId: body.padreId,
                madreId: body.madreId,
                responsableId: body.responsableId,
                vivecon: body.vivecon,
                tienediscapacidad: body.tienediscapacidad,
                cualdiscapacidad: body.cualdiscapacidad,
                certificadiscapacidad: body.certificadiscapacidad,
                observacion: body.observacion,
                inicialprocede: body.inicialprocede,
                colegioprocede: body.colegioprocede
            });
            yield alumno.save();
            return res.json({
                ok: true,
                msg: 'Alumno creado exitosamente.',
                alumno
            });
        }
        res.json({
            ok: false,
            msg: "No se pudo crear el alumno."
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postAlumno = postAlumno;
const putAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const roles = yield role_1.default.findAll({ where: { estado: true } });
        const salt = bcryptjs_1.default.genSaltSync();
        /** registro padre */
        if (!body.padreId) {
            let personaIdUsuario1;
            const persona1 = yield persona_1.default.findOne({
                where: {
                    estado: true,
                    dni: body.padredni
                },
                attributes: ['id']
            });
            if (persona1) {
                const padre1 = padre_1.default.build({
                    personaId: persona1.id,
                    vivo: body.padrevive
                });
                yield padre1.save();
                body.padreId = padre1.id;
                personaIdUsuario1 = persona1.id;
            }
            else {
                const persona2 = persona_1.default.build({
                    dni: body.padredni,
                    nombres: body.padrenombres,
                    apellidopaterno: body.padreapellidopaterno,
                    apellidomaterno: body.padreapellidomaterno,
                    sexo: body.padresexo,
                    fechanacimiento: body.padrefechanacimiento,
                    tipodocumentoId: body.padretipodocumentoId
                });
                yield persona2.save();
                const padre2 = padre_1.default.build({
                    personaId: persona2.id,
                    vive: body.padrevive
                });
                yield padre2.save();
                body.padreId = padre2.id;
                personaIdUsuario1 = persona2.id;
            }
            if (body.padrevive && body.padredni != "00000000") {
                let maxValorpadre = yield usuario_1.default.max('numero', { where: { estado: true } });
                let arrpadre = body.padrenombreusuario.split(' ');
                let numeroUsuariopadre = maxValorpadre + 1;
                yield usuario_1.default.create({
                    nombre: arrpadre[0],
                    numero: numeroUsuariopadre,
                    email: arrpadre[0] + '' + numeroUsuariopadre + '@mail.com',
                    password: bcryptjs_1.default.hashSync(body.padredniusuario, salt),
                    roleId: roles[2].id,
                    personaId: personaIdUsuario1
                });
            }
        }
        /** registro madre */
        if (!body.madreId) {
            let personaIdUsuario2;
            const persona3 = yield persona_1.default.findOne({
                where: {
                    estado: true,
                    dni: body.madredni
                },
                attributes: ['id']
            });
            if (persona3) {
                const madre1 = madre_1.default.build({
                    personaId: persona3.id,
                    vivo: body.madrevive
                });
                yield madre1.save();
                body.madreId = madre1.id;
                personaIdUsuario2 = persona3.id;
            }
            else {
                const persona4 = persona_1.default.build({
                    dni: body.madredni,
                    nombres: body.madrenombres,
                    apellidopaterno: body.madreapellidopaterno,
                    apellidomaterno: body.madreapellidomaterno,
                    sexo: body.madresexo,
                    fechanacimiento: body.madrefechanacimiento,
                    tipodocumentoId: body.madretipodocumentoId
                });
                yield persona4.save();
                const madre2 = madre_1.default.build({
                    personaId: persona4.id,
                    vive: body.madrevive
                });
                yield madre2.save();
                body.madreId = madre2.id;
                personaIdUsuario2 = persona4.id;
            }
            if (body.madrevive && body.padredni != "00000000") {
                let maxValormadre = yield usuario_1.default.max('numero', { where: { estado: true } });
                let arrmadre = body.madrenombreusuario.split(' ');
                let numeroUsuariomadre = maxValormadre + 1;
                yield usuario_1.default.create({
                    nombre: arrmadre[0],
                    numero: numeroUsuariomadre,
                    email: arrmadre[0] + '' + numeroUsuariomadre + '@mail.com',
                    password: bcryptjs_1.default.hashSync(body.madredniusuario, salt),
                    roleId: roles[3].id,
                    personaId: personaIdUsuario2
                });
            }
        }
        const alumno = yield alumno_1.default.findByPk(id);
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        if (body.padreId && body.madreId && body.responsableId) {
            yield (alumno === null || alumno === void 0 ? void 0 : alumno.update(body));
            return res.json({
                ok: true,
                msg: 'Alumno actualizado exitosamente',
                alumno
            });
        }
        res.json({
            ok: false,
            msg: "No se pudo actualizar el alumno"
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
                    as: 'alumno',
                    attributes: ['id']
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteAlumno = deleteAlumno;
const busquedaAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield alumno_1.default.findAll({
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
                    },
                    {
                        '$padre.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$madre.persona.nombres$': {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    }
                ]
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img'],
                    include: [
                        {
                            model: tipodocumento_1.default,
                            as: 'tipodocumento',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: padre_1.default,
                    as: 'padre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: madre_1.default,
                    as: 'madre',
                    attributes: ['id', 'vive'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
                        }
                    ]
                },
                {
                    model: responsable_1.default,
                    as: 'responsable',
                    attributes: ['id'],
                    include: [
                        {
                            model: persona_1.default,
                            as: 'persona',
                            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
exports.busquedaAlumnos = busquedaAlumnos;
const searchDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const alumno = yield alumno_1.default.findOne({
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
        if (alumno) {
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
                    attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
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
exports.busquedaAlumnosNombres = busquedaAlumnosNombres;
//# sourceMappingURL=alumno.js.map