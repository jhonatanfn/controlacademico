/*
    path: /api/instituciones
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { deleteInstitucion, getInstitucion, postInstitucion, putInstitucion } 
from '../controllers/institucion';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/:id',getInstitucion);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    validarCampos
],postInstitucion);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    validarCampos
 ],putInstitucion);
 router.delete('/:id',validarJWT,deleteInstitucion);

export default router;