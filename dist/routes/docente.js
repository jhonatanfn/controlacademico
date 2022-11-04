"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/docentes
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const docente_1 = require("../controllers/docente");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/todo', validar_jwt_1.validarJWT, docente_1.getTodo);
router.get('/', validar_jwt_1.validarJWT, docente_1.getDocentes);
router.get('/:id', validar_jwt_1.validarJWT, docente_1.getDocente);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, docente_1.busquedaDocentes);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, docente_1.searchDNI);
router.get('/persona/:persona', validar_jwt_1.validarJWT, docente_1.getDocentePersona);
router.get('/busqueda/apellido/:valor', validar_jwt_1.validarJWT, docente_1.busquedaDocentePorApellido);
router.get('/busqueda/documento/:valor', validar_jwt_1.validarJWT, docente_1.busquedaDocentePorDocumento);
router.get('/busqueda/nombres/:valor', validar_jwt_1.validarJWT, docente_1.busquedaDocentePorNombres);
router.get('/tieneprogramaciones/:docenteId', validar_jwt_1.validarJWT, docente_1.tieneProgramaciones);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombreusuario', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('dniusuario', 'El dni usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], docente_1.postDocente);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], docente_1.putDocente);
router.delete('/:id', validar_jwt_1.validarJWT, docente_1.deleteDocente);
exports.default = router;
//# sourceMappingURL=docente.js.map