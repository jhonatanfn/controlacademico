"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenu = void 0;
const getMenu = (role) => {
    let menu = [];
    if (role === 'ADMINISTRADOR') {
        return menu = [
            {
                titulo: 'Comunidad del Colegio',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Institución',
                        url: 'institucion'
                    },
                    {
                        titulo: 'Docentes',
                        url: 'docentes'
                    },
                    {
                        titulo: 'Alumnos',
                        url: 'alumnos'
                    },
                    {
                        titulo: 'Apoderados',
                        url: 'apoderados'
                    }
                ]
            },
            {
                titulo: 'Planificación',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Periodos',
                        url: 'periodos'
                    },
                    {
                        titulo: 'Areas',
                        url: 'areas'
                    },
                    {
                        titulo: 'Subareas',
                        url: 'subareas'
                    },
                    {
                        titulo: 'Niveles',
                        url: 'niveles'
                    },
                    {
                        titulo: 'Grados',
                        url: 'grados'
                    },
                    {
                        titulo: 'Secciones',
                        url: 'secciones'
                    },
                    {
                        titulo: 'Rangos',
                        url: 'rangos'
                    },
                    {
                        titulo: 'Aulas',
                        url: 'aulas'
                    },
                ]
            },
            {
                titulo: 'Ejecución',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Programaciones',
                        url: 'programaciones'
                    },
                    {
                        titulo: 'Alumnos Matriculados',
                        url: 'matriculas'
                    },
                    {
                        titulo: 'Notas',
                        url: 'notas'
                    },
                    {
                        titulo: 'Asistencias',
                        url: 'asistencias',
                    },
                    {
                        titulo: 'Horarios',
                        url: 'horarios',
                    }
                ]
            },
            {
                titulo: 'Materiales',
                url: 'materiales',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Usuarios',
                url: 'usuarios',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Reportes',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notas'
                    },
                    {
                        titulo: 'Notas por Bimestre y Alumno',
                        url: 'reportes/notasalumno'
                    },
                    {
                        titulo: 'Notas por Periodo',
                        url: 'reportes/anual'
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual'
                    },
                    {
                        titulo: 'Notas por Area',
                        url: 'reportes/notasareatotal'
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea'
                    },
                    {
                        titulo: 'Asistencias por Fecha',
                        url: 'reportes/asistencias',
                    },
                    {
                        titulo: 'Asistencias por Alumno',
                        url: 'reportes/asistenciasalumno',
                    },
                    {
                        titulo: 'Asistencias Consolidado',
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
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Programaciones',
                        url: 'programaciones/docente'
                    },
                    {
                        titulo: 'Notas',
                        url: 'notas/docente'
                    },
                    {
                        titulo: 'Asistencias',
                        url: 'asistencias/docente',
                    }
                ]
            },
            {
                titulo: 'Horarios',
                url: 'horarios/docente',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Materiales',
                url: 'materiales/docente',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Reportes',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notas'
                    },
                    {
                        titulo: 'Notas por Bimestre y Alumno',
                        url: 'reportes/notasalumno'
                    },
                    {
                        titulo: 'Notas por Periodo',
                        url: 'reportes/anual'
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual'
                    },
                    {
                        titulo: 'Notas por Area',
                        url: 'reportes/notasareatotal'
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea'
                    },
                    {
                        titulo: 'Asistencias por Fecha',
                        url: 'reportes/asistencias',
                    },
                    {
                        titulo: 'Asistencias por Alumno',
                        url: 'reportes/asistenciasalumno',
                    },
                    {
                        titulo: 'Asistencias Consolidado',
                        url: 'reportes/rango',
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
                submenu: []
            },
            {
                titulo: 'Materiales',
                url: 'materiales/alumno',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Horarios',
                url: 'horarios/alumno',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Reportes',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notasalumno'
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual'
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea'
                    },
                    {
                        titulo: 'Asistencias',
                        url: 'reportes/asistenciasalumno',
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
                submenu: []
            },
            {
                titulo: 'Horarios',
                url: 'horarios/apoderado',
                toggle: '',
                submenu: []
            },
            {
                titulo: 'Reportes',
                url: '',
                toggle: 'dropdown-toggle',
                submenu: [
                    {
                        titulo: 'Notas por Bimestre',
                        url: 'reportes/notas'
                    },
                    {
                        titulo: 'Notas por Bimestre y Alumno',
                        url: 'reportes/notasalumno'
                    },
                    {
                        titulo: 'Notas por Periodo',
                        url: 'reportes/anual'
                    },
                    {
                        titulo: 'Notas por Periodo Detallado',
                        url: 'reportes/notasalumnoanual'
                    },
                    {
                        titulo: 'Notas por Area y Alumno',
                        url: 'reportes/notasarea'
                    },
                    {
                        titulo: 'Asistencias por Fecha',
                        url: 'reportes/asistencias',
                    },
                    {
                        titulo: 'Asistencias por Alumno',
                        url: 'reportes/asistenciasalumno',
                    },
                    {
                        titulo: 'Asistencias Consolidado',
                        url: 'reportes/rango',
                    }
                ]
            }
        ];
    }
};
exports.getMenu = getMenu;
//# sourceMappingURL=menu-frontend.js.map