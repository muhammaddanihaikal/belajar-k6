import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { authSetup } from "../../helpers/setup.helper.js";
import { deleteProduct } from "../../services/product.service.js";

export const options = {
  vus: 2,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate==0"],
  },
};

// 1. Baca data tumbal dari file JSON hasil seeder
const tumbalList = new SharedArray("daftar tumbal", function () {
  return JSON.parse(open("../../data/tumbal-products.json"));
});

// 2. Login 1x di awal untuk ambil token
export const setup = authSetup;

export default function (data) {
  // Ambil ID data tumbal berdasarkan nomor robot (__VU)
  const item = tumbalList[(__VU - 1) % tumbalList.length];

  // Eksekusi DELETE produk tumbal membawa token
  const res = deleteProduct(item.id, data.token);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}
