import { check, sleep } from "k6";
import { login } from "../../services/auth.service.js";

export const options = {
  vus: 100,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate==0"],
  },
};

export default function () {
  const res = login("emilys", "emilyspass");

  check(res, {
    "status 200": (r) => r.status === 200,
    "dapat accessToken": (r) => r.json("accessToken") !== undefined,
  });

  sleep(1);
}
