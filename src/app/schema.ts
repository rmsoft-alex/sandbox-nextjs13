import * as z from "zod";

export const User = z.object({
  id: z.number(),
  name: z.string().trim(),
  age: z.number(),
});

export const Post = z.object({
  id: z.string().trim(),
  title: z.string().trim(),
  body: z.string().trim(),
});

export const PostsList = z
  .object({
    id: z.string().trim(),
    title: z.string().trim(),
    body: z.string().trim(),
  })
  .array();

export const Path = z.string();
export const MethodZod = z.string();
export const IncludesFile = z.boolean().optional().default(false);
export const Backend = z.number().optional().default(0);
export const IsCheck = z.boolean().optional().default(false);
