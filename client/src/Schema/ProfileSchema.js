import { z } from "zod";

export const profileSchema = z.object({
    fullname: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    avatar: z.string().min(1, "Profile picture is required"),
});
