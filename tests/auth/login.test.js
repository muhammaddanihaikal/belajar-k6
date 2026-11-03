import { check, sleep } from "k6";
import { login } from "../../services/auth.service.js";
import { authOptions } from "../../config/auth.options.js";

// 1. Pasang opsi khusus Service Auth
export const options = authOptions;

// 2. Skenario Uji Service Auth
export default function () {
  const res = login("emilys", "emilyspass");

  check(res, {
    "status 200": (r) => r.status === 200,
    "dapat accessToken": (r) => r.json("accessToken") !== undefined,
  });

  sleep(1);
}
