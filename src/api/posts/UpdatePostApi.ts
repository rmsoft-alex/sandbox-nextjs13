import * as z from "zod";
import { PostSchema } from "@/app/schema";
import { Fetch } from "@/utils/fetch";

export async function updatePost(data: z.infer<typeof PostSchema>) {
  return await Fetch(
    `posts/${data.id}`,
    "PUT",
    PostSchema,
    data,
    PostSchema,
    false,
    "BMS",
    false
  );
}
