/*
    path: /api/matriculas
*/
import { Router } from 'express';
import { check } from 'express-validator';
import {
    aprobadoAlumno,
    busquedaMatriculas, busquedaMatriculasPorAlumno, busquedaMatriculasPorAlumnoApoderado,
    busquedaMatriculasPorAlumnoApoderadoPeriodo,
    busquedaMatriculasPorAlumnoPeriodo,
    busquedaMatriculasSubarea,
    deleteMatricula, existeMatricula, getMatricula,
    getMatriculaAnual,
    getMatriculaCiclo,
    getMatriculas, getMatriculasAnual, getMatriculasAnualApoderado, getMatriculasPeriodoAula, getMatriculasPeriodoAulaArea, getMatriculasPeriodoAulaAreaApoderado, getMatriculasPeriodoAulaSubarea, getMatriculasPeriodoAulaSubareaaApoderado, getMatriculasPeriodoAulaSubareaCiclo,
    getMatriculasPeriodoAulaSubareaCicloApoderado,
    getMatriculasProgramacion, getMatriculasProgramacionRangoFechas, getMatriculasSubarea, listarmatriculasanterior, matriculasAlumno,
    matriculasAlumnoPeriodo,
    matriculasAlumnoPorApoderado,
    matriculasAlumnoPorApoderadoPeriodo,
    matriculasAlumnoReporte,
    matriculasApoderado,
    matriculasApoderadoPeriodoAula,
    matriculasProgramacionCiclo,
    perteneceMatriculaAlumno,
    perteneceMatriculaApoderado,
    perteneceProgramacionAlumno,
    postMatricula, putMatricula
} from '../controllers/matricula';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', validarJWT, getMatriculas);

router.get('/subarea/:subareaId', validarJWT, getMatriculasSubarea);
router.get('/:id', validarJWT, getMatricula);
router.get('/busqueda/:valor', validarJWT, busquedaMatriculas);
router.get('/busqueda/subarea/:subareaId/:valor', validarJWT, busquedaMatriculasSubarea);
router.get('/existe/:periodo/:aula/:alumno', validarJWT, existeMatricula);
router.get('/programacion/alumnos/:programacionId', validarJWT, getMatriculasProgramacion);
router.get('/alumno/:id', validarJWT, matriculasAlumno);
router.get('/alumnoreporte/:alumnoId', validarJWT, matriculasAlumnoReporte);
router.get('/pertenece/:matriculaId/:alumnoId', validarJWT, perteneceMatriculaAlumno);
router.get('/pertenece/programacion/:programacionId/:alumnoId', validarJWT, perteneceProgramacionAlumno);
router.get('/programacion/ciclo/:programacionId/:cicloId', validarJWT, matriculasProgramacionCiclo);
router.get('/programacion/fecha/:programacionId/:fechainicial', validarJWT, getMatriculasProgramacionRangoFechas)
router.get('/alumno/apoderado/:id', validarJWT, matriculasAlumnoPorApoderado);
router.get('/pertenece/apoderado/:apoderadoId/:matriculaId', validarJWT, perteneceMatriculaApoderado);
router.get('/obtenermatriculas/:periodoId/:aulaId/:subareaId/:cicloId', validarJWT,
    getMatriculasPeriodoAulaSubareaCiclo);
router.get('/alumnoperiodo/:alumnoId/:periodoId', validarJWT, matriculasAlumnoPeriodo);
router.get('/obtenermatriculasapoderado/:periodoId/:aulaId/:subareaId/:cicloId/:apoderadoId', validarJWT,
    getMatriculasPeriodoAulaSubareaCicloApoderado);
router.get('/alumno/apoderadoperiodo/:apoderadoId/:periodoId', validarJWT, matriculasAlumnoPorApoderadoPeriodo);
router.get('/obtenermatriculaalumno/:matriculaId/:cicloId', validarJWT,
    getMatriculaCiclo);
router.get('/obtenermatriculaalumnoanual/:matriculaId', validarJWT,
    getMatriculaAnual);
router.get('/listamatriculas/:periodoId/:aulaId/:subareaId', validarJWT,
    getMatriculasPeriodoAulaSubarea);
router.get('/listamatriculasapoderado/:periodoId/:aulaId/:subareaId/:apoderadoId', validarJWT,
    getMatriculasPeriodoAulaSubareaaApoderado);
router.get('/listamatriculasarea/:periodoId/:aulaId/:areaId', validarJWT,
    getMatriculasPeriodoAulaArea);
router.get('/listamatriculasapoderadoarea/:periodoId/:aulaId/:areaId/:apoderadoId', validarJWT,
    getMatriculasPeriodoAulaAreaApoderado);
router.get('/busquedaapoderado/:apoderadoId/:valor', validarJWT,
    busquedaMatriculasPorAlumnoApoderado);
router.get('/busquedaapoderadoperiodo/:apoderadoId/:periodoId/:valor', validarJWT,
    busquedaMatriculasPorAlumnoApoderadoPeriodo);
router.get('/busquedaalumno/:alumnoId/:valor', validarJWT,
    busquedaMatriculasPorAlumno);
router.get('/busquedaalumnoperiodo/:alumnoId/:periodoId/:valor', validarJWT,
    busquedaMatriculasPorAlumnoPeriodo);
router.get('/anual/:periodoId/:aulaId/:subareaId', validarJWT,
    getMatriculasAnual);
router.get('/anualapoderado/:periodoId/:aulaId/:subareaId/:apoderadoId', validarJWT,
    getMatriculasAnualApoderado);
router.get('/alumno/apoderado/reporte/:apoderadoId', validarJWT,
    matriculasApoderado);
router.get('/apoderado/parahorario/:apoderadoId/:periodoId/:aulaId', validarJWT,
    matriculasApoderadoPeriodoAula);
router.get('/periodoaula/:periodoId/:aulaId', validarJWT,
    getMatriculasPeriodoAula);
router.get('/aprobado/:alumnoId',validarJWT,aprobadoAlumno);
router.get('/periodoanterior/:alumnoId',validarJWT,listarmatriculasanterior);

router.post('/', [
    validarJWT,
    check('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validarCampos
], postMatricula);
router.put('/:id', [
    validarJWT,
    check('alumnoId', 'El alumno es obligatorio').not().isEmpty(),
    validarCampos
], putMatricula);
router.delete('/:id', validarJWT, deleteMatricula);

export default router;