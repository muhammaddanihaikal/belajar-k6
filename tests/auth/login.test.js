import { check, sleep } from "k6";
import { authOptions } from "../../config/options/auth.options.js";
import { login } from "../../services/auth.service.js";

export const options = authOptions;

export default function () {
  const res = login("emilys", "emilyspass");

  check(res, {
    "status 200": (r) => r.status === 200,
    "dapat accessToken": (r) => r.json("accessToken") !== undefined,
  });

  sleep(1);
}
