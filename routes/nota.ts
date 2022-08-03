/*
    path: /api/notas
*/
import { Router } from 'express';
import { check  } from 'express-validator';
import { busquedaNotas, deleteNota, getNota, getNotas,
    getNotasArea,
getNotasMatricula,getNotasMatriculaCicloEvaluacion,getNotasProgramacionFechaEvaluacionCiclo, 
postNota, putNota } from '../controllers/nota';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router= Router();

router.get('/', validarJWT,getNotas);
router.get('/:id',validarJWT,getNota);
router.get('/busqueda/:valor',validarJWT,busquedaNotas);
router.get('/programacion/fecha/evaluacion/ciclo/:programacionId/:fecha/:evaluacionId/:cicloId',
validarJWT,getNotasProgramacionFechaEvaluacionCiclo);
router.get('/:id',validarJWT,getNotasMatricula);
router.get('/:matriculaId/:cicloId/:evaluacionId', validarJWT, getNotasMatriculaCicloEvaluacion);

router.get('/area/:periodoId/:aulaId/:areaId/:cicloId/:alumnoId', validarJWT, getNotasArea);

router.post('/',[
    validarJWT,
    check('matriculaId','La Matricula es obligatoria').not().isEmpty(),
    check('evaluacionId','La Evaluacion es obligatoria').not().isEmpty(),
    check('cicloId','El Ciclo es obligatorio').not().isEmpty(),
    check('valor','El valor es obligatorio').not().isEmpty(),
    validarCampos
],postNota);
router.put('/:id',[
    validarJWT,
    check('matriculaId','La Matricula es obligatoria').not().isEmpty(),
    check('evaluacionId','La Evaluacion es obligatoria').not().isEmpty(),
    check('cicloId','El Ciclo es obligatorio').not().isEmpty(),
    check('valor','El valor es obligatorio').not().isEmpty(),
    validarCampos
],putNota);
router.delete('/:id',validarJWT,deleteNota);

export default router;