import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
const fs = require('fs');

const validate = [
    check('title')
        .exists().withMessage('title is required')
        .notEmpty().withMessage('title is not empty')
        .trim().escape(),
    check('content')
        .exists().withMessage('title is required')
        .notEmpty().withMessage('title is not empty')
        .trim().escape(),
    ( req: Request, res: Response, next: NextFunction ) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (req.file) {
                fs.unlink(req.file.path, () => {});
            }

            console.log(errors.array());
            
            return res.status(422).send({ errors: errors.array() });
        }

        return next();
    }
];

export { validate };