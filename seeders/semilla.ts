
import bcrypt from 'bcryptjs';
import Area from '../models/area';
import Persona from '../models/persona';
import Role from '../models/role';
import Subarea from '../models/subarea';
import Tipodocumento from '../models/tipodocumento';
import Usuario from '../models/usuario';
import Docente from '../models/docente';
import Apoderado from '../models/apoderado';
import Alumno from '../models/alumno';
import Nivel from '../models/nivel';
import Grado from '../models/grado';
import Seccion from '../models/seccion';
import Aula from '../models/aula';
import Programacion from '../models/programacion';
import Periodo from '../models/periodo';
import Evaluacion from '../models/evaluacion';
import Ciclo from '../models/ciclo';
import Matricula from '../models/matricula';
import Material from '../models/material';
import * as seed_local from './seed_local';
import * as seed_heroku from './seed_heroku';
import Situacion from '../models/situacion';
import Institucion from '../models/institucion';
import Hora from '../models/hora';
import Rango from '../models/rango';

export const dbSeed = () => {

    const llave: boolean = true;
    const salt: any = bcrypt.genSaltSync();

    if (llave) {

        seed_local.instituciones.forEach(institucion => {
            Institucion.create(institucion);
        });
        seed_local.roles.forEach(rol => {
            Role.create(rol)
        });
        seed_local.areas.forEach(area => {
            Area.create(area);
        });
        seed_local.tipodocumentos.forEach(tipodocumento => {
            Tipodocumento.create(tipodocumento);
        });
        seed_local.niveles.forEach(nivel => {
            Nivel.create(nivel);
        });
        seed_local.situaciones.forEach(situacion => {
            Situacion.create(situacion);
        });
        seed_local.grados.forEach(grado => {
            Grado.create(grado);
        });
        seed_local.secciones.forEach(seccion => {
            Seccion.create(seccion);
        });
        seed_local.periodos.forEach(periodo => {
            Periodo.create(periodo);
        });
        seed_local.evaluaciones.forEach(evaluacion => {
            Evaluacion.create(evaluacion);
        });
        seed_local.ciclos.forEach(ciclo => {
            Ciclo.create(ciclo);
        });
        seed_local.horas.forEach(hora => {
            Hora.create(hora);
        });
        seed_local.rangos.forEach(rango => {
            Rango.create(rango);
        });
        seed_local.subareas.forEach(subarea => {
            Subarea.create(subarea);
        });
        seed_local.personas.forEach(persona => {
            Persona.create(persona);
        });
        seed_local.usuarios.forEach(usuario => {
            usuario.password = bcrypt.hashSync(usuario.password, salt);
            Usuario.create(usuario);
        });
        seed_local.docentes.forEach(docente => {
            Docente.create(docente);
        });
        seed_local.apoderados.forEach(apoderado => {
            Apoderado.create(apoderado);
        });
        seed_local.alumnos.forEach(alumno => {
            Alumno.create(alumno);
        });
        seed_local.aulas.forEach(aula => {
            Aula.create(aula);
        });
        seed_local.programaciones.forEach(programacion => {
            Programacion.create(programacion);
        });
        seed_local.matriculas.forEach(matricula => {
            Matricula.create(matricula);
        });
        seed_local.materiales.forEach(material => {
            Material.create(material);
        });

    } else {
        seed_heroku.instituciones.forEach(institucion => {
            Institucion.create(institucion);
        });
        seed_heroku.roles.forEach(rol => {
            Role.create(rol)
        });
        seed_heroku.areas.forEach(area => {
            Area.create(area);
        });
        seed_heroku.tipodocumentos.forEach(tipodocumento => {
            Tipodocumento.create(tipodocumento);
        });
        seed_heroku.niveles.forEach(nivel => {
            Nivel.create(nivel);
        });
        seed_heroku.grados.forEach(grado => {
            Grado.create(grado);
        });
        seed_heroku.situaciones.forEach(situacion => {
            Situacion.create(situacion);
        });
        seed_heroku.secciones.forEach(seccion => {
            Seccion.create(seccion);
        });
        seed_heroku.periodos.forEach(periodo => {
            Periodo.create(periodo);
        });
        seed_heroku.evaluaciones.forEach(evaluacion => {
            Evaluacion.create(evaluacion);
        });
        seed_heroku.ciclos.forEach(ciclo => {
            Ciclo.create(ciclo);
        });
        seed_heroku.horas.forEach(hora => {
            Hora.create(hora);
        });
        seed_heroku.rangos.forEach(rango => {
            Rango.create(rango);
        });
        seed_heroku.subareas.forEach(subarea => {
            Subarea.create(subarea);
        });
        seed_heroku.personas.forEach(persona => {
            Persona.create(persona);
        });
        seed_heroku.usuarios.forEach(usuario => {
            usuario.password = bcrypt.hashSync(usuario.password, salt);
            Usuario.create(usuario);
        });
        seed_heroku.docentes.forEach(docente => {
            Docente.create(docente);
        });
        seed_heroku.apoderados.forEach(apoderado => {
            Apoderado.create(apoderado);
        });
        seed_heroku.alumnos.forEach(alumno => {
            Alumno.create(alumno);
        });
        seed_heroku.aulas.forEach(aula => {
            Aula.create(aula);
        });
        seed_heroku.programaciones.forEach(programacion => {
            Programacion.create(programacion);
        });
        seed_heroku.matriculas.forEach(matricula => {
            Matricula.create(matricula);
        });
        seed_heroku.materiales.forEach(material => {
            Material.create(material);
        });

    }

}



