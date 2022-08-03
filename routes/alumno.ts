/*
    path: /api/alumnos
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { alumnoPorPersona, busquedaAlumnos, busquedaAlumnosApellido, busquedaAlumnosDocumento, busquedaAlumnosNombres, deleteAlumno, 
getAlumno, getAlumnoNumero, getAlumnos, getAlumnosTodos, postAlumno, putAlumno, tieneMatricula } from '../controllers/alumno';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT,getAlumnos);
router.get('/:id',validarJWT,getAlumno);

router.get('/alumno/:numero',validarJWT,getAlumnoNumero);
router.get('/busqueda/:valor',validarJWT,busquedaAlumnos);
router.get('/persona/:id',validarJWT,alumnoPorPersona);
router.get('/filtrado/todo', validarJWT,getAlumnosTodos);
router.get('/busqueda/apellido/:valor',validarJWT,busquedaAlumnosApellido);

router.get('/busqueda/documento/:valor',validarJWT,busquedaAlumnosDocumento);
router.get('/busqueda/nombres/:valor',validarJWT,busquedaAlumnosNombres);

router.get('/tienematricula/:alumnoId',validarJWT,tieneMatricula);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    check('apoderadoId','El id del apoderado es obligatorio').not().isEmpty(),
    check('nombreusuario','El nombre usuario es obligatorio').not().isEmpty(),
    //check('emailusuario','El email usuario es obligatorio').not().isEmpty(),
    validarCampos
],postAlumno);
router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    check('apoderadoId','El id del apoderado es obligatorio').not().isEmpty(),
    validarCampos
],putAlumno);
router.delete('/:id',validarJWT,deleteAlumno);

export default router;