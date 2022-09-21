/*
    path: /api/directores
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaDirectores, deleteDirector, getDirector, getDirectores, getDirectorPersona, 
getTodo, postDirector, putDirector, searchDNI } from '../controllers/director';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/', validarJWT,getDirectores);
router.get('/:id',validarJWT,getDirector);
router.get('/busqueda/:valor',validarJWT,busquedaDirectores);
router.get('/searchdni/:dni', validarJWT, searchDNI);
router.get('/persona/:persona',validarJWT, getDirectorPersona);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],postDirector);

router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putDirector);

router.delete('/:id',validarJWT,deleteDirector);

export default router;