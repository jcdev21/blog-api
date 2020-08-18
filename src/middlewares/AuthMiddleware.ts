import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../services/AuthService';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.send({
            error: true,
            msg: "token not exists"
        });
    }

    const secretKey: string = process.env.JWT_SECRET_KEY || 'secretKeyBlogAPI';
    const token: string = req.headers.authorization.split(" ")[1];
    
    try {
        const credential: string | object = jwt.verify(token, secretKey);
        
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        
        return res.send("token invalid");
    } catch (error) {
        const decoded: any = jwt.decode(token);

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).send({
                error: true,
                msg: "token expired"
            });
        }
        
        return res.send({
            error: true,
            msg: error
        });
    }
}

export const adminAccess = (req: Request, res: Response, next: NextFunction) => {
    const { level } = req.app.locals.credential;

    if (level === 'admin') {
        return next();
    }

    return res.send({
        error: true,
        msg: "admin access only"
    });
}

export const userActive = (req: Request, res: Response, next: NextFunction) => {
    const { is_active } = req.app.locals.credential;

    if (is_active === 1) {
        return next();
    }

    return res.send({
        error: true,
        msg: "user not active"
    });
}

export const authRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.headers.authorization) {
        return res.send({
            error: true,
            msg: "token not exists"
        });
    }

    const service = new AuthService(req);
    const secretKey: string = process.env.JWT_SECRET_KEY || 'secretKeyBlogAPI';
    const token: string = req.headers.authorization.split(" ")[1];

    try {
        
        const credential: string | object = jwt.verify(token, secretKey);

        const existsToken = await service.checkExistsToken(token);
        
        // Jika tidak terdapat token di table expired
        if (!existsToken)
            return res.send({
                error: true,
                msg: "token blacklisted"
            });

        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        
        return res.send({
            error: true,
            msg: "refresh token invalid"
        });
    } catch (error) {
        const decoded: any = jwt.decode(token);
        
        if (decoded.exp < Date.now() / 1000) {
            const deleteToken = await service.deleteToken(token);
            return res.status(403).send({
                error: true,
                msg: "user unauthenticated"
            });
        }

        return res.send({
            error: true,
            msg: error
        });
    }
}

export const authLogout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.send({
            error: true,
            msg: "token not exists"
        });
    }

    const service = new AuthService(req);
    const token: string = req.headers.authorization.split(" ")[1];
    const deleteToken = await service.deleteToken(token);
    return next();
}