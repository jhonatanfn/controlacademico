"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/mensajerias
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mensajeria_1 = require("../controllers/mensajeria");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, mensajeria_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, mensajeria_1.getMensajerias);
router.get('/:id', validar_jwt_1.validarJWT, mensajeria_1.getMensajeria);
router.get('/busqueda/busquedarecibidos/:valor/:email', validar_jwt_1.validarJWT, mensajeria_1.busquedaMensajeriasRecibidos);
router.get('/busqueda/busquedaenviados/:valor/:email', validar_jwt_1.validarJWT, mensajeria_1.busquedaMensajeriasEnviados);
router.get('/busqueda/busquedaeliminados/:valor/:email', validar_jwt_1.validarJWT, mensajeria_1.busquedaMensajeriasEliminados);
router.post('/leidoemisor/marcarleido/:id', validar_jwt_1.validarJWT, mensajeria_1.leidoMensajeriaEmisor);
router.post('/leidoreceptor/marcarleido/:id', validar_jwt_1.validarJWT, mensajeria_1.leidoMensajeriaReceptor);
router.post('/noleidoemisor/marcarnoleido/:id', validar_jwt_1.validarJWT, mensajeria_1.noleidoMensajeriaEmisor);
router.post('/noleidoreceptor/marcarnoleido/:id', validar_jwt_1.validarJWT, mensajeria_1.noleidoMensajeriaReceptor);
router.get('/emisor/restauraremisor/paraemisor/:id', validar_jwt_1.validarJWT, mensajeria_1.restaurarEmisor);
router.get('/receptor/restaurarreceptor/parareceptor/:id', validar_jwt_1.validarJWT, mensajeria_1.restaurarReceptor);
router.get('/receptor/nuevos/:email', validar_jwt_1.validarJWT, mensajeria_1.existenMensajesNuevos);
router.get('/receptor/actualizar/nuevos/:email', validar_jwt_1.validarJWT, mensajeria_1.actualizarMensajesNuevos);
router.post('/recibidos', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('email', 'El receptor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], mensajeria_1.getMensajeriasRecibidos);
router.post('/enviados', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('email', 'El emisor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], mensajeria_1.getMensajeriasEnviados);
router.post('/eliminados', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('email', 'El emisor o receptor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], mensajeria_1.getMensajeriasEliminados);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('emisor', 'El emisor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('receptor', 'La receptor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('asunto', 'El asunto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('contenido', 'El contenido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('hora', 'La hora es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], mensajeria_1.postMensajeria);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('emisor', 'El emisor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('receptor', 'La receptor es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('asunto', 'El asunto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('contenido', 'El contenido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('hora', 'La hora es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], mensajeria_1.putMensajeria);
router.post('/deleteemisor/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('emisor', 'El emisor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos,
], mensajeria_1.deleteMensajeriaEmisor);
router.post('/deletereceptor/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('receptor', 'El receptor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos,
], mensajeria_1.deleteMensajeriaReceptor);
exports.default = router;
//# sourceMappingURL=mensajeria.js.map