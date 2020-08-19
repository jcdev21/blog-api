"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validate = [
    express_validator_1.check('username')
        .exists().withMessage('username is required')
        .notEmpty().withMessage('username is not empty')
        .trim().escape(),
    express_validator_1.check('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('password is not empty')
        .trim().escape(),
    function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send(errors.array());
        }
        return next();
    }
];
exports.default = validate;
