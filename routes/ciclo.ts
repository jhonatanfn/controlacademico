/*
    path: /api/ciclos
*/
import  { Router } from 'express';
import { getCiclos } from '../controllers/ciclo';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/',validarJWT,getCiclos);

export default router;