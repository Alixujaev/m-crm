import { z } from "zod";
export const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const ProductSchema = z.object({
  category: z.string().min(1, "Category name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
})