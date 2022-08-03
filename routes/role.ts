/*
    path: /api/roles
*/

import { Router } from 'express';
import { check } from 'express-validator';
import {  deleteRole, getRole, getRoles, postRole, putRole } from '../controllers/role';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/',validarJWT,getRoles);

router.get('/:id',validarJWT,getRole);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postRole);

 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putRole);

 router.delete('/:id',validarJWT,deleteRole);

export default router;