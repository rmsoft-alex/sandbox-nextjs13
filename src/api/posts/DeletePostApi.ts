import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function deletePost(id: string) {
  return await Fetch(
    `posts/${id}`,
    Method.DELETE,
    z.null(),
    null,
    z.object({}),
    false,
    BackEnd.USER,
    false
  );
}
