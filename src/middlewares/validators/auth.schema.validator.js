import { loginValidationSchema, registerValidationSchema } from '../../validationSchemas/auth.validation.js';

export function validateLoginRequest(req, res, next) {
    const { error } = loginValidationSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: error.flatten().fieldErrors
        })
    }
    next();
}

export function validateRegisterRequest(req, res, next) {
    const { error } = registerValidationSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: error.flatten().fieldErrors
        })
    }
    next();
}