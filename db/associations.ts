
import Usuario from '../models/usuario';
import Area from '../models/area';
import Role from '../models/role';
import Subarea from '../models/subarea';
import Tipodocumento from '../models/tipodocumento';
import Persona from '../models/persona';
import Docente from '../models/docente';
import Alumno from '../models/alumno';
import Apoderado from '../models/apoderado';
import Grado from '../models/grado';
import Seccion from '../models/seccion';
import Nivel from '../models/nivel';
import Aula from '../models/aula';
import Programacion from '../models/programacion';
import Periodo from '../models/periodo';
import Matricula from '../models/matricula';
import Nota from '../models/nota';
import Evaluacion from '../models/evaluacion';
import Ciclo from '../models/ciclo';
import Material from '../models/material';
import Asistencia from '../models/asistencia';
import Situacion from '../models/situacion';
import Hora from '../models/hora';
import Horario from '../models/horario';

Role.hasOne(Usuario, {
  as: 'usuario',
});
Usuario.belongsTo(Role, {
  as: 'role'
});

Area.hasMany(Subarea, {
  as: 'subareas'
});
Subarea.belongsTo(Area, {
  as: 'area'
});

Tipodocumento.hasMany(Persona, {
  as: 'persona'
});
Persona.belongsTo(Tipodocumento, {
  as: 'tipodocumento'
});

Persona.hasOne(Docente, {
  as: 'docente'
});
Docente.belongsTo(Persona, {
  as: 'persona'
});

Persona.hasOne(Alumno, {
  as: 'alumno'
});
Alumno.belongsTo(Persona, {
  as: 'persona'
});

Persona.hasOne(Apoderado, {
  as: 'apoderado'
});
Apoderado.belongsTo(Persona, {
  as: 'persona'
});

Apoderado.hasMany(Alumno, {
  as: 'alumno'
});
Alumno.belongsTo(Apoderado, {
  as: 'apoderado'
});

Persona.hasMany(Usuario,{
  as: 'usuario'
});

Usuario.belongsTo(Persona,{
  as: 'persona'
});

Nivel.hasMany(Aula,{
  as: 'aula'
});
Aula.belongsTo(Nivel,{
  as: 'nivel'
});

Grado.hasMany(Aula,{
  as: 'aula'
});
Aula.belongsTo(Grado,{
  as: 'grado'
});

Seccion.hasMany(Aula,{
  as: 'aula'
});
Aula.belongsTo(Seccion,{
  as: 'seccion'
});

Aula.hasMany(Programacion,{
  as: 'programacion'
});
Programacion.belongsTo(Aula,{
  as: 'aula'
});

Docente.hasMany(Programacion,{
  as: 'programacion'
});
Programacion.belongsTo(Docente,{
  as: 'docente'
});

Subarea.hasMany(Programacion,{
  as: 'programacion'
});
Programacion.belongsTo(Subarea,{
  as: 'subarea'
});

Periodo.hasMany(Programacion,{
  as: 'programacion'
});

Programacion.belongsTo(Periodo,{
  as : 'periodo'
});

Alumno.hasMany(Matricula,{
  as:'matricula'
});
Matricula.belongsTo(Alumno,{
  as:'alumno'
});

Programacion.hasMany(Matricula,{
  as:'matricula'
});
Matricula.belongsTo(Programacion,{
  as:'programacion'
});

Matricula.hasMany(Nota,{
  as: 'nota'
});
Nota.belongsTo(Matricula,{
  as:'matricula'
});

Evaluacion.hasMany(Nota,{
  as:'nota'
});
Nota.belongsTo(Evaluacion,{
  as:'evaluacion'
});

Ciclo.hasMany(Nota,{
  as:'nota'
});
Nota.belongsTo(Ciclo,{
  as: 'ciclo'
});

Programacion.hasMany(Material,{
  as: 'material'
});
Material.belongsTo(Programacion,{
  as: 'programacion'
});


Matricula.hasMany(Asistencia,{
  as: 'asistencia'
});
Asistencia.belongsTo(Matricula,{
  as: 'matricula'
});


Situacion.hasMany(Asistencia,{
  as: 'asistencia'
});
Asistencia.belongsTo(Situacion,{
  as: 'situacion'
});


Hora.hasMany(Horario,{
  as: 'horario'
});
Horario.belongsTo(Hora,{
  as: 'hora'
});
Programacion.hasMany(Horario,{
  as: 'horario'
});
Horario.belongsTo(Programacion,{
  as: 'programacion'
});