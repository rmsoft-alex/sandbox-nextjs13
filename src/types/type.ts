export const ServerURL = {
  BMS: process.env.BMS_URL ?? "",
} as const;

export type ServerURLType = "BMS";
