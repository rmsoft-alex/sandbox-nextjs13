import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function deletePost(id: string) {
  return await Fetch(
    `posts/${id}`,
    "DELETE",
    z.null(),
    null,
    z.object({}),
    false,
    "BMS",
    false
  );
}
