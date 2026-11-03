import http from "k6/http";
import { check, sleep } from "k6";

// Simulasi Nyata: Serbuan Jam Masuk Kantor (Rush Hour Login)
export const options = {
  stages: [
    { duration: "3s", target: 5 }, // 1. Pemanasan: 5 user mulai buka aplikasi
    { duration: "5s", target: 20 }, // 2. Jam Masuk Kerja: Serbuan 20 user login barengan
    { duration: "10s", target: 20 }, // 3. Tahan: 20 user aktif login terus-menerus
    { duration: "3s", target: 0 }, // 4. Pendinginan: Semua user selesai login
  ],
  thresholds: {
    http_req_duration: ["p(95)<1500"], // 95% login wajib di bawah 1.5 detik
    http_req_failed: ["rate==0"], // Error login wajib 0%
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
