import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/jwt";
import Role from "../models/role";
import { getMenu } from "../helpers/menu-frontend";
import Persona from "../models/persona";
import Tipodocumento from "../models/tipodocumento";

export const login= async (req:Request, res:Response)=>{

    const { email, password} = req.body;

    try {
        const usuario:any= await Usuario.findOne({
            include:{
                model: Role,
                as: 'role',
                attributes:['id','nombre']
            },
            where: {
                email: email,
                estado: true,
                habilitado: true
            },
            
        });
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:'Usuario y contraseña no son correctos'
            });
        }

        const validPassword= bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'Usuario y contraseña no son correctos'
            });
        }
        const token= await generarJWT(email);
        
        res.json({
            ok:true,
            msg:'Bienvenido',
            token,
            menu:getMenu(usuario.role.nombre)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        })   
    }
}

export const renewToken= async (req:any, res:Response)=>{

    const email = req.email;

    const token= await generarJWT(email);
    
    const usuario:any= await Usuario.findOne({
        include:[{
            model: Role,
            as: 'role',
            attributes:['id','nombre']
        },{
            model:Persona,
            as:'persona',
            include:[
                {
                    model:Tipodocumento,
                    as:'tipodocumento'
                }
            ]
        }],
        where: {
            email: email,
            estado: true,
            habilitado: true
        },
       
    });

    res.json({
        ok:true,
        usuario,
        token
    });
}