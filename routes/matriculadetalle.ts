/*
    path: /api/matriculadetalles
*/
import { Router } from 'express';
import { check } from 'express-validator';
import {
    aprobadoAlumno, busquedaMatriculadetalles, busquedaMatriculadetallesPorAlumno,
    busquedaMatriculadetallesPorAlumnoMadre, busquedaMatriculadetallesPorAlumnoMadrePeriodo,
    busquedaMatriculadetallesPorAlumnoPadre, busquedaMatriculadetallesPorAlumnoPadrePeriodo,
    busquedaMatriculadetallesPorAlumnoPeriodo, cambiarEstadoMatriculadetalle, deleteMatriculadetalle,
    existeMatricula, getListadoAlumnos, getListadoAlumnosProgramacion, getMatriculadetalle,
    getMatriculadetalles, getMatriculadetallesMatricula,
    getMatriculadetallesMatriculaEstado,
    getMatriculadetallesPeriodoAula, getMatriculadetallesPeriodoAulaArea, getMatriculadetallesProgramacion, listarmatriculasanterior,
    matriculadetallesAlumno, matriculadetallesAlumnoPeriodo, matriculasAlumnoPorMadre,
    matriculasAlumnoPorMadrePeriodo, matriculasAlumnoPorPadre, matriculasAlumnoPorPadrePeriodo,
    matriculasMadrePeriodo,
    matriculasPadrePeriodo,
    perteneceMatriculadetalleAlumno,
    perteneceMatriculaMadre, perteneceMatriculaPadre,
    perteneceProgramacionAlumno, postMatriculadetalle, putMatriculadetalle
} from '../controllers/matriculadetalle';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.get('/', validarJWT, getMatriculadetalles);
router.get('/matricula/:matriculaId', validarJWT, getMatriculadetallesMatricula);
router.get('/matriculaestado/:matriculaId', validarJWT, getMatriculadetallesMatriculaEstado);
router.get('/:id', validarJWT, getMatriculadetalle);
router.get('/busqueda/:valor', validarJWT, busquedaMatriculadetalles);
router.get('/listado/:periodoId/:aulaId', validarJWT, getListadoAlumnos);
router.get('/listadoalumnos/:programacionId', validarJWT, getListadoAlumnosProgramacion);
router.get('/alumno/:alumnoId', validarJWT, matriculadetallesAlumno);
router.get('/alumnoperiodo/:alumnoId/:periodoId', validarJWT, matriculadetallesAlumnoPeriodo);
router.get('/busquedaalumno/:alumnoId/:valor', validarJWT,
    busquedaMatriculadetallesPorAlumno);
router.get('/busquedaalumnoperiodo/:alumnoId/:periodoId/:valor', validarJWT,
    busquedaMatriculadetallesPorAlumnoPeriodo);
router.get('/pertenece/:matriculadetalleId/:alumnoId', validarJWT, perteneceMatriculadetalleAlumno);
router.get('/pertenece/programacion/:programacionId/:alumnoId', validarJWT, perteneceProgramacionAlumno);
router.get('/existe/:periodo/:aula/:alumno', validarJWT, existeMatricula);
router.get('/aprobado/:alumnoId', validarJWT, aprobadoAlumno);
router.get('/periodoanterior/:alumnoId', validarJWT, listarmatriculasanterior);
router.get('/programacion/:programacionId', validarJWT, getMatriculadetallesProgramacion);
router.get('/alumno/padreperiodo/:padreId/:periodoId', validarJWT, matriculasAlumnoPorPadrePeriodo);
router.get('/alumno/padre/:id', validarJWT, matriculasAlumnoPorPadre);
router.get('/busquedapadre/:padreId/:valor', validarJWT,
    busquedaMatriculadetallesPorAlumnoPadre);
router.get('/busquedapadreperiodo/:padreId/:periodoId/:valor', validarJWT,
    busquedaMatriculadetallesPorAlumnoPadrePeriodo);
router.get('/pertenece/padre/:padreId/:matriculadetalleId', validarJWT, perteneceMatriculaPadre);
router.get('/alumno/madreperiodo/:madreId/:periodoId', validarJWT, matriculasAlumnoPorMadrePeriodo);
router.get('/alumno/madre/:id', validarJWT, matriculasAlumnoPorMadre);
router.get('/busquedamadre/:madreId/:valor', validarJWT,
    busquedaMatriculadetallesPorAlumnoMadre);
router.get('/busquedamadreperiodo/:madreId/:periodoId/:valor', validarJWT,
    busquedaMatriculadetallesPorAlumnoMadrePeriodo);
router.get('/pertenece/madre/:madreId/:matriculadetalleId', validarJWT, perteneceMatriculaMadre);
router.get('/periodoaula/:periodoId/:aulaId', validarJWT,
    getMatriculadetallesPeriodoAula);
router.get('/periodoaulaarea/:periodoId/:aulaId/:areaId', validarJWT,
    getMatriculadetallesPeriodoAulaArea);

router.post('/', [
    validarJWT,
    check('matriculaId', 'La matricula es obligatoria').not().isEmpty(),
    check('programacionId', 'La programacion es obligatoria').not().isEmpty(),
    validarCampos
], postMatriculadetalle);

router.put('/cambiarestado/:estado/:id', [
    validarJWT,
], cambiarEstadoMatriculadetalle);

router.put('/:id', [
    validarJWT,
    check('matriculaId', 'La matricula es obligatoria').not().isEmpty(),
    check('programacionId', 'La programacion es obligatoria').not().isEmpty(),
    validarCampos
], putMatriculadetalle);


router.delete('/:id', validarJWT, deleteMatriculadetalle);

router.get('/alumno/porpadre/:padreId/:periodoId', validarJWT, matriculasPadrePeriodo);
router.get('/alumno/pormadre/:madreId/:periodoId', validarJWT, matriculasMadrePeriodo);


export default router;