import { check, sleep } from "k6";
import { login } from "../../services/auth.service.js";
import { searchProducts, addCart } from "../../services/product.service.js";

// Opsi beban untuk gabungan alur user
export const options = {
  vus: 3,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1500"],
    http_req_failed: ["rate==0"],
  },
};

export function setup() {
  const res = login("emilys", "emilyspass");
  return {
    token: res.json("accessToken"),
    userId: res.json("id"),
  };
}

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
