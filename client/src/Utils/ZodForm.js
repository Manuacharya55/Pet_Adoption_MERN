import z, { string } from "zod";

export const addressSchema = z.object({
  phonenumber: z.string().length(10, "Phone number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  country: z.string().min(1, "Country is required"),
});

export const shopSchema = z.object({
  shopname: z.string().min(3, "Shop name should be atleast 3"),
  image: z.string().min(1, "Please select image"),
});

export const petSchema = z.object({
  name: z.string().min(2, "Name must have atleast 2 letters"),
  description: z.string().min(10, "Desecripton should have atleast 10 words"),
  image: z.string().min(1, "Please select image"),
  age: z.coerce.number(),
  breed: z.string().min(2, "Breed should have atlest 2 character"),
  price: z.coerce.number(),
  gender: z.enum(["male", "female"]),
  category: z.string().min(3, "Please select right category"),
});
