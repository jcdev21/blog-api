import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validate = [
    check('username')
        .exists().withMessage('username is required')
        .notEmpty().withMessage('username is not empty')
        .trim().escape(),
    check('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('password is not empty')
        .trim().escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send( errors.array() );
        }

        return next();
    }
];

export default validate;