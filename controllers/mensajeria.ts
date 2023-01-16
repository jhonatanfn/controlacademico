import { Request, Response } from "express";
import Mensajeria from "../models/mensajeria";
import { Op } from 'sequelize';
import { handleHttpError } from "../utils/handleError";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const mensajerias = await Mensajeria.findAll({
            where: { estado: true }
        });
        res.json({
            ok: true,
            mensajerias
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMensajerias = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const total = (await Mensajeria.findAll({
            where: { estado: true }
        })).length;
        const mensajerias = await Mensajeria.findAll({
            where: { estado: true },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 5,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMensajeria = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria = await Mensajeria.findByPk(id);

        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe el mensaje con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const postMensajeria = async (req: Request, res: Response) => {

    const { body } = req;
    try {
        const mensajeria = Mensajeria.build(body);
        await mensajeria.save();
        res.json({
            ok: true,
            msg: 'Mensaje enviado exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }

}
export const putMensajeria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const mensajeria: any = await Mensajeria.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe el mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update(body);
        res.json({
            ok: true,
            msg: 'Mensaje actualizado exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMensajerias = async (req: Request, res: Response) => {
    const { valor } = req.params;
    try {
        const data = await Mensajeria.findAll({
            where: {
                asunto: {
                    [Op.like]: `%${valor}%`
                },
                estado: true
            }
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const deleteMensajeriaEmisor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findOne({
            where: {
                id: id,
                emisor: req.body.emisor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({ xemisor: true });
        res.json({
            ok: true,
            msg: 'Mensaje eliminado exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const deleteMensajeriaReceptor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findOne({
            where: {
                id: id,
                receptor: req.body.receptor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({ xreceptor: true });
        res.json({
            ok: true,
            msg: 'Mensaje eliminado exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const leidoMensajeriaEmisor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findOne({
            where: {
                id: id,
                emisor: req.body.emisor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({
            lemisor: true,
            cemisor: ""
        });
        res.json({
            ok: true,
            msg: 'Mensaje leido exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const leidoMensajeriaReceptor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findOne({
            where: {
                id: id,
                receptor: req.body.receptor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({
            lreceptor: true,
            creceptor: ""
        });
        res.json({
            ok: true,
            msg: 'Mensaje leido exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const noleidoMensajeriaEmisor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findOne({
            where: {
                id: id,
                emisor: req.body.emisor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({
            lemisor: false,
            cemisor: "list-group-item-info"
        });
        res.json({
            ok: true,
            msg: 'Mensaje no leido exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const noleidoMensajeriaReceptor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findOne({
            where: {
                id: id,
                receptor: req.body.receptor
            }
        });
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({
            lreceptor: false,
            creceptor: "list-group-item-info"
        });
        res.json({
            ok: true,
            msg: 'Mensaje no leido exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMensajeriasRecibidos = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    const { email } = req.body;
    try {
        const total = (await Mensajeria.findAll({
            where: {
                estado: true,
                receptor: email,
                xreceptor: false
            }
        })).length;
        const mensajerias = await Mensajeria.findAll({
            where: {
                estado: true,
                receptor: email,
                xreceptor: false
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 10,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMensajeriasEnviados = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    const { email } = req.body;
    try {
        const total = (await Mensajeria.findAll({
            where: {
                estado: true,
                emisor: email,
                xemisor: false
            }
        })).length;
        const mensajerias = await Mensajeria.findAll({
            where: {
                estado: true,
                emisor: email,
                xemisor: false
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 10,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const getMensajeriasEliminados = async (req: Request, res: Response) => {
    const desde = Number(req.query.desde) || 0;
    const { email } = req.body;
    try {
        const total = (await Mensajeria.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        emisor: email,
                        xemisor: true,
                    },
                    {
                        receptor: email,
                        xreceptor: true
                    }
                ]
            }
        })).length;
        const mensajerias = await Mensajeria.findAll({
            where: {
                estado: true,
                [Op.or]: [
                    {
                        emisor: email,
                        xemisor: true,
                    },
                    {
                        receptor: email,
                        xreceptor: true
                    }
                ]
            },
            order: [
                [
                    'id', 'DESC'
                ]
            ],
            limit: 10,
            offset: desde,
        });
        res.json({
            ok: true,
            mensajerias,
            desde,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const restaurarEmisor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({
            xemisor: false
        });
        res.json({
            ok: true,
            msg: 'Mensaje restaurado exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const restaurarReceptor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mensajeria: any = await Mensajeria.findByPk(id);
        if (!mensajeria) {
            return res.status(400).json({
                ok: false,
                msg: `No existe una mensaje con el id: ${id}`
            });
        }
        await mensajeria?.update({
            xreceptor: false
        });
        res.json({
            ok: true,
            msg: 'Mensaje restaurado exitosamente',
            mensajeria
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const busquedaMensajeriasRecibidos = async (req: Request, res: Response) => {
    const { valor, email } = req.params;
    try {
        const data = await Mensajeria.findAll({
            where: {
                asunto: {
                    [Op.like]: `%${valor}%`
                },
                estado: true,
                receptor: email,
                xreceptor: false
            }
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMensajeriasEnviados = async (req: Request, res: Response) => {
    const { valor, email } = req.params;
    try {
        const data = await Mensajeria.findAll({
            where: {
                asunto: {
                    [Op.like]: `%${valor}%`
                },
                estado: true,
                emisor: email,
                xemisor: false
            }
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}
export const busquedaMensajeriasEliminados = async (req: Request, res: Response) => {
    const { valor, email } = req.params;
    try {
        const data = await Mensajeria.findAll({
            where: {
                asunto: {
                    [Op.like]: `%${valor}%`
                },
                estado: true,
                [Op.or]: [
                    {
                        emisor: email,
                        xemisor: true,
                    },
                    {
                        receptor: email,
                        xreceptor: true
                    }
                ]
            }
        });
        res.json({
            ok: true,
            total: data.length,
            busquedas: data
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const existenMensajesNuevos = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const total = (await Mensajeria.findAll({
            where: {
                estado: true,
                receptor: email,
                nuevo: true
            }
        })).length;
        res.json({
            ok: true,
            total
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}

export const actualizarMensajesNuevos = async (req: Request, res: Response) => {
   
    const { email } = req.params;
    try {
        const mensajerias = await Mensajeria.findAll({
            where: {
                estado: true,
                receptor: email,
                nuevo: true
            },
        });
        if(mensajerias.length>0){
            mensajerias.forEach(mensajeria=>{
                mensajeria?.update({
                    nuevo: false
                });
            });
            return res.json({
                ok: true,
                msg: "Mensajes actualizados con exito"
            });
        }
        res.json({
            ok: true,
            msg: "No hay mensajes nuevos"
        });
    } catch (error) {
        handleHttpError(res, "Se produjo un error.", 500, error);
    }
}