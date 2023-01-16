/*
    path: /api/notas
*/
import { Router } from 'express';
import { check } from 'express-validator';
import {
    busquedaNotas, cambiarEstadoNota, deleteNota, existeNotasMatricula, getNota, getNotas,
    getNotasArea,
    getNotasCicloMatriculadetalle,
    getNotasHoyLiteral,
    getNotasHoyVigesimal,
    getNotasMatricula, getNotasMatriculaCicloEvaluacion, getNotasPeriodo,
    getNotasPeriodoAula, getNotasPeriodoAulaAlumno, getNotasPeriodoAulaArea, getNotasPeriodoAulaAreaCiclo,
    getNotasPeriodoAulaAreaCicloAlumno,
    getNotasPeriodoAulaCicloAlumno,
    getNotasProgramacionFechaEvaluacionCiclo,
    getNotasProgramacionFechaEvaluacionCicloCompetencia,
    postNota, putNota
} from '../controllers/nota';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', validarJWT, getNotas);
router.get('/:id', validarJWT, getNota);
router.get('/busqueda/:valor', validarJWT, busquedaNotas);
router.get('/programacion/fecha/evaluacion/ciclo/competencia/:programacionId/:fecha/:evaluacionId/:cicloId/:competenciaId',
    validarJWT, getNotasProgramacionFechaEvaluacionCicloCompetencia);
router.get('/parahoynotasliteral/:periodoId/:fecha', validarJWT, getNotasHoyLiteral);
router.get('/parahoynotasvigesimal/:periodoId/:fecha', validarJWT, getNotasHoyVigesimal);
router.get('/:matriculadetalleId/:cicloId/:evaluacionId', validarJWT, getNotasMatriculaCicloEvaluacion);
router.get('/programacion/fecha/evaluacion/ciclo/:programacionId/:fecha/:evaluacionId/:cicloId',
    validarJWT, getNotasProgramacionFechaEvaluacionCiclo);
router.get('/:id', validarJWT, getNotasMatricula);
router.get('/area/:periodoId/:aulaId/:areaId/:cicloId/:alumnoId', validarJWT, getNotasArea);
router.get('/porperiodo/:periodoId', validarJWT, getNotasPeriodo);
router.get('/reportedos/porperiodoaula/:periodoId/:aulaId', validarJWT, getNotasPeriodoAula);
router.get('/reportetres/porperiodoaulaarea/:periodoId/:aulaId/:areaId', validarJWT, getNotasPeriodoAulaArea);
router.get('/porperiodoaulaareaciclo/:periodoId/:aulaId/:areaId/:cicloId', validarJWT,
    getNotasPeriodoAulaAreaCiclo);
router.get('/porperiodoaulaareacicloalumno/:periodoId/:aulaId/:areaId/:cicloId/:alumnoId', validarJWT,
    getNotasPeriodoAulaAreaCicloAlumno);
router.get('/reportealumno/:periodoId/:aulaId/:cicloId/:alumnoId', validarJWT,
    getNotasPeriodoAulaCicloAlumno);
router.get('/notasperiodoaulaalumno/:periodoId/:aulaId/:alumnoId', validarJWT,
    getNotasPeriodoAulaAlumno);

router.get('/ciclo/matriculadetalle/:cicloId/:matriculadetalleId', validarJWT, getNotasCicloMatriculadetalle);

router.post('/', [
    validarJWT,
    check('matriculadetalleId', 'La Matricula es obligatoria').not().isEmpty(),
    check('evaluacionId', 'La Evaluacion es obligatoria').not().isEmpty(),
    check('cicloId', 'El Ciclo es obligatorio').not().isEmpty(),
    check('competenciaId', 'La competencia es obligatoria').not().isEmpty(),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    validarCampos
], postNota);

router.put('/:id', [
    validarJWT,
    check('matriculadetalleId', 'La Matricula es obligatoria').not().isEmpty(),
    check('evaluacionId', 'La Evaluacion es obligatoria').not().isEmpty(),
    check('cicloId', 'El Ciclo es obligatorio').not().isEmpty(),
    check('competenciaId', 'La competencia es obligatoria').not().isEmpty(),
    check('valor', 'El valor es obligatorio').not().isEmpty(),
    validarCampos
], putNota);

router.delete('/:id', validarJWT, deleteNota);

router.put('/cambiarestado/:id', validarJWT, cambiarEstadoNota);
router.get('/existenotas/:matriculaId', validarJWT,existeNotasMatricula);

export default router;