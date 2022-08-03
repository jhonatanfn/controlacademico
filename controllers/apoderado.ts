import { Request, Response } from "express";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import Alumno from "../models/alumno";
import Apoderado from "../models/apoderado";
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento"
import Role from "../models/role";
import Usuario from "../models/usuario";

export const getApoderadosTodo= async (req:Request,res:Response)=>{

    try {
        const apoderados= await Apoderado.findAll({
            where:{estado:true},
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
                            as: 'tipodocumento',
                            attributes:['id','nombre']
                        }
                    ]
                }
            ]
        });
        res.json({
            ok:true,
            apoderados
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const getApoderados= async (req:Request,res:Response)=>{

    const desde= Number(req.query.desde) || 0;

    try {
        const total=  (await Apoderado.findAll({
            where:{estado:true}
        })).length;

        const apoderados= await Apoderado.findAll({
            where:{estado:true},
            order: [
                /*
                [ 
                    { model: Persona, as: 'persona'}, 
                    'nombres', 'ASC'
                ]
                */
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
                            as: 'tipodocumento',
                            attributes:['id','nombre']
                        }
                    ]
                }
            ]
        });
        res.json({
            ok:true,
            apoderados,
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
export const getApoderado= async (req:Request,res:Response)=>{
    const { id }= req.params;

    try {
        const apoderado:any= await Apoderado.findByPk(id,{
            include:[{
                model:Persona,
                as:'persona',
                include:[
                    {
                        model: Tipodocumento,
                        as: 'tipodocumento',
                        attributes:['id','nombre'],
                        required:false
                    }
                ]

            }]
        });
        
        if(!apoderado || apoderado.estado==false){
            return res.status(400).json({
                ok:false,
                msg: `No existe un apoderado con el id: ${id}`
            });
        }

        res.json({
            ok:true,
            apoderado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const getApoderadoNumero = async (req:Request,res:Response)=>{

    const { numero } = req.params;

    try {
        
        const apoderado:any= await Apoderado.findOne({
            include:[
                {
                    model:Persona,
                    as:'persona',
                    where:{
                        numero:numero
                    }
                }
            ]
        });
        if(!apoderado || apoderado.estado==false){
            return res.status(400).json({
                ok:false,
                msg: `No existe un apoderado con el numero: ${numero}`
            });
        }
        res.json({
            ok:true,
            apoderado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }


}
export const postApoderado= async (req:Request,res:Response)=>{
    const { body } = req;

    try {
        const roles:any= await Role.findAll({where:{estado:true}});
        const salt= bcrypt.genSaltSync();
        let maxValor:any = await Usuario.max('numero',{where:{estado:true}});
        let arr = body.nombreusuario.split(' '); 
        let numeroUsuario= maxValor+1;
        const apoderado= Apoderado.build(body);
        await apoderado.save();
        await Usuario.create({
            nombre: arr[0],
            numero: numeroUsuario,
            email:arr[0]+''+numeroUsuario+'@gutemberg.com',
            password:bcrypt.hashSync('123456',salt),
            roleId:roles[2].id,
            personaId:body.personaId
        });
        res.json({
            ok:true,
            msg:'Apoderado guardado exitosamente',
            apoderado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const putApoderado= async (req:Request,res:Response)=>{
    const { id } = req.params;
    const { body }= req;
    
    try {

        const apoderado:any = await Apoderado.findByPk(id);
        if(!apoderado){
           return  res.status(400).json({
                ok:false,
                msg: `No existe un apoderado con el id: ${id}`
            });
        }
        await apoderado?.update(body);
        res.json({
            ok:true,
            msg:'Apoderado actualizado exitosamente',
            apoderado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const deleteApoderado= async (req:Request,res:Response)=>{
    const { id } = req.params;
    try {
        const apoderado:any = await Apoderado.findByPk(id);
        if(!apoderado){
            return res.status(400).json({
                ok:false,
                msg: `No existe un docente con el id: ${id}`
            });
        }
        await apoderado?.update({ estado:false});
        const usuario= await Usuario.findOne({
            where:{
                personaId:apoderado.personaId,
                estado: true
            }
        });
        if(usuario){
            await usuario?.update({estado: false});
        }
        res.json({
            ok:true,
            msg:'Apoderado borrado exitosamente',
            apoderado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
export const busquedaApoderados= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Apoderado.findAll({
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
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }

}
export const apoderadoPorPersona= async (req:Request,res:Response)=>{

    const { id }= req.params;
    try {
        
        const apoderado= await Apoderado.findOne({
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
        if(apoderado){
            return res.json({
                ok:true,
                apoderado
            });
        }
        res.json({
            ok:false,
            msg:'No existe un apoderado con el persona id: '+id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }


}
export const busquedaApoderadoPorApellido= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Apoderado.findAll({
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
export const tieneAlumnos = async (req:Request,res:Response)=>{

    const {apoderadoId } = req.params;
    try {
        
        const alumnos = await Alumno.findAll({
            where:{
                estado: true,
                apoderadoId: apoderadoId
            }
        });

        if(alumnos.length>0){
            return res.json({
                ok:true,
                msg: "No se puede eliminar el apoderado."
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
export const busquedaApoderadoPorDocumento= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Apoderado.findAll({
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
export const busquedaApoderadoPorNombres= async (req:Request,res:Response)=>{

    const { valor }= req.params;
    try {
        const data= await Apoderado.findAll({
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