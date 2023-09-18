/** @type {import('next').NextConfig} */

const BMS_URL = process.env.NEXT_PUBLIC_BMS;

const nextConfig = {
  env: {
    BMS_URL: BMS_URL ?? "",
  },
};

module.exports = nextConfig;
