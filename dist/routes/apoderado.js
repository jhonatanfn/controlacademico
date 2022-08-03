"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/apoderados
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const apoderado_1 = require("../controllers/apoderado");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, apoderado_1.getApoderados);
router.get('/:id', validar_jwt_1.validarJWT, apoderado_1.getApoderado);
router.get('/documento/:numero', validar_jwt_1.validarJWT, apoderado_1.getApoderadoNumero);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, apoderado_1.busquedaApoderados);
router.get('/filtrado/todo', validar_jwt_1.validarJWT, apoderado_1.getApoderadosTodo);
router.get('/persona/:id', validar_jwt_1.validarJWT, apoderado_1.apoderadoPorPersona);
router.get('/busqueda/apellido/:valor', validar_jwt_1.validarJWT, apoderado_1.busquedaApoderadoPorApellido);
router.get('/busqueda/documento/:valor', validar_jwt_1.validarJWT, apoderado_1.busquedaApoderadoPorDocumento);
router.get('/busqueda/nombres/:valor', validar_jwt_1.validarJWT, apoderado_1.busquedaApoderadoPorNombres);
router.get('/tienealumnos/:apoderadoId', validar_jwt_1.validarJWT, apoderado_1.tieneAlumnos);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombreusuario', 'El nombre usuario es obligatorio').not().isEmpty(),
    // check('emailusuario','El email usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], apoderado_1.postApoderado);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], apoderado_1.putApoderado);
router.delete('/:id', validar_jwt_1.validarJWT, apoderado_1.deleteApoderado);
exports.default = router;
//# sourceMappingURL=apoderado.js.map