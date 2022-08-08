"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
const getMenu = (role) => {
    let menu = [];
    if (role === 'ADMINISTRADOR') {
        return menu = [
            {
                titulo: 'Institución',
                url: 'institucion',
                icono: 'bi bi-house-door-fill',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Comunidad',
                url: '',
                icono: 'bi bi-people-fill',
                toggle: 'dropdown-toggle',
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
                titulo: 'Planificación',
                url: '',
                icono: 'bi bi-stack',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Periodos',
                        url: 'periodos',
                        icono: 'bi bi-hourglass-split',
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
                    {
                        titulo: 'Rangos',
                        url: 'rangos',
                        icono: 'bi bi-calendar3-range',
                    },
                    {
                        titulo: 'Aulas',
                        url: 'aulas',
                        icono: 'bi bi-door-closed',
                    },
                ]
            },
            {
                titulo: 'Ejecución',
                url: '',
                icono: 'bi bi-gear-fill',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Programaciones',
                        url: 'programaciones',
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
                    },
                    {
                        titulo: 'Materiales',
                        url: 'materiales',
                        icono: 'bi bi-folder2',
                    },
                ]
            },
            {
                titulo: 'Reportes',
                url: '',
                icono: 'bi bi-clipboard-data',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Area',
                        url: 'reportes/notasareatotal',
                        icono: 'bi bi-pin-angle',
                    },
                    {
                        titulo: 'Notas por Periodo',
                        url: 'reportes/anual',
                        icono: 'bi bi-pin-angle',
                    },
                    {
                        titulo: 'Notas Consolidado',
                        url: 'reportes/notas/consolidado',
                        icono: 'bi bi-pin-angle',
                    },
                    {
                        titulo: 'Asistencias por Fecha',
                        url: 'reportes/asistencias',
                        icono: 'bi bi-pin-angle',
                    },
                    {
                        titulo: 'Asistencias por Alumno',
                        url: 'reportes/asistenciasalumno',
                        icono: 'bi bi-pin-angle',
                    },
                    {
                        titulo: 'Asistencias Consolidado',
                        icono: 'bi bi-pin-angle',
                        url: 'reportes/rango',
                    }
                ]
            },
            /*
            {
              titulo: 'Reportes',
              url: '',
              icono: 'bi bi-clipboard-data',
              toggle: 'dropdown-toggle',
              submenu: [
                {
                  titulo: 'Notas por Bimestre',
                  url: 'reportes/notas',
                  icono: 'bi bi-square',
                },
                {
                  titulo: 'Notas por Bimestre y Alumno',
                  url: 'reportes/notasalumno',
                  icono: 'bi bi-square',
                },
                {
                  titulo: 'Notas por Periodo Detallado',
                  url: 'reportes/notasalumnoanual',
                  icono: 'bi bi-square',
                },
                {
                  titulo: 'Notas por Area y Alumno',
                  url: 'reportes/notasarea',
                  icono: 'bi bi-square',
                },
             
              ]
            }
            */
        ];
    }
    if (role === 'DOCENTE') {
        return menu = [
            {
                titulo: 'Ejecución',
                url: '',
                icono: 'bi bi-gear-fill',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Programaciones',
                        url: 'programaciones/docente',
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
                url: '',
                icono: 'bi bi-clipboard-data',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notas',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Bimestre y Alumno',
                        url: 'reportes/notasalumno',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Periodo',
                        url: 'reportes/anual',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Area',
                        url: 'reportes/notasareatotal',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias por Fecha',
                        url: 'reportes/asistencias',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias por Alumno',
                        url: 'reportes/asistenciasalumno',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias Consolidado',
                        url: 'reportes/rango',
                        icono: 'bi bi-square',
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
                icono: 'bi bi-file-earmark-ruled',
                submenu: []
            },
            {
                titulo: 'Materiales',
                url: 'materiales/alumno',
                toggle: '',
                icono: 'bi bi-folder2',
                submenu: []
            },
            {
                titulo: 'Horarios',
                url: 'horarios/alumno',
                toggle: '',
                icono: 'bi bi-calendar3',
                submenu: []
            },
            {
                titulo: 'Reportes',
                url: '',
                icono: 'bi bi-clipboard-data',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notasalumno',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias',
                        url: 'reportes/asistenciasalumno',
                        icono: 'bi bi-square',
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
                icono: 'bi bi-file-earmark-ruled',
                submenu: []
            },
            {
                titulo: 'Horarios',
                url: 'horarios/apoderado',
                toggle: '',
                icono: 'bi bi-calendar3',
                submenu: []
            },
            {
                titulo: 'Reportes',
                url: '',
                icono: 'bi bi-clipboard-data',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notas',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Bimestre y Alumno',
                        url: 'reportes/notasalumno',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Periodo',
                        url: 'reportes/anual',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias por Fecha',
                        url: 'reportes/asistencias',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias por Alumno',
                        url: 'reportes/asistenciasalumno',
                        icono: 'bi bi-square',
                    },
                    {
                        titulo: 'Asistencias Consolidado',
                        url: 'reportes/rango',
                        icono: 'bi bi-square',
                    }
                ]
            }
        ];
    }
};
exports.getMenu = getMenu;
//# sourceMappingURL=menu-frontend.js.map