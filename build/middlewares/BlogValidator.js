"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var express_validator_1 = require("express-validator");
var fs = require('fs');
var validate = [
    express_validator_1.check('title')
        .exists().withMessage('title is required')
        .notEmpty().withMessage('title is not empty')
        .trim().escape(),
    express_validator_1.check('content')
        .exists().withMessage('title is required')
        .notEmpty().withMessage('title is not empty')
        .trim().escape(),
    function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file) {
                fs.unlink(req.file.path, function () { });
            }
            console.log(errors.array());
            return res.status(422).send({ errors: errors.array() });
        }
        return next();
    }
];
exports.validate = validate;
