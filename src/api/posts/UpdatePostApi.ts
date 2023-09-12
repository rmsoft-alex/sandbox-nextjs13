import { PostSchema } from "@/app/schema";
import { BackEnd, Method, PostType } from "@/types/type";
import { Fetch } from "@/utils/fetch";

export async function updatePost(data: PostType) {
  return await Fetch(
    `posts/${data.id}`,
    Method.PUT,
    PostSchema,
    data,
    PostSchema,
    false,
    BackEnd.USER,
    false
  );
}
