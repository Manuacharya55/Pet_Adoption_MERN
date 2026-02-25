import { z } from "zod";

export const addressSchema = z.object({
    phonenumber: z.string().length(10, "Phone number must be exactly 10 digits"),
    address: z.string().min(1, "Address is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    country: z.string().min(1, "Country is required"),
});
