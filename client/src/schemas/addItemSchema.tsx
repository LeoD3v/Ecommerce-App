import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const CommonProperties = z.object({
  name: z.string().min(6, "Name must be provided"),
  price: z.number().min(3, "Price must be provided"),
  quantity: z.number().min(1, "quantity must be provided"),
  createdBy: z
    .string()
    .regex(objectIdRegex, "Invaide ObjectId")
    .min(1, "Created by must be provided"),
  serialNumbers: z
    .string() // Expect a string
    .transform((value) =>
      value
        .split(",")
        .map((sn) => sn.trim())
        .filter((sn) => sn.length > 0)
    ) // Transform string to array
    .refine(
      (arr) => arr.length > 0,
      "At least one serial number must be provided"
    ), // Validate array length
  description: z.string().min(10, "Please provide a descriptive description"),
});
export const Electroinics = z
  .object({
    type: z.literal("electronics"),
    brand: z.string().min(6, "Brand must be provided"),
    model: z.string().min(4, "model must be provided"),
  })
  .merge(CommonProperties);
export const NonElectroinics = z
  .object({
    type: z.literal("non-electronics"),
    brand: z.string().min(6, "Brand must be provided"),
  })
  .merge(CommonProperties);

export const createItemFormSchema = z.discriminatedUnion("type", [
  Electroinics,
  NonElectroinics,
]);
export type AddItemformSchema = z.infer<typeof createItemFormSchema>;
