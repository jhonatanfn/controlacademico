/*
    path: /api/tipodocumentos
*/

import  { Router } from 'express';
import { check } from 'express-validator';
import { deleteTipodocumentos, getTipodocumento, getTipodocumentos, postTipodocumentos, putTipodocumentos } from '../controllers/tipodocumento';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/',validarJWT,getTipodocumentos);
router.get('/:id',validarJWT,getTipodocumento);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postTipodocumentos);
 router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],putTipodocumentos);
 router.delete('/:id',validarJWT,deleteTipodocumentos);

export default router;