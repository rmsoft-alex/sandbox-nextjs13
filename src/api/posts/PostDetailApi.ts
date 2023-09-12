import { PostSchema } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchPostDetail(id: string) {
  return await Fetch(
    `posts/${id}`,
    Method.GET,
    z.null(),
    null,
    PostSchema,
    false,
    BackEnd.USER,
    false
  );
}
