import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    login = async (req: Request, res: Response): Promise<Response> => {
        const service = new AuthService(req);
        const datas = await service.loginVerification();

        return res.send(datas);
    }

    refreshToken = async (req: Request, res: Response): Promise<Response> => {
        const service = new AuthService(req);
        const token = await service.getAccessToken();
        
        return res.send({ token });
    }

    logout = async (req: Request, res: Response): Promise<Response> => {
        return res.send({
            msg: 'success logout'
        });
    }
}

export default new AuthController;