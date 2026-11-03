import http from "k6/http";
import { check, sleep } from "k6";

// Simulasi Siklus Nyata Seharian (Double Peak - Max 30 User)
export const options = {
  stages: [
    { duration: "5s", target: 5 }, // 1. Pagi Hari: Trafik awal mulai masuk (5 user)
    { duration: "5s", target: 15 }, // 2. Siang Menjelang Sibuk: Naik bertahap (15 user)
    { duration: "10s", target: 30 }, // 3. Puncak 1 (Jam Makan Siang): Ramai pol (30 user)
    { duration: "5s", target: 15 }, // 4. Jam Kerja Sore: Mereda sedikit (15 user)
    { duration: "10s", target: 30 }, // 5. Puncak 2 (Santai Malam Hari): Ramai lagi (30 user)
    { duration: "5s", target: 5 }, // 6. Larut Malam: Trafik mulai sepi (5 user)
    { duration: "3s", target: 0 }, // 7. Dini Hari: Trafik habis (0 user)
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% request wajib di bawah 500ms
    http_req_failed: ["rate==0"], // Error wajib 0%
  },
};

export default function () {
  const response = http.get("https://test.k6.io");

  check(response, {
    "apakah status 200": (r) => r.status === 200,
  });

  sleep(1);
}
