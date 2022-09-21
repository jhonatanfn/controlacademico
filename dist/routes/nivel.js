"use strict";
/*
    path: /api/tipodocumentos
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const nivel_1 = require("../controllers/nivel");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, nivel_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, nivel_1.getNiveles);
router.get('/:id', validar_jwt_1.validarJWT, nivel_1.getNivel);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, nivel_1.busquedaNiveles);
router.get('/tieneaulas/:nivelId', validar_jwt_1.validarJWT, nivel_1.tieneAulas);
router.get('/nombrerepetido/:nivelNombre', validar_jwt_1.validarJWT, nivel_1.nombreRepetido);
router.get('/nombrerepetidoeditar/:nivelId/:nivelNombre', validar_jwt_1.validarJWT, nivel_1.nombreRepetidoEditar);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], nivel_1.postNivel);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], nivel_1.putNivel);
router.delete('/:id', validar_jwt_1.validarJWT, nivel_1.deleteNivel);
exports.default = router;
//# sourceMappingURL=nivel.js.map