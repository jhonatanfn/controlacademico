

export const getMenu = (role: string) => {
  let menu = [];
  if (role === 'ADMINISTRADOR') {
    return menu = [
      {
        titulo: 'Comunidad del Colegio',
        url: '',
        icono:'bi bi-people-fill',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Institución',
            url: 'institucion',
            icono:'bi bi-building'
          },
          {
            titulo: 'Docentes',
            url: 'docentes',
            icono:'bi bi-person-video3'
          },
          {
            titulo: 'Alumnos',
            url: 'alumnos',
            icono:'bi bi-mortarboard'
          },
          {
            titulo: 'Apoderados',
            url: 'apoderados',
            icono:'bi bi-file-ppt'
          }
        ]
      },
      {
        titulo: 'Planificación',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Periodos',
            url: 'periodos',
            icono:'bi bi-square',
          },
          {
            titulo: 'Areas',
            url: 'areas',
            icono:'bi bi-square',
          },
          {
            titulo: 'Subareas',
            url: 'subareas',
            icono:'bi bi-square',
          },
          {
            titulo: 'Niveles',
            url: 'niveles',
            icono:'bi bi-square',
          },
          {
            titulo: 'Grados',
            url: 'grados',
            icono:'bi bi-square',
          },
          {
            titulo: 'Secciones',
            url: 'secciones',
            icono:'bi bi-square',
          },
          {
            titulo: 'Rangos',
            url: 'rangos',
            icono:'bi bi-square',
          },
          {
            titulo: 'Aulas',
            url: 'aulas',
            icono:'bi bi-square',
          },
          
        ]
      },

      {
        titulo: 'Ejecución',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Programaciones',
            url: 'programaciones',
            icono:'bi bi-square',
          },
          {
            titulo: 'Alumnos Matriculados',
            url: 'matriculas',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas',
            url: 'notas',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias',
            url: 'asistencias',
            icono:'bi bi-square',
          },
          {
            titulo: 'Horarios',
            url: 'horarios',
            icono:'bi bi-square',
          }
        ]
      },

      {
        titulo: 'Materiales',
        url: 'materiales',
        icono:'bi bi-square',
        toggle: '',
        submenu: []
      },
      {
        titulo: 'Usuarios',
        url: 'usuarios',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Reportes',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Notas por Bimestre',
            url: 'reportes/notas',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Bimestre y Alumno',
            url: 'reportes/notasalumno',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Periodo',
            url: 'reportes/anual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Periodo Detallado',
            url: 'reportes/notasalumnoanual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Area',
            url: 'reportes/notasareatotal',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Area y Alumno',
            url: 'reportes/notasarea',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias por Fecha',
            url: 'reportes/asistencias',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias Consolidado',
            icono:'bi bi-square',
            url: 'reportes/rango',
          }
        ]
      }
    ];
  }

  if (role === 'DOCENTE') {
    return menu = [
      {
        titulo: 'Ejecución',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Programaciones',
            url: 'programaciones/docente',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas',
            url: 'notas/docente',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias',
            url: 'asistencias/docente',
            icono:'bi bi-square',
          }
        ]
      },
      {
        titulo: 'Horarios',
        url: 'horarios/docente',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Materiales',
        url: 'materiales/docente',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Reportes',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Notas por Bimestre',
            url: 'reportes/notas',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Bimestre y Alumno',
            url: 'reportes/notasalumno',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Periodo',
            url: 'reportes/anual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Periodo Detallado',
            url: 'reportes/notasalumnoanual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Area',
            url: 'reportes/notasareatotal',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Area y Alumno',
            url: 'reportes/notasarea',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias por Fecha',
            url: 'reportes/asistencias',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias Consolidado',
            url: 'reportes/rango',
            icono:'bi bi-square',
          }
        ]
      }
    ];
  }

  if (role === 'ALUMNO') {
    return menu = [
      {
        titulo: 'Matriculas',
        url: 'matriculas/alumno',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Materiales',
        url: 'materiales/alumno',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Horarios',
        url: 'horarios/alumno',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Reportes',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Notas por Bimestre',
            url: 'reportes/notasalumno',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Periodo Detallado',
            url: 'reportes/notasalumnoanual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Area y Alumno',
            url: 'reportes/notasarea',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias',
            url: 'reportes/asistenciasalumno',
            icono:'bi bi-square',
          }
        ]
      }
    ];
  }

  if (role === 'APODERADO') {
    return menu = [
      {
        titulo: 'Matriculas',
        url: 'matriculas/apoderado',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Horarios',
        url: 'horarios/apoderado',
        toggle: '',
        icono:'bi bi-square',
        submenu: []
      },
      {
        titulo: 'Reportes',
        url: '',
        icono:'bi bi-square',
        toggle: 'dropdown-toggle',
        submenu: [
          {
            titulo: 'Notas por Bimestre',
            url: 'reportes/notas',
            icono:'bi bi-square', 
          },
          {
            titulo: 'Notas por Bimestre y Alumno',
            url: 'reportes/notasalumno',
            icono:'bi bi-square',                     
          },
          {
            titulo: 'Notas por Periodo',
            url: 'reportes/anual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Periodo Detallado',
            url: 'reportes/notasalumnoanual',
            icono:'bi bi-square',
          },
          {
            titulo: 'Notas por Area y Alumno',
            url: 'reportes/notasarea',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias por Fecha',
            url: 'reportes/asistencias',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono:'bi bi-square',
          },
          {
            titulo: 'Asistencias Consolidado',
            url: 'reportes/rango',
            icono:'bi bi-square',
          }
        ]
      }

    ];
  }
}