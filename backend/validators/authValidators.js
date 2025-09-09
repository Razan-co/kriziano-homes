const  { ValidationChain, validationResult, body } =require('express-validator')

class AuthValidation {

    userValidationRules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6, max: 20 }).withMessage("Password must between 6 and 20 characters."),
        body('phone').isMobilePhone('en-IN').withMessage("Phone number must be valid")
    ]

    loginVaildationRules =[
        body('email').isEmail().withMessage("Valid Email required."),
        body('password').isLength({ min: 6, max: 20 }).withMessage('password must between 6 and 20 characters ')
    ]

}

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()

}

module.exports= { AuthValidation, validateRequest }

