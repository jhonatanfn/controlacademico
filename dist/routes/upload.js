"use strict";
/*
    ruta: /api/uploads
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const validar_jwt_1 = require("../middlewares/validar-jwt");
const upload_1 = require("../controllers/upload");
const router = (0, express_1.Router)();
router.use((0, express_fileupload_1.default)());
router.put('/:id', validar_jwt_1.validarJWT, upload_1.fileUploadCloudinary);
router.put('/area/:id', validar_jwt_1.validarJWT, upload_1.fileUploadCloudinaryArea);
router.get('/:foto', upload_1.retornaImagen);
router.get('/colegio/:foto', upload_1.retornaImagenInstitucion);
router.put('/material/:id', validar_jwt_1.validarJWT, upload_1.fileUploadPdf);
router.put('/institucion/logo/:id', validar_jwt_1.validarJWT, upload_1.fileUploadCloudinaryInstitucion);
exports.default = router;
//# sourceMappingURL=upload.js.map