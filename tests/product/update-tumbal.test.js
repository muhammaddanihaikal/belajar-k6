import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { authSetup } from "../../helpers/setup.helper.js";
import { updateProduct } from "../../services/product.service.js";

// 1. Opsi Beban & SLA (Langsung di sini)
export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // Respon katalog < 1.5 detik
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};

// 2. Baca data tumbal dari file JSON hasil seeder
const tumbalList = new SharedArray("daftar tumbal", function () {
  return JSON.parse(open("../../data/tumbal-products.json"));
});

// 3. Login 1x di awal untuk ambil token
export const setup = authSetup;

// 4. Skenario Update Produk Tumbal
export default function (data) {
  const item = tumbalList[(__VU - 1) % tumbalList.length];
  const res = updateProduct(item.id, `${item.title} (Updated)`, data.token);

  check(res, { "update 200": (r) => r.status === 200 });

  sleep(1);
}
