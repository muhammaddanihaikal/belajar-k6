// ==========================================
// Konfigurasi Opsi Khusus Service Auth
// ==========================================
// Pilihan tipe beban dari terminal: k6 run -e TYPE=load ... (default: smoke)
const type = __ENV.TYPE || "smoke";

const types = {
  // 1. Test Biasa (Flat konstan 1 VU)
  smoke: {
    vus: 1,
    duration: "5s",
  },
  // 2. Test Bertahap (Stages naik-turun)
  load: {
    stages: [
      { duration: "3s", target: 5 },
      { duration: "5s", target: 5 },
      { duration: "2s", target: 0 },
    ],
  },
};

export const authOptions = {
  ...types[type],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // SLA Auth: < 1 detik
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};
