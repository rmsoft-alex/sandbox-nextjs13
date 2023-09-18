import * as z from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().trim(),
  age: z.number(),
});

export const PostSchema = z.object({
  id: z.string().trim(),
  title: z.string().trim(),
  body: z.string().trim(),
});

export const PostsListSchema = PostSchema.array();

export const PathSchema = z.string();
export const MethodSchema = z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]);
export const IncludesFileSchema = z.boolean().optional().default(false);
export const IsCheckSchema = z.boolean().optional().default(false);

// 전체 스토어에 대한 스키마 정의 (state + actions)
export const PostStoreSchema = z.object({
  posts: PostsListSchema,
  actions: z.object({
    addPost: z.function().args(PostSchema),
    removePost: z.function().args(z.string()),
  }),
});
