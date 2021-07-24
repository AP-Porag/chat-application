/*
*external imports
*/
const {check, validationResult} = require('express-validator');
const createError = require("http-errors");
const {unlink} = require("fs");
const path = require("path");

/*
*internal imports
*/
const User = require('../../models/People');

//add user validator
const addUserValidators = [
    check('name')
        .isLength({min: 1})
        .withMessage('name is required')
        .isAlpha('en-US', {ignore: ' -'})
        .withMessage('name must not contain anything except alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('invalid email address')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    throw createError('email already used');
                }
            } catch (e) {
                throw createError(e.message);
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('mobile number should be a valid bd mobile number')
        .custom(async (value) => {
            try {
                const user = await User.findOne({mobile: value});
                if (user) {
                    throw createError('mobile number already used');
                }
            } catch (e) {
                throw createError(e.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'),
];

const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        //unlink the image file or remove uploaded file
        if (req.files.length > 0) {
            const {filename} = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }

        // response the errors
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

module.exports = {
    addUserValidators,
    addUserValidationHandler
}