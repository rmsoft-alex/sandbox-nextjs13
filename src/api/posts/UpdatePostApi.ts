import * as z from "zod";
import { PostSchema } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";

export async function updatePost(data: z.infer<typeof PostSchema>) {
  return await Fetch(
    `posts/${data.id}`,
    Method.PUT,
    PostSchema,
    data,
    PostSchema,
    false,
    BackEnd.USER,
    false
  );
}
