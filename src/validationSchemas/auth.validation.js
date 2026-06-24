import * as z from "zod";

const loginValidationSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(8),
});

const registerValidationSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
});

export { loginValidationSchema, registerValidationSchema };