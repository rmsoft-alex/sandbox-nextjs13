import { PostsList } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchPostsList() {
  return await Fetch(
    "posts",
    Method.GET,
    z.null(),
    null,
    PostsList,
    false,
    BackEnd.USER,
    false
  );
}
