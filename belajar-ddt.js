import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

// 1. BACA FILE DATA: Hanya dimuat 1x di memori (Efisien & Irit RAM)
const users = new SharedArray("daftar user", function () {
  return JSON.parse(open("./users.json"));
});

// Konfigurasi: 5 robot selama 5 detik
export const options = {
  vus: 5,
  duration: "7s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // 95% request wajib < 1.5 detik
    http_req_failed: ["rate==0"], // Error harus 0%
  },
};

export default function () {
  // 2. PEMBAGIAN AKUN: Tiap robot ambil akun unik berdasarkan nomor robot (__VU)
  const user = users[(__VU - 1) % users.length];

  // (Opsional) Intip di terminal biar kelihatan robot mana bawa akun mana
  if (__ITER === 0) {
    console.log(`🤖 Robot #${__VU} login pakai akun: ${user.username}`);
  }

  // 3. LOGIN (POST) menggunakan data dinamis
  const loginUrl = "https://dummyjson.com/auth/login";
  const loginPayload = JSON.stringify({
    username: user.username,
    password: user.password,
  });
  const loginParams = {
    headers: { "Content-Type": "application/json" },
  };

  const loginRes = http.post(loginUrl, loginPayload, loginParams);
  const token = loginRes.json("accessToken");

  check(loginRes, {
    "1. login berhasil 200": (r) => r.status === 200,
    "2. token didapat": () => token !== undefined && token !== "",
  });

  // 4. BUKA PROFIL (GET) menggunakan token hasil login
  const profileUrl = "https://dummyjson.com/auth/me";
  const authParams = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const profileRes = http.get(profileUrl, authParams);

  check(profileRes, {
    "3. akses profil 200": (r) => r.status === 200,
    "4. username profil sesuai": (r) => r.json("username") === user.username,
  });

  sleep(1);
}
