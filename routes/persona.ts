/*
    path: /api/personas
*/

import { Router } from 'express';
import { check } from 'express-validator';
import { deletePersona, getPersona, getPersonaDNI, getPersonas, postPersona, putPersona } from '../controllers/persona';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', validarJWT, getPersonas);

router.get('/:id', validarJWT, getPersona);

router.post('/', [
    validarJWT,
    check('dni', 'El dni del documento es obligatorio').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidopaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('apellidomaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('tipodocumentoId', 'El tipo documento es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    validarCampos
], postPersona);

router.put('/:id', [
    validarJWT,
    check('dni', 'El dni del documento es obligatorio').not().isEmpty(),
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidopaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('apellidomaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('tipodocumentoId', 'El tipo documento es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    validarCampos
], putPersona);

router.delete('/:id', validarJWT, deletePersona);

router.get('/consultadni/:dni', validarJWT, getPersonaDNI);

export default router;