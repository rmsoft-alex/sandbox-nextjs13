import {
  BackendSchema,
  IncludesFileSchema,
  IsCheckSchema,
  MethodZodSchema,
  PathSchema,
  PostSchema,
  PostStoreSchema,
  UserSchema,
} from "@/app/schema";
import * as z from "zod";

// 공통 fetch 에서 사용할 type
export const BackEnd = {
  USER: 0,
  ADMIN: 1,
  EXCEL: 2,
  ALARM: 3,
  DUMMY: 4,
} as const;

export const BackEndURL = {
  0: process.env.USER_API,
  1: process.env.ADMIN_API,
  2: process.env.EXCEL_API,
  3: process.env.ALARM_API,
  4: process.env.API,
} as const;

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type PathType = z.infer<typeof PathSchema>;
export type MethodType = z.infer<typeof MethodZodSchema>;
export type IncludesFileType = z.infer<typeof IncludesFileSchema>;
export type BackendType = z.infer<typeof BackendSchema>;
export type IsCheckType = z.infer<typeof IsCheckSchema>;

export type UserType = z.infer<typeof UserSchema>;
export type PostType = z.infer<typeof PostSchema>;

export type PostStoreState = z.infer<typeof PostStoreSchema>;
