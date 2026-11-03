// ==========================================
// Konfigurasi Opsi Khusus Service Product
// ==========================================
// Pilih tipe beban dari terminal: k6 run -e TYPE=load ...
const type = __ENV.TYPE || "smoke";

// Pilihan Tipe Beban Khusus Product (Kapasitas Lebih Besar)
const types = {
  smoke: {
    vus: 2,
    duration: "5s",
  },
  load: {
    stages: [
      { duration: "3s", target: 10 },
      { duration: "5s", target: 10 },
      { duration: "2s", target: 0 },
    ],
  },
  stress: {
    stages: [
      { duration: "3s", target: 20 },
      { duration: "5s", target: 50 },
      { duration: "2s", target: 0 },
    ],
  },
};

export const productOptions = {
  ...types[type],
  thresholds: {
    http_req_duration: ["p(95)<1500"], // Respon katalog (< 1.5 detik)
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};
