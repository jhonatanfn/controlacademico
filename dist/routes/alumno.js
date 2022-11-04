"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    path: /api/alumnos
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const alumno_1 = require("../controllers/alumno");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', validar_jwt_1.validarJWT, alumno_1.getAlumnos);
router.get('/:id', validar_jwt_1.validarJWT, alumno_1.getAlumno);
router.get('/alumno/:numero', validar_jwt_1.validarJWT, alumno_1.getAlumnoDNI);
router.get('/busqueda/:valor', validar_jwt_1.validarJWT, alumno_1.busquedaAlumnos);
router.get('/searchdni/:dni', validar_jwt_1.validarJWT, alumno_1.searchDNI);
router.get('/persona/:id', validar_jwt_1.validarJWT, alumno_1.alumnoPorPersona);
router.get('/filtrado/todo', validar_jwt_1.validarJWT, alumno_1.getAlumnosTodos);
router.get('/busqueda/apellido/:valor', validar_jwt_1.validarJWT, alumno_1.busquedaAlumnosApellido);
router.get('/busqueda/documento/:valor', validar_jwt_1.validarJWT, alumno_1.busquedaAlumnosDocumento);
router.get('/busqueda/nombres/:valor', validar_jwt_1.validarJWT, alumno_1.busquedaAlumnosNombres);
router.get('/tienematricula/:alumnoId', validar_jwt_1.validarJWT, alumno_1.tieneMatricula);
router.get('/padre/:padreId', validar_jwt_1.validarJWT, alumno_1.getAlumnosPadre);
router.get('/madre/:madreId', validar_jwt_1.validarJWT, alumno_1.getAlumnosMadre);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombreusuario', 'El nombre usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('vivecon', 'El vive con es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tienediscapacidad', 'El tienediscapacidad es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('certificadiscapacidad', 'El certificadodiscapacidad usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], alumno_1.postAlumno);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('vivecon', 'El vive con es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tienediscapacidad', 'El tienediscapacidad es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('certificadiscapacidad', 'El certificadodiscapacidad usuario es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], alumno_1.putAlumno);
router.delete('/:id', validar_jwt_1.validarJWT, alumno_1.deleteAlumno);
exports.default = router;
//# sourceMappingURL=alumno.js.map