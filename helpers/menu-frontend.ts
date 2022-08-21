

export const getMenu = (role: string) => {
  let menu = [];
  if (role === 'ADMINISTRADOR') {
    return menu = [
      {
        titulo: 'Comunidad',
        url: '',
        icono: 'bi bi-people-fill',
        toggle: 'dropdown-toggle',
        bandera: 1,
        submenu: [
          {
            titulo: 'Docentes',
            url: 'docentes',
            icono: 'bi bi-person-video3'
          },
          {
            titulo: 'Alumnos',
            url: 'alumnos',
            icono: 'bi bi-mortarboard'
          },
          {
            titulo: 'Apoderados',
            url: 'apoderados',
            icono: 'bi bi-file-ppt'
          },
          {
            titulo: 'Usuarios',
            url: 'usuarios',
            icono: 'bi bi-person',
          }
        ]
      },
      {
        titulo: 'Organización',
        url: '',
        icono: 'bi bi-stack',
        toggle: 'dropdown-toggle',
        bandera: 1,
        submenu: [
          {
            titulo: 'Aulas',
            url: 'aulas',
            icono: 'bi bi-door-closed',
          },
          {
            titulo: 'Areas',
            url: 'areas',
            icono: 'bi bi-folder2-open',
          },
          {
            titulo: 'Subareas',
            url: 'subareas',
            icono: 'bi bi-collection',
          },
          {
            titulo: 'Niveles',
            url: 'niveles',
            icono: 'bi bi-receipt',
          },
          {
            titulo: 'Grados',
            url: 'grados',
            icono: 'bi bi-layout-text-sidebar',
          },
          {
            titulo: 'Secciones',
            url: 'secciones',
            icono: 'bi bi-layout-text-sidebar-reverse',
          },
        ]
      },

      {
        titulo: 'Operaciones',
        url: '',
        icono: 'bi bi-gear-fill',
        toggle: 'dropdown-toggle',
        bandera: 1,
        submenu: [
          {
            titulo: 'Asignaciones',
            url: 'asignaciones',
            icono: 'bi bi-pc-display-horizontal',
          },

          {
            titulo: 'Matriculas',
            url: 'matriculas',
            icono: 'bi bi-file-earmark-ruled',
          },
          {
            titulo: 'Notas',
            url: 'notas',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Asistencias',
            url: 'asistencias',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Horarios',
            url: 'horarios',
            icono: 'bi bi-calendar3',
          }
        ]
      },

      {
        titulo: 'Reportes',
        url: 'reportes',
        toggle: '',
        icono: 'bi bi-printer-fill',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Opciones',
        url: '',
        icono: 'bi bi-clipboard-data',
        toggle: 'dropdown-toggle',
        bandera: 0,
        submenu: [
          {
            titulo: 'Notas por Areas',
            url: 'reportes/notasareatotal',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Periodo',
            url: 'reportes/anual',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Evaluaciones',
            url: 'reportes/notaseva',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas Consolidado',
            url: 'reportes/notas/consolidado',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Asistencias por Fecha',
            url: 'reportes/asistencias',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Asistencias por Rangos',
            icono: 'bi bi-megaphone',
            url: 'reportes/rango',
          },
          {
            titulo: 'Asistencias Consolidado',
            icono: 'bi bi-megaphone',
            url: 'reportes/asistenciasconsolidado',
          }
        ]
      },
    ];
  }

  if (role === 'DOCENTE') {
    return menu = [
      {
        titulo: 'Operaciones',
        url: '',
        icono: 'bi bi-gear-fill',
        toggle: 'dropdown-toggle',
        bandera: 1,
        submenu: [
          {
            titulo: 'Asignaciones',
            url: 'asignaciones/docente',
            icono: 'bi bi-pc-display-horizontal',
          },
          {
            titulo: 'Notas',
            url: 'notas/docente',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Asistencias',
            url: 'asistencias/docente',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Horarios',
            url: 'horarios/docente',
            icono: 'bi bi-calendar3',
          },
          {
            titulo: 'Materiales',
            url: 'materiales/docente',
            icono: 'bi bi-folder2',
          },
        ]
      },

      {
        titulo: 'Reportes',
        url: 'reportes',
        toggle: '',
        icono: 'bi bi-printer-fill',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Opciones',
        url: '',
        icono: 'bi bi-clipboard-data',
        toggle: 'dropdown-toggle',
        bandera: 0,
        submenu: [
          {
            titulo: 'Notas por Areas',
            url: 'reportes/notasareatotal',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Periodo',
            url: 'reportes/anual',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Evaluaciones',
            url: 'reportes/notaseva',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas Consolidado',
            url: 'reportes/notas/consolidado',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Asistencias por Fecha',
            url: 'reportes/asistencias',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Asistencias por Rangos',
            icono: 'bi bi-megaphone',
            url: 'reportes/rango',
          },
          {
            titulo: 'Asistencias Consolidado',
            icono: 'bi bi-megaphone',
            url: 'reportes/asistenciasconsolidado',
          }
        ]
      },
    ];
  }

  if (role === 'ALUMNO') {
    return menu = [
      {
        titulo: 'Matriculas',
        url: 'matriculas/alumno',
        toggle: '',
        icono: 'bi bi-file-earmark-ruled',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Materiales',
        url: 'materiales/alumno',
        toggle: '',
        icono: 'bi bi-folder2',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Horarios',
        url: 'horarios/alumno',
        toggle: '',
        icono: 'bi bi-calendar3',
        submenu: [],
        bandera: 1,
      },

      /*
      {
        titulo: 'Reportes',
        url: 'reportes',
        toggle: '',
        icono: 'bi bi-printer-fill',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Opciones',
        url: '',
        icono: 'bi bi-clipboard-data',
        toggle: 'dropdown-toggle',
        bandera: 0,
        submenu: [
          {
            titulo: 'Notas por Bimestre',
            url: 'reportes/notasalumno',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Periodo Detallado',
            url: 'reportes/notasalumnoanual',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Area y Alumno',
            url: 'reportes/notasarea',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono: 'bi bi-megaphone',
          }
        ]
      }
      */

    ];
  }

  if (role === 'APODERADO') {
    return menu = [
      {
        titulo: 'Matriculas',
        url: 'matriculas/apoderado',
        toggle: '',
        icono: 'bi bi-file-earmark-ruled',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Horarios',
        url: 'horarios/apoderado',
        toggle: '',
        icono: 'bi bi-calendar3',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Reportes',
        url: 'reportes',
        toggle: '',
        icono: 'bi bi-printer-fill',
        submenu: [],
        bandera: 1,
      },
      {
        titulo: 'Opciones',
        url: '',
        icono: 'bi bi-clipboard-data',
        toggle: 'dropdown-toggle',
        bandera: 0,
        submenu: [
          {
            titulo: 'Notas por Evaluaciones',
            url: 'reportes/notaseva',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Notas por Periodo',
            url: 'reportes/anual',
            icono: 'bi bi-stickies',
          },
          {
            titulo: 'Asistencias por Fecha',
            url: 'reportes/asistencias',
            icono: 'bi bi-megaphone',
          },
          {
            titulo: 'Asistencias por Alumno',
            url: 'reportes/asistenciasalumno',
            icono: 'bi bi-megaphone',
          }
        ]
      }
    ];
  }
}