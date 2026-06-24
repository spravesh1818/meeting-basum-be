import * as z from "zod";

const userValidationSchema = z.object({
    name: z.string(),
    email: z.string().email().optional(),
    password: z.string().min(8),
});

const updateUserValidationSchema = z.object({
    name: z.string().optional(),
    password: z.string().min(8).optional(),
});

export { userValidationSchema, updateUserValidationSchema };