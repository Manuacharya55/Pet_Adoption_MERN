import { z } from "zod";

export const petSchema = z.object({
    name: z.string().min(2, "Pet name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    age: z.coerce.number().min(0, "Age must be a positive number"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    breed: z.string().min(2, "Breed is required"),
    gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Gender is required" }),
    }),
    category: z.string().min(1, "Category is required"),
    image: z.string().min(1, "Image is required"),
});
