"use strict";
/*
    path: /api/secciones
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const seccion_1 = require("../controllers/seccion");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, seccion_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, seccion_1.getSecciones);
router.get('/:id', validar_jwt_1.validarJWT, seccion_1.getSeccion);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, seccion_1.busquedaSecciones);
router.get('/tieneaulas/:seccionId', validar_jwt_1.validarJWT, seccion_1.tieneAulas);
router.get('/nombrerepetido/:seccionNombre', validar_jwt_1.validarJWT, seccion_1.nombreRepetido);
router.get('/nombrerepetidoeditar/:seccionId/:seccionNombre', validar_jwt_1.validarJWT, seccion_1.nombreRepetidoEditar);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], seccion_1.postSeccion);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], seccion_1.putSeccion);
router.delete('/:id', validar_jwt_1.validarJWT, seccion_1.deleteSeccion);
exports.default = router;
//# sourceMappingURL=seccion.js.map