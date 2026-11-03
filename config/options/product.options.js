// ==========================================
// Konfigurasi Opsi Khusus Service Product
// ==========================================
// Pilihan tipe beban dari terminal: k6 run -e TYPE=load ... (default: smoke)
const type = __ENV.TYPE || "smoke";

const types = {
  // 1. Test Biasa (Flat konstan 2 VU)
  smoke: {
    vus: 2,
    duration: "5s",
  },
  // 2. Test Bertahap (Stages naik-turun)
  load: {
    stages: [
      { duration: "3s", target: 10 },
      { duration: "5s", target: 10 },
      { duration: "2s", target: 0 },
    ],
  },
};

export const productOptions = {
  ...types[type],
  thresholds: {
    http_req_duration: ["p(95)<1500"], // SLA Product: < 1.5 detik
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};
