// ==========================================
// Konfigurasi Opsi Khusus Service Auth
// ==========================================
export const authOptions = {
  vus: 2,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1000"], // Respon login harus cepat (< 1 detik)
    http_req_failed: ["rate==0"],      // Login gagal harus 0%
  },
};
