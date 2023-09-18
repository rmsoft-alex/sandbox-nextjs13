import * as z from "zod";
import { PostSchema } from "@/app/schema";
import { Fetch } from "@/utils/fetch";

export async function createPost(data: z.infer<typeof PostSchema>) {
  return await Fetch(
    "posts",
    "POST",
    PostSchema,
    data,
    PostSchema,
    false,
    "BMS",
    false
  );
}
