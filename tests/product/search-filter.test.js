import { check, sleep } from "k6";
import { searchProducts, filterProducts } from "../../services/product.service.js";

export const options = {
  vus: 2,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    http_req_failed: ["rate==0"],
  },
};

export default function () {
  // 1. Search Produk
  const searchRes = searchProducts("phone");
  check(searchRes, { "search 200": (r) => r.status === 200 });

  // 2. Filter Kategori
  const filterRes = filterProducts("smartphones");
  check(filterRes, { "filter 200": (r) => r.status === 200 });

  sleep(1);
}
