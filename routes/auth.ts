/*
    path: /api/auth
*/
import  { Router } from 'express';
import { check } from 'express-validator';
import { login, renewToken } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();


router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.get('/renew',validarJWT,renewToken);

export default router;