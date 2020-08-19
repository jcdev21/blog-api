"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidate = exports.validate = void 0;
var express_validator_1 = require("express-validator");
var db = require('../db/models');
var fs = require('fs');
var validate = [
    express_validator_1.check('username')
        .exists().withMessage('username is required')
        .notEmpty().withMessage('username is not empty')
        .trim().escape()
        .isLength({ min: 5 }).withMessage('username minimal 5 caracther')
        .custom(function (value) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.user.findOne({
                        where: { username: value }
                    }).then(function (user) {
                        if (user) {
                            return Promise.reject('username already in use');
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }),
    express_validator_1.check('email')
        .exists().withMessage('email is required')
        .notEmpty().withMessage('email is not empty')
        .isEmail().withMessage('email not valid'),
    express_validator_1.check('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('password is not empty')
        .trim().escape()
        .isLength({ min: 6 }).withMessage('password minimal 6 caracther')
        .custom(function (value, _a) {
        var req = _a.req;
        return (value === req.body.confirm_password) ? true : false;
    }).withMessage('password and confirm password not match'),
    express_validator_1.check('confirm_password')
        .exists().withMessage('confirm password is required')
        .notEmpty().withMessage('confirm password is not empty')
        .trim().escape(),
    express_validator_1.check('name')
        .exists().withMessage('name is required')
        .notEmpty().withMessage('name is not empty')
        .trim().escape(),
    express_validator_1.check('level')
        .exists().withMessage('level is required')
        .notEmpty().withMessage('level is not empty')
        .trim().escape()
        .custom(function (value) {
        var enumLevel = ['admin', 'member'];
        return (enumLevel.indexOf(value) === -1) ? false : true;
    }).withMessage('level not available'),
    express_validator_1.check('is_active')
        .exists().withMessage('active account is required')
        .isBoolean().withMessage('active account must boolean'),
    function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            if (req.file) {
                // delete file di folder temp
                fs.unlink(req.file.path, function () {
                    console.log('success delete file in temp');
                });
            }
            return res.status(422).send({ errors: errors.array() });
        }
        return next();
    }
];
exports.validate = validate;
var updateValidate = [
    express_validator_1.check('name')
        .exists().withMessage('name is required')
        .notEmpty().withMessage('name is not empty')
        .trim().escape(),
    express_validator_1.check('level')
        .exists().withMessage('level is required')
        .notEmpty().withMessage('level is not empty')
        .trim().escape()
        .custom(function (value) {
        var enumLevel = ['admin', 'member'];
        return (enumLevel.indexOf(value) === -1) ? false : true;
    }).withMessage('level not available'),
    express_validator_1.check('is_active')
        .exists().withMessage('active account is required')
        .isBoolean().withMessage('active account must boolean'),
    function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }
        return next();
    }
];
exports.updateValidate = updateValidate;
