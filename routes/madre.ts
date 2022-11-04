/*
    path: /api/madres
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { busquedaMadres, deleteMadre, getMadre, getMadreDNI, getMadres, getMadresTodos, 
    madrePorPersona, postMadre, putMadre, searchDNI } from '../controllers/madre';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT,getMadres);
router.get('/todo', validarJWT,getMadresTodos);
router.get('/:id',validarJWT,getMadre);
router.get('/busqueda/:valor',validarJWT,busquedaMadres);
router.get('/searchdni/:dni', validarJWT, searchDNI);
router.get('/persona/:id',validarJWT,madrePorPersona);

router.post('/',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    check('nombreusuario','El nombre usuario es obligatorio').not().isEmpty(),
    check('dniusuario','El dni usuario es obligatorio').not().isEmpty(),
    validarCampos
],postMadre);
router.put('/:id',[
    validarJWT,
    check('personaId','El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
],putMadre);
router.delete('/:id',validarJWT,deleteMadre);

router.get('/consultadni/:dni', validarJWT, getMadreDNI);


export default router;