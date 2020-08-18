import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
    public static passwordHash = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10);
    }

    public static compare = async (password: string, hashPassword: string): Promise<boolean> => {
        return await bcrypt.compare(password, hashPassword);
    }

    public static generateToken = (
            id: number,
            username: string,
            email: string,
            name: string,
            level: string,
            is_active: number
        ): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'secretKeyBlogAPI';

        const token: string = jwt.sign({ id, username, email, name, level, is_active }, secretKey, { expiresIn: '30m' });

        return token;
    }

    public static generateRefreshToken = (
            iue: string,
            id: number,
            username: string,
            email: string,
            name: string,
            level: string,
            is_active: number
        ): string => {
        
        const secretKey: string = process.env.JWT_SECRET_KEY || 'secretKeyBlogAPI';

        const refreshToken: string = jwt.sign({ iue, id, username, email, name, level, is_active }, secretKey, { expiresIn: '120m' });
    
        return refreshToken;
    }
}

export default Authentication;