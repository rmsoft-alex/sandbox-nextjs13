import {
  IncludesFileSchema,
  IsCheckSchema,
  MethodSchema,
  PathSchema,
} from "@/app/schema";
import * as z from "zod";
import { ZodErrorReport } from "./error";
import { ServerURL, ServerURLType } from "@/types/type";

const fetchProps = z.object({
  code: z.number(),
  message: z.string(),
  resultData: z.any(),
});

type fetchPropsType = z.infer<typeof fetchProps>;

/**
 * @param path path
 * @param method Method.[GET, POST, PUT, DELETE]
 * @param requestSchema requestData 스키마
 * @param requestData requestData
 * @param responseSchema responseData 스키마
 * @param includesFile 파일 첨부 여부 | default false
 * @param server ServerURL.[BMS] | default BMS
 * @param isCheck server alive? optional | default false
 * @returns fetch 요청에 대한 응답
 */
export async function Fetch<
  TQuerySchema extends z.Schema,
  TResponseSchema extends z.Schema
>(
  path: z.infer<typeof PathSchema>, // path
  method: z.infer<typeof MethodSchema>, // method
  requestSchema: TQuerySchema, // request 스키마
  requestData: z.infer<TQuerySchema>,
  responseSchema: TResponseSchema, //response 스키마
  includesFile: z.infer<typeof IncludesFileSchema>, // file 첨부 여부
  server: ServerURLType, // .env.local에서 가져올 값
  isCheck: z.infer<typeof IsCheckSchema> // server 살아 있는지 여부 - 현재는 없음
): Promise<fetchPropsType> {
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

  const domain = ServerURL[server];

  if (isCheck) {
    const isRunningServer = await fetchCheckingServer(domain);
    if (!isRunningServer) {
      throw new Error("Not connected to server");
    }
  }

  const urlFullPath = `${domain}${path}`;

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
        return ZodErrorReport(responseSchema, data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const buildData = <TQuerySchema extends z.Schema>(
  method: z.infer<typeof MethodSchema>,
  init: RequestInit,
  includesFile: z.infer<typeof IncludesFileSchema>,
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
