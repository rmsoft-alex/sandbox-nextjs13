import {
  BackendType,
  IncludesFileType,
  IsCheckType,
  MethodType,
  PathType,
} from "@/app/schema";
import { BackEndURL } from "../types/type";
import * as z from "zod";
import { ZodErrorReport } from "./error";

/**
 * @param path path
 * @param method Method.[GET, POST, PUT, DELETE]
 * @param requestSchema requestData 스키마
 * @param requestData requestData
 * @param responseSchema responseData 스키마
 * @param includesFile // 파일 처부 여부 | default false
 * @param backend BackEnd.[USER, ADMIN] | default USER
 * @param isCheck server alive? optional | default false
 * @returns fetch 요청에 대한 응답
 */
export async function Fetch<
  TQuerySchema extends z.Schema,
  TResponseSchema extends z.Schema
>(
  path: PathType, // path
  method: MethodType, // method
  requestSchema: TQuerySchema, // request 스키마
  requestData: z.infer<TQuerySchema>,
  responseSchema: TResponseSchema, //response 스키마
  includesFile: IncludesFileType, // file 첨부 여부
  backend: BackendType, // .env.local에서 가져올 값
  isCheck: IsCheckType // server 살아 있는지 여부 - 현재는 없음
): Promise<z.infer<TResponseSchema>> {
  const headers: HeadersInit = {};
  if (!includesFile) headers["Content-Type"] = "application/json";

  const accessToken = null;
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const init: RequestInit = {
    method,
    credentials: "include",
    headers,
    cache: "no-store",
  };

  const backendUrl = BackEndURL[backend as keyof typeof BackEndURL] ?? "";

  if (isCheck) {
    const isRunningServer = await fetchCheckingServer(backendUrl);
    if (!isRunningServer) {
      return;
    }
  }

  const urlFullPath = `${backendUrl}${path}`;

  const url = new URL(urlFullPath);

  buildData(method, init, includesFile, requestSchema, requestData, url);

  return fetch(url, init)
    .then(async (res) => {
      const data = await res.json().catch(() => null);
      // resposeData validate
      if (responseSchema.safeParse(data).success) {
        return data;
      } else {
        // zod error 처리
        ZodErrorReport(responseSchema, data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const buildData = <TQuerySchema extends z.Schema>(
  method: MethodType,
  init: RequestInit,
  includesFile: IncludesFileType,
  requestSchema: TQuerySchema,
  requestData: z.infer<TQuerySchema>,
  url: URL
) => {
  // requestData 여부
  if (!requestData) return;
  // requestData type validate
  ZodErrorReport(requestSchema, requestData);

  switch (method) {
    case "POST":
    case "PUT":
    case "DELETE":
      init["body"] = includesFile
        ? requestData
        : JSON.stringify(requestSchema.parse(requestData));
      break;
    case "GET":
      Object.entries(requestData).map(([key, val]) => {
        url.searchParams.set(key, String(val));
      });
      break;
  }
};

const fetchCheckingServer = async (path: string) => {
  const healthUrl = new URL(path.replace("v1/api/", "health"));

  return await fetch(healthUrl)
    .then((res) =>
      res.json().catch(() => {
        throw new Error("Server Connection Error");
      })
    )
    .then((res) => res?.code === 100 && res?.resultData?.status === "UP")
    .catch(() => {
      return false;
    });
};
