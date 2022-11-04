/*
    path: /api/padres
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { busquedaPadres, deletePadre, getPadre, getPadreDNI, getPadres, getPadresTodos, padrePorPersona, postPadre, putPadre, searchDNI } from '../controllers/padre';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', validarJWT, getPadres);
router.get('/todo', validarJWT, getPadresTodos);
router.get('/:id', validarJWT, getPadre);
router.get('/busqueda/:valor', validarJWT, busquedaPadres);
router.get('/searchdni/:dni', validarJWT, searchDNI);
router.get('/persona/:id', validarJWT, padrePorPersona);

router.post('/', [
    validarJWT,
    check('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    check('nombreusuario', 'El nombre usuario es obligatorio').not().isEmpty(),
    check('dniusuario', 'El dni usuario es obligatorio').not().isEmpty(),
    validarCampos
], postPadre);

router.put('/:id', [
    validarJWT,
    check('personaId', 'El id de la persona es obligatorio').not().isEmpty(),
    validarCampos
], putPadre);

router.delete('/:id', validarJWT, deletePadre);

router.get('/consultadni/:dni', validarJWT, getPadreDNI);

export default router;