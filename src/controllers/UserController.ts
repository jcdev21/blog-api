import { Request, Response } from 'express';
import IController from './ControllerInterface';
import UserService from '../services/UserService';
const fs = require('fs');

class UserController implements IController {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service = new UserService(req);
        const users = await service.getAll();

        return res.send({
            data: users,
            msg: ""
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const service = new UserService(req);
        const user = await service.store();

        return res.send({
            data: user,
            msg: "user created"
        });
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        const service = new UserService(req);
        const user = await service.getOne();

        return res.send({
            data: user,
            msg: ""
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const service = new UserService(req);
        const user = await service.update();

        return res.send({
            data: user,
            msg: "user updated"
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const service = new UserService(req);
        const dataUser = await service.getOne();
        const user = await service.delete();

        if (user)
            fs.unlink(dataUser.photo, () => {});

        return res.send({
            data: user,
            msg: "user deleted"
        });
    }

    changeFoto = async (req: Request, res: Response): Promise<Response> => {
        const service = new UserService(req);
        const oldDataUser = await service.getOne();
        const user = await service.changeFoto();

        if (user)
            fs.unlink(oldDataUser.photo, () => {});

        return res.send({
            data: user,
            msg: "photo updated"
        });
    }

    upload = async (req: Request, res: Response) => {
        const data = req.body;
        const dataFile = req.file;

        return res.send({
            data: data,
            dataFile: dataFile
        });
    }

    uploadMultiFile = async (req: Request, res: Response) => {
        const data = req.body;
        const dataFiles = req.files;

        return res.send({
            data: data,
            dataFiles: dataFiles
        });
    }

    uploadDua = async (req: Request, res: Response) => {
        const data = req.body;

        console.log(data);
        console.log(req.file);
        
        return res.send({
            data: data
        });
    }

    uploadFoto = async (req: Request, res: Response) => {
        const data = req.body;
        const dataFile = req.file;

        console.log(data);
        console.log(req.file);
        
        return res.send({
            data: data,
            dataFile: dataFile
        });
    }
}

export default new UserController;