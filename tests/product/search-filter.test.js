import { check, sleep } from "k6";
import { searchProducts, filterProducts } from "../../services/product.service.js";

// 1. Opsi Beban & SLA (Langsung di sini)
export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"], // Respon katalog < 1.5 detik
    http_req_failed: ["rate==0"],      // Error harus 0%
  },
};

// 2. Skenario Uji Search & Filter
export default function () {
  // A. Search Produk
  const searchRes = searchProducts("phone");
  check(searchRes, { "search 200": (r) => r.status === 200 });

  // B. Filter Kategori
  const filterRes = filterProducts("smartphones");
  check(filterRes, { "filter 200": (r) => r.status === 200 });

  sleep(1);
}
