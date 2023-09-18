import { UserSchema } from "@/app/schema";
import { Fetch } from "@/utils/fetch";
import { z } from "zod";

export async function fetchUserInfo() {
  return await Fetch(
    "user",
    "GET",
    z.null(),
    null,
    UserSchema,
    false,
    "BMS",
    false
  );
}
