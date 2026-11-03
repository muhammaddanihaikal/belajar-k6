// Membaca BASE_URL dari .env baik di k6 (__ENV) maupun di Node.js (process.env)
const env = typeof __ENV !== "undefined" ? __ENV : (typeof process !== "undefined" ? process.env : {});
export const BASE_URL = env.BASE_URL || "https://dummyjson.com";
