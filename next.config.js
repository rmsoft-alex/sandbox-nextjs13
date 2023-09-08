/** @type {import('next').NextConfig} */

const FETCH_API = process.env.NEXT_PUBLIC_FETCH_API;
const FETCH_USER_API = process.env.NEXT_PUBLIC_FETCH_USER_API;
const FETCH_ADMIN_API = process.env.NEXT_PUBLIC_FETCH_ADMIN_API;
const FETCH_EXCEL_API = process.env.NEXT_PUBLIC_FETCH_EXCEL_API;
const FETCH_ALARM_API = process.env.NEXT_PUBLIC_FETCH_ALARM_API;

const nextConfig = {
  env: {
    API: FETCH_API,
    USER_API: FETCH_USER_API,
    ADMIN_API: FETCH_ADMIN_API,
    EXCEL_API: FETCH_EXCEL_API,
    ALARM_API: FETCH_ALARM_API,
  },
};

module.exports = nextConfig;
