import { PostSchema } from "@/app/schema";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchPostDetail(id: string) {
  return await Fetch(
    `posts/${id}`,
    "GET",
    z.null(),
    null,
    PostSchema,
    false,
    "BMS",
    false
  );
}
