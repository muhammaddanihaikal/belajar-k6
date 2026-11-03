import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi: 20 user aktif barengan selama 5 detik
export const options = {
  vus: 20,
  duration: "5s",
  // Syarat Kelulusan Otomatis (SLA):
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% request wajib di bawah 200ms
    http_req_failed: ["rate==0"], // Error wajib 0%
  },
};

export default function () {
  //   console.log(`Robot ke-${__VU} lagi muter putaran ke-${__ITER}`);
  // Nembak ke server latihan resmi k6
  const response = http.get("https://test.k6.io");

  // Validasi: Status code harus 200 OK
  check(response, {
    "apakah status 200": (r) => r.status === 200,
  });

  // Jeda 1 detik antar aksi
  sleep(1);
}
