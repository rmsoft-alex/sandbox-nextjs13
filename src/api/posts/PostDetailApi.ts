import { Post } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchPostDetail(id: string) {
  return await Fetch(
    `posts/${id}`,
    Method.GET,
    z.null(),
    null,
    Post,
    false,
    BackEnd.USER,
    false
  );
}
