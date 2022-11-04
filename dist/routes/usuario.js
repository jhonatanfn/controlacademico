"use strict";
/*
    path: /api/usuarios
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, usuarios_1.getUsuarios);
router.get('/porrol/:rolId', validar_jwt_1.validarJWT, usuarios_1.getUsuariosPorRol);
router.get('/filtrado/todo', validar_jwt_1.validarJWT, usuarios_1.getUsuariosTodos);
router.get('/limitado', validar_jwt_1.validarJWT, usuarios_1.getUsuariosLimitado);
router.get('/:id', validar_jwt_1.validarJWT, usuarios_1.getUsuario);
router.get('/:id/areas', validar_jwt_1.validarJWT, usuarios_1.getUsuarioAreas);
router.post('/consultaporemail', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty(),
], usuarios_1.obtenerUsuarioEmail);
router.post('/verificar/email', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty(),
], usuarios_1.emailRepetido);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('roleId', 'El campo rol es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('personaId', 'El campo persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('personaId', 'El campo persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.putUsuario);
router.put('/password/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.actualizarPassword);
router.patch('/habilitar/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('accion', 'El campo accion es obligatorio').not().isEmpty(),
], usuarios_1.habilitarDesabilitarUsuario);
router.delete('/:id', validar_jwt_1.validarJWT, usuarios_1.deleteUsuario);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, usuarios_1.busquedaUsuarios);
router.get('/busqueda/porrol/:rolId/:valor', validar_jwt_1.validarJWT, usuarios_1.busquedaUsuariosPorRol);
exports.default = router;
//# sourceMappingURL=usuario.js.map