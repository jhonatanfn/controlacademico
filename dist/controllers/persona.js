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
exports.getPersonaDNI = exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const handleError_1 = require("../utils/handleError");
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personas = yield persona_1.default.findAll({
            where: {
                estado: true
            },
            include: {
                model: tipodocumento_1.default,
                as: 'tipodocumento',
                attributes: ['id', 'nombre']
            },
        });
        res.json({
            ok: true,
            personas
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const persona = yield persona_1.default.findByPk(id, {
            include: {
                model: tipodocumento_1.default,
                as: 'tipodocumento',
                attributes: ['id', 'nombre']
            },
        });
        if (!persona || persona.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Persona encontrada',
            persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPersona = getPersona;
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const dni = yield persona_1.default.findOne({
            where: {
                dni: body.dni
            }
        });
        if (dni) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe una persona con el dni: ${body.dni}`
            });
        }
        const persona = persona_1.default.build({
            dni: body.dni,
            nombres: body.nombres,
            apellidopaterno: body.apellidopaterno,
            apellidomaterno: body.apellidomaterno,
            domicilio: body.domicilio,
            telefono: body.telefono,
            nacionalidad: body.nacionalidad,
            distrito: body.distrito,
            fechanacimiento: body.fechanacimiento,
            sexo: body.sexo,
            correo: body.correo,
            tipodocumentoId: body.tipodocumentoId
        });
        yield persona.save();
        res.json({
            ok: true,
            msg: "Persona creada exitosamente",
            persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.postPersona = postPersona;
const putPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const persona = yield persona_1.default.findByPk(id, {
            include: {
                model: tipodocumento_1.default,
                as: 'tipodocumento'
            }
        });
        if (!persona || persona.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }
        if (persona.dni === body.dni) {
            delete body.numero;
        }
        else {
            const dni = yield persona_1.default.findOne({
                where: {
                    dni: body.dni
                }
            });
            if (dni) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe una persona con el dni: ${body.dni}`
                });
            }
        }
        yield (persona === null || persona === void 0 ? void 0 : persona.update(body));
        res.json({
            ok: true,
            msg: "Persona actualizada exitosamente",
            persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.putPersona = putPersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const persona = yield persona_1.default.findByPk(id);
        if (!persona || persona.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }
        yield (persona === null || persona === void 0 ? void 0 : persona.update({ estado: false }));
        res.json({
            ok: true,
            msg: 'Persona eliminada exitosamente',
            persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.deletePersona = deletePersona;
const getPersonaDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const persona = yield persona_1.default.findOne({
            where: {
                estado: true,
                dni: dni
            },
            attributes: ['id', 'dni', 'nombres', 'apellidopaterno', 'apellidomaterno', 'domicilio', 'telefono', 'nacionalidad', 'distrito', 'fechanacimiento', 'sexo', 'img', 'correo'],
            include: {
                model: tipodocumento_1.default,
                as: 'tipodocumento',
                attributes: ['id', 'nombre']
            },
        });
        res.json({
            ok: true,
            persona
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.getPersonaDNI = getPersonaDNI;
//# sourceMappingURL=persona.js.map