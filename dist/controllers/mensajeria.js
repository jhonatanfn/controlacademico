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
exports.actualizarMensajesNuevos = exports.existenMensajesNuevos = exports.busquedaMensajeriasEliminados = exports.busquedaMensajeriasEnviados = exports.busquedaMensajeriasRecibidos = exports.restaurarReceptor = exports.restaurarEmisor = exports.getMensajeriasEliminados = exports.getMensajeriasEnviados = exports.getMensajeriasRecibidos = exports.noleidoMensajeriaReceptor = exports.noleidoMensajeriaEmisor = exports.leidoMensajeriaReceptor = exports.leidoMensajeriaEmisor = exports.deleteMensajeriaReceptor = exports.deleteMensajeriaEmisor = exports.busquedaMensajerias = exports.putMensajeria = exports.postMensajeria = exports.getMensajeria = exports.getMensajerias = exports.getTodo = void 0;
const mensajeria_1 = __importDefault(require("../models/mensajeria"));
const sequelize_1 = require("sequelize");
const handleError_1 = require("../utils/handleError");
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mensajerias = yield mensajeria_1.default.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            mensajerias
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getTodo = getTodo;
const getMensajerias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (yield mensajeria_1.default.findAll({
            where: { estado: true }
        })).length;
        const mensajerias = yield mensajeria_1.default.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMensajerias = getMensajerias;
const getMensajeria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe el mensaje con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMensajeria = getMensajeria;
const postMensajeria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const mensajeria = mensajeria_1.default.build(body);
        yield mensajeria.save();
        res.json({
            ok: true,
            msg: 'Mensaje enviado exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postMensajeria = postMensajeria;
const putMensajeria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const mensajeria = yield mensajeria_1.default.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe el mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update(body));
        res.json({
            ok: true,
            msg: 'Mensaje actualizado exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putMensajeria = putMensajeria;
const busquedaMensajerias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor } = req.params;
    try {
        const data = yield mensajeria_1.default.findAll({
            where: {
                asunto: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true
            }
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
exports.busquedaMensajerias = busquedaMensajerias;
const deleteMensajeriaEmisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findOne({
            where: {
                id: id,
                emisor: req.body.emisor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({ xemisor: true }));
        res.json({
            ok: true,
            msg: 'Mensaje eliminado exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteMensajeriaEmisor = deleteMensajeriaEmisor;
const deleteMensajeriaReceptor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findOne({
            where: {
                id: id,
                receptor: req.body.receptor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({ xreceptor: true }));
        res.json({
            ok: true,
            msg: 'Mensaje eliminado exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deleteMensajeriaReceptor = deleteMensajeriaReceptor;
const leidoMensajeriaEmisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findOne({
            where: {
                id: id,
                emisor: req.body.emisor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
            lemisor: true,
            cemisor: ""
        }));
        res.json({
            ok: true,
            msg: 'Mensaje leido exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.leidoMensajeriaEmisor = leidoMensajeriaEmisor;
const leidoMensajeriaReceptor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findOne({
            where: {
                id: id,
                receptor: req.body.receptor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
            lreceptor: true,
            creceptor: ""
        }));
        res.json({
            ok: true,
            msg: 'Mensaje leido exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.leidoMensajeriaReceptor = leidoMensajeriaReceptor;
const noleidoMensajeriaEmisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findOne({
            where: {
                id: id,
                emisor: req.body.emisor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
            lemisor: false,
            cemisor: "list-group-item-info"
        }));
        res.json({
            ok: true,
            msg: 'Mensaje no leido exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.noleidoMensajeriaEmisor = noleidoMensajeriaEmisor;
const noleidoMensajeriaReceptor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findOne({
            where: {
                id: id,
                receptor: req.body.receptor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
            lreceptor: false,
            creceptor: "list-group-item-info"
        }));
        res.json({
            ok: true,
            msg: 'Mensaje no leido exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.noleidoMensajeriaReceptor = noleidoMensajeriaReceptor;
const getMensajeriasRecibidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const { email } = req.body;
    try {
        const total = (yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                receptor: email,
                xreceptor: false
            }
        })).length;
        const mensajerias = yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                receptor: email,
                xreceptor: false
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 10,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMensajeriasRecibidos = getMensajeriasRecibidos;
const getMensajeriasEnviados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const { email } = req.body;
    try {
        const total = (yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                emisor: email,
                xemisor: false
            }
        })).length;
        const mensajerias = yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                emisor: email,
                xemisor: false
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 10,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMensajeriasEnviados = getMensajeriasEnviados;
const getMensajeriasEliminados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    const { email } = req.body;
    try {
        const total = (yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        emisor: email,
                        xemisor: true,
                    },
                    {
                        receptor: email,
                        xreceptor: true
                    }
                ]
            }
        })).length;
        const mensajerias = yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        emisor: email,
                        xemisor: true,
                    },
                    {
                        receptor: email,
                        xreceptor: true
                    }
                ]
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 10,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getMensajeriasEliminados = getMensajeriasEliminados;
const restaurarEmisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
            xemisor: false
        }));
        res.json({
            ok: true,
            msg: 'Mensaje restaurado exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.restaurarEmisor = restaurarEmisor;
const restaurarReceptor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensajeria = yield mensajeria_1.default.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        yield (mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
            xreceptor: false
        }));
        res.json({
            ok: true,
            msg: 'Mensaje restaurado exitosamente',
            mensajeria
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.restaurarReceptor = restaurarReceptor;
const busquedaMensajeriasRecibidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, email } = req.params;
    try {
        const data = yield mensajeria_1.default.findAll({
            where: {
                asunto: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true,
                receptor: email,
                xreceptor: false
            }
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
exports.busquedaMensajeriasRecibidos = busquedaMensajeriasRecibidos;
const busquedaMensajeriasEnviados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, email } = req.params;
    try {
        const data = yield mensajeria_1.default.findAll({
            where: {
                asunto: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true,
                emisor: email,
                xemisor: false
            }
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
exports.busquedaMensajeriasEnviados = busquedaMensajeriasEnviados;
const busquedaMensajeriasEliminados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { valor, email } = req.params;
    try {
        const data = yield mensajeria_1.default.findAll({
            where: {
                asunto: {
                    [sequelize_1.Op.like]: `%${valor}%`
                },
                estado: true,
                [sequelize_1.Op.or]: [
                    {
                        emisor: email,
                        xemisor: true,
                    },
                    {
                        receptor: email,
                        xreceptor: true
                    }
                ]
            }
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
exports.busquedaMensajeriasEliminados = busquedaMensajeriasEliminados;
const existenMensajesNuevos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const total = (yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                receptor: email,
                nuevo: true
            }
        })).length;
        res.json({
            ok: true,
            total
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.existenMensajesNuevos = existenMensajesNuevos;
const actualizarMensajesNuevos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const mensajerias = yield mensajeria_1.default.findAll({
            where: {
                estado: true,
                receptor: email,
                nuevo: true
            },
        });
        if (mensajerias.length > 0) {
            mensajerias.forEach(mensajeria => {
                mensajeria === null || mensajeria === void 0 ? void 0 : mensajeria.update({
                    nuevo: false
                });
            });
            return res.json({
                ok: true,
                msg: "Mensajes actualizados con exito"
            });
        }
        res.json({
            ok: true,
            msg: "No hay mensajes nuevos"
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.actualizarMensajesNuevos = actualizarMensajesNuevos;
//# sourceMappingURL=mensajeria.js.map