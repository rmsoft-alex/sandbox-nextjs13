import { Post, PostType } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";

export async function updatePost(data: PostType) {
  return await Fetch(
    `posts/${data.id}`,
    Method.PUT,
    Post,
    data,
    Post,
    false,
    BackEnd.USER,
    false
  );
}
