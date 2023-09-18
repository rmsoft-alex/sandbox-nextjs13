import { PostsListSchema } from "@/app/schema";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchPostsList() {
  return await Fetch(
    "posts",
    "GET",
    z.null(),
    null,
    PostsListSchema,
    false,
    "BMS",
    false
  );
}
