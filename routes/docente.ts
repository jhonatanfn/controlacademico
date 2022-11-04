/*
    path: /api/docentes
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaDocentePorApellido, busquedaDocentePorDocumento, busquedaDocentePorNombres, busquedaDocentes, deleteDocente, getDocente, 
    getDocentePersona, 
getDocentes, getTodo, postDocente, putDocente, searchDNI, tieneProgramaciones } from '../controllers/docente';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/', validarJWT,getDocentes);
router.get('/:id',validarJWT,getDocente);
router.get('/busqueda/:valor',validarJWT,busquedaDocentes);
router.get('/searchdni/:dni', validarJWT, searchDNI);
router.get('/persona/:persona',validarJWT, getDocentePersona);

router.get('/busqueda/apellido/:valor',validarJWT,busquedaDocentePorApellido);
router.get('/busqueda/documento/:valor',validarJWT,busquedaDocentePorDocumento);
router.get('/busqueda/nombres/:valor',validarJWT,busquedaDocentePorNombres);

router.get('/tieneprogramaciones/:docenteId',validarJWT,tieneProgramaciones);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    check('nombreusuario','El nombre es obligatorio').not().isEmpty(),
    check('dniusuario','El dni usuario es obligatorio').not().isEmpty(),
    validarCampos
],postDocente);
router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putDocente);
router.delete('/:id',validarJWT,deleteDocente);

export default router;