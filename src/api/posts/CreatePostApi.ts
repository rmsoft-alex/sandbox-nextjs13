import { PostSchema } from "@/app/schema";
import { BackEnd, Method, PostType } from "@/types/type";
import { Fetch } from "@/utils/fetch";

export async function createPost(data: PostType) {
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
