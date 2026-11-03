import http from "k6/http";
import { check, sleep } from "k6";

// Konfigurasi: 5 user selama 5 detik
export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // 95% request harus di bawah 1.5 detik
    http_req_failed: ["rate==0"], // Error harus 0%
  },
};

export default function () {
  // ==========================================
  // LANGKAH 1: Login untuk Mendapatkan Token
  // ==========================================
  const loginUrl = "https://dummyjson.com/auth/login";
  const loginPayload = JSON.stringify({
    username: "emilys",
    password: "emilyspass",
  });
  const loginParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginRes = http.post(loginUrl, loginPayload, loginParams);

  // Ambil token dari respons login
  const token = loginRes.json("accessToken");

  check(loginRes, {
    "1. login berhasil 200": (r) => r.status === 200,
    "2. token berhasil didapat": () => token !== undefined && token !== "",
  });

  // ===================================================
  // LANGKAH 2 (CHAINING): Pakai Token untuk Buka Profil
  // ===================================================
  const profileUrl = "https://dummyjson.com/auth/me";
  const authParams = {
    headers: {
      Authorization: `Bearer ${token}`, // <-- Dioper ke sini!
    },
  };

  const profileRes = http.get(profileUrl, authParams);

  check(profileRes, {
    "3. akses profil berhasil 200": (r) => r.status === 200,
    "4. data profil sesuai user": (r) => r.json("username") === "emilys",
  });

  sleep(1);
}
