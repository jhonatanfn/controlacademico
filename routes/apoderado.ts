/*
    path: /api/apoderados
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { apoderadoPorPersona, busquedaApoderadoPorApellido, busquedaApoderadoPorDocumento, busquedaApoderadoPorNombres, busquedaApoderados, deleteApoderado, getApoderado, getApoderadoNumero, getApoderados, getApoderadosTodo, postApoderado, putApoderado, tieneAlumnos } from '../controllers/apoderado';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT,getApoderados);
router.get('/:id',validarJWT,getApoderado);
router.get('/documento/:numero',validarJWT,getApoderadoNumero);
router.get('/busqueda/:valor',validarJWT,busquedaApoderados);
router.get('/filtrado/todo', validarJWT,getApoderadosTodo);
router.get('/persona/:id',validarJWT,apoderadoPorPersona);
router.get('/busqueda/apellido/:valor',validarJWT,busquedaApoderadoPorApellido);

router.get('/busqueda/documento/:valor',validarJWT,busquedaApoderadoPorDocumento);
router.get('/busqueda/nombres/:valor',validarJWT,busquedaApoderadoPorNombres);


router.get('/tienealumnos/:apoderadoId',validarJWT,tieneAlumnos);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    check('nombreusuario','El nombre usuario es obligatorio').not().isEmpty(),
   // check('emailusuario','El email usuario es obligatorio').not().isEmpty(),
    validarCampos
],postApoderado);
router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putApoderado);
router.delete('/:id',validarJWT,deleteApoderado);

export default router;