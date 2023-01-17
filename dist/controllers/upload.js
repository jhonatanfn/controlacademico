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
exports.fileUploadCloudinaryInstitucion = exports.retornaImagenInstitucion = exports.fileUploadPdf = exports.fileUploadCloudinaryArea = exports.fileUploadCloudinary = exports.retornaImagen = exports.fileUpload = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const actualizaArchivo_1 = require("../helpers/actualizaArchivo");
const usuario_1 = __importDefault(require("../models/usuario"));
const parser_1 = __importDefault(require("datauri/parser"));
const persona_1 = __importDefault(require("../models/persona"));
const area_1 = __importDefault(require("../models/area"));
const material_1 = __importDefault(require("../models/material"));
const institucion_1 = __importDefault(require("../models/institucion"));
const handleError_1 = require("../utils/handleError");
const parser = new parser_1.default();
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'archivos',
    api_key: process.env.CLOUDINARY_API_KEY || '229177161422146',
    api_secret: process.env.CLOUDINARY_API_SECRET || '50CFAia_nxawmNLcdUH7uIACHEU'
});
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id, {
            include: [{
                    model: persona_1.default,
                    as: 'persona'
                }]
        });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo cargado'
            });
        }
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'PNG'];
        if (!extencionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida'
            });
        }
        const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
        const pathImg = path_1.default.join(__dirname, `../../uploads/${nombreArchivo}`);
        file.mv(pathImg, (error) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
            }
        });
        (0, actualizaArchivo_1.actualizarArchivo)(usuario, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.fileUpload = fileUpload;
const retornaImagen = (req, res) => {
    const foto = req.params.foto;
    const pathImg = path_1.default.join(__dirname, `../../uploads/${foto}`);
    if (fs_1.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        const pathDefault = path_1.default.join(__dirname, `../../uploads/no-img.jpg`);
        res.sendFile(pathDefault);
    }
};
exports.retornaImagen = retornaImagen;
const fileUploadCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id, {
            include: [{
                    model: persona_1.default,
                    as: 'persona'
                }]
        });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo cargado'
            });
        }
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'PNG'];
        if (!extencionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida'
            });
        }
        const persona = yield persona_1.default.findByPk(usuario.personaId);
        if (persona.img) {
            const nombreArr = persona.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            yield cloudinary.uploader.destroy(public_id);
        }
        const file64 = parser.format('imagennombre', file.data);
        const { secure_url } = yield cloudinary.uploader.upload(file64.content);
        const nombreArchivo = secure_url;
        persona.img = secure_url;
        yield persona.save();
        res.json({
            ok: true,
            msg: 'Archivo subido exitosamente',
            nombreArchivo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.fileUploadCloudinary = fileUploadCloudinary;
const fileUploadCloudinaryArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findByPk(id);
        if (!area) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un area con el id: ${id}`
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo cargado'
            });
        }
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'PNG'];
        if (!extencionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida'
            });
        }
        if (area.img) {
            const nombreArr = area.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            yield cloudinary.uploader.destroy(public_id);
        }
        const file64 = parser.format('imagennombre', file.data);
        const { secure_url } = yield cloudinary.uploader.upload(file64.content);
        const nombreArchivo = secure_url;
        area.img = secure_url;
        yield area.save();
        res.json({
            ok: true,
            msg: 'Archivo subido exitosamente',
            nombreArchivo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.fileUploadCloudinaryArea = fileUploadCloudinaryArea;
const fileUploadPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const material = yield material_1.default.findByPk(id);
        if (!material || material.estado == false) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un material con el id: ${id}`
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo cargado'
            });
        }
        const file = req.files.archivo;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extencionesValidas = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'PNG'];
        if (!extencionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida'
            });
        }
        if (material.archivo) {
            const nombreArr = material.archivo.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            yield cloudinary.uploader.destroy(public_id);
        }
        const file64 = parser.format('archivonombre', file.data);
        const { secure_url } = yield cloudinary.uploader.upload(file64.content, { folder: "material" });
        const nombreArchivo = secure_url;
        material.archivo = secure_url;
        yield material.save();
        res.json({
            ok: true,
            msg: 'Archivo subido exitosamente',
            nombreArchivo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.fileUploadPdf = fileUploadPdf;
const retornaImagenInstitucion = (req, res) => {
    const foto = req.params.foto;
    const pathImg = path_1.default.join(__dirname, `../../uploads/${foto}`);
    if (fs_1.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        const pathDefault = path_1.default.join(__dirname, `../../uploads/victorraulsullana.jpg`);
        res.sendFile(pathDefault);
    }
};
exports.retornaImagenInstitucion = retornaImagenInstitucion;
const fileUploadCloudinaryInstitucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const institucion = yield institucion_1.default.findByPk(id);
        if (!institucion) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una institucion con el id: ${id}`
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo cargado'
            });
        }
        const file = req.files.imagen;
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        const extencionesValidas = ['pdf', 'png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'PNG'];
        if (!extencionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida'
            });
        }
        if (institucion.img) {
            const nombreArr = institucion.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            yield cloudinary.uploader.destroy(public_id);
        }
        const file64 = parser.format('imagennombre', file.data);
        const { secure_url } = yield cloudinary.uploader.upload(file64.content);
        const nombreArchivo = secure_url;
        institucion.img = secure_url;
        yield institucion.save();
        res.json({
            ok: true,
            msg: 'Archivo subido exitosamente',
            nombreArchivo
        });
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "Se produjo un error.", 500, error);
    }
});
exports.fileUploadCloudinaryInstitucion = fileUploadCloudinaryInstitucion;
//# sourceMappingURL=upload.js.map