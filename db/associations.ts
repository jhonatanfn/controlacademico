import Usuario from '../models/usuario';
import Area from '../models/area';
import Role from '../models/role';
import Tipodocumento from '../models/tipodocumento';
import Persona from '../models/persona';
import Docente from '../models/docente';
import Alumno from '../models/alumno';
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
import Competencia from '../models/competencia';
import Matriculadetalle from '../models/matriculadetalle';
import Auxiliar from '../models/auxiliar';
import Director from '../models/director';
import Apreciacion from '../models/apreciacion';
import Responsable from '../models/responsable';
import Padre from '../models/padre';
import Madre from '../models/madre';
import Apreciaciondetalle from '../models/apreciaciondetalle';

Role.hasMany(Usuario, {
  as: 'usuario',
});
Usuario.belongsTo(Role, {
  as: 'role'
});
Area.hasMany(Competencia, {
  as: 'competencia'
});
Competencia.belongsTo(Area, {
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
Persona.hasMany(Usuario, {
  as: 'usuario'
});
Usuario.belongsTo(Persona, {
  as: 'persona'
});

Padre.hasMany(Alumno, { as: 'alumno' });
Alumno.belongsTo(Padre, { as: 'padre' });

Madre.hasMany(Alumno, { as: 'alumno' });
Alumno.belongsTo(Madre, { as: 'madre' });

Responsable.hasMany(Alumno, { as: 'alumno' });
Alumno.belongsTo(Responsable, { as: 'responsable' });

Persona.hasOne(Padre, { as: 'padre' });
Padre.belongsTo(Persona, { as: 'persona' });

Persona.hasOne(Madre, { as: 'madre' });
Madre.belongsTo(Persona, { as: 'persona' });

Persona.hasOne(Responsable, { as: 'responsable' });
Responsable.belongsTo(Persona, { as: 'persona' });


Nivel.hasMany(Aula, {
  as: 'aula'
});
Aula.belongsTo(Nivel, {
  as: 'nivel'
});
Grado.hasMany(Aula, {
  as: 'aula'
});
Aula.belongsTo(Grado, {
  as: 'grado'
});
Seccion.hasMany(Aula, {
  as: 'aula'
});
Aula.belongsTo(Seccion, {
  as: 'seccion'
});
Aula.hasMany(Programacion, {
  as: 'programacion'
});
Programacion.belongsTo(Aula, {
  as: 'aula'
});
Docente.hasMany(Programacion, {
  as: 'programacion'
});
Programacion.belongsTo(Docente, {
  as: 'docente'
});
Periodo.hasMany(Programacion, {
  as: 'programacion'
});
Programacion.belongsTo(Periodo, {
  as: 'periodo'
});
Area.hasMany(Programacion, {
  as: 'programacion'
});
Programacion.belongsTo(Area, {
  as: 'area'
});
Alumno.hasMany(Matricula, {
  as: 'matricula'
});
Matricula.belongsTo(Alumno, {
  as: 'alumno'
});
Matricula.hasMany(Matriculadetalle, {
  as: 'matriculadetalle'
});
Matriculadetalle.belongsTo(Matricula, {
  as: 'matricula'
});
Programacion.hasMany(Matriculadetalle, {
  as: 'matriculadetalle'
});
Matriculadetalle.belongsTo(Programacion, {
  as: 'programacion'
});
Matriculadetalle.hasMany(Nota, {
  as: 'nota'
});
Nota.belongsTo(Matriculadetalle, {
  as: 'matriculadetalle'
});
Evaluacion.hasMany(Nota, {
  as: 'nota'
});
Nota.belongsTo(Evaluacion, {
  as: 'evaluacion'
});
Ciclo.hasMany(Nota, {
  as: 'nota'
});
Nota.belongsTo(Ciclo, {
  as: 'ciclo'
});
Competencia.hasMany(Nota, {
  as: 'nota'
});
Nota.belongsTo(Competencia, {
  as: 'competencia'
});
Matriculadetalle.hasMany(Asistencia, {
  as: 'asistencia'
});
Asistencia.belongsTo(Matriculadetalle, {
  as: 'matriculadetalle'
});
Situacion.hasMany(Asistencia, {
  as: 'asistencia'
});
Asistencia.belongsTo(Situacion, {
  as: 'situacion'
});
Hora.hasMany(Horario, {
  as: 'horario'
});
Horario.belongsTo(Hora, {
  as: 'hora'
});
Programacion.hasMany(Horario, {
  as: 'horario'
});
Horario.belongsTo(Programacion, {
  as: 'programacion'
});
Programacion.hasMany(Material, {
  as: 'material'
});
Material.belongsTo(Programacion, {
  as: 'programacion'
});
Persona.hasOne(Auxiliar, {
  as: 'auxiliar'
});
Auxiliar.belongsTo(Persona, {
  as: 'persona'
});
Persona.hasOne(Director, {
  as: 'director'
});
Director.belongsTo(Persona, {
  as: 'persona'
});

Periodo.hasMany(Apreciacion, {
  as: 'apreciacion'
});
Apreciacion.belongsTo(Periodo, {
  as: 'periodo'
});
Alumno.hasMany(Apreciacion, {
  as: 'apreciacion'
});
Apreciacion.belongsTo(Alumno, {
  as: 'alumno'
});
Apreciacion.hasMany(Apreciaciondetalle, {
  as: 'apreciaciondetalle'
});
Apreciaciondetalle.belongsTo(Apreciacion, {
  as: 'apreciacion'
});