
import * as z from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const addressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  pinCode: z.string().min(6, "Pin code must be 6 digits"),
  addressProof: z.instanceof(File).optional(),
});

export const identificationSchema = z.object({
  aadhaarNumber: z.string().min(12, "Aadhaar number must be 12 digits"),
  idProof: z.instanceof(File).optional(),
});

export const businessInfoSchema = z.object({
  goodsType: z.string().min(2, "Please specify the type of goods"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  yearsExperience: z.string().min(1, "Please specify years of experience"),
  productImages: z.instanceof(File).array().optional(),
});

export const bankingSchema = z.object({
  upiId: z.string().min(5, "UPI ID must be at least 5 characters"),
});

export const customerAddressSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters"),
  village: z.string().min(2, "Village/Town/City must be at least 2 characters"),
  district: z.string().min(2, "District must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pinCode: z.string().min(6, "Pin code must be 6 digits"),
});
