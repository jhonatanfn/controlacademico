import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Alumno from '../models/alumno';
import Persona  from '../models/persona';
import Apoderado from '../models/apoderado';
import Tipodocumento from '../models/tipodocumento';
import Matricula from "../models/matricula";
import Role from "../models/role";
import Usuario from "../models/usuario";

export const getAlumnos= async (req:Request,res:Response)=>{

    const desde= Number(req.query.desde) || 0;
    try {
        const total=  (await Alumno.findAll({
            where:{estado: true}
        })).length;

        const alumnos= await Alumno.findAll({
            where:{estado: true},
            order: [
                ['id','DESC']
            ],
            limit:5,
            offset:desde,
            include:[
                {
                    model: Persona,
                    as: 'persona',
                    required: false,
                    include:[
                        {
                            model: Tipodocumento,
                            as:'tipodocumento',
                            attributes:['id','nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Apoderado,
                    as: 'apoderado',
                    attributes:['personaId'],
                    required:false,
                    include:[
                        {
                            model: Persona,
                            as: 'persona',
                            required: false,
                            include:[
                                {
                                    model: Tipodocumento,
                                    as:'tipodocumento',
                                    attributes:['id','nombre'],
                                    required: false
                                }
                            ]
                        }
                    ]

                }
            ]
        });
        res.json({
            ok:true,
            alumnos,
            desde,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAlumnosTodos= async (req:Request,res:Response)=>{

    try {
        const alumnos= await Alumno.findAll({
            where:{estado: true},
            order: [
                [ 
                    { model: Persona, as: 'persona'}, 
                    'nombres', 'ASC'
                ]
            ],
            include:[
                {
                    model: Persona,
                    as: 'persona',
                    required: false,
                    include:[
                        {
                            model: Tipodocumento,
                            as:'tipodocumento',
                            attributes:['id','nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Apoderado,
                    as: 'apoderado',
                    attributes:['personaId'],
                    required:false,
                    include:[
                        {
                            model: Persona,
                            as: 'persona',
                            required: false,
                            include:[
                                {
                                    model: Tipodocumento,
                                    as:'tipodocumento',
                                    attributes:['id','nombre'],
                                    required: false
                                }
                            ]
                        }
                    ]

                }
            ]
        });
        res.json({
            ok:true,
            alumnos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAlumnoNumero= async (req:Request,res:Response)=>{

    const { numero } = req.params;
    try {
        
        const alumno= await Alumno.findOne({
            where:{ estado:true},
            include:[
                {
                    model:Persona,
                    as:'persona',
                    where:{
                        numero:numero
                    }
                },
                {
                    model:Apoderado,
                    as:'apoderado'
                }
            ]
        });
        if(!alumno){
            return res.status(400).json({
                ok:false,
                msg: `No existe un alumno con el numero: ${numero}`
            });
        }
        res.json({
            ok:true,
            alumno
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getAlumno= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const alumno:any= await Alumno.findByPk(id,{
            include:[
                {
                    model: Persona,
                    as: 'persona',
                    required: false,
                    include:[
                        {
                            model: Tipodocumento,
                            as:'tipodocumento',
                            attributes:['id','nombre'],
                            required: false
                        }
                    ]
                },
                {
                    model: Apoderado,
                    as: 'apoderado',
                    required:false,
                    include:[
                        {
                            model: Persona,
                            as: 'persona',
                            required: false,
                            include:[
                                {
                                    model: Tipodocumento,
                                    as:'tipodocumento',
                                    attributes:['id','nombre'],
                                    required: false
                                }
                            ]
                        }
                    ]

                }
            ]
        });
        
        if(!alumno || alumno.estado==false){
            return res.status(400).json({
                ok:false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            alumno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const postAlumno= async (req:Request,res:Response)=>{
    const { body } = req;
    
    try {

        const roles:any= await Role.findAll({where:{estado:true}});
        const salt= bcrypt.genSaltSync();
        let maxValor:any = await Usuario.max('numero',{where:{estado:true}});
        let arr = body.nombreusuario.split(' '); 
        let numeroUsuario= maxValor+1;
        const alumno= Alumno.build({
            personaId: body.personaId,
            apoderadoId: body.apoderadoId
        });
        await alumno.save();
        await Usuario.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email:arr[0]+''+numeroUsuario+'@gutemberg.com',
            password:bcrypt.hashSync('123456',salt),
            roleId:roles[3].id,
            personaId:body.personaId
        });
        res.json({
            ok:true,
            msg:'Alumno creado exitosamente',
            alumno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const putAlumno= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;
    
    try {

        const alumno:any = await Alumno.findByPk(id);
        if(!alumno){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }
        await alumno?.update(body);
        res.json({
            ok:true,
            msg:'Alumno actualizado exitosamente',
            alumno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteAlumno= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const alumno:any = await Alumno.findByPk(id);
        if(!alumno){
            return res.status(400).json({
                ok:false,
                msg: `No existe un alumno con el id: ${id}`
            });
        }

        
        const lista= await Matricula.findAll({
            where:{
                '$alumno.id$': id,
                estado: true
            },
            include:[
                {
                    model:Alumno,
                    as:'alumno'
                }
            ]
        });
        if(lista.length>0){
            return res.status(400).json({
                ok:false,
                msg: `No puede eliminar el alumno.`
            });
        }

        await alumno?.update({ estado:false});

        const usuario= await Usuario.findOne({
            where:{
                personaId:alumno.personaId,
                estado: true
            }
        });
        if(usuario){
            await usuario?.update({estado: false});
        }

        res.json({
            ok:true,
            msg:'Alumno eliminado exitosamente',
            alumno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaAlumnos= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Alumno.findAll({
            where:{
                estado: true
            },
            include:[
                {
                    model: Persona,
                    as:'persona',
                    where:{
                        nombres:{
                            [Op.like]:`%${valor}%`
                        }
                    }
                }
            ]
        });
        res.json({
            ok:true,
            total:data.length,
            busquedas:data
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const alumnoPorPersona= async (req:Request,res:Response)=>{

    const { id }= req.params;
    try {
        
        const alumno= await Alumno.findOne({
            where:{
                estado: true,
                personaId: id
            },
            include:[
                {
                    model: Persona,
                    as:'persona',
                    include:[{
                        model: Tipodocumento,
                        as:'tipodocumento'
                    }]
                }
            ]
        });
        if(alumno){
            return res.json({
                ok:true,
                alumno
            });
        }
        res.json({
            ok:false,
            msg:'No existe un alumno con el persona id:'+id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }


}
export const busquedaAlumnosApellido= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Alumno.findAll({
            where:{
                estado: true
            },
            include:[
                {
                    model: Persona,
                    as:'persona',
                    where:{
                        apellidopaterno:{
                            [Op.like]:`%${valor}%`
                        }
                    }
                },
                {
                    model: Apoderado,
                    as: 'apoderado',
                    include:[
                        {
                            model: Persona,
                            as: 'persona'
                        }
                    ]
                }
            ]
        });
        res.json({
            ok:true,
            total:data.length,
            busquedas:data
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const tieneMatricula= async (req:Request,res:Response)=>{
    const { alumnoId } = req.params;
    try {
        
        const matriculas = await Matricula.findAll({
            where:{
                estado: true,
                alumnoId: alumnoId
            }
        });

        if(matriculas.length>0){
            return res.json({
                ok: true,
                msg: "No se puede eliminar el alumno."
            });
        }

        res.json({
            ok: false
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const busquedaAlumnosDocumento= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Alumno.findAll({
            where:{
                estado: true
            },
            include:[
                {
                    model: Persona,
                    as:'persona',
                    where:{
                        numero:{
                            [Op.like]:`%${valor}%`
                        }
                    }
                },
                {
                    model: Apoderado,
                    as: 'apoderado',
                    include:[
                        {
                            model: Persona,
                            as: 'persona'
                        }
                    ]
                }
            ]
        });
        res.json({
            ok:true,
            total:data.length,
            busquedas:data
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const busquedaAlumnosNombres= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Alumno.findAll({
            where:{
                [Op.or]: [
                    {
                        '$persona.numero$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.nombres$': {
                            [Op.like]: `%${valor}%`
                        },
                    },
                    {
                        '$persona.apellidopaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    },
                    {
                        '$persona.apellidomaterno$': {
                            [Op.like]: `%${valor}%`
                        }
                    }

                ],
                estado: true
            },
            include:[
                {
                    model: Persona,
                    as:'persona',
                    attributes: ['id', 'numero', 'nombres', 'apellidopaterno', 'apellidomaterno', 'direccion', 'telefono', 'img']
                },
                {
                    model: Apoderado,
                    as: 'apoderado',
                    include:[
                        {
                            model: Persona,
                            as: 'persona'
                        }
                    ]
                }
            ]
        });
        res.json({
            ok:true,
            total:data.length,
            busquedas:data
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
