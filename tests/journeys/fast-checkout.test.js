import { check, sleep } from "k6";
import { productOptions } from "../../config/options.js";
import { authSetup } from "../../helpers/setup.helper.js";
import { searchProducts, addCart } from "../../services/product.service.js";

// 100% DRY
export const options = productOptions;

// Reusable Setup
export const setup = authSetup;

export default function (data) {
  // 1. Service Product (Cari)
  const searchRes = searchProducts("laptop");
  const productId = searchRes.json("products.0.id");

  // 2. Service Product / Cart (Checkout bawa token Auth)
  const cartRes = addCart(data.userId, productId, data.token);

  check(cartRes, {
    "checkout berhasil": (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
