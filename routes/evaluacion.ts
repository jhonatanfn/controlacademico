/*
    path: /api/evaluaciones
*/
import  { Router } from 'express';
import { getEvaluaciones, getTodo } from '../controllers/evaluacion';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/',validarJWT,getEvaluaciones);
router.get('/todo', validarJWT, getTodo);
export default router;