import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    fullname: z.string().min(2, "Name must have at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
