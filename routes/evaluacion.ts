/*
    path: /api/evaluaciones
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { deleteEvaluacion, getEvaluacion, getEvaluaciones, getTodo, postEvaluacion, putEvaluacion } from '../controllers/evaluacion';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', validarJWT, getEvaluaciones);
router.get('/todo', validarJWT, getTodo);
router.get('/:id', validarJWT, getEvaluacion);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('abreviatura', 'El abreviatura es obligatorio').not().isEmpty(),
    validarCampos
], postEvaluacion);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('abreviatura', 'El abreviatura es obligatorio').not().isEmpty(),
    validarCampos
], putEvaluacion);
router.delete('/:id', validarJWT, deleteEvaluacion);

export default router;