// 1. Ambil tipe beban dari terminal (-e TYPE=load) atau .env (default smoke)
const type = __ENV.TYPE || "smoke";

// 2. Profil Beban Standar Industri
const presets = {
  smoke: { vus: 1, duration: "5s" },
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

const currentPreset = presets[type] || presets.smoke;

// 3. Opsi Khusus Service Auth (SLA login < 1 detik)
export const authOptions = {
  ...currentPreset,
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate==0"],
  },
};

// 4. Opsi Khusus Service Product & User Journey (SLA katalog < 1.5 detik)
export const productOptions = {
  ...currentPreset,
  thresholds: {
    http_req_duration: ["p(95)<1500"],
    http_req_failed: ["rate==0"],
  },
};
