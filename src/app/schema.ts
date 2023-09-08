import * as z from "zod";

export const User = z.object({
  id: z.number(),
  name: z.string().trim(),
  age: z.number(),
});
export type UserType = z.infer<typeof User>;

export const Post = z.object({
  id: z.string().trim(),
  title: z.string().trim(),
  body: z.string().trim(),
});
export type PostType = z.infer<typeof Post>;

export const PostsList = z
  .object({
    id: z.string().trim(),
    title: z.string().trim(),
    body: z.string().trim(),
  })
  .array();

export const Path = z.string({ required_error: "api를 입력해주세요." });
export type PathType = z.infer<typeof Path>;
export const Method = z.string({ required_error: "method를 입력해주세요." });
export type MethodType = z.infer<typeof Method>;
export const IncludesFile = z.boolean().optional().default(false);
export type IncludesFileType = z.infer<typeof IncludesFile>;
export const Backend = z.number().optional().default(0);
export type BackendType = z.infer<typeof Backend>;
export const IsCheck = z.boolean().optional().default(false);
export type IsCheckType = z.infer<typeof IsCheck>;
