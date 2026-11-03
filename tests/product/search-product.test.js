import { check, sleep } from "k6";
import { searchProducts } from "../../services/product.service.js";
import { productOptions } from "../../config/product.options.js";

// 1. Pasang opsi khusus Service Product
export const options = productOptions;

// 2. Skenario Uji Service Product
export default function () {
  const res = searchProducts("phone");

  check(res, {
    "status 200": (r) => r.status === 200,
    "produk ditemukan": (r) => r.json("products").length > 0,
  });

  sleep(1);
}
