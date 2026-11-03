// ==========================================
// Konfigurasi Opsi Khusus Service Product
// ==========================================
export const productOptions = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // Respon katalog (< 1.5 detik)
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};
