import { User } from "@/app/schema";
import { BackEnd, Method } from "@/types/type";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchUserInfo() {
  return await Fetch(
    "user",
    Method.GET,
    z.null(),
    null,
    User,
    false,
    BackEnd.USER,
    false
  );
}
