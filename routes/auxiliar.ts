/*
    path: /api/auxiliares
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaAuxiliares, deleteAuxiliar, getAuxiliar, getAuxiliares, 
getAuxiliarPersona, getTodo, postAuxiliar, putAuxiliar, searchDNI } from '../controllers/auxiliar';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/todo',validarJWT,getTodo);
router.get('/', validarJWT,getAuxiliares);
router.get('/:id',validarJWT,getAuxiliar);
router.get('/busqueda/:valor',validarJWT,busquedaAuxiliares);
router.get('/persona/:persona',validarJWT, getAuxiliarPersona);
router.get('/searchdni/:dni', validarJWT, searchDNI);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    check('nombreusuario','El nombre es obligatorio').not().isEmpty(),
    check('dniusuario','El dni usuario es obligatorio').not().isEmpty(),
    validarCampos
],postAuxiliar);

router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putAuxiliar);

router.delete('/:id',validarJWT,deleteAuxiliar);

export default router;