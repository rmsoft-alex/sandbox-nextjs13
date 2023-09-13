import * as z from "zod";
import { PostSchema } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";

export async function createPost(data: z.infer<typeof PostSchema>) {
  return await Fetch(
    "posts",
    Method.POST,
    PostSchema,
    data,
    PostSchema,
    false,
    BackEnd.USER,
    false
  );
}
