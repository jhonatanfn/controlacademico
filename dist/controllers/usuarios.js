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
exports.busquedaUsuariosPorRol = exports.habilitarDesabilitarUsuario = exports.emailRepetido = exports.busquedaUsuarios = exports.deleteUsuario = exports.actualizarPassword = exports.putUsuario = exports.postUsuario = exports.getUsuarioAreas = exports.getUsuario = exports.getUsuarios = exports.getUsuariosPorRol = exports.getUsuariosTodos = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const role_1 = __importDefault(require("../models/role"));
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const getUsuariosTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.findAll({
            attributes: ['id', 'email'],
            where: { estado: true }
        });
        res.json({
            ok: true,
            usuarios
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador',
            error
        });
    }
});
exports.getUsuariosTodos = getUsuariosTodos;
const getUsuariosPorRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const { rolId } = req.params;
    try {
        const total = (yield usuario_1.default.findAll({
            where: {
                estado: true,
                id: {
                    [sequelize_1.Op.ne]: req.usuarioauth
                },
                '$role.id$': rolId,
            },
            include: [
                {
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id'],
                }
            ]
        })).length;
        const usuarios = yield usuario_1.default.findAll({
            include: [{
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            attributes: { exclude: ['password'] },
            where: {
                estado: true,
                id: {
                    [sequelize_1.Op.ne]: req.usuarioauth
                },
                '$role.id$': rolId,
            },
            limit: 5,
            offset: desde,
            order: [
                [
                    'id', 'DESC'
                ]
            ],
        });
        res.json({
            ok: true,
            usuarios,
            desde,
            total
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador',
            error
        });
    }
});
exports.getUsuariosPorRol = getUsuariosPorRol;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield usuario_1.default.findAll({
            where: {
                estado: true,
                id: {
                    [sequelize_1.Op.ne]: req.usuarioauth
                }
            }
        })).length;
        const usuarios = yield usuario_1.default.findAll({
            include: [{
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            attributes: { exclude: ['password'] },
            where: {
                estado: true,
                id: {
                    [sequelize_1.Op.ne]: req.usuarioauth
                }
            },
            limit: 5,
            offset: desde,
            order: [
                [
                    'id', 'DESC'
                ]
            ],
        });
        res.json({
            ok: true,
            usuarios,
            desde,
            total
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador',
            error
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id, {
            include: [{
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id', 'nombre'],
                    required: false,
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
            attributes: { exclude: ['password'] }
        });
        if (!usuario || usuario.estado == false) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador',
            error
        });
    }
});
exports.getUsuario = getUsuario;
const getUsuarioAreas = (req, res) => {
    const { id } = req.params;
    usuario_1.default.findByPk(id).then((usuario) => {
        usuario.getAreas().then((areas) => {
            res.json({
                areas
            });
        });
    });
};
exports.getUsuarioAreas = getUsuarioAreas;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.json({
                ok: false,
                msg: `Ya existe un usuario con el email: ${body.email}`
            });
        }
        const salt = bcryptjs_1.default.genSaltSync();
        const usuario = yield usuario_1.default.create({
            nombre: body.nombre,
            email: body.email,
            password: bcryptjs_1.default.hashSync(body.password, salt),
            roleId: body.roleId,
            personaId: body.personaId
        });
        res.json({
            ok: true,
            msg: "Usuario guardado exitosamente",
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error. Hable con el administrador',
            error
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        if (usuario.email === body.email) {
            delete body.email;
        }
        else {
            const existeEmail = yield usuario_1.default.findOne({
                where: {
                    email: body.email
                }
            });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe un usuario con el email: ${body.email}`
                });
            }
        }
        delete body.password;
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update(body));
        res.json({
            ok: true,
            msg: "Usuario actualizado exitosamente",
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error. Hable con el administrador",
            error
        });
    }
});
exports.putUsuario = putUsuario;
const actualizarPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id, {});
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(body.password, salt);
        usuario.save();
        res.json({
            ok: true,
            msg: "El password ha sido cambiado exitosamente"
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error. Hable con el administrador",
            error
        });
    }
});
exports.actualizarPassword = actualizarPassword;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Usuario borrado exitosamente',
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error. Hable con el administrador"
        });
    }
});
exports.deleteUsuario = deleteUsuario;
const busquedaUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const valor = req.params.valor;
    try {
        const data = yield usuario_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        nombre: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        email: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.numero$': {
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
                ],
                id: {
                    [sequelize_1.Op.ne]: req.usuarioauth
                }
            },
            include: [
                {
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id', 'nombre']
                },
                {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                }
            ],
            attributes: { exclude: ['password'] },
        });
        res.json({
            ok: true,
            busquedas: data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error. Hable con el administrador"
        });
    }
});
exports.busquedaUsuarios = busquedaUsuarios;
const emailRepetido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.json({
                ok: true,
                msg: `Ya existe un usuario con el email: ${body.email}`
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
exports.emailRepetido = emailRepetido;
const habilitarDesabilitarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ habilitado: body.accion }));
        res.json({
            ok: true,
            msg: 'Usuario actualizado con exito',
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error. Hable con el administrador"
        });
    }
});
exports.habilitarDesabilitarUsuario = habilitarDesabilitarUsuario;
const busquedaUsuariosPorRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const valor = req.params.valor;
    const { rolId } = req.params;
    try {
        const data = yield usuario_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        nombre: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        email: {
                            [sequelize_1.Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.numero$': {
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
                ],
                '$role.id$': rolId,
                id: {
                    [sequelize_1.Op.ne]: req.usuarioauth
                }
            },
            include: [{
                    model: role_1.default,
                    as: 'role',
                    attributes: ['id', 'nombre']
                }, {
                    model: persona_1.default,
                    as: 'persona',
                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                }],
            attributes: { exclude: ['password'] },
        });
        res.json({
            ok: true,
            busquedas: data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error. Hable con el administrador"
        });
    }
});
exports.busquedaUsuariosPorRol = busquedaUsuariosPorRol;
//# sourceMappingURL=usuarios.js.map