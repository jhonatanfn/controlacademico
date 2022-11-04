/*
    path: /api/responsables
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaResponsables, deleteResponsable, getResponsable, getResponsableDNI, getResponsables, 
getResponsablesTodos, postResponsable, putResponsable, 
responsablePorPersona, searchDNI } from '../controllers/responsable';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT,getResponsables);
router.get('/todo', validarJWT,getResponsablesTodos);
router.get('/:id',validarJWT,getResponsable);
router.get('/busqueda/:valor',validarJWT,busquedaResponsables);
router.get('/searchdni/:dni', validarJWT, searchDNI);
router.get('/persona/:id',validarJWT,responsablePorPersona);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],postResponsable);

router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putResponsable);

router.delete('/:id',validarJWT,deleteResponsable);

router.get('/consultadni/:dni', validarJWT, getResponsableDNI);


export default router;