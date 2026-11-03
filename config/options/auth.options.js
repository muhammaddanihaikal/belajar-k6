// ==========================================
// Konfigurasi Opsi Khusus Service Auth
// ==========================================
// Pilih tipe beban dari terminal: k6 run -e TYPE=load ...
const type = __ENV.TYPE || "smoke";

// Pilihan Tipe Beban Khusus Auth
const types = {
  smoke: {
    vus: 1,
    duration: "5s",
  },
  load: {
    stages: [
      { duration: "3s", target: 5 },
      { duration: "5s", target: 5 },
      { duration: "2s", target: 0 },
    ],
  },
  stress: {
    stages: [
      { duration: "3s", target: 10 },
      { duration: "5s", target: 20 },
      { duration: "2s", target: 0 },
    ],
  },
};

export const authOptions = {
  ...types[type],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // Respon login harus cepat (< 1 detik)
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};
