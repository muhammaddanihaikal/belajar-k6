import { check, sleep } from "k6";
import { productOptions } from "../../config/options.js";
import { searchProducts, filterProducts } from "../../services/product.service.js";

// 100% DRY
export const options = productOptions;

export default function () {
  const searchRes = searchProducts("phone");
  check(searchRes, { "search 200": (r) => r.status === 200 });

  const filterRes = filterProducts("smartphones");
  check(filterRes, { "filter 200": (r) => r.status === 200 });

  sleep(1);
}
