import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
const db = require('../db/models');
const fs = require('fs');

const validate = [
    check('username')
        .exists().withMessage('username is required')
        .notEmpty().withMessage('username is not empty')
        .trim().escape()
        .isLength({ min: 5 }).withMessage('username minimal 5 caracther')
        .custom( async (value: string): Promise<Response> => {
            return await db.user.findOne({
                where: { username: value }
            }).then((user: object) => {
                if (user) {
                    return Promise.reject('username already in use');
                }
            });
        }),
    check('email')
        .exists().withMessage('email is required')
        .notEmpty().withMessage('email is not empty')
        .isEmail().withMessage('email not valid'),
    check('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('password is not empty')
        .trim().escape()
        .isLength({ min: 6 }).withMessage('password minimal 6 caracther')
        .custom((value, { req }): boolean => {
            return (value === req.body.confirm_password) ? true : false;
        }).withMessage('password and confirm password not match'),
    check('confirm_password')
        .exists().withMessage('confirm password is required')
        .notEmpty().withMessage('confirm password is not empty')
        .trim().escape(),
    check('name')
        .exists().withMessage('name is required')
        .notEmpty().withMessage('name is not empty')
        .trim().escape(),
    check('level')
        .exists().withMessage('level is required')
        .notEmpty().withMessage('level is not empty')
        .trim().escape()
        .custom((value): boolean => {
            const enumLevel = ['admin', 'member'];
            return (enumLevel.indexOf(value) === -1) ? false : true;
        }).withMessage('level not available'),
    check('is_active')
        .exists().withMessage('active account is required')
        .isBoolean().withMessage('active account must boolean'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            if (req.file) {
                // delete file di folder temp
                fs.unlink(req.file.path, () => {
                    console.log('success delete file in temp');
                });
            }

            return res.status(422).send({ errors: errors.array() });
        }

        return next();
    }
];

const updateValidate = [
    check('name')
        .exists().withMessage('name is required')
        .notEmpty().withMessage('name is not empty')
        .trim().escape(),
    check('level')
        .exists().withMessage('level is required')
        .notEmpty().withMessage('level is not empty')
        .trim().escape()
        .custom((value): boolean => {
            const enumLevel = ['admin', 'member'];
            return (enumLevel.indexOf(value) === -1) ? false : true;
        }).withMessage('level not available'),
    check('is_active')
        .exists().withMessage('active account is required')
        .isBoolean().withMessage('active account must boolean'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }

        return next();
    }
];

export { validate, updateValidate };