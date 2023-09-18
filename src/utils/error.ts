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
    // data의 type 에러 콘솔창에 표시
    error.issues.map((el) => {
      if ("received" in el && "expected" in el) {
        console.log(
          `[${el.path}]: 받은 타입: ${el.received}, 받아야할 타입: ${el.expected}`
        );
      }
    });
    // data는 화면에 출력되도록 반환
    return data;
  }
}
