import { check, sleep } from "k6";
import { productOptions } from "../../config/options/product.options.js";
import { authSetup } from "../../helpers/setup.helper.js";
import { searchProducts, addCart } from "../../services/product.service.js";

export const options = productOptions;
export const setup = authSetup;

export default function (data) {
  const searchRes = searchProducts("laptop");
  const productId = searchRes.json("products.0.id");

  const cartRes = addCart(data.userId, productId, data.token);
  check(cartRes, {
    "checkout berhasil": (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
