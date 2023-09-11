import {
  Backend,
  IncludesFile,
  IsCheck,
  MethodZod,
  Path,
  Post,
  User,
} from "@/app/schema";
import * as z from "zod";

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

export type PathType = z.infer<typeof Path>;
export type MethodType = z.infer<typeof MethodZod>;
export type IncludesFileType = z.infer<typeof IncludesFile>;
export type BackendType = z.infer<typeof Backend>;
export type IsCheckType = z.infer<typeof IsCheck>;

export type UserType = z.infer<typeof User>;
export type PostType = z.infer<typeof Post>;
