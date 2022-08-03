import { Request, Response } from "express";
import Role from "../models/role";
import Usuario from '../models/usuario';

export const getRoles= async (req:Request, res:Response)=>{

    try {
        const roles= await Role.findAll({
            include:{
                model: Usuario,
                as:'usuario',
                attributes:['id','nombre','email']
            },
            attributes:['id','nombre']
        });
        res.json({
            ok: true,
            msg: 'Lista de Roles',
            roles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
    
}

export const getRole= async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
        const role:any = await Role.findByPk(id);
        if(!role){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            role
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const postRole= async (req:Request, res:Response)=>{

    const { body } = req;

    try {
        const role= Role.build(body);
        await role.save();
        res.json({
            ok:true,
            msg:'Rol creado exitosamente',
            role
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}

export const putRole= async (req:Request, res:Response)=>{
    
    const { id } = req.params;
    const { body }= req;
    
    try {
        const role:any = await Role.findByPk(id);
        if(!role){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        await role?.update(body);
        res.json({
            ok:true,
            msg:'Rol actualizado exitosamente',
            role
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}


export const deleteRole= async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
        const role:any = await Role.findByPk(id);
        if(!role){
            return res.status(400).json({
                ok:false,
                msg: `No existe un rol con el id: ${id}`
            });
        }
        await role?.update({ estado:false});
        res.json({
            ok:true,
            msg:'Rol eliminado exitosamente',
            role
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Se produjo un error. Hable con el administrador'
        });
    }
}
