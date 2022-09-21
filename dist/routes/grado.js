"use strict";
/*
    path: /api/grados
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const grado_1 = require("../controllers/grado");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, grado_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, grado_1.getGrados);
router.get('/:id', validar_jwt_1.validarJWT, grado_1.getGrado);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, grado_1.busquedaGrados);
router.get('/tieneaulas/:gradoId', validar_jwt_1.validarJWT, grado_1.tieneAulas);
router.get('/nombrerepetido/:gradoNombre', validar_jwt_1.validarJWT, grado_1.nombreRepetido);
router.get('/nombrerepetidoeditar/:gradoId/:gradoNombre', validar_jwt_1.validarJWT, grado_1.nombreRepetidoEditar);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], grado_1.postGrado);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], grado_1.putGrado);
router.delete('/:id', validar_jwt_1.validarJWT, grado_1.deleteGrado);
exports.default = router;
//# sourceMappingURL=grado.js.map