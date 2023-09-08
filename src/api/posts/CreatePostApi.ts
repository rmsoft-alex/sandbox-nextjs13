import { Post, PostType } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";

export async function createPost(data: PostType) {
  return await Fetch(
    "posts",
    Method.POST,
    Post,
    data,
    Post,
    false,
    BackEnd.USER,
    false
  );
}
