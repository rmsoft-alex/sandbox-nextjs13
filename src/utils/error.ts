import * as z from "zod";

/**
 * @param dataSchema data 스키마
 * @param data validate할 data
 * @throw error console 창에 에러 반환
 */
export function ZodErrorReport<TDataSchema extends z.Schema>(
  dataSchema: TDataSchema,
  data: z.infer<TDataSchema>
) {
  const { error } = dataSchema.safeParse(data) as z.SafeParseError<string>;
  if (error) {
    throw error.issues.map((el) => `[${el.path}]: ${el.message}`);
  }
}
