import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .required("Le nom est obligatoire")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long"),

  description: yup.string().optional(),

  price: yup
    .number()
    .required("Le prix est obligatoire")
    .transform((value, originalValue) => {
      
      if (originalValue === "" || originalValue === null) {
        return undefined;
      }

      return isNaN(Number(originalValue)) ? NaN : Number(originalValue);
    })
    .typeError("Le prix doit être un nombre valide")
    .min(0, "Le prix doit être positif"),

  stock: yup
    .number()
    .required("Le stock est obligatoire")
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue === null) {
        return undefined;
      }
      return isNaN(Number(originalValue)) ? NaN : Number(originalValue);
    })
    .typeError("Le stock doit être un nombre valide")
    .min(0, "Le stock doit être positif"),
});

export type ProductSchema = yup.InferType<typeof productSchema>;