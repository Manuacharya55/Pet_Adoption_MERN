import { z } from "zod";

export const shopSchema = z.object({
    shopname: z.string().min(3, "Shop name must be at least 3 characters"),
    image: z.string().min(1, "Shop image is required"),
});
