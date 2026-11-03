import http from "k6/http";
import { check, sleep } from "k6";
// Import reporter kustom dengan desain modern soft blue & white
import { generateModernReport } from "./custom-reporter.js";

// Konfigurasi Beban: 20 robot selama 5 detik
export const options = {
  vus: 20,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // 95% request login harus di bawah 1.5 detik
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};

export default function () {
  const url = "https://dummyjson.com/auth/login";

  const payload = JSON.stringify({
    username: "emilys",
    password: "emilyspass",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "login status 200": (r) => r.status === 200,
    "dapat access token": (r) => r.json("accessToken") !== undefined,
  });

  sleep(1);
}

// Ekspor hasil pengujian ke file summary.html dengan desain modern
export function handleSummary(data) {
  return {
    "summary.html": generateModernReport(data),
  };
}
